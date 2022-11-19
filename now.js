


function initNowBox() {
    let wx = getCurrentWx()
    if (wx != null) {
        document.querySelector('#temp1f').innerHTML = parseInt(wx.temp1f) + "&#176;";
    }

    wxNow = getTodaysWx()
    if (wxNow != null) {
        document.querySelector('#now_conditions').innerHTML = wxNow[0]['forecast'];
        document.querySelector('#now_label').innerHTML = wxNow[0]['slug'];
        document.querySelector('#background_current_conditions').innerHTML = wxNow[0]['shortForecast'];

        document.querySelector('#now_next_conditions').innerHTML = wxNow[1]['forecast'];
        document.querySelector('#now_next_label').innerHTML = wxNow[1]['slug'];   
    }
    return
}

function updateNowBox() {
    initNowBox()
}