//validation
var validName = false;
var validDate = false;
var validHeight = false;
var users = [];
function validateNotEmpty(inputElement) {
    if (inputElement.value.trim().length === 0) {
        showError(inputElement.id);
        return;
    }
    hideError(inputElement.id);
    $("#vardas").css('border', '2px solid green')
    validName = true;
    if (validName && validDate && validHeight) {
        $("#regbutton").attr("disabled", false)
    }
}

function validateDate(inputElement) {

    elements = inputElement.value.split('-');
    var year = parseInt(elements[0]);
    var month = parseInt(elements[1]) - 1;
    var day = parseInt(elements[2]);

    var newdate = new Date(year, month, day);
    if (newdate.getDate() != day) {
        showError(inputElement.id);
        return;
    }
    if (newdate == "Invalid Date") {
        showError(inputElement.id);
        return;
    }
    var currentDate = new Date();
    //console.log(currentDate.getFullYear())
    if (newdate.getFullYear() == currentDate.getFullYear()) {
        showError(inputElement.id);
        return;
    }
    validDate = true;
    $("#data").css('border', '2px solid green')
    if (validName && validDate && validHeight) {
        $("#regbutton").attr("disabled", false)
    }
    hideError(inputElement.id);
}

function validateHeight(inputElement) {
    //console.log(parseInt(inputElement.value))
    if (parseInt(inputElement.value) <= 20 || isNaN(parseInt(inputElement.value))) {
        showError(inputElement.id);
        return;
    }
    hideError(inputElement.id);
    $("#ugis").css('border', '2px solid green')
    validHeight = true;
    if (validName && validDate && validHeight) {
        $("#regbutton").attr("disabled", false)
    }
}
//Errors

function showError(id) {
    $("#" + id + "Error").show();
}

function hideError(id) {
    $("#" + id + "Error").hide();
}

function register() {
    $("#zmoniuKiekis").value;
    var text = $("#zmoniuKiekis").text();
    var count = parseInt(text);
    addToList(count, $("#vardas").val(), $("#data").val(), $("#ugis").val())
    count++;
    addRegistrator();
    $("#zmoniuKiekis").text(count);
    $("#form").trigger("reset");
    $("#regbutton").attr("disabled", true)
    $("#ugis").css('border', '2px solid black')
    $("#data").css('border', '2px solid black')
    $("#vardas").css('border', '2px solid black')
    validName = false;
    validDate = false;
    validHeight = false;
}

function addRegistrator() {
    $("ol").append("<li>" + $("#vardas").val() + " " + $("#data").val() + " " + $("#ugis").val() + "</li>")
}

function remove() {
    $("#zmoniuKiekis").value;
    var text = $("#zmoniuKiekis").text();
    var count = parseInt(text);
    count = count-1;
    $("#zmoniuKiekis").text(count);
    var list = $("ol > li");
    var number = $("#numeris").val() - 1;
    if (number < list.length) {
        $("ol > li")[number].remove();
        $("#form1").trigger("reset");
    }
}

function addToList(idVar, nameVar, dateVar, heightVar) {
    users.push({ id: idVar, name: nameVar, date: dateVar, height: heightVar });
}

function drawTable(users) {
    for (let i = 0; i < users.length; i++) {
        var user = users[i];
        var newTr = $("<tr id=" + user.id + "> </tr>");
        newTr.append("<td>" + user.name + "</td>");
        newTr.append("<td>" + user.date + "</td>");
        newTr.append("<td>" + user.height + "</td>");
        $("#table").append(newTr);
    }
}

function clean() {
    $("#table tr").remove();
}

//api callai
var api = "https://jsonblob.com/api/jsonBlob/";
var getApi;
function initialize() {
    $("#status").text("");
    var data = JSON.stringify(users);

    $.ajax({
        url: api,
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $("#status").text(textStatus);
            responseId = jqXHR.getResponseHeader("x-jsonblob");
            getApi = api + responseId;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#status").text(textStatus);
            console.error(jqXHR);
            console.error(errorThrown);
        }
    });
    // localStorage.setItem("api", getApi);  
}

function deserialize() {
    //getApi = localStorage.getItem("api");
    if (getApi === undefined || getApi === "") {
        return;
    }

    $("#status").text("");
    $.get(getApi, function (data, textStatus, jqXHR) {
        $("#status").text(textStatus);
        if (textStatus === "success") {
            users = data;
            console.log(users[0].name)
            drawTable(users);
        }
    });
}