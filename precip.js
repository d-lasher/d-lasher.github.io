
function initPrecipBox() {
    updatePrecipBox(true,true)
    return
}

function updatePrecipBox(forecastUpdated,conditionsUpdated) {
    if (forecastUpdated == true) {
        let wx = getCurrentWx()
        let label = "Storm Forecast"
        let description = "Today"
        let total_precip = '0"'
        let percip_next = "No storms expected in the near future."

        if (wx != null) {   
            forecast = getSnowForecast()
            if (forecast.length > 0) {
                for (idx=0; idx<1; idx++) {
                    description = "Snow expected " + forecast[idx]['time_frame']
                    total_precip = MMtoIN( forecast[idx]['snowfall'] ).toFixed(1) + '"'

                    if (forecast[idx]['ending'] != null)
                        description = description + ", ending " + forecast[idx]['ending'] + '.'

                    if (idx == forecast.length - 1) {
                        let after = forecast[idx]['time_frame']
                        if (forecast[idx]['ending'] != null) 
                            after = forecast[idx]['ending']
                        percip_next = "No storms forecasted after "+after+"."
                    } else {
                        next_precip = MMtoIN( forecast[idx+1]['snowfall'] ).toFixed(1) + ' inch '
                        next_timeframe = forecast[idx+1]['time_frame']
                        percip_next = next_precip + " of snow expected on "+next_timeframe

                        if (forecast[idx+1]['ending'] != null)
                            percip_next = percip_next + " into " + forecast[idx+1]['ending'] + '.'
                        else
                            percip_next = percip_next + '.'
                    }
                }
            }
        }

        document.querySelector('#precip_label').innerHTML = label;
        document.querySelector('#precip_day_label').innerHTML = description;
        document.querySelector('#precip_value').innerHTML = total_precip;
        document.querySelector('#precip_next').innerHTML = percip_next;
    }
    return
}

function getSnowForecast() {
    let now = Date.now()
    const d = new Date();               //  start looking for snow tommorow at 6:00AM
    let max = GetMidnight()
    let min = max - (24 * 60 * 60 * 1000)

    let expectations = []
    let prev = null

    for (i=0; i<7; i += 1) {
        snowfall =  sumHourlyData(min,max,"snowfallAmount")
        if (snowfall == 0) {
            prev = null
        } else {
            slug = "Snow Forecast"

            dow = new Date(min).getDay()
            time_frame = GetDayOfWeek(dow)
            if (i == 0) 
                time_frame = 'Today'

//  If the storm carries over from the day before, just update the ending time
            if (prev != null) {
                prev['ending'] = time_frame
                prev['snowfall'] += snowfall
            }
            if (prev == null) {
                result = {'snowfall':snowfall, 'slug':slug, 'time_frame':time_frame, 'day':i, 'ending':null}
                expectations.push(result)
                prev = result
            }
        }
        
        min = max
        max += (24 * 60 * 60) * 1000
    }

    console.log(expectations)
    return expectations
}