
function initSunBox() {
    updateSunBox(true,true)
    return
}

function updateSunBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let wx = getCurrentWx()
        if (wx != null) {
            document.querySelector('#solarradiation').innerHTML = parseInt(wx.solarradiation) + " <span style='font-size:20px'>(W/m&sup2;)</span>";
        }
    }

    if (forecastUpdated == true) {
        let now = Date.now()
        isDaytime = isDaylight(now)
        if (isDaytime == true) {
            document.querySelector('#sun_label').innerHTML = 'Sunset';
            document.querySelector('#sun_value').innerHTML = getSunset() + " <span style='font-size:30px'>PM</span>"
            document.querySelector('#sun_next').innerHTML = "Sunrise : "
            document.querySelector('#sun_next_value').innerHTML = getSunrise() + " <span style='font-size:20px'>AM</span>"
        } else {
            document.querySelector('#sun_label').innerHTML = 'Sunrise';
            document.querySelector('#sun_value').innerHTML = getSunrise() + " <span style='font-size:30px'>AM</span>"
            document.querySelector('#sun_next').innerHTML = "Sunset : "
            document.querySelector('#sun_next_value').innerHTML = getSunset()  + " <span style='font-size:20px'>PM</span>"        
        }
    }
    return
}