//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () {
  //Makes data avaliable to edit or predefined variables
  var selection;
  var periods = parseInt(localStorage["periods"]);
  var timeline = localStorage["timeline"].split(",");
  var dayselection = localStorage["dayselection"].split(",");
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var position;
  var item;
  var loading = false;

  //removes tables
  function removetable() {
    for (var c = 1; c <= periods; c += 1) {
      var x = document.getElementById(c);
      x.remove(x);
    }
    document.getElementById("days").remove(document.getElementById("days"));
    document.getElementById("table").insertAdjacentHTML('beforeEnd', "<tr id='days'><td></td></tr>");
  }
  //inserts the dropdown element
  function dropdowndisplay() {
    var items;
    for (items in timeline) {
      document.getElementById("dropdown").insertAdjacentHTML('beforeEnd', "<option id='" + timeline[items] + "' value='" + timeline[items] + "'>" + timeline[items] + "</option>");
    }
  }
  //views current selection for dropdown menu        
  function displaystatus() {
    var item;
    for (item in timeline) {
      if (document.getElementById("dropdown").value === timeline[item]) {
        position = item;
        selection = timeline[item];
      }
    }
  }
  //counts how many collums are needed
  function weekcounter() {
    var c_dayselection = dayselection[position].split(".");
    var counter = 0;
    for (var i = 0; i <= c_dayselection.length - 1; i += 1) {
      if (c_dayselection[i] === "True") {
        counter += 1;
      }

    }
    return counter;
  }
  //displays the fieldbox elements within the tables   
  function fieldboxesdisplay() {
    
    var field;
    var c_dayselection = dayselection[position].split(".");
    console.log("reeaa"+ c_dayselection);
    for (var i = 0; i <= c_dayselection.length - 1; i += 1) {
      for (var c = 1; c <= periods; c += 1) {
        if (c_dayselection[i] === "True") {
          
          document.getElementById(c).insertAdjacentHTML('beforeEnd', "<td class='sub' id='" + c + "," + days[i] + "'><input class='sub' id='" + "s" + days[i] + "," + c + "' type='time'><input class='sub' id='" + "e" + days[i] + "," + c + "' type='time'></td>");
        }
      }
    }
  }
  //adds the titles for week days and periods
  function structure() {
    for (var a = 1; a <= periods; a += 1) {
      document.getElementById("table").insertAdjacentHTML('beforeEnd', "<tr  class='height external' id='" + a + "'><td class='left'>Period " + a + "</td></tr>");
    }
    //days of the week
    var c_dayselection = dayselection[position].split(".");
    for (var i = 0; i <= c_dayselection.length - 1; i += 1) {
      if (c_dayselection[i] === "True") {
        document.getElementById("days").insertAdjacentHTML('beforeEnd', "<td class='sub' id='" + days[i] + "'>" + days[i] + "</td>");
      }
    }
  }
  //loads current information

  //data required
  //dayselection
  //periods
  //timeline


  function load() {
    //displays the most current dropdown menu option
    displaystatus();
    var now;
    var box;
    var read = localStorage["belltimes"].split("|");
    var item;
    var positionofsave;
    for (item in read) {
      if (read[item] == timeline[position]) {
        positionofsave = item;

      }
    }

    read = read[parseInt(positionofsave) + 1].split("/");

    for (var i = 0; i <= read.length - 1; i += 1) {
      now = read[i].split(".");

      if (now.length >= 2) {

        document.getElementById("s" + days[parseInt(now[1])] + "," + now[0]).value = now[2];
      }
      if (now.length >= 3) {
        document.getElementById("e" + days[parseInt(now[1])] + "," + now[0]).value = now[3];
      }
    }

  }

  dropdowndisplay();
  displaystatus();
  structure();
  fieldboxesdisplay();
  load();

  function save() {
    //displays the most current dropdown menu option
    displaystatus();
    var item;
    var now;
    var altered;
    var read = localStorage["belltimes"].split("|");
    var positionofsave;
    for (item in read) {
      if (read[item] == timeline[position]) {
        positionofsave = item;
      }
    }
    console.log("reee"+timeline[position]);
    altered = read[parseInt(positionofsave) + 1].split("/");
    for (var i = 0; i < altered.length - 1; i += 1) {
      now = altered[i].split(".");
      now = now[0] + "." + now[1] + "." + document.getElementById("s" + days[now[1]] + "," + now[0]).value + "." + document.getElementById("e" + days[now[1]] + "," + now[0]).value;
      altered[i] = now;
    }
    altered = altered.join("/");
    read[parseInt(positionofsave) + 1] = altered;
    read = read.join("|");
    localStorage["belltimes"] = read;
  }



  //original layout
  //required
  //html id="whole"
  //body id="body"
  switch (localStorage["style"]) {
    case "none":
      //nothing
      break;
    case "original":

      var cal = parseInt(document.getElementById("whole").offsetWidth) / 100 * 16;
      cal = Math.round(cal);

      document.getElementById("whole").style.width = parseInt(document.getElementById("whole").offsetWidth) + cal + "px";
      document.getElementById("body").style.width = parseInt(document.getElementById("whole").offsetWidth) - cal + "px";
      //right side
      var div = document.createElement("div");
      div.id = "box1";
      div.style.width = "6%";
      div.style.height = "100%";
      div.style.background = localStorage["color"];
      div.style.position = "fixed";
      div.style.top = "0px";
      document.getElementById("whole").appendChild(div);

      //right side
      var div1 = document.createElement("div");
      div1.id = "box1";
      div1.style.width = "6%";
      div1.style.height = "100%";
      div1.style.background = localStorage["color"];
      div1.style.position = "fixed";
      div1.style.top = "0px";
      div1.style.float = "left";
      div1.style.right = "0px";
      document.getElementById("whole").appendChild(div1);
      document.getElementById("body").style.margin = "auto";
      break;
    case "fullbackground":
      document.getElementById("whole").style.background = localStorage["color"];
      break;
  }
  //Event Listeners

  //change in dropbox
  document.getElementById("dropdown").addEventListener("change", function () {
    loading = true;
    var item;
    for (item in timeline) {
      if (document.getElementById("dropdown").value === timeline[item]) {
        position = item;
        selection = timeline[position];
      }
    }
    removetable();
    displaystatus();
    structure();
    fieldboxesdisplay();
    load();
    loading = false;
  });

  //change in elements of the whole screen 'to save data on change'
  document.getElementById("info").addEventListener("change", function () {
    if(!loading){
      save();
    }
    
  });
  //button to return to homepage + save

  //button "return"
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click", function () {
    save();
    window.location.replace("/Main_System/Homepage2.0/homepage.html");
  });

});