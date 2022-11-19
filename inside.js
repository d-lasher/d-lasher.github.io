
function initInsideBox() {
    let wx = getCurrentWx()
    if (wx != null) {
        document.querySelector('#tempinf').innerHTML = parseInt(wx.tempinf) + "&#176;";
        document.querySelector('#humidityin').innerHTML = parseInt(wx.humidityin);
    }
    return
}

function updateInsideBox() {
    initInsideBox()
    return
}