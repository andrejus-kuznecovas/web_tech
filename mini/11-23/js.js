var dates = [
    {text: 'sometext', createdAt: '2001-01-01'},
    {text: 'sometasdext', createdAt: '2001-01-01'},
    {text: 'sometasdext', createdAt: '2001-01-01'},
    {text: 'sometexasdt', createdAt: '2001-01-01'},
    {text: 'sometextsad', createdAt: '2001-04-01'},
    {text: 'sometasdext', createdAt: '2001-01-01'},
    {text: 'sometasdext', createdAt: '2001-02-01'}
];

foreach
document.getElementById("notesList").innerHTML = "<li> " +  + "</li> "


function validate (date) {
    var a = document.getElementById("submitBtn").disabled = true;
    var elements = date.split("#");
    var year = parseInt(elements[0]);
    var month = parseInt(elements[1])-1;
    var day = parseInt(elements[2]);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day) || month < 0 || month > 11 || day<1 || day > 31){
        return false;
    }
    var day = parseInt(elements[2]);
    if (year === undefined || month === undefined || day === undefined) {
        return false; 
    }
    var newdate = new Date(year,month,day);
    if (newdate.getDate() != day) {
        return false;
    }
    var a = document.getElementById("submitBtn").disabled = false;
    console.log(newdate);
    console.log(newdate.getDate === day);
}
