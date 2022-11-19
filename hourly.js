
function initHourlyBox() {

    if (isIOS() == true) {
        let parent_div = document.getElementById("hourly_table_parent");
        parent_div.style.overflow = 'scroll'
    } else {
        initDrag()
    }

    let now = Date.now()
    let divTable = document.getElementById("hourly_table_child");
    for (dHR=0; dHR< 24; dHR++) {
        hourlyWX = getHourlyWx(now,dHR)

        let template = getHourlyTemplate()
        template = template.replace("{$time}",hourlyWX['slug'])
        
        let temp = CtoF(hourlyWX['temp']) + '&#176;' 
        template = template.replace("{$temp}",temp)

        let gusts = KmToM(hourlyWX['windgusts']) + "<span style='font-size:20px'>mph</span>" //     
        template = template.replace("{$gusts}",gusts)

        let icon = hourlyWX['icon']    
        template = template.replace("{$icon}",icon)

        let ele = htmlToElement(template);
        divTable.appendChild(ele);
    }

    return
}

function updateHourlyBox() {
    return
}

function getHourlyTemplate() {
    let template = '<div class="hourly_item">\
                    <span class="hourly_hr">{$time}</span>\
                    <span class="hourly_icon"><img src="/img/{$icon}" style="width:50px;height:50px;"/></span>\
                    <span class="hourly_temp">{$temp}</span>\
                    <span class="hourly_gust">{$gusts}</span>'
    return template
}
