//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
  //sets default load page
   chrome.browserAction.setPopup({popup:"Startup_Setup/System_Initial_Load/System_Initial_Load.html"});
  
  
  //buttons for edit
  document.getElementById("basic").addEventListener("click",function()
  {
    localStorage["adjustments"] = "true";
    window.location.replace("../Basic_Info/basic_info.html");
  });  
 
  document.getElementById("timetable").addEventListener("click",function()
  {
    localStorage["adjustments"] = "true";
    window.location.replace("../Timetable_Info/timetable_info.html");
  });  
   document.getElementById("subjects").addEventListener("click",function()
  {
    localStorage["adjustments"] = "true";
    window.location.replace("../Subject_Info/subject_info.html");
  });  
 
 function join(value){
   value = value.split(",");
   result = "";

   for(var i = 0; i < value.length; i += 1){
     result += value[i] + ", ";
   }
   return result;
 }
 
 //loads information
 document.getElementById("firstname").innerHTML = "First Name: "+ localStorage["firstname"];
 document.getElementById("lastname").innerHTML = "Last Name: "+ localStorage["lastname"];
 document.getElementById("schoolname").innerHTML = "School Name: "+ localStorage["schoolname"];
 
 
 
 document.getElementById("timetablenames").innerHTML = "Timelines: "+ localStorage["timeline"];
 document.getElementById("periods").innerHTML = "Periods: "+ localStorage["periods"];
 
 document.getElementById("subjectslist").innerHTML = "Subject list: "+ join(localStorage["subjects"]);
 //setup code. This creates value "" for all the values in the extension.
 //this is needed as the fields display undefined as the value doesnt have a value.
 
  document.getElementById("next").addEventListener("click",function()
  {
    window.location.replace("../../Main_System/Homepage2.0/homepage.html");
  });   
 
});