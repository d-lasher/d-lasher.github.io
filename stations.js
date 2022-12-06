
var selectedStationJSON = null;

async function initStationsList() {
    await fetchStations()
    if (jsonStationList == null) {
        setTimeout(initStationsList,2000)
        return
    }
    console.log(jsonStationList)

    showStationsList()
}

function showStationsList() {
    let divTable = document.getElementById("station_viewport");
    divTable.innerHTML = ''

    let divDots = document.getElementById("stations_dot_list");
    divDots.innerHTML = ''
    
    for (i=0; i<jsonStationList.Items.length; i++) {
        station = jsonStationList.Items[i].station
        wx = jsonStationList.Items[i].wx
        console.log(station)
        console.log(wx)

        template = getStationTemplate()
        template = template.replace("{$label}",station['label'])
        template = template.replace("{$temp}",parseInt(wx['temp1f']))

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

        template = "<span class='stations_dot' id='stations_dot_{$idx}' onclick='selectStation({$idx_1})'></span>"
        template = template.replace("{$idx}",i) 
        template = template.replace("{$idx_1}",i) 
        ele = htmlToElement(template);
        divDots.appendChild(ele);
    }

    document.getElementById("station_viewport").style.display = "inline"
    document.getElementById("wx_viewport").style.display = "none"
}


async function selectStation(idx) {
    selectedStationJSON = jsonStationList.Items[idx].station
    console.log(selectedStationJSON)

    for (i=0; i<jsonStationList.Items.length; i++) {
        color = "#bbb"
        if (i == idx)
            color = "#fff"
        let id = "stations_dot_" + i
        document.getElementById(id).style.backgroundColor  = color
    }

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