
function initRainBox() {
    updateRainBox(true,true)
    return
}


function updateRainBox(forecastUpdated,conditionsUpdated) {

    if (conditionsUpdated == true) {
        let wx = getCurrentWx()

        if (wx.hasOwnProperty("rainratein") == true) {
            document.querySelector('#rainratein_ex').innerHTML = parseFloat(wx.rainratein).toFixed(2);

            document.querySelector('#rain_hr_value_ex').innerHTML = parseFloat(wx.hourlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_day_value_ex').innerHTML = parseFloat(wx.dailyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_wk_value_ex').innerHTML = parseFloat(wx.weeklyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_mn_value_ex').innerHTML = parseFloat(wx.monthlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_yr_value_ex').innerHTML = parseFloat(wx.yearlyrainin).toFixed(1) + "<span class='rain_units'> in</span>";
        } else {
            document.querySelector('#rainratein_ex').innerHTML = "0.0";
        }
    }

    if (forecastUpdated == true) {
    }
    return
}
