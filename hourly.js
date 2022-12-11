
var hourlyMoreBoxHidden = true;

function initHourlyBox() {
    if (isIOS() == true) {
        let parent_div = document.getElementById("hourly_table_parent");
        parent_div.style.overflow = 'scroll'
    } else {
        initDrag()
    }

    updateHourlyBox(true,true)
    return
}

function updateHourlyBox(forecastUpdated,conditionsUpdated) {
    if (forecastUpdated == true) {
        const now = new Date()        

        let divTable = document.getElementById("hourly_table_child");
        divTable.innerHTML = ''
        for (dHR=0; dHR< 24; dHR++) {
            hourlyWX = getHourlyWx(now,dHR)

            let template = getHourlyTemplate()
            template = template.replace("{$time}",hourlyWX['slug'])
            
            let temp = CtoF(hourlyWX['temp']) + '&#176;' 
            template = template.replace("{$temp}",temp)

            let icon = hourlyWX['icon']    
            template = template.replace("{$icon}",icon)

            let ele = htmlToElement(template);
            divTable.appendChild(ele);
        }

        updateMoreHourlyBox()
    }

    return
}

function updateMoreHourlyBox() {
    let now = Date.now()
    let divTable = document.getElementById("hourly_more_table_child");
    divTable.innerHTML = ''

    let total_snow_amnt = 0.0
    let total_rain_amnt = 0.0
    for (dHR=0; dHR< 24; dHR++) {
        hourlyWX = getHourlyWx(now,dHR)

        let template = getMoreHourlyTemplate()
        template = template.replace("{$time}",hourlyWX['slug'])
        
        let icon = hourlyWX['icon']    
        template = template.replace("{$icon}",icon)

        let temp = CtoF(hourlyWX['temp']) + '&#176;' 
        template = template.replace("{$temp}",temp)

        let gusts = KmToM(hourlyWX['windgusts']) + "<span style='font-size:20px'>mph</span>" //     
        template = template.replace("{$gusts}",gusts)

        let winddir = AngletoSLug(hourlyWX['winddir'])
        template = template.replace("{$winddir}",winddir)

        total_snow_amnt += MMtoIN( hourlyWX['snow_amnt'] )
        total_rain_amnt += MMtoIN( hourlyWX['rain_amnt'] )

        let precp_type = hourlyWX['precp_type'] 

        if ((precp_type == 'Snow') && (MMtoIN( hourlyWX['snow_amnt']) < 0.0999) ){
            template = template.replace("{$precp_amount}",'')
            template = template.replace("{$precp_type}","Flurries")
        } else if (precp_type == 'Snow') {
            precp_amnt = MMtoIN( total_snow_amnt ).toFixed(1)
            template = template.replace("{$precp_amount}",total_snow_amnt.toFixed(1))
            template = template.replace("{$precp_type}",precp_type)
        } else if (precp_type == 'Rain') {
            precp_amnt = MMtoIN( total_rain_amnt ).toFixed(1)
            template = template.replace("{$precp_amount}",total_rain_amnt.toFixed(1))
            template = template.replace("{$precp_type}",precp_type)
        } else {
            template = template.replace("{$precp_amount}",'')
            template = template.replace("{$precp_type}",'')
        }


        let ele = htmlToElement(template);
        divTable.appendChild(ele);
    }

    return
}

function hourlyToggleMore() {
    let btn = document.getElementById("hourly_more_btn");
    let box = document.getElementById("hourly_more_box");
    if (hourlyMoreBoxHidden == true) {
        btn.innerHTML = 'Less...'
        hourlyMoreBoxHidden = false
        box.style.height = "750px"
    } else {
        btn.innerHTML = 'More...'
        hourlyMoreBoxHidden = true    
        box.style.height = "0px"
    }
}

function getHourlyTemplate() {
    let template = '<div class="hourly_item">\
                    <span class="hourly_hr">{$time}</span>\
                    <span class="hourly_icon"><img src="/img/{$icon}" style="width:80px;height:80px;"/></span>\
                    <span class="hourly_temp">{$temp}</span>\
                    </div>'
//                    <span class="hourly_gust">{$gusts}</span>'
    return template
}

function getMoreHourlyTemplate() {
    let template = '<div class="hourly_more_item">\
                        <span class="hourly_more_hr">{$time}</span>\
                        <span class="hourly_more_icon"><img src="/img/{$icon}" style="width:50px;height:50px;"/></span>\
                        <span class="hourly_more_precip">{$precp_amount} {$precp_type}</span>\
                        <span class="hourly_more_temp">{$temp}</span>\
                        <span class="hourly_more_winddir">{$winddir}</span>\
                        <span class="hourly_more_gusts">{$gusts}</span>\
                    </div>'
    return template
}


