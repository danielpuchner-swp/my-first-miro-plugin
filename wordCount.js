function normalizeTitle(title) {
    return title.replace('</p>', '').replace('<p>', '').toLowerCase();
}

function addToWordCounts(element) {
    var title = normalizeTitle(element['title'])
    if (title in tokens) {
        tokens[title].elements.push(element)
        tokens[title].count++;
    } else {
        tokens[title].elements = [element];
        tokens[title].count = 1;
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