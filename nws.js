
var jsonLocation
var jsonDailyForecast
var jsonHourlyForecast
var jsonGridData
var jsonSunriseSunset

function KmToM(km) {
    let m = parseInt( km / 1.609 )
    return m
}

function CtoF(c) {
   let f = parseInt( ((c * 9.0) / 5.0) + 32.0 )
   return f
}

async function fetchNwsForecast(id) {
    jsonLocation = await getNwsLocationJSON(id);
    location_properties = jsonLocation['properties']
    jsonDailyForecast = await getNwsWsJSON( location_properties['forecast'] )
    jsonHourlyForecast = await getNwsWsJSON( location_properties['forecastHourly'] )
    jsonGridData = await getNwsWsJSON( location_properties['forecastGridData'] )
    jsonSunriseSunset = await getSunriseSunset()

    console.log(jsonDailyForecast)
    console.log(jsonGridData)
    return null
}

function nwsTimeToUTS(nwsTimeString) {
    let loc = nwsTimeString.lastIndexOf('/')
    let uts = Date.parse(nwsTimeString.slice(0,loc))
    return uts
}

function getDailySlug(uts) {
    let date = new Date(uts);
    let day = date.getDay() 
    const slug = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat']
    return slug[day]    
}

function getHourlySlug(uts){
    let date = new Date(uts);
    let hr = date.getHours() 

    if (hr == 0)
        return "12AM"
    if (hr < 12)
        return hr + "AM"
    if (hr == 12)
        return "12PM"
    return (hr-12) + "PM"
}

function getUnits(property) {
    properties = jsonGridData["properties"]
    data = properties[property]
    return data["uom"]
}

function getSunrise() {
    utsSunrise = Date.parse( jsonSunriseSunset['results']['sunrise'])
    
    str = new Date(utsSunrise).toLocaleTimeString()
    loc = str.lastIndexOf(':')
    return str.slice(0,loc)
}
function getSunset() {
    utsSunset = Date.parse( jsonSunriseSunset['results']['sunset'])
    
    str = new Date(utsSunset).toLocaleTimeString()
    loc = str.lastIndexOf(':')
    return str.slice(0,loc)
}

function isDaylight(uts) {
    utsSunrise = Date.parse( jsonSunriseSunset['results']['sunrise'])
    utsSunset = Date.parse( jsonSunriseSunset['results']['sunset'])

    sunrise_hr = new Date(utsSunrise).getHours()
    sunrise_min = new Date(utsSunrise).getMinutes()
    sunrise_time = (sunrise_hr * 60) + sunrise_min

    sunset_hr = new Date(utsSunset).getHours()
    sunset_min = new Date(utsSunset).getMinutes()
    sunset_time = (sunset_hr * 60) + sunset_min

    hr = new Date(uts).getHours()
    min = new Date(uts).getMinutes()
    _time = (hr * 60) + min

    if (_time < sunrise_time)
        return false
    if (_time > sunset_time)
        return false
    return true
}

function getHourlyData(uts,property) {
    properties = jsonGridData["properties"]
    dataset = properties[property]["values"]

    value = NaN
    for (idx=0; idx<dataset.length; idx++) {
        valid_time = nwsTimeToUTS(dataset[idx]['validTime'])
        if (valid_time > uts)
            break
        value = dataset[idx]["value"]
    }
    return value
}


