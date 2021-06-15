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
    let widgets = await miro.board.getAllObjects();
    tokens = new Object();
    for (const widget of widgets) {
        addToWordCounts(widget)
    }
    //tokens.sort(a => a.count);

    displayTokens(tokens);

}
function displayTokens(tok){
    let content = document.getElementById('content');
    for (const token of Object.values(tok))
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
    console.log(tokenName)
}

miro.onReady(() => {
    // subscribe on user selected widgets
    //miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
    calculateWordCounts()
})