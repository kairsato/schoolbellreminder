//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
    //sets default load page
  chrome.browserAction.setPopup({popup:"/Startup_Setup/Timetable_Info/timetable_info.html"});
  
  
  //Defaults set
  //timeline
   if(localStorage["timeline"] === undefined || localStorage["timeline"] === "undefined" || localStorage["timeline"] === "" ){
     localStorage["timeline"] = ["Day 1"];
   }
   //day selection
   if(localStorage["dayselection"] === undefined || localStorage["dayselection"] === "undefined" || localStorage["dayselection"] === "" ){
     localStorage["dayselection"] = ["True.True.True.True.True.False.False"];
   }
   if(localStorage["periods"] === undefined || localStorage["periods"] === "undefined" || localStorage["periods"] === ""){
     localStorage["periods"] = "6";
   }
   
  //Makes data avaliable to edit or predefined variables
  var timeline = localStorage["timeline"].split(",");
  var dayselection = localStorage["dayselection"].split(",");
  var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  var output = "";
  var section = 0;
  
  //functions
  function removedropdown(){
    var item = "";
    for(item in timeline){
      var x = document.getElementById(timeline[item]);
      x.remove(x.selectedIndex);  
    }
  }
  function variableupdate(){
    timeline = localStorage["timeline"].split(",");
    dayselection = localStorage["dayselection"].split(",");
  }
  
  function checking(selection){
    //checking selection boxes
    var descriptor = selection.split(".");
    for(var i =0; i <= 6; i += 1){
      if(descriptor[i] === "True" || descriptor[i] === true){
        document.getElementById(days[i]).checked = true;
      }
      else{
        document.getElementById(days[i]).checked = false;
      }
    }
  }
  function actionschange(box,position){
    if(document.getElementById(box).checked === true){
      output = finder();
      output[position] = "True";
      output = output.toString();
      output = output.replace(/,/g,".");
      dayselection[section] = output;
      localStorage["dayselection"] = dayselection;
    }
    else{
      output = finder();
      output[position] = "False";
      output = output.toString();
      output = output.replace(/,/g,".");
      dayselection[section] = output;
      localStorage["dayselection"] = dayselection;
    }
  }
  function finder(){
    var individualday = "";
    for(var i =0; i <= timeline.length; i += 1){
      if(timeline[i] === document.getElementById("dropdown").value){
        section = i;
        return dayselection[i].split(".");
      }
    }
  }
     //Presets Dropdown menu
  function dropdowndisplay(){
    var item = 0;
    for(item in timeline){
     document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option id='"+timeline[item]+"' value='"+timeline[item]+"'>"+timeline[item]+"</option>");
    }
  }
  function displayperiods()
  {
    document.getElementById("periods").value = parseInt(localStorage["periods"]); 
  }
  //display menus
  dropdowndisplay();
  displayperiods();
  
//listener for each checkbox
  document.getElementById("Mon").addEventListener("change",function(){
    actionschange("Mon",0);
  });
  document.getElementById("Tue").addEventListener("change",function(){
    actionschange("Tue",1);
  });
  document.getElementById("Wed").addEventListener("change",function(){
    actionschange("Wed",2);
  });
  document.getElementById("Thu").addEventListener("change",function(){
    actionschange("Thu",3);
  });
  document.getElementById("Fri").addEventListener("change",function(){
    actionschange("Fri",4);
  });      
  document.getElementById("Sat").addEventListener("change",function(){
    actionschange("Sat",5);
  });      
  document.getElementById("Sun").addEventListener("change",function(){
    actionschange("Sun",6);
  });  
