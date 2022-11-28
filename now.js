


function initNowBox() {
    updateNowBox(true,true)
    return
}

function updateNowBox(forecastUpdated,conditionsUpdated) {
    let wx = getCurrentWx()
    if (conditionsUpdated == true) {
        if (wx != null) {
            document.querySelector('#temp1f').innerHTML = parseInt(wx.temp1f) + "&#176;";
            
        }
    }

    jsonTodaysForecast = getTodaysWx()
    if (forecastUpdated == true) {
        if (jsonTodaysForecast != null) {
            document.querySelector('#now_conditions').innerHTML = jsonTodaysForecast[0]['forecast'];
            document.querySelector('#now_label').innerHTML = jsonTodaysForecast[0]['slug'];

            document.querySelector('#now_next_conditions').innerHTML = jsonTodaysForecast[1]['forecast'];
            document.querySelector('#now_next_label').innerHTML = jsonTodaysForecast[1]['slug'];   
        }
    }

    let now = Date.now()
    document.querySelector('#background_current_conditions').innerHTML = getWxLabel(now,wx);
    return
}