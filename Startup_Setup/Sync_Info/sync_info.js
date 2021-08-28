//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
  //sets default load page
   chrome.browserAction.setPopup({popup:"/Startup_Setup/Sync_Info/sync_info.html"});

  
     
  //Checks whether colour is undefined
  if(localStorage["color"] === undefined || localStorage["color"] === "")
  {
    //set default colour values
    document.getElementById("color").value = "rgb(94, 173, 236)";
    localStorage["color"] = "rgb(94, 173, 236)";
  }
  //if not undefined load localstorage value
  else
  {
     document.getElementById("color").value = localStorage["color"];
  }
  
  //Loads style value to selection 
  switch(localStorage["style"])
  {
    case "none":
      document.getElementById("none").checked = true;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = false;
      break;
    case "original":
      document.getElementById("none").checked = false;
      document.getElementById("original").checked = true;
      document.getElementById("fullbackground").checked = false;
      break;
    case "fullbackground":
      document.getElementById("none").checked = false;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = true;
      break;
   //if none of the above set default value   
    default:
      localStorage["style"] = "none";
      document.getElementById("none").checked = true;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = false;
  }
  
  //saves all 2 inputs by "change listener"
  //change listener activates when a change appears in the radio and colour input boxes/buttons
  document.getElementById("whole").addEventListener("change",function()
  {
    
    var style = ["none","original","fullbackground"];
    for(var i = 0; i <=2 ; i = i + 1)
    {
      
      if(document.getElementById(style[i]).checked === true)
      {
        localStorage["style"] = style[i];
      }
    }
    localStorage["color"] = document.getElementById("color").value;
  });
  //button "next" 
  //instruction: sends to next page "school info"
  document.getElementById("next").addEventListener("click",function(){
      if(localStorage["adjustments"] === "true")
    {
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
     
     window.location.replace("../Basic_Info/basic_info.html");
     });
     
   //if adjustments are made the buttons are either removed or changed
  if(localStorage["adjustments"] === "true")
  {
    document.getElementById("next").innerHTML = "Return";
    document.getElementById("back").remove();
  }  
});