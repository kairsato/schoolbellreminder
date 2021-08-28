//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function() 
{
  document.getElementById("return").addEventListener("click",function(){
      window.location.replace("/Main_System/Homepage2.0/homepage.html");
  });
    //button "Tutorial"
  //instructions: sends user to the official school bell reminder website for tutorials
  document.getElementById("tutorial").addEventListener("click",function()
  {
   window.location.replace("../Settings/settings.html");
   
  });
   //button "rate"
  //instructions: sends user to the rating section on chrome web store
  document.getElementById("quickactions").addEventListener("click",function()
  {
     window.location.replace("../QuickActions/quickactions.html");
  });
     //button "Bugs"
  //instructions: sends user to the iframe that displays a forum to input bugs
  document.getElementById("bugs").addEventListener("click",function()
  {
    if(navigator.onLine)
    {
     window.location.replace("../Bugs/bugs.html");
    }
    else
    {
     alert("You cannot sumbit bugs while you are offline.");
    }
      
  });
  //button "Homework"
  //instructions: sends user to the homework page
  document.getElementById("homework").addEventListener("click",function()
  {
      window.location.replace("../Homework/homework.html");
  });
  //button "Bell Times"
  //instructions: sends user to the subject page
  document.getElementById("belltimes").addEventListener("click",function()
  {
      window.location.replace("../BellTime/belltime.html");
  });
  //button "sync"
  //instructions: sends user to the sync page
  document.getElementById("sync").addEventListener("click",function()
  {
    alert("Syncing is still in development and will be functionable in the next update");
      window.location.replace("../Sync/sync.html");
  });
  //button "subject"
  //instructions: sends user to the subject page
  document.getElementById("subject").addEventListener("click",function()
  {
      window.location.replace("../Subject/subject.html");
  });
   //button "assignments"
  //instructions: sends user to the assignment page
  document.getElementById("assignment").addEventListener("click",function()
  {
      window.location.replace("../Assignment/assignments.html");
  });
  //button "about"
  //instructions: sends user to the about page
  document.getElementById("about").addEventListener("click",function()
  {
      window.location.replace("../About/about.html");
  });
});