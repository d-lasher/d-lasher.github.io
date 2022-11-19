
function initPrecipBox() {
    let wx = getCurrentWx()
    let label = "Rain"
    let day_label = "Next 24hrs"
    let text = '0"'
    let percip_next = "No rain expected in the near future."
    if (wx != null) {   
        if (wx.temp1f < 36) { 
            label = "Snow";
            percip_next = "No snow expected in the near future."
        }
    }

    document.querySelector('#precip_label').innerHTML = label;
    document.querySelector('#precip_day_label').innerHTML = day_label;
    document.querySelector('#precip_value').innerHTML = text;
    document.querySelector('#precip_next').innerHTML = percip_next;
    return
}

function updatePrecipBox() {
    return
}