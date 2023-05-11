
function initRainBox() {
    updateRainBox(true,true)
    return
}


function updateRainBox(forecastUpdated,conditionsUpdated) {

    if (conditionsUpdated == true) {
        let wx = getCurrentWx()

        if (wx.hasOwnProperty("rainratein") == true) {
            document.querySelector('#rainratein_ex').innerHTML = parseFloat(wx.rainratein).toFixed(2) + "<span class='rain_units'> in/hr</span>";

            document.querySelector('#rain_hr_value_ex').innerHTML = parseFloat(wx.hourlyrainin).toFixed(2) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_day_value_ex').innerHTML = parseFloat(wx.dailyrainin).toFixed(2) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_wk_value_ex').innerHTML = parseFloat(wx.weeklyrainin).toFixed(2) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_mn_value_ex').innerHTML = parseFloat(wx.monthlyrainin).toFixed(2) + "<span class='rain_units'> in</span>";
            document.querySelector('#rain_yr_value_ex').innerHTML = parseFloat(wx.yearlyrainin).toFixed(2) + "<span class='rain_units'> in</span>";
        } else {
            document.querySelector('#rainratein_ex').innerHTML = "0.0";
        }
    }

    if (forecastUpdated == true) {
        let now = Date.now()
        let dailyWX = getDailyWx(now,0)

        if (dailyWX['rain_amt'] > 0.0) {
            rain_amnt = MMtoIN( dailyWX['rain_amt'] )
            document.querySelector('#rain_next').innerHTML =  parseFloat(rain_amnt).toFixed(2) + '" more rain today.';
        } else {
            rain_amnt = MMtoIN( dailyWX['rain_amt'] )
            document.querySelector('#rain_next').innerHTML =  'No rain expected today.';
        }
    }
    return
}
