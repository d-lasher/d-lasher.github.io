

var jsonCurrentWx = null

function getCurrentWx() {
    if (jsonCurrentWx == null)
        return null
    return jsonCurrentWx.Item.wx
}

async function fetchCurrentWx(id) {
    let wx_url = 'https://efd6n53bol.execute-api.us-west-1.amazonaws.com/wx'
    try {
        let res = await fetch(wx_url);
        jsonCurrentWx = await res.json()
        return  jsonCurrentWx;
    } catch (error) {
        console.log("error")
        console.log(error);
    }

    return null
}