var events = [];
$(document).ready(createCalendar(new Date()));
var calendarDate;
const listItemName = "listItem"
//calendar

function createCalendar(monthDate) {
    monthDate.setDate(1)
    calendarDate = monthDate;
    var startingWeekDay = monthDate.getDay();
    var calendar = $("#cal");
   
    if (startingWeekDay == 0) // Sunday 
        {startingWeekDay = 7;}
    startingWeekDay = startingWeekDay -1;
    var row;
    var monthDays = daysInMonth(monthDate);
    for (let i=0,j=1; i < monthDays+startingWeekDay; i++)  {
        if (i % 7 === 0) {
            row = $("<tr/>");
        }
        calendar.append(row);
        if (i < startingWeekDay) {
            row.append($("<td/>")) 
        } else {
            row.append($("<td id=\"td"+j +"\">"+ (j++)+"</td>"));;
        }
    }
    calendar.append(row);
}

function daysInMonth(date) {
    return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
}

function addEvent(idVar,nameVar, dateVar, numberVar){
    events.push({id:idVar, name:nameVar, date:dateVar, number:numberVar});
}

function findEventById(id){
    id = id.replace(listItemName,"");
    //console.log(id);
   // console.log(events);
    return events.find(event => event.id == id);
}

function findEventIndexById(id){
    id = id.replace(listItemName,"");
    return events.findIndex(event => event.id == id);
}

function removeEvent(id) {
    var event = findEventById(id);
    var date = event.date;
    events.splice(findEventIndexById(id), 1);
    redrawDate(date);
}

function updateEvent(id, name, date, number) {
    let event = findEventById(id);
    let oldDate = event.date;
    event.name = name;
    event.date = date;
    event.number = number;
    redrawDate(oldDate);
    redrawDate(date);
}

function drawEvents(){
    for (let i = 0; i< events.length; i++) {
        var event = events[i]   
        date = parseDate(event.date);
        if (date.getMonth() === calendarDate.getMonth() && date.getYear() === calendarDate.getYear()){
            addEventStyle($("#td" + date.getDate()), event);
        }
    }
}

function addEventStyle(element, event){
    element.css("border-color","rgb(0, 95, 74)") 
    let list = element.children().filter("ul");
    if (list.length === 0) {
        list = $('<ul class="tooltip"/>');
        element.append(list);
    }
    list.append($("<li>" + event.name + "</li>"));
}

function redrawDate(date){
    jsDate = parseDate(date);
    if (jsDate.getMonth() !== calendarDate.getMonth() || jsDate.getYear() !== calendarDate.getYear()){
       // console.log("no");
        return;
    }
    let td = $("#td" + jsDate.getDate());
    td.removeAttr("style");
    td.children().remove();
    for (let i = 0; i< events.length; i++) {
        let event = events[i];
        if (event.date === date) {   
            addEventStyle(td, event);
        } 
    }
}

function clearCalendar(){
    let td = $("td");
    td.removeAttr("style");
    td.children().remove();
    $("#list").children().remove();
}

function parseDate(dateString){
    var elements = dateString.split("-");
    return new Date(elements[0],elements[1]-1,elements[2]);
}
// validation

function validateNotEmpty(inputElement) {
    if (checkIfEmpty(inputElement.value)) {
        showError(inputElement.id);
        return;
    }
    $("#pavadinimas").css('border', '2px solid green')
    hideError(inputElement.id);
    
}
function checkIfEmpty(input){
        return input.trim().length === 0
}

function validatePositiveInt(inputElement) {
    if (checkIfIntIsPositive(inputElement.value)){
        hideError(inputElement.id);
        $("#ivertinimas").css('border', '2px solid green')
        return;
    }
    showError(inputElement.id);
    
}

function checkIfIntIsPositive(input){
    return /^\+?[1-9][0-9]*$/.test(input)
}

function validateDate(inputElement) {
    if (checkIfDateIsValid(inputElement.value)) {
        hideError(inputElement.id);
    } else {
        showError(inputElement.id);
    }
}

function checkIfDateIsValid (input) {
    var elements = input.split("-");
    var year = parseInt(elements[0]);
    var month = parseInt(elements[1])-1;
    var day = parseInt(elements[2]);
    if (!year|| month === undefined || day === undefined || isNaN(year) || Number.isNaN(month) || Number.isNaN(day) || year < 1900 || year >9999 || month < 0 || month > 11 || day < 1 || day > 31){
        return false;
    }
    if ((day < 10 && elements[2].length > 1)|| elements[2].length > 2) {
        return false;
    }
    var newdate = new Date(year,month,day);
    if (newdate.getDate() != day) {
        return false;
    }
    $("#data").css('border', '2px solid green')
    return true;
} 

