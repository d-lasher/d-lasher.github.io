

//  public functions


function onBodySize() {
    let width = document.documentElement.clientWidth;
    let height = width * 1.7777
    let scale = width / 1000.0;

    document.body.style.width = width + 'px';
    document.body.style.height = '100%';

    document.querySelector('#viewport').style.transform = 'scale(' + scale + ')';
    document.querySelector('#viewport').style.width = (width / scale) + 'px';
    document.querySelector('#viewport').style.height = '100%';

    return
}

async function loadBodyElements() {
    onBodySize()
    window.addEventListener('resize', onBodySize , true);

    initStationsList()
}

async function loadStationWx() {
    let res = await fetchData()
    if (res == false) {
        console.log("FETCH INITIAL WX FAILED, retry in 0.5 seconds")
        setTimeout(loadStationWx, (0.5  * 1000));
        return
    }
    document.getElementById("wx_viewport").style.display = "inline"

    initHourlyBox()
    initNowBox()
    initDailyBox()
    initSunBox()
    initWindBox()
    initInsideBox()
    initPrecipBox()
    initAlertsBox()
    return
}

async function updateCurrentWx() {
    console.log("Update Conditions")

    res = await fetchCurrentWx(selectedStationJSON.id)
    if (res == null) {
        console.log("FETCH CURRENT WX FAILED, retry in 0.5 seconds")
        setTimeout(updateCurrentWx, (0.5  * 1000));
        return
    }
    if (hasForecastData() == false) {
        setTimeout(updateForecastWx, (5  * 1000));
        return
    }

    updateHourlyBox(false,true)
    updateNowBox(false,true)
    updateDailyBox(false,true)
    updateSunBox(false,true)
    updateWindBox(false,true)
    updateInsideBox(false,true)   
    updatePrecipBox(false,true) 
    updateAlertsBox(false,true)

    return
}

async function updateForecastWx() {
    console.log("Update Forecast")

    let lat = selectedStationJSON.latitude
    let lng = selectedStationJSON.longitude
    await fetchNwsForecast(lat,lng)
    if (hasForecastData() == false) {
        console.log("FETCH FORECAST WX FAILED, retry in 0.5 seconds")
        setTimeout(updateForecastWx, (0.5  * 1000));
        return
    }

    updateHourlyBox(true,false)
    updateNowBox(true,false)
    updateDailyBox(true,false)
    updateSunBox(true,false)
    updateWindBox(true,false)
    updateInsideBox(true,false)
    updatePrecipBox(true,false)
    updateAlertsBox(true,false)

    //  forecast data 1 minute after the top of the hour
    const d = new Date();
    let minutes = d.getMinutes();
    let delta = 61 - minutes

    console.log("Update forecast in " + (delta * 60) + " seconds")
    setTimeout(updateForecastWx, (delta * 60  * 1000));
    return
}

async function fetchData(id) {
    let aws_station_id = selectedStationJSON.id
    let lat = selectedStationJSON.latitude
    let lng = selectedStationJSON.longitude

    let res = await fetchCurrentWx(aws_station_id)
    if (res == null) 
        return false
    
    res = await fetchNwsForecast(lat,lng)
    if (res == false)
        return false

    //  We refetch the current wx every 30 seconds and refetch the
    setInterval(updateCurrentWx, (45  * 1000));

    //  forecast data 1 minute after the top of the hour
    const d = new Date();
    let minutes = d.getMinutes();
    let delta = 61 - minutes

    console.log("Update forecast in " + (delta * 60) + " seconds")
    setTimeout(updateForecastWx, (delta * 60  * 1000));

    return true
}


function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  function isIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function GetDayOfWeek(dow) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[dow]
}

function GetMidnight() {
    let now = Date.now()
    const d = new Date();               //  start looking for snow tommorow at 6:00AM
    let minutes = 59 - d.getMinutes();
    let hrs = 23 - d.getHours();
    let midnight = now + (((hrs * 60 * 60) + (minutes * 60) + 60) * 1000)
    return midnight
}

function convertTZ(date, tzString) {
    r = new Date((date).toLocaleString("en-US", {timeZone: tzString}));   
    return r
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
