
function initGaugesBox() {
    let wx = getCurrentWx()
    if (wx != null) {
    }

    updateGaugesBox(true,true)
    return
}

function updateGaugesBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
        let visible = false
        let width = 0

        let wx = getCurrentWx()
        if (wx != null) {
            if (wx.hasOwnProperty("temp1f") == true) {
                document.querySelector('#gauge1_value').innerHTML = parseInt(wx.temp1f)  + "&#176;";
                document.querySelector('#gauge1_label').innerHTML = "Temperature 1";
                document.querySelector('#gauge1').style.display="inline";
                visible = true
                width += 250
            } else {
                document.querySelector('#gauge1').style.display="none";
            }

            if (wx.hasOwnProperty("temp2f") == true) {
                document.querySelector('#gauge2_value').innerHTML = parseInt(wx.temp2f)  + "&#176;";
                document.querySelector('#gauge2_label').innerHTML = "Temperature 2";
                document.querySelector('#gauge2').style.display="inline";
                visible = true
                width += 250
            }else {
                document.querySelector('#gauge2').style.display="none";
            }

            if (wx.hasOwnProperty("temp3f") == true) {
                document.querySelector('#gauge3_value').innerHTML = parseInt(wx.temp3f)  + "&#176;";
                document.querySelector('#gauge3_label').innerHTML = "Temperature 3";
                document.querySelector('#gauge3').style.display="inline";
                visible = true
                width += 250
            }else {
                document.querySelector('#gauge3').style.display="none";
            }

            if (wx.hasOwnProperty("humidity1") == true) {
                document.querySelector('#gauge4_value').innerHTML = parseInt(wx.humidity1)  + "%";
                document.querySelector('#gauge4_label').innerHTML = "Humidity 1";
                document.querySelector('#gauge4').style.display="inline";
                visible = true
                width += 250
            }else {
                document.querySelector('#gauge4').style.display="none";
            }

            if (wx.hasOwnProperty("humidity2") == true) {
                document.querySelector('#gauge5_value').innerHTML = parseInt(wx.humidity1)  + "%";
                document.querySelector('#gauge5_label').innerHTML = "Humidity 2";
                document.querySelector('#gauge5').style.display="inline";
                visible = true
                width += 250
            }else {
                document.querySelector('#gauge5').style.display="none";
            }

            if (wx.hasOwnProperty("humidity3") == true) {
                document.querySelector('#gauge6_value').innerHTML = parseInt(wx.humidity1)  + "%";
                document.querySelector('#gauge6_label').innerHTML = "Humidity 3";
                document.querySelector('#gauge6').style.display="inline";
                visible = true
                width += 250
            }   else {
                document.querySelector('#gauge6').style.display="none";
            }     
        }

        if (visible == true) {
            document.querySelector('#gauges_box').style.display="inline";
            document.querySelector('#gauge_table_child').style.width=width+"px";
        }
    }
    return
}