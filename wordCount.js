function normalizeTitle(text) {
    return text.replace('</p>', '').replace('<p>', '').toLowerCase();
}

function addToWordCounts(element) {
    var text = normalizeTitle(element['text'])
    if (text in tokens) {
        tokens[text].elements.push(element)
        tokens[text].count++;
    } else {
        let newElement= new Object();
        newElement.elements = [element];
        newElement.count = 1;
        tokens[text] = newElement;
    }
}

var tokens = new Object();

async function calculateWordCounts() {
    let widgets = await miro.board.getAllObjects();
    tokens = new Object();
    for (const widget of widgets) {
        addToWordCounts(widget)
    }
    tokens.sort(a => a.count);
}

miro.onReady(() => {
    // subscribe on user selected widgets
    //miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
    calculateWordCounts()
})