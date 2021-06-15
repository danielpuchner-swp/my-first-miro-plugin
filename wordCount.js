function normalizeTitle(text) {
    return text.replace('</p>', '').replace('<p>', '').toLowerCase();
}

function addToWordCounts(element) {
    var text = normalizeTitle(element['text'])
    if (text == '')
        return;

    let parts = text.split(' ');
    for (const part of parts) {
        if (part in tokens) {
            tokens[part].elements.push(element)
            tokens[part].count++;
        } else {
            let newElement = new Object();
            newElement.elements = [element];
            newElement.count = 1;
            newElement.text = part;
            tokens[part] = newElement;
        }
    }
}

var tokens = new Object();

async function calculateWordCounts() {
    let widgets = await miro.board.widgets.stickers.get()
    tokens = new Object();
    for (const widget of widgets) {
        addToWordCounts(widget)
    }

    displayTokens(tokens);
}
function displayTokens(tok){
    let content = document.getElementById('content');
    let sorted=Object.values(tok).sort((a,b) => b.count - a.count);
    for (const token of sorted)
    {
        let inputElement = document.createElement('span');
        inputElement.innerHTML = token.text + "(" + token.count + ")";
        inputElement.className="wordcount";

        inputElement.addEventListener("click", function () {
            highlight(token.text);
        });
        document.body.appendChild(inputElement)
    }
}

function highlight(tokenName) {
    let ids= tokens[tokenName].elements.map(a=> a["id"]);
    miro.board.selection.clear();
    miro.board.selection.selectWidgets(ids);
}

miro.onReady(() => {
    // subscribe on user selected widgets
    //miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
    calculateWordCounts()
})