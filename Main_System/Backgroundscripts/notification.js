//Copyright 2016, Kai Sato, All rights reserved.



var interval = 100;
var timelefta = 20;
var caculated = Math.round(100/20);



 chrome.notifications.create("schoolbellremidnernotifcation",{
  type: "progress",
  title: "Bell Alert",
  message: "Coming Up: \n Subject: Maths Room: C6\nTime Remaining: "+timelefta+" sec ",
  iconUrl: "/Resources/Images/School_Bell_Reminder_Logo.png",
  progress: interval,
  priority: 2
            
          });
  function timeleft()
  {
    console.log(timelefta);
    if(timelefta > 0)
    {
    interval = timelefta - caculated;
    }
    else{
      chrome.notifications.clear("schoolbellremidnernotifcation");
    }
     var t = setTimeout(function()
    {
      timeleft();
       
    },1000);
    
    caculated = Math.round(timelefta /60*100);
    
    chrome.notifications.update("schoolbellremidnernotifcation",{
  type: "progress",
  title: "Bell Alert",
  message: "Coming Up: \n Subject: Maths Room: C6\nTime Remaining: "+timelefta+" sec ",
  iconUrl: "/Resources/Images/School_Bell_Reminder_Logo.png",
  progress: caculated,

  priority: 2

    });
    //*/
     
  }
    timeleft();
    /*
  chrome.notifications.create("schoolbellremindernotification1",{
  type: "progress",
  title: "Bell Alert",
  message: "Coming Up: \n Subject: Maths Room: C6\nTime Remaining: "+timelefta+" sec ",
  iconUrl: "/Resources/Images/School_Bell_Reminder_Logo.png",
  progress: timelefta,
  priority: 2
            
          }); */
