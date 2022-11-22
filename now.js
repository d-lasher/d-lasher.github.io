


function initNowBox() {
    updateNowBox(true,true)
    return
}

function updateNowBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let wx = getCurrentWx()
        if (wx != null) {
            document.querySelector('#temp1f').innerHTML = parseInt(wx.temp1f) + "&#176;";
        }
    }

    if (forecastUpdated == true) {
        jsonTodaysForecast = getTodaysWx()
        if (jsonTodaysForecast != null) {
            document.querySelector('#now_conditions').innerHTML = jsonTodaysForecast[0]['forecast'];
            document.querySelector('#now_label').innerHTML = jsonTodaysForecast[0]['slug'];
            document.querySelector('#background_current_conditions').innerHTML = jsonTodaysForecast[0]['shortForecast'];

            document.querySelector('#now_next_conditions').innerHTML = jsonTodaysForecast[1]['forecast'];
            document.querySelector('#now_next_label').innerHTML = jsonTodaysForecast[1]['slug'];   
        }
    }
    return
}