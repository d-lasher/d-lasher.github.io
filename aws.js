

var jsonCurrentWx = null
var jsonStationList = null

function getCurrentWx() {
    if (jsonCurrentWx == null)
        return null
    return jsonCurrentWx.Item.wx
}

async function fetchCurrentWx(id) {
    let wx_url = 'https://' + AwsServer + '/wx/' + id
    console.log(wx_url)
    try {
        let res = await fetch(wx_url);
        if (res.ok == false) 
            return null

        jsonCurrentWx = await res.json()
        
        console.log('fetchCurrentWx')
        console.log(jsonCurrentWx)

        return  jsonCurrentWx;
    } catch (error) {
        console.log("error")
        console.log(error);
    }

    return null
}

async function fetchStations() {
    let wx_url = 'https://' + AwsServer + '/stations'
    try {
        let res = await fetch(wx_url);
        if (res.ok == false) 
            return null

        jsonStationList = await res.json()
        return  jsonStationList;
    } catch (error) {
        console.log("error")
        console.log(error);
    }

    return null

}