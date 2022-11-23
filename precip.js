
function initPrecipBox() {
    updatePrecipBox(true,true)
    return
}

function updatePrecipBox(forecastUpdated,conditionsUpdated) {
    if (forecastUpdated == true) {
        let wx = getCurrentWx()
        let label = "Rain"
        let time_frame = "Today"
        let total_precip = '0"'
        let percip_next = "No rain expected in the near future."

        if (wx != null) {   
            if (wx.temp1f < 36) { 
                forecast = getSnowForecast()
                for (idx=0; idx<1; idx++) {
                    label = forecast[idx]['slug'];
                    time_frame = forecast[idx]['time_frame']
                    total_precip = MMtoIN( forecast[idx]['snowfall'] ).toFixed(1) + '"'

                    if (idx == forecast.length - 1) {
                        percip_next = "No snow expected after "+time_frame+"."
                    } else {
                        next_precip = MMtoIN( forecast[idx+1]['snowfall'] ).toFixed(1) + ' inch '
                        next_timeframe = forecast[idx+1]['time_frame']
                        percip_next = next_precip + "of snow expected on "+next_timeframe+"."
                    }
                }
             }
        }

        document.querySelector('#precip_label').innerHTML = label;
        document.querySelector('#precip_day_label').innerHTML = time_frame;
        document.querySelector('#precip_value').innerHTML = total_precip;
        document.querySelector('#precip_next').innerHTML = percip_next;
    }
    return
}

function getSnowForecast() {
    let now = Date.now()
    const d = new Date();               //  start looking for snow tommorow at 6:00AM
    let minutes = 59 - d.getMinutes();
    let hrs = 24 - d.getHours() + 5;
    let min = now
    let max = min + (((hrs * 60 * 60) + (minutes * 60) + 60) * 1000)

    let expectations = []
    for (i=0; i<7; i += 1) {
        snowfall =  sumHourlyData(min,max,"snowfallAmount")
        slug = "Snow Forecast"

        if (i==0)
            time_frame = "The rest of today"
        else {
            dow = new Date(min).getDay()
            time_frame = GetDayOfWeek(dow)
        }

        result = {'snowfall':snowfall, 'slug':slug, 'time_frame':time_frame, 'day':i}
        if (snowfall > 0) 
            expectations.push(result)

        min = max
        max += (24 * 60 * 60) * 1000
    }

    if (expectations.length == 0) {
        snowfall =  0
        slug = "No Snow Expected"
        time_frame = "Next 7 Days"
        result = {'snowfall':snowfall, 'slug':slug, 'time_frame':time_frame, 'day':-1 }
        expectations.push(result)    
    }

    console.log( expectations )
    return expectations
}