//Copyright 2016, Kai Sato, All rights reserved.
//the main purpose of this js is if the system is changed manually via console or onmi box commands
//commands are that follows 
//localStorage["line"] = ""; to reset to basic info page.
//localStorage["line"] = "2week"; go to 2week cycle
//localStorage["line"] = "day"; day cycle which requires you to enter the number of days
//localStorage["line"] = "normal"; go to normal lines.
function override(){
  confirm("test");
}
function checker()
{
 if(localStorage["lastline"] === undefined)
 {
   localStorage["lastline"] = "normal";
 }
 if(localStorage["lastline"] != localStorage["line"])
 {
  
   if(localStorage["setupline"])
   {
     
     switch(localStorage["line"])
     {
       case "":
         console.log("Should print out confirm"); 
         if(confirm("System Line change detected. Do you wish to reset your line and be sent to the setup page. Press ok to continue or cancel to return to your orginal line. "))
         {
             window.location.replace("/Startup_Setup/Basic_Info/basic_info.html");
         }
         else
         {
           localStorage["line"] = localStorage["lastline"];
         }
        break;
     }
   }
 }

  
 localStorage["lastline"] = localStorage["line"];
  //function repeator 
    var t = setTimeout(function()
    {
      checker();
       
    },100);
}
checker();
