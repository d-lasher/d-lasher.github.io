
var selectedStationJSON = null;

async function initStationsList() {
    await fetchStations()
    if (jsonStationList == null) {
        setTimeout(initStationsList,2000)
        return
    }
    console.log(jsonStationList)

    buildStationsFooter()

    last_selection = getCookie('station')
    if ((last_selection != null) && 
        (last_selection >= 0) && (last_selection < jsonStationList.Items.length))
        await selectStation(last_selection);
    else
        showStationsList()
}

function buildStationsFooter() {
    let divDots = document.getElementById("stations_dot_list");
    divDots.innerHTML = ''
    
    for (let i=0; i<jsonStationList.Items.length; i++) {
        station = jsonStationList.Items[i].station
        wx = jsonStationList.Items[i].wx
        console.log(station)
        console.log(wx)

        let template = "<span class='stations_dot' id='stations_dot_{$idx}' onclick='selectStation({$idx_1})'></span>"
        template = template.replace("{$idx}",i) 
        template = template.replace("{$idx_1}",i) 
        ele = htmlToElement(template);
        divDots.appendChild(ele);
    }
}

function showStationsList() {
    let divTable = document.getElementById("station_viewport");
    divTable.innerHTML = ''
    
    for (let i=0; i<jsonStationList.Items.length; i++) {
        station = jsonStationList.Items[i].station
        wx = jsonStationList.Items[i].wx

        template = getStationTemplate()
        template = template.replace("{$label}",station['label'])
        
        if (wx.hasOwnProperty('temp1f'))
            template = template.replace("{$temp}",parseInt(wx['temp1f']))
        else if (wx.hasOwnProperty('tempf'))
            template = template.replace("{$temp}",parseInt(wx['tempf']))


        const date = new Date()
        convertedDate  = convertTZ(date, station['tz']) // current date-time in jakarta.
        hr = convertedDate.getHours(); 
        min = convertedDate.getMinutes();
        label = "AM"
        if (hr == 12)
            label = "PM"
        else if (hr > 12) {
            label = "PM"
            hr -= 12
        }
        template = template.replace("{$timestamp}",hr + ":" + pad(min) + label) 
        template = template.replace("{$id}",i) 

        let ele = htmlToElement(template);
        divTable.appendChild(ele);
    }

    setCookie('station',-1,14)
    document.getElementById("station_viewport").style.display = "inline"
    document.getElementById("wx_viewport").style.display = "none"
}


async function selectStation(idx) {
    console.log("Station List")
    console.log(jsonStationList)

    selectedStationJSON = jsonStationList.Items[idx].station
    console.log(selectedStationJSON)

    for (let i=0; i<jsonStationList.Items.length; i++) {
        color = "#bbb"
        if (i == idx)
            color = "#fff"
        let id = "stations_dot_" + i
        document.getElementById(id).style.backgroundColor  = color
    }

    setCookie('station',idx,14)
    document.getElementById("station_viewport").style.display = "none"
    clearNwsLocation()
    await loadStationWx()
}

function pad(num) {
    var s = "00" + num;
    return s.substr(s.length-2,2);
}


function getStationTemplate() {
    template = '<div class="station_box" onclick="selectStation(\'{$id}\')">\
                    <div class="station_slug">{$label}</div>\
                    <div class="station_temp">{$temp}&#176;</div>\
                    <div class="station_time">{$timestamp}</div>\
                </div>'
    return template
}