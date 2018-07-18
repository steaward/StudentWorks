// LOCAL
let prefix = "";

// PRODUCTION
//let prefix = "http://myvmlab.senecacollege.ca:6193";

let prjUrl = prefix + "/api/getAllProjectsAdmin";
let userUrl = prefix + "/api/getAllUsers";
let aprUrl = prefix + "/api/approveProject/";
let dwnUrl = prefix + "/api/takedownProject/";
let serverAdm = prefix + "/api/serverAdmin";
let setAdmin = prefix + "/api/setAdmin/";
let unsetAdmin = prefix + "/api/unsetAdmin/";
let adminLog = prefix + "/api/getAdminLog";

// DATA
let allProjects = "";
let allUsers = "";
let currentUserName = "";

$(document).ready(() => {
    if ($("#userType").text() != "Admin") {
        //alert("Opps, how did we get here?");  // SET IN PRODUCTION
        //window.location.replace("/"); // Extra security check
    }

    renderUserMenu(); // function declaration is in /header/username.js

    // Title
    $("#pageTitleID").html("Administration");

    // MENU ##
    renderLeft();

    // BODY ##
    $.getJSON(prjUrl, (data) => {
        allProjects = data;
        renderRight();
        live();
        setactiveLink("#aprPrj");
    });

    $.getJSON(userUrl, (data) => {
        allUsers = data;

        // Getting current user name
        if ($("#userType").text() == "Visitor") {
            currentUserName = "Unauthenticated";
        } else {
            $.each(allUsers, (k, v) => {
                if (v.userID == $("#userID").text()) {
                    currentUserName = v.firstName;
                }
            });
        }
    });

});

// MENU ---------------------------
function renderLeft() {
    let linksHtml = "" +
        "<div class='btn-group'>" +
        "  <a class='btn text-right'id='aprPrj'>Live Projects</a><br/>" +
        "  <a class='btn text-right'id='penPrj'>Pending Projects</a><br/>" +
        "  <a class='btn text-right'id='allUsr'>Contributors</a><br/>" +
        "  <a class='btn text-right'id='term'>Terminal</a><br/>" +
        "  <a class='btn text-right'id='logs'>Logs</a><br/>" +
        "</div>";

    $("#div1").html(linksHtml);

    // Event handlers   
    $("#aprPrj").click(() => {
        $("#div2").empty();
        live();
        setactiveLink("#aprPrj");
    });

    $("#penPrj").click(() => {
        $("#div2").empty();
        pending();
        setactiveLink("#penPrj");
    });

    $("#allUsr").click(() => {
        $("div2").empty();
        users();
        setactiveLink("#allUsr");
    });

    $("#term").click(() => {
        $("#div2").empty();
        terminal();
        setactiveLink("#term");
    });

    $("#logs").click(() => {
        $("#div2").empty();
        logs();
        setactiveLink("#logs");
    });

}

function setactiveLink(tag) {
    var tags = ["#aprPrj", "#penPrj", "#allUsr", "#netw", "#logs", "#term"];

    $.each(tags, (k, v) => {
        if (v == tag) {
            $(tag).css("color", "black");
        } else {
            $(v).css("color", "");
        }
    });
}

// BODY ---------------------------
function live() {
    let tableHtml = "<div id='TT'>List of projects on display</div>" +
        "<table class='table'>" +
        "  <thead class='thead-light'><tr>" +
        "    <th scope='col'></th>" +
        "    <th scope='col'>Title</th>" +
        "    <th scope='col'>Submitted by</th>" +
        "    <th scope='col'>Date</th>" +
        "    <th scope='col'></th>" +
        "</tr></thead>";

    let tableGuts = "";
    $.each(allProjects, (key, value) => {
        if (value.status == "approved") {
            let date = value.creationDate.substring(0, 4);
            let id = value.projectID;

            tableGuts += "<tr>" +
                "<td><a href='/" + value.ImageFilePath + "'><img src='/images/icon2.png' id='im'/></a></td>" +
                "<td><a href='/projectPage/?id=" + value.projectID + "'>" + value.title + "</a></td>" +
                "<td>user</td>" +
                "<td>" + date + "</td>" +
                "<td><a href='#' onclick='takedownPrj(" + id + ",\"" + value.title + "\")'>" +
                "<img id='im2' src='/images/cancel.png'/><a>" +
                "</tr>";
        }
    });
    tableHtml += tableGuts + "</table>";

    $("#div2").html(tableHtml);
    return;
}

