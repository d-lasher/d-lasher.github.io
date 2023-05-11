
function initStormBox() {
    updateStormBox(true,true)
    return
}

function updateStormBox(forecastUpdated,conditionsUpdated) {
    let box = document.getElementById("storm_box");
    if (hasForecastError() == true) {
        box.style.display = 'none'
        return
    }
    box.style.display = 'block'
    
    if (forecastUpdated == true) {
        let wx = getCurrentWx()
        let label = "Storm Forecast"
        let description = "Today"
        let total_precip = '0"'
        let percip_next = "No storms expected in the near future."

        if (wx != null) {   
            let forecast = getForecast()
            if (forecast.length > 0) {
                let idx = 0

                description = forecast[idx]['type'] + " expected " + forecast[idx]['time_frame']
                total_precip = MMtoIN( forecast[idx]['amnt'] ).toFixed(1) + '"'

                if (forecast[idx]['ending'] != null)
                    description = description + ", ending " + forecast[idx]['ending'] + '.'

                if (idx == forecast.length - 1) {
                    let after = forecast[idx]['time_frame']
                    if (forecast[idx]['ending'] != null) 
                        after = forecast[idx]['ending']
                    percip_next = "No storms forecasted after "+after+"."
                } else {
                    let next_precip = MMtoIN( forecast[idx+1]['amnt'] ).toFixed(1) + ' inch '
                    let next_timeframe = forecast[idx+1]['time_frame']
                    percip_next = next_precip + " of " + forecast[idx+1]['type'].toLowerCase() + " expected "+next_timeframe

                    if (forecast[idx+1]['ending'] != null)
                        percip_next = percip_next + " into " + forecast[idx+1]['ending'] + '.'
                    else
                        percip_next = percip_next + '.'
                }

            }
        }

        document.querySelector('#storm_label').innerHTML = label;
        document.querySelector('#storm_day_label').innerHTML = description;
        document.querySelector('#storm_value').innerHTML = total_precip;
        document.querySelector('#storm_next').innerHTML = percip_next;
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
    
    return expectations
}

function getForecast() {
    let now = Date.now()
    const d = new Date();               //  start looking for snow tommorow at 6:00AM
    let max = GetMidnight()
    let min = max - (24 * 60 * 60 * 1000)

    let expectations = []
    let prev = null

    for (i=0; i<7; i += 1) {
        snowfall =  sumHourlyData(min,max,"snowfallAmount")
        rain =  sumHourlyData(min,max,"quantitativePrecipitation")
        pop =  maxHourlyData(min,max,"probabilityOfPrecipitation")

        if (snowfall > 0) {
            slug = "Snow Forecast"

            dow = new Date(min).getDay()
            time_frame = GetDayOfWeek(dow)
            if (i == 0) 
                time_frame = 'Today'

//  If the storm carries over from the day before, just update the ending time
            if ((prev != null) && (prev['type'] == 'Snow')) {
                prev['ending'] = time_frame
                prev['amnt'] += snowfall
            }
            if (prev == null) {
                result = {'type':'Snow', 'amnt':snowfall, 'slug':slug, 'time_frame':time_frame, 'day':i, 'ending':null}
                expectations.push(result)
                prev = result
            }
        }
        
        if ((rain > 0.05) && (pop > 33)) {
            slug = "Rain Forecast"

            dow = new Date(min).getDay()
            time_frame = GetDayOfWeek(dow)
            if (i == 0) 
                time_frame = 'Today'

//  If the storm carries over from the day before, just update the ending time
            if ((prev != null) && (prev['type'] == 'Rain')) {
                prev['ending'] = time_frame
                prev['amnt'] += rain
            }
            if (prev == null) {
                result = {'type':'Rain', 'amnt':rain, 'slug':slug, 'time_frame':time_frame, 'day':i, 'ending':null}
                expectations.push(result)
                prev = result
            }
        }

        min = max
        max += (24 * 60 * 60) * 1000
    }
    
    return expectations
}
