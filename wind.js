
function initWindBox() {
    let wx = getCurrentWx()
    if (wx != null) {
        document.querySelector('#windspeedmph').innerHTML = parseInt(wx.windspeedmph);
        winddir = parseInt(wx.winddir) + 90
        rotate = "rotate("+winddir+"deg)"
        document.querySelector('#winddir').style.transform = rotate;

        document.querySelector('#windgustmph').innerHTML = "Gusts : "+ parseInt(wx.windgustmph) + "<span style='font-size:20px'>mph</span>";
        document.querySelector('#maxdailygust').innerHTML = "Max : "+ parseInt(wx.maxdailygust) + "<span style='font-size:20px'>mph</span>";
    }
}

function updateWindBox() {
    initWindBox()
}