function pending() {
    let tableHtml = "<div id='penPrjTitle'>List of projects waiting for approval</div>" +
        "<table class='table'>" +
        "  <thead class='thead-light'><tr>" +
        "    <th scope='col'></th>" +
        "    <th scope='col'>Title</th>" +
        "    <th scope='col'>Submitted by</th>" +
        "    <th scope='col'>Date</th>" +
        "    <th scope='col'></th>" +
        "</tr></thead>";

    let tableGuts = "";
    $.each(allProjects, (key, value) => {
        if (value.status == "pending") {
            let date = _getDateApr(value.creationDate);
            let id = value.projectID;

            tableGuts += "<tr>" +
                "<td><a href='/" + value.ImageFilePath + "'><img src='/images/icon2.png' id='im'/></a></td>" +
                "<td><a href='/projectPage/?id=" + value.projectID + "'>" + value.title + "</a></td>" +
                "<td>user</td>" +
                "<td>" + date + "</td>" +
                "<td><a href='#' onclick='approvePrj(" + id + ",\"" + value.title + "\")'><img id='im2' src='/images/ok.png'/><a>";
            "</tr>";
        }
    });

    if (tableGuts == "") {
        tableHtml += "<tr ><td colspan='5' id='emptyTable'>No pending projects</td></tr>";
    }
    tableHtml += tableGuts + "</table>";

    $("#div2").html(tableHtml);
    return;
}

function users() {
    let tableHtml = "<div id='usrTitle'>All registered users</div>" +
        "<table class='table'>" +
        "  <thead class='thead-light'><tr>" +
        "    <th scope='col'>Name</th>" +
        "    <th scope='col'>Program</th>" +
        "    <th scope='col'>Email</th>" +
        "    <th scope='col'>Since</th>" +
        "    <th scope='col'></th>" +
        "</tr></thead>";

    let tableGuts = "";
    $.each(allUsers, (key, value) => {
        let date = _getDate(value.registrationDate);
        let name = value.firstName + " " + value.lastName;

        if (value.userType == "Admin") {
            tableGuts += "<tr style='color:#b01212; font-weight:600;'>";
        } else {
            tableGuts += "<tr>";
        }

        tableGuts += "" +
            "<td>" + name + "</td>" +
            "<td>" + value.program + "</td>" +
            "<td>" + value.email + "</td>" +
            "<td>" + date + "</td>";

        if (value.userType == "Admin") {
            tableGuts += "<td class='crud' style='opacity:0;'>" +
                "<a href='#' onclick='removeAdmin(\"" + value.userID + "\",\"" + name + "\")'>" +
                "<img class='setAdmin' src='/images/remove.png'/></td>";
        } else {
            tableGuts += "<td class='crud' style='opacity:0;'>" +
                "<a href='#' onclick='addAdmin(\"" + value.userID + "\",\"" + name + "\")'>" +
                "  <img class='setAdmin' src='/images/addAdmin.png'/>" +
                "</a></td>";
        }

        tableGuts += "</tr>";

    });
    tableHtml += tableGuts + "</table>";
    $("#div2").html(tableHtml);

    $('.crud').hover(function () {
        $(this).fadeTo(1, 1);
    }, function () {
        $(this).fadeTo(1, 0);
    });
    return;
}

function addAdmin(id, name) {
    if (confirm(`Are you sure you want to give ADMIN rights to ${name} ?`)) {
        $.get(setAdmin + id, (data) => {
            if (data == "changed") {
                $.getJSON(userUrl, (data) => {
                    allUsers = data;
                    users();
                    setactiveLink("#allUsr");
                    var log = currentUserName + " approved \"" + name + "\"" + " as an Admin on " + _getDateApr(new Date());
                    logMsg(log);
                });
            } else {
                alert("Server is unable to process request at this time");
            }
        });
    }
}

function removeAdmin(id, name) {
    if (confirm(`Are you sure you want to remove ADMIN rights from ${name}?`)) {
        $.get(unsetAdmin + id, (data) => {
            if (data == "changed") {
                $.getJSON(userUrl, (data) => {
                    allUsers = data;
                    users();
                    setactiveLink("#allUsr");
                    var log = currentUserName + " removed Admin rights from \"" + name + "\"" + " on " + _getDateApr(new Date());
                    logMsg(log);
                });
            } else {
                alert("Server is unable to process request at this time");
            }
        });
    }
}

