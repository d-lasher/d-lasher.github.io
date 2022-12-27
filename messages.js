

function initMessagesBox() {
    updateMessagesBox(true,true)
    return
}

function updateMessagesBox(forecastUpdated,conditionsUpdated) {
 
    let box = document.getElementById("message_box");
    if (hasForecastError() == true) {
        box.style.display = 'block'
        let msg = document.getElementById("message_msg");

        if (jsonGridData.hasOwnProperty('detail'))
            msg.innerHTML = "NWS Forecast Data Error : <br/>" + jsonGridData['detail']
        else if (jsonDailyForecast.hasOwnProperty('detail'))
            msg.innerHTML = "NWS Forecast Data Error : <br/>" + jsonGridData['detail']
        else 
            msg.innerHTML = "NWS Forecast Data Error"
        return
    }

    box.style.display = 'none'
    return
}
 