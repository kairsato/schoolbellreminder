//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
  //sets default varaibles
  if(localStorage["subjects"] === "undefined" || localStorage["subjects"] === undefined || localStorage["subjects"] === "" ){
    localStorage["subjects"] = ["English"];
  }
  
  var subjects = localStorage["subjects"].split(",");
  //sets default load page
   chrome.browserAction.setPopup({popup:"/Startup_Setup/Subject_Info/subject_info.html"});

 
  function removesubjectlist(){
    var item;
    
    for(item in subjects){
      document.getElementById(subjects[item]).remove();  
    }
  }
  document.getElementById("whole").addEventListener("change",function()
  {
    localStorage["subjects"] = subjects;
  });
  //section to present subject list
  function subjectlistdisplay(){
    var item;
    
    for(item in subjects){
     document.getElementById("list").insertAdjacentHTML('beforeEnd',"<tr id='"+subjects[item]+"'><td>"+subjects[item]+"</td>");
    }
  }
  subjectlistdisplay();
  document.getElementById("add").addEventListener("click",function(){
    //appends value
    var item;
    var flag;
    
    for(item in subjects){
      if(subjects[item] === document.getElementById("name").value)
      {
        flag = "duplicates";
      }
      else if(document.getElementById("name").value >= 0){
        flag = "minium";
      }
    }
    
    switch(flag){
      case "duplicates":
         alert("Cannot have duplicates.");
        break;
      case "minium":
        alert("minium requirement of at least a single character");
        break;
      default:
        removesubjectlist();
        subjects.push(document.getElementById("name").value);
        alert("Added "+document.getElementById("name").value+" to subject list.");
        subjectlistdisplay();
      break;
    }
    localStorage["subjects"] = subjects;
    
  });

  document.getElementById("remove").addEventListener("click",function(){
    //appends value
    
    var item;
    var flag = "notfound";
    var position;
    
    for(item in subjects){
      if(subjects[item] === document.getElementById("name").value)
      {
        flag = "found";
        position = item;
        console.log(subjects[item]+position);
      }
      else if(document.getElementById("name").value >= 0){
        flag = "minium";
      }
    }
     switch(flag){
       case "found":
         if(subjects.length <= 1){
           alert("Cannot delete last subject on subject list.");
         }
         else{
         if(confirm("Are you sure you want to delete "+ subjects[position]+" from the subject list.")){
          removesubjectlist();
          subjects.splice(position,1); 
          subjectlistdisplay();
          
         }
         }
        break;
       case "minium":
        alert("No text entered.");
        break;
       case "notfound":
        alert("Cannot find "+subjects[position]+" within the subject list.");
        break;
     }
    
    localStorage["subjects"] = subjects;
  });
  
     
  //button "next" 
  //instruction: sends to next page "school info"
  document.getElementById("next").addEventListener("click",function(){
    localStorage["subjects"] = subjects;
      if(localStorage["adjustments"] === "true"){
        localStorage["adjustments"] = "false";
       window.location.replace("../System_Initial_Load/System_Initial_Load.html");
    }
    else
    {
     window.location.replace("../System_Initial_Load/System_Initial_Load.html");
    }
     });
     
  //button "back" 
  //instruction: sends to previous page "basic info"  
  document.getElementById("back").addEventListener("click",function(){
     window.location.replace("../Timetable_Info/timetable_info.html");
     });
     
   //if adjustments are made the buttons are either removed or changed
  if(localStorage["adjustments"] === "true")
  {
    document.getElementById("next").innerHTML = "Return";
    document.getElementById("back").remove();
  }  
});