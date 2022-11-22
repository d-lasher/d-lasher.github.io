
function initWindBox() {
    updateWindBox(true,true)
    
    return
}

function updateWindBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let wx = getCurrentWx()
        if (wx != null) {
            console.log(wx)
    //        document.querySelector('#windspeedmph').innerHTML = parseInt(wx.windspeedmph);
            document.querySelector('#windspeedmph').innerHTML = parseInt(wx.windgustmph);
            winddir = parseInt(wx.winddir) + 90
            rotate = "rotate("+winddir+"deg)"
            document.querySelector('#winddir').style.transform = rotate;

            document.querySelector('#maxdailygust').innerHTML = "Max gust today : "+ parseInt(wx.maxdailygust) + "<span style='font-size:20px'>mph</span>";
        }
    }

    return
}