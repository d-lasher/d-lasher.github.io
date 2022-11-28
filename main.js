

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

    await fetchData()

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

    res = await fetchCurrentWx(1)
    if (res == null) {
        setTimeout(updateCurrentWx, (5  * 1000));
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

    await fetchNwsForecast(1)
    if (hasForecastData() == false) {
        setTimeout(updateForecastWx, (5  * 1000));
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

async function fetchData() {
    await fetchCurrentWx(1)
    await fetchNwsForecast(1)

    //  We refetch the current wx every 30 seconds and refetch the
    setInterval(updateCurrentWx, (30  * 1000));

    //  forecast data 1 minute after the top of the hour
    const d = new Date();
    let minutes = d.getMinutes();
    let delta = 61 - minutes

    console.log("Update forecast in " + (delta * 60) + " seconds")
    setTimeout(updateForecastWx, (delta * 60  * 1000));

    return
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
