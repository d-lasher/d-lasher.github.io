
var dailyMoreBoxHidden = true

function initDailyBox() {
    if (isIOS() == false) {
//        let parent_div = document.getElementById("daily_table_parent");
//        parent_div.style.overflow = 'hidden';
//        parent_div.style.overflowY = 'hidden';
//        parent_div.style.overflowX = 'hidden';
    } 

    updateDailyBox(true,true)
    return
}

function updateDailyBox(forecastUpdated,conditionsUpdated) {
    let box = document.getElementById("daily_box");
    if (hasForecastError() == true) {
        box.style.display = 'none'
        return
    }
    box.style.display = 'block'

    if (forecastUpdated == true) {
        let now = Date.now()
        let divTable = document.getElementById("daily_table_child");
        divTable.innerHTML = ''
        for (let dDay=0; dDay<8; dDay++) {
            dailyWX = getDailyWx(now,dDay)
    
            let template = getDailyTemplate()
            template = template.replace("{$day}",dailyWX['slug'])
    
            let hitemp = CtoF(dailyWX['maxtemp']) + '&#176;' 
            template = template.replace("{$maxtemp}",hitemp)
    
            // let lowtemp = CtoF(dailyWX['mintemp']) + '&#176;' 
            // template = template.replace("{$mintemp}",lowtemp)
    
            // let gusts = KmToM(dailyWX['windgusts']) + "<span style='font-size:20px'>mph</span>" //     
            // template = template.replace("{$gusts}",gusts)
    
            let icon = dailyWX['icon']    
            template = template.replace("{$icon}",icon)
    
            let ele = htmlToElement(template);
            divTable.appendChild(ele);
        }

        updateMoreDailyBox()
    }
    return
}

function dailyToggleMore() {
    let btn = document.getElementById("daily_more_btn");
    let box = document.getElementById("daily_more_box");
    if (dailyMoreBoxHidden == true) {
        btn.innerHTML = 'Less...'
        dailyMoreBoxHidden = false
        box.style.height = "720px"
    } else {
        btn.innerHTML = 'More...'
        dailyMoreBoxHidden = true    
        box.style.height = "0px"
    }
}

function updateMoreDailyBox() {
    let now = Date.now()
    let divTable = document.getElementById("daily_more_table_child");
    divTable.innerHTML = ''

    for (let dDay=0; dDay<8; dDay++) {
        dailyWX = getDailyWx(now,dDay)

        let template = getMoreDailyTemplate()
        template = template.replace("{$day}",dailyWX['slug'])

        let hitemp = CtoF(dailyWX['maxtemp']) + '&#176;' 
        template = template.replace("{$maxtemp}",hitemp)

        let lowtemp = CtoF(dailyWX['mintemp']) + '&#176;' 
        template = template.replace("{$mintemp}",lowtemp)

        let gusts = KmToM(dailyWX['windgusts']) + "<span style='font-size:20px'>mph</span>" //     
        template = template.replace("{$gusts}",gusts)

        let icon = dailyWX['icon']    
        template = template.replace("{$icon}",icon)

        precipt = ''
        let snowfall_amt = dailyWX['snowfall_amt']
        if (snowfall_amt > 0) {
            snow_amnt = MMtoIN( snowfall_amt )
            if (snow_amnt < 0.0999) 
                precipt = "Flurries"
            else  
                precipt = snow_amnt.toFixed(1) + '" Snow'
        }
        template = template.replace("{$precp}",precipt)

        let ele = htmlToElement(template);
        divTable.appendChild(ele);
    }
}

function getMoreDailyTemplate() {
    let template = '<div class="daily_more_item">\
                    <span class="daily_more_day">{$day}</span>\
                    <span class="daily_more_icon"><img src="/img/{$icon}" style="width:50px;height:50px;"/></span>\
                    <span class="daily_more_precip">{$precp}</span>\
                    <span class="daily_more_temp_hi">{$maxtemp}</span>\
                    <span class="daily_more_temp_low">{$mintemp}</span>\
                    <span class="daily_more_gusts">{$gusts}</span>'
    return template
}

function getDailyTemplate() {
    let template = '<div class="daily_item">\
                    <span class="daily_day">{$day}</span>\
                    <span class="daily_icon"><img src="/img/{$icon}" style="width:80px;height:80px;"/></span>\
                    <span class="daily_temp_hi">{$maxtemp}</span>'
    return template
}