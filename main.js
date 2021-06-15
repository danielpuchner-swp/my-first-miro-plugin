let icon =
    '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'

async function authorize(){
    const isAuthorized = await miro.isAuthorized()

    if (!isAuthorized) {
        console.log('try to authorize');
        // Ask the user to authorize the app.
        var result=await miro.requestAuthorization();
        console.log(result);

    }
}

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            bottomBar: {
                title: 'Looking Glass',
                svgIcon: icon,
                positionPriority: 1,
                onClick: () => {
                    authorize();

                    miro.board.ui.openLeftSidebar('/my-first-miro-plugin/wordCount.html')
                },
            },
        },
    })
})