function terminal() {
    let html = "<div>";

    html += "" +
        "<form action='/term' method='GET'>" +
        "  <label for='cmd' id='cmcLbl'>Shell:</label>" +
        "  <input id='cmd' type='text' name='cmd' autocomplete='off'>" +
        "  <input type='submit' hidden>" +
        "</form>" +
        "<div id='termRes'></div>";

    html += "</div";
    $("#div2").html(html);


    $("#cmd").focus();
    $("form").on("submit", terminalSubmit);
    function terminalSubmit(event) {
        event.preventDefault();

        let cmd = $("#cmd").val();
        if (cmd == "clear" || cmd == 'cl') {
            $("#termRes").empty();
            $("#cmd").val("");
            $("#cmd").focus();
            return;
        }

        $("#cmd").val("");

        $.get("/term/" + cmd, (data) => {
            let html = "<strong>$" + currentUserName + ":<span style='color:green;'> " + cmd + "</span></strong></br><span id='termText'>" + data + "</span><br>";
            $("#termRes").prepend(html);
            $("#cmd").focus();
        });
    }
}

function logs() {
    $.getJSON(adminLog, (data) => {
        let logHtml = "" +
            "<div id='logTitle'>Admin logs</div>" +
            "<table class='table'>" +
            "  <thead class='thead-light'><tr>" +
            "    <th scope='col'>Record</th>" +
            "    <th scope='col'>Hash</th>" +
            "</tr></thead>";

        let tableGuts = "";

        $.each(data, (k, v) => {
            
            //skipping first records(StudentWorks) 
            //and last record which is newline '\n'
            if(k == 0 || k == (data.length-1))
                return true;

            record = v.split(":");
            tableGuts += "<tr>" +
                "<td>" + record[0] + "</td>" +
                "<td>" + record[1] + "</td>" +
                "</tr>";
        });

        logHtml += tableGuts + "</table>";
        $("#div2").html(logHtml);
    });
}

function logMsg(event) {
    $.get("/logger/" + event, (data) => {
        if (data == "fail")
            console.log("Admin log message could not be created");
    });
}

function approvePrj(id, name) {
    $.get(aprUrl + id, (data) => {
        if (data == "changed") {
            $.get(prjUrl, (data) => {
                allProjects = data;
                $("#div2").empty();
                pending();
                var log = currentUserName + " approved \"" + name + "\"" + " on " + _getDateApr(new Date());
                logMsg(log);
            });
        } else {
            alert("Server is unable to process request at this time");
        }
    });
    return false;
}

function takedownPrj(id, name) {
    $.get(dwnUrl + id, (data) => {
        if (data == "changed") {
            $.get(prjUrl, (data) => {
                allProjects = data;
                $("#div2").empty();
                live();
                var log = currentUserName + " took down \"" + name + "\"" + " on " + _getDateApr(new Date());
                logMsg(log);
            })
        } else {
            alert("Server is unable to process request at this time");
        }
    });
    return false;
}

// STATS --------------------------
function renderRight() {
    $.get(serverAdm, (data) => {

        let size = data.match(/[0-9]{1,}/g);
        let git = data.split('\n')[1];
        let prjNum = allProjects.length;
        let usrNum = allUsers.length;

        let statHtml = "" +
            "<div class='panel panel-primary'>" + // Storage space Pane
            "  <div class='panel-body'>" + size + " MB" +
            "    <span class='glyphicon glyphicon-hdd' id='storage'></span>" +
            "  </div>" +
            "</div>" +
            "<div class='panel panel-primary'>" + // Projects and User pages
            "  <div class='panel-body'>" +
            "     <div style='float:left;'><span  class='glyphicon glyphicon-folder-open'></span>" + " " + prjNum + "</div>" +
            "     <div style='float:right;'><span  class='glyphicon glyphicon-user'></span>" + " " + usrNum + "</div>" +
            "  </div>" +
            "</div>" +
            "<div class='panel panel-primary'>" + // Git branch
            "  <div class='panel-body' id='gitBody'>" +
            "     <div style='float:left; width:45%;'><img id='gitIm' src='/images/git.png' /></div>" +
            "     <div style='float:right; width:55%;'>" + git + "</div>" +
            "  </div>" +
            "</div>" +
            "<div class='panel panel-primary'>" + // Blank
            "  <div class='panel-body' id='emptyPanel'></div>" +
            "</div>" +
            "<canvas id='myChart' width='400' height='400'></canvas>";

        $("#div3").html(statHtml);
    });
}

// HELPERS -----------------------
function _getDateApr(dt) {
    let date = new Date(dt);
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + months[date.getMonth()];
}

function _getDate(dt) {
    let date = new Date(dt);
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    year = date.getFullYear() + "";
    return months[date.getMonth()] + " " + year;
}