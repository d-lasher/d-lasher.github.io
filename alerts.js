
var alertsMoreBoxHidden = []

function initAlertsBox() {
    updateAlertsBox(true,true)
    return
}

function updateAlertsBox(forecastUpdated,conditionsUpdated) {
    if (conditionsUpdated == true) {
    }

    if (forecastUpdated == true) {
        if (jsonNwsAlerts == null)
            return

        let box = document.getElementById("alerts_box");
        let divTable = document.getElementById("alerts_table_parent");
        divTable.innerHTML = ''
        alertsMoreBoxHidden = []

        let alerts = jsonNwsAlerts['features']
        if (alerts.length == 0) {
            box.style.display = 'none'
            return
        }

        box.style.display = 'block'
        alertsMoreBoxHidden = new Array(alerts.length)

        let cnt = 0
        for (let idx=0; idx<alerts.length; idx++) {
            let alert = alerts[idx]['properties']
            let template = getAlertTemplate()

            let expires = alert['expires']
            let time_expires = new Date(expires)
            let now = new Date()
            if (time_expires < now)
                continue
            
            template = template.replace("{$idx}",idx)
            template = template.replace("{$idx_}",idx)
            template = template.replace("{$idx__}",idx)
            
            template = template.replace("{$event}",alert['event'])
            template = template.replace("{$headline}",alert['headline'])

            let description = alert['description']
            description = description.replaceAll("<","&#60")
            description = description.replaceAll(">","&#62")
            description = description.replace(/\n\n/g,'</p><p>');
            description = description.replaceAll("\n"," ")
            
            template = template.replace("{$description}",description)

            let ele = htmlToElement(template);
            divTable.appendChild(ele); 
            
            alertsMoreBoxHidden[idx] = true
            cnt += 1
        }

        if (cnt == 0)                   //  Nothing to show, all alerts have expired.
            box.style.display = 'none'
    }

    return
}

function alertsToggleMore(idx) {
    let btn = document.getElementById("alerts_btn_"+idx);
    let desc = document.getElementById("alerts_desc_"+idx);

    if (alertsMoreBoxHidden[idx] == true) {
        btn.innerHTML = 'Less...'
        alertsMoreBoxHidden[idx] = false
        desc.style.display = "block"    
    } else {
        btn.innerHTML = 'More...'
        alertsMoreBoxHidden[idx] = true
        desc.style.display = "none"    
    }
}

function getAlertTemplate() {
    let item = '\
    <div class="alerts_item">\
        <div class="alerts_event">{$event}</div>\
        <div class="alerts_headline">{$headline}</div>\
        <div class="alerts_description" id="alerts_desc_{$idx_}"><p>{$description}</p></div>\
        <div class="alerts_more_btn" id="alerts_btn_{$idx__}" onclick="alertsToggleMore({$idx})">More...</div>\
    </div>'
    return item
}