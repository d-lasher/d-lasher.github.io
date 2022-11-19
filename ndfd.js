
function parseXmlToJson(xml) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml,"text/xml");
    return xmlDoc;
}

function parseHourlyTemp(xmlDoc) {
    let xmlTemp = xmlDoc.getElementsByTagName("temperature");

    let values = xmlTemp[0].getElementsByTagName("value");
    let hourlyTemps = [];
    for(let i = 0;i < values.length; i++)  {
        let hourlyTemp = {'temp': values[i].innerHTML, 'label': ''};
        hourlyTemps[i] = hourlyTemp;
    }

    let timelayout = xmlTemp[0].attributes["time-layout"].value;

    let layouts = xmlDoc.getElementsByTagName("time-layout");
    for(let i = 0;i < layouts.length; i++)  {
        let layout_key = layouts[i].getElementsByTagName('layout-key');
        if (layout_key[0].innerHTML === timelayout) {

            let timestamps = layouts[i].getElementsByTagName("start-valid-time");
            for(let ii = 0;ii < timestamps.length; ii++)  {
                if (ii >= hourlyTemps.length)
                    break;

                let time_stamp = ''
                let date = new Date( timestamps[ii].innerHTML );
                let hr = date.getHours();
                if (hr <= 12) 
                    time_stamp = hr + "AM";
                else
                    time_stamp = (hr - 12) + "PM";
                
                hourlyTemps[ii]['label'] = time_stamp;
            }
        }
    }

    return hourlyTemps
}

async function getForecastWx(id) {
    let ndfd_url = ' https://9xtm7lea39.execute-api.us-west-1.amazonaws.com/ndfdXMLclient.php?'
    let url_location = 'lat=39.9228&lon=-105.4048&product=time-series&'
    let url_products = 'temp=temp'

    let wx_url = ndfd_url + url_location + url_products
    console.log(wx_url)

    try {
        let res = await fetch(wx_url);
        reply =  await res.text();

        console.log(reply)

        console.log("===================================")
        console.log()        
        
        xmlDoc = parseXmlToJson(reply)
        jsonHourlyTemps = parseHourlyTemp(xmlDoc)

        console.log(jsonHourlyTemps)
        return null
    } catch (error) {
        console.log("error")
        console.log(error);
    }

    return null
}
