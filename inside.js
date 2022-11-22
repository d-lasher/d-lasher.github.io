
function initInsideBox() {
    let wx = getCurrentWx()
    if (wx != null) {
        document.querySelector('#tempinf').innerHTML = parseInt(wx.tempinf) + "&#176;";
        document.querySelector('#humidityin').innerHTML = parseInt(wx.humidityin);
    }

    updateInsideBox(true,true)
    return
}

function updateInsideBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let wx = getCurrentWx()
        if (wx != null) {
            document.querySelector('#tempinf').innerHTML = parseInt(wx.tempinf) + "&#176;";
            document.querySelector('#humidityin').innerHTML = parseInt(wx.humidityin);
        }
    }
    return
}