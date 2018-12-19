
const addresses = ["Saltoniškių 12, Vilnius",
"Kalvarijų 98, Vilnius",
"Didlaukio 47, Vilnius"]

const addressesWithCode = []; 

function sort(){
    addresses.forEach(address => getPostCode(address));
    console.log(addressesWithCode);
    
}

function show(){
    console.log("show");
    if (addresses.length == addressesWithCode.length) {
        addressesWithCode.sort((a,b) => parseInt(a.code) - parseInt(b.code));
        console.log(addressesWithCode);
        appendList();
    }
}

function getPostCode(address){
    sendGet(address).done((data) => (save(data))).fail((data)=>(errorOut(data)));
}

function sendGet(address){
    return $.get("https://postit.lt/data/?term=" + address, (data) => {});
}

function save(result){
    console.log(result);    
    addressesWithCode.push({code: result.data[0].post_code, address: result.data[0].address});
    show();   
}

function errorOut(data){
    console.error(data);
}

function appendList(){
    list = $("ul");
    console.log(list);
    addressesWithCode.forEach(element => list.append('<li><span>' + element.code+ '</span>-<span>' + element.address +'</span></li>'));
}
