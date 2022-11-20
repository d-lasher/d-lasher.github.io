

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
    console.log("data ready")

    initHourlyBox()
    initNowBox()
    initDailyBox()
    initSunBox()
    initWindBox()
    initInsideBox()
    initPrecipBox()

    setInterval(updateCurrentWx, (5  * 1000));
    return
}

async function updateCurrentWx() {
    console.log("updateCurrentWx")
    await fetchCurrentWx(1)

    updateHourlyBox()
    updateNowBox()
    updateDailyBox()
    updateSunBox()
    updateWindBox()
    updateInsideBox()    
    console.log("done")
}

async function fetchData() {
    await fetchCurrentWx(1)
    await fetchNwsForecast(1)
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

