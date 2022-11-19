

function initDailyBox() {
    if (isIOS() == true) {
        let parent_div = document.getElementById("daily_table_parent");
        parent_div.style.overflow = 'scroll'
    } 

    let now = Date.now()
    let divTable = document.getElementById("daily_table_child");
    for (dDay=0; dDay<8; dDay++) {
        dailyWX = getDailyWx(now,dDay)

        let template = getDailyTemplate()
        template = template.replace("{$day}",dailyWX['slug'])

        let hitemp = CtoF(dailyWX['maxtemp']) + '&#176;' 
        template = template.replace("{$maxtemp}",hitemp)

        let lowtemp = CtoF(dailyWX['mintemp']) + '&#176;' 
        template = template.replace("{$mintemp}",lowtemp)

        let gusts = KmToM(dailyWX['windgusts']) + "<span style='font-size:20px'>mph</span>" //     
        template = template.replace("{$gusts}",gusts)

        let icon = dailyWX['icon']    
        template = template.replace("{$icon}",icon)

        let ele = htmlToElement(template);
        divTable.appendChild(ele);
    }

    return
}

function updateDailyBox() {
    return
}

function getDailyTemplate() {
    let template = '<div class="daily_item">\
                    <span class="daily_day">{$day}</span>\
                    <span class="daily_icon"><img src="/img/{$icon}" style="width:50px;height:50px;"/></span>\
                    <span class="daily_temp_hi">{$mintemp}</span>\
                    <span class="daily_temp_low">{$maxtemp}</span>\
                    <span class="daily_gust">{$gusts}</span>'
    return template
}