//listener for period box
  document.getElementById("periods").addEventListener("change",function(){
    if(document.getElementById("periods").value >= 17)
    {
      alert("Periods cannot exceed the maxium of 16");
      document.getElementById("periods").value = 16; 
    }else if(document.getElementById("periods").value <= 0)
    {
      alert("Periods cannot fall below the minimum of 1");
      document.getElementById("periods").value = 1; 
    }
    localStorage["periods"] = document.getElementById("periods").value; 
  });
    
   //buttons for presets
  document.getElementById("2week").addEventListener("click",function(){
    localStorage["timeline"] = ["Week 1","Week 2"];
    localStorage["dayselection"] = ["True.True.True.True.True.False.False","True.True.True.True.True.False.False"];
    localStorage["periods"] = "6";
    removedropdown();
    variableupdate();
    dropdowndisplay();
    displayperiods();
  });
  document.getElementById("6day").addEventListener("click",function(){
    localStorage["timeline"] = ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6"];
    localStorage["dayselection"] = ["True.True.True.True.True.False.False","True.True.True.True.True.False.False","True.True.True.True.True.False.False","True.True.True.True.True.False.False","True.True.True.True.True.False.False","True.True.True.True.True.False.False"];
    localStorage["periods"] = "7";
    removedropdown();
    variableupdate();
    dropdowndisplay();
    displayperiods();
  });
  document.getElementById("nochange").addEventListener("click",function(){
    localStorage["timeline"] = ["Week"];
    localStorage["dayselection"] = ["True.True.True.True.True.False.False"];
    localStorage["periods"] = "6";
    removedropdown();
    variableupdate();
    dropdowndisplay();
    displayperiods();
  });
  

  
  //actions for button of add and remove
  document.getElementById("add").addEventListener("click",function(){
    var contents = document.getElementById("name").value;
    var item = 0;
    flag = false;
    hold = "";
    for(item in timeline){
      if(timeline[item] == contents){
        flag = true;
      }
    } 
    if(flag){
      confirm("Name Has been taken");
    }
    else{
      if(contents.length >= 1){
        timeline.push(contents);
        dayselection.push("False.False.False.False.False.False.False");
        localStorage["dayselection"] = dayselection;
        localStorage["timeline"] = timeline;
        //adds elements towards the drop down menu
        document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option id='"+contents+"' value='"+contents+"'>"+contents+"</option>");
        confirm(contents+" has been added to timeline");
      }
      else{
        confirm("Name requires at least 1 character.");
      }
    }
    flag = false;
    hold = "";
  });
  
  document.getElementById("remove").addEventListener("click",function(){
    var contents = document.getElementById("name").value;
    var flag = false;
    var item = "";
    var position = 0;
    for(item in timeline){
       if(timeline[item] == contents){
        flag = true;
        position = item;
      }
    }
    if(flag || timeline.length > 1){
      if(timeline.length <= 1){
        confirm("You cannot delete the last timeline");
      }
      else{
        if(confirm("Are you sure you want to delete the timeline?")){
          var x = document.getElementById(contents);
          x.remove(x.selectedIndex);
          console.log(timeline+position);
          timeline.splice(position,1);
          console.log(timeline);
          dayselection.splice(position,1);
          localStorage["timeline"] = timeline;
        }
      }
    }
    else{
      confirm(contents+" doesn't exist");
    }
  });
  


  //find position of timeline and checks the boxes on startup
  for(var a =0; a <= timeline.length; a += 1){
    if(timeline[a] === document.getElementById("dropdown").value){
      checking(dayselection[a]);
    }
   }
   
   //find position of timeline and checks the boxes on change
  document.getElementById("dropdown").addEventListener("change",function(){
    for(var i =0; i <= timeline.length; i += 1){
      timeline = localStorage["timeline"].split(",");
      if(timeline[i] === document.getElementById("dropdown").value){
        checking(dayselection[i]);
      }
    }
  });
  
  //button "next" 
  //instruction: sends to next page "school info"
  document.getElementById("next").addEventListener("click",function(){
     //systemchange listener is enable as the user is now leaving the page
      if(localStorage["adjustments"] === "true")
    {
       localStorage["adjustments"] = "false";
       window.location.replace("../System_Initial_Load/System_Initial_Load.html");
    }
    else
    {
      window.location.replace("../Subject_Info/subject_info.html");
    }
  });
     
  //button "back" 
  //instruction: sends to previous page "theme info"  
  document.getElementById("back").addEventListener("click",function(){
    window.location.replace("../Theme_Info/theme_info.html");
  });
      //if adjustments are made the buttons are either removed or changed
  if(localStorage["adjustments"] === "true")
  {
    document.getElementById("next").innerHTML = "Return";
    document.getElementById("back").remove();
  }
});