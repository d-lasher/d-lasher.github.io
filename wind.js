
function initWindBox() {
    updateWindBox(true,true)
    
    return
}

function updateWindBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let wx = getCurrentWx()
        if (wx != null) {
            console.log('wind')
            console.log(wx)
    //        document.querySelector('#windspeedmph').innerHTML = parseInt(wx.windspeedmph);
            document.querySelector('#windspeedmph').innerHTML = parseInt(wx.windgustmph);
            winddir = parseInt(wx.winddir) + 90
            rotate = "rotate("+winddir+"deg)"
            document.querySelector('#winddir').style.transform = rotate;

            document.querySelector('#maxdailygust').innerHTML = parseInt(wx.maxdailygust) + "<span style='font-size:20px'> mph</span>";

            if ( wx.hasOwnProperty('maxgusttime')) {
                let date = new Date( parseFloat(wx.maxgusttime) )
                let local_date = new Date( date.toLocaleString("en-US", {timeZone: selectedStationJSON.tz}) )
                let hr = (local_date.getHours()<10?'0':'') + local_date.getHours();
                let min = (local_date.getMinutes()<10?'0':'') + local_date.getMinutes();
                let m = 'AM'
                if (local_date.getHours() >= 12)
                    m='PM'
                document.querySelector('#maxgusttime').innerHTML = hr + ':' + min + ' ' + "<span style='font-size:20px'>" + m + "</span>";
            } else {
                document.querySelector('#maxgusttime').innerHTML = ''
            }
        }
    }

    return
}