function showError(id){
    $("#" + id + "Error").show();
}

function hideError(id){
    $("#"+ id + "Error").hide();
}

//save logic

var idCounter = 0;

function save() {
    var name = $("#pavadinimas").val()
    var date = $("#data").val()
    var assessment = $("#ivertinimas").val();
    if (checkIfEmpty(name) || !checkIfDateIsValid(date) || !checkIfIntIsPositive(assessment)) {
        return;
    }
    if (editMode) {
        changeEditMode(false);
    }
    addEvent(idCounter,name, date, assessment);
    appendList(name, date, assessment);
    $("#darbuKiekis").value;
    var text = $("#darbuKiekis").text();
    var count = parseInt(text);
    count++;
    $("#darbuKiekis").text(count);
    idCounter++;
    redrawDate(date);
}

function appendList(name, date, assessment,id) {
    if (id === undefined) {
        id = idCounter;
    }
    var li =  $("<li id=\"" + listItemName + +id+"\" onClick=\"edit(this)\"></li>");
    li.append(createSpanWithText(date, "date" + id));
    li.append(createSpanWithText(name, "name" + id));
    li.append(createSpanWithText(assessment,"assessment" +id));
    $("#list").append(li);
}

function createSpanWithText(text, id){
    return $("<span id="+ id +">"+ text +"</span>")
}

// editLogic

var editMode  = false;
var editId;

function edit(li){
    $("#pavadinimas").val($("#"+li.id+ " > " + "span[id^=name]").text());
    $("#data").val($("#"+li.id+ " > " + "span[id^=date]").text());
    $("#ivertinimas").val($("#"+li.id+ " > " + "span[id^=assessment]").text());
    editId = li.id;
    changeEditMode(true);
}

function deleteNode(){
    if (editId === undefined) {
        return;
    }
    $("#"+editId).remove();
    $("#darbuKiekis").value;
    var text = $("#darbuKiekis").text();
    var count = parseInt(text);
    count=count-1;
    $("#darbuKiekis").text(count);
    changeEditMode(false);
    removeEvent(editId);
}

function saveEdit(){
    if (editId === undefined) {
        return;
    }
    var name = $("#pavadinimas").val()
    var date = $("#data").val()
    var assessment = $("#ivertinimas").val();
    if (checkIfEmpty(name) || !checkIfDateIsValid(date) || !checkIfIntIsPositive(assessment)) {
        return;
    }
    if (editMode) {
        changeEditMode(false);
    }
    $("#"+editId+ " > " + "span[id^=name]").text(name);
    $("#"+editId+ " > " + "span[id^=date]").text(date);
    $("#"+editId+ " > " + "span[id^=assessment]").text(assessment) ;
    updateEvent(editId,name,date,assessment);
}

function changeEditMode(boolean) {
    editMode = boolean;
    if (editMode) {
        $("#saveEditButton").show();
        $("#deleteButton").show();
    } else {
        $("#saveEditButton").hide();
        $("#deleteButton").hide();
    }
}

// saving(

var saveUri;
var apiUri = "https://jsonblob.com/api/jsonBlob/";
var responseId;
function updateUri(uri){
    saveUri = uri;
    showUri();
}
function showUri() {
    $("#uri").text(saveUri);
}


function initialize() {
    $("#status").text("");
    var data = JSON.stringify(events);
    $.ajax({
        url: apiUri,
        type:"POST",
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus, jqXHR){
            $("#status").text(textStatus);
            responseId = jqXHR.getResponseHeader("x-jsonblob");
            saveUri = apiUri  + responseId;
            showUri();
        },
        error: function (jqXHR, textStatus, errorThrown){
            $("#status").text(textStatus);
            console.error(jqXHR);
            console.error(errorThrown);
        }
    });
    
}

function serialize(){
    $("#status").text("");
    var data = JSON.stringify(events);
    $.ajax({
        url: saveUri,
        type: "PUT",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $("#status").text(textStatus);
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown){
            $("#status").text(textStatus);
            console.error(jqXHR);
            console.error(errorThrown);
        }
    });
}

function deserialize(){
    if (saveUri === undefined || saveUri === ""){
        return;
    }
    
    $("#status").text("");
    $.get(saveUri, function (data, textStatus, jqXHR) {
        $("#status").text(textStatus);
        if (textStatus === "Success!") {
            events = data;
            clearCalendar();
            idCounter = 0;
            events.forEach(event => {
                appendList(event.name, event.date, event.number, event.id);
                idCounter++;
            });
            drawEvents()
        }
    });
}