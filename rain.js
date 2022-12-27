
function initRainBox() {
    updateRainBox(true,true)
    return
}


function updateRainBox(forecastUpdated,conditionsUpdated) {
    return

    if (conditionsUpdated == true) {
        let wx = getCurrentWx()

        if (wx.hasOwnProperty("rainratein") == true) {
            document.querySelector('#rainratein').innerHTML = parseFloat(wx.rainratein).toFixed(2);

            document.querySelector('#rain_data').style.display = "block"
            document.querySelector('#rain_hr_value').innerHTML = parseFloat(wx.hourlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_day_value').innerHTML = parseFloat(wx.dailyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_wk_value').innerHTML = parseFloat(wx.weeklyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_mn_value').innerHTML = parseFloat(wx.monthlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_yr_value').innerHTML = parseFloat(wx.yearlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
        } else {
            document.querySelector('#rainratein').innerHTML = "0.0";
            document.querySelector('#rain_data').style.display = "hidden"
        }
    }

    if (forecastUpdated == true) {
    }
    return
}