function getWxIcon(uts,force_daylight) {
    let skyCover = getHourlyData(uts,'skyCover')
    let snowfallAmt = getHourlyData(uts,'snowfallAmount')
    let pop = getHourlyData(uts,'probabilityOfPrecipitation')
    let pot = getHourlyData(uts,'probabilityOfThunder')
    let windGust = getHourlyData(uts,'windGust')
    let visibility = getHourlyData(uts,'visibility')
    let temp = getHourlyData(uts,'temperature')
    let daylight = isDaylight(uts)
    if (force_daylight == true)
        daylight  = true

    if (snowfallAmt > 25) 
        return 'snowheavy.png'
    if (snowfallAmt > 10) 
        return 'snow.png'
    if (pot > 50) {
        if (daylight == false)
            return 'lightningmoon.png'
        return 'lightning.png'
    }
    if ((pop > 33) && (temp > 2)){
        if (windGust > 31) 
            return 'windrain.png'
        if (daylight == false)
            return 'rainmoon.png'
        return 'rain.png'
    }
    if (visibility < 1600)
        return 'foggy.png'
    if (windGust > 48.27)   // 48.27km = 30mph
        return 'wind.png'
    if (skyCover > 90) 
        return 'cloudy.png'
    if (skyCover > 33) {
        if (daylight == false) 
            return 'pcloudymoon.png'
        return 'pcloudy.png'
    }

    if (daylight == true) 
        return 'sunny.png'
    if (daylight == false) 
        return 'clearmoon.png'

    return 'sunny.png'
}

function getDailyWx(now,deltaDay) {
    let uts = now + (deltaDay * 24.0 * 60.0 * 60.0 * 1000.0)
    let slug = getDailySlug(uts)

    let windgusts = getHourlyData(uts,'windGust')
    let wind_uom = getUnits('windGust')

    let maxtemp = getHourlyData(uts,'maxTemperature')
    let mintemp = getHourlyData(uts,'minTemperature')
    let temp_uom = getUnits('maxTemperature')

    let icon = getWxIcon(uts,true)

    let wx = {'slug':slug, 'icon':icon, 'temp_uom':temp_uom, 'maxtemp':maxtemp, 'mintemp':mintemp, 'wind_uom':wind_uom, 'windgusts':windgusts}
    return wx
}

function getHourlyWx(now,deltaHour){
    let uts = now + (deltaHour * 60.0 * 60.0 * 1000.0)

    let slug = getHourlySlug(uts)
    let temp = getHourlyData(uts,'temperature')
    let temp_uom = getUnits('temperature')

    let windgusts = getHourlyData(uts,'windGust')
    let wind_uom = getUnits('windGust')

    let icon = getWxIcon(uts,false)

    let wx = {'slug':slug, 'icon':icon, 'temp_uom':temp_uom, 'temp':temp, 'wind_uom':wind_uom, 'windgusts':windgusts}
    return wx
}

function getTodaysWx() {
    let wxToday = []
    let slug = jsonDailyForecast['properties']['periods'][0]['name']
    let forecast = jsonDailyForecast['properties']['periods'][0]['detailedForecast']
    let shortForecast = jsonDailyForecast['properties']['periods'][0]['shortForecast']
    wxToday[0] = {'slug':slug, 'forecast':forecast, 'shortForecast':shortForecast}

    slug = jsonDailyForecast['properties']['periods'][1]['name']
    forecast = jsonDailyForecast['properties']['periods'][1]['detailedForecast']
    shortForecast = jsonDailyForecast['properties']['periods'][1]['shortForecast']
    wxToday[1] = {'slug':slug, 'forecast':forecast, 'shortForecast':shortForecast}

    return wxToday
}

async function getSunriseSunset() {
    let wx_url = 'https://api.sunrise-sunset.org/json?formatted=0&'
    let wx_points = 'lat=39.9227&lng=-105.4049'
    let url = wx_url + wx_points
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log("error")
        console.log(error);
    }
    return null
}


async function getNwsWsJSON(wx_url) {
    console.log(wx_url)

    try {
        let res = await fetch(wx_url);
        return await res.json();
    } catch (error) {
        console.log("error")
        console.log(error);
    }
    return null
}

async function getNwsLocationJSON(id) {
    let wx_url = 'https://api.weather.gov/points/'
    let wx_points = '39.9227,-105.4049'
    let url = wx_url + wx_points
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log("error")
        console.log(error);
    }
    return null
}

