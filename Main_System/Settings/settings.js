//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
  

   //button "return" 
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click",function(){
     
      window.location.replace("/Main_System/Homepage2.0/homepage.html");
      });
 

  document.getElementById("reset").addEventListener("click",function(){
    if (confirm("Are you sure! This will delete everything")) {     
   

        localStorage.clear();

        //goes to main page
        window.location.replace("../../Startup_Setup/Basic_Info/basic_info.html");
        
   
    } 
    
  });


  document.getElementById("edit").addEventListener("click",function(){
    if (confirm("If you decide to edit timetable system it will reset your saved belltimes and subjects")) {
      window.location.replace("../../Startup_Setup/System_Initial_Load/System_Initial_Load.html");

    }
    
  });


});
