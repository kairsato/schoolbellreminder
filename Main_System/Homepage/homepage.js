//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
   var timeline = localStorage["timeline"].split(",");
    function dropdowndisplay(){
    var items;
    for(items in timeline){
     document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option id='"+timeline[items]+"' value='"+timeline[items]+"'>"+timeline[items]+"</option>");
    }
  }
  dropdowndisplay();
  if(localStorage["onlyonce"] === undefined)
  {
    localStorage["onlyonce"] = "done";

    
    
  }
 if(localStorage["instant"])
 {
   chrome.browserAction.setPopup({popup:"/Main_System/HomepageNA/homepagena.html",});
 }
 else
 {
   chrome.browserAction.setPopup({popup:"/Main_System/Homepage2.0/homepage.html",});
 }
  //Changes the default popup page for the extension.
  
   //homework
  var field = ["subject","notes","date"];
  var detectedhomework = false;
  var ran2 = 1;
  for(var f =1; f <= localStorage["homeworkcounter"]; f = f + 1)
   {
    for(var e = 0; e <= 2; e = e + 1)
    {
      
      
      if(localStorage["h"+field[e]+ f] === "" || localStorage["h"+field[e]+ f] === "undefined")
      {
         if(ran2 === h)
          {
            ran2 += 1;
          }
      }
      else
      {
        
         detectedhomework = true;
          if(ran2 === f)
          {
          document.getElementById("addhomework").insertAdjacentHTML('afterbegin','<tr id='+"h"+f+'><td id='+"h"+"s"+f+'></td><td id='+"h"+"n"+f+'></td><td id='+"h"+"d"+f+'></td></tr>');
          ran2 = ran2 + 1;
          }
          if(e === 2)
          {
          document.getElementById("h"+"d"+f).insertAdjacentHTML('afterbegin',daycaculate(localStorage["h"+field[2]+ f]));
          }
          if(e === 1)
          {
            
          document.getElementById("h"+"n"+f).insertAdjacentHTML('afterbegin',lengthover(localStorage["h"+field[1]+ f],16));
          }
          if(e === 0)
          {
           
            document.getElementById("h"+"s"+f).insertAdjacentHTML('afterbegin',lengthover(localStorage["h"+field[0]+ f],13));
          }
          
          
          
         
          
      }
     
    }
   }
   //print no assignments detected :D
   if(detectedhomework)
   {
        document.getElementById("addhomework").insertAdjacentHTML('afterbegin','<tr><td class="title2""colspan="1">'+"<u>"+'Subject'+"</u>"+'</td><td class="title2" colspan="1">'+"<u>"+'Notes'+"</u>"+'</td><td class="title2" colspan="1">'+"<u>"+'Days Left'+"</u>"+'</td></tr>');
   }
   else
   {
     //no assignments
      document.getElementById("addhomework").insertAdjacentHTML('afterbegin','<tr><td style="font-size: 17px;"colspan="3">No Homework Detected :)</td></tr>');
   }
   //assignment
  var fields = ["subject","notes","date"];
  var detectedassignment = false;
  var ran = 1;
  for(var h =1; h <= localStorage["assignmentcounter"]; h = h + 1)
   {
     
    for(var j = 0; j <= 2; j = j + 1)
    {
      
      
      if(localStorage["a"+fields[j]+ h] === "" || localStorage["a"+fields[j]+ h] === "undefined")
      {
         if(ran === h)
          {
            ran += 1;
          }
      }
      else
      {
        
         detectedassignment = true;
         console.log(ran+","+h);
          if(ran === h)
          {

          document.getElementById("addassignment").insertAdjacentHTML('afterbegin','<tr id='+"a"+h+'><td id='+"a"+"s"+h+'></td><td id='+"a"+"n"+h+'></td><td id='+"a"+"d"+h+'></td></tr>');
          ran = ran + 1;
          }
          if(j === 2)
          {
          document.getElementById("a"+"d"+h).insertAdjacentHTML('afterbegin',daycaculate(localStorage["a"+fields[2]+ h]));
          }
          if(j === 1)
          {
          document.getElementById("a"+"n"+h).insertAdjacentHTML('afterbegin',lengthover(localStorage["a"+fields[1]+ h],16));
          }
          if(j === 0)
          {
            console.log(j);
          document.getElementById("a"+"s"+h).insertAdjacentHTML('afterbegin',lengthover(localStorage["a"+fields[0]+ h],13));
          }
          
          
          
         
          
      }
     
    }
   }
   //print no assignments detected :D
   if(detectedassignment)
   {
     
        document.getElementById("addassignment").insertAdjacentHTML('afterbegin','<tr><td class="title2""colspan="1">'+"<u>"+'Subject'+"</u>"+'</td><td class="title2" colspan="1">'+"<u>"+'Notes'+"</u>"+'</td><td class="title2" colspan="1">'+"<u>"+'Days Left'+"</u>"+'</td></tr>');
   }
   else
   {
     //no assignments
      document.getElementById("addassignment").insertAdjacentHTML('afterbegin','<tr><td style="font-size: 17px;"colspan="3">No Assignments Detected :)</td></tr>');
   } 
   
   //
   function lengthover(word,lengtha)
   {
     if(word !==   undefined || word === ""){
     if(word.length >= lengtha)
     {
       return word.substring(0,(parseInt(lengtha)-1)) + "...";
     }
     else
     {
     return word;
     }
      return ""; 
     }
   }
   //format (year,month,day)
  function daycaculate(time)
   {
     if(time === "" || time === "undefined" || time === undefined)
     {
       //nothing
     }
     else
     {
     var month = parseInt(time.substring(5,7));
     var day = parseInt(time.substring(8,10));
     
      var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd;
} 

if(mm<10) {
    mm='0'+mm;
}

month2 = mm;
date =  dd;
month2 = parseInt(month2);
date = parseInt(date);
  var much = 0;
switch(month)
  {
    default:
      much = "error";
      break;
    case "01":
        much = 31;
      break;
    case "02":
        much = 28;
      break;
    case "03":
        much = 31;
      break;
    case "04":
        much = 30;
      break;
    case "05":
        much = 31;
      break;
    case "06":
        much = 30;
      break;
    case "07":
        much = 31;
      break;
       case "08":
        much = 31;
      break;
    case "09":
        much = 30;
      break;
    case "10":
        much = 31;
      break;
    case "11":
        much = 30;
      break;
    case "12":
        much = 31;
      break;
   
      
  }
  var result = "";
  
 console.log(month +","+month2);
if(parseInt(month) === parseInt(month2))
{
  
  result = parseInt(day) - parseInt(date);
  
}
else if(parseInt(month) - parseInt(month2) === 1)
{
  result = (dayfinder(parseInt(month2)) - date) + parseInt(day);
}
else
{
  
  var caculate1 = month - month2 -1;
  for(var a = 1; a <= caculate1; a = a + 1)
  {
    result = result + dayfinder(a + month2);
    result = parseInt(result);
  }
  
  result = parseInt(result)  + parseInt((dayfinder(month2) - date)) + day;
}
   if(result > 1)
   {
   return result + " Days Left";
   }
   else if(result ===1)
   {
     return "Due Tomorrow";
   }
   else if(result === 0)
   {
     return "Due Today";
   }
   else
   {
     return "Late by " + Math.abs(result) + " Days";
   }
  }
   }
function dayfinder(month)
{ var much = "";

  switch(month)
  {
    default:
      much = "error";
      break;
    case 1:
        much = 31;
      break;
    case 2:
        much = 28;
      break;
    case 3:
        much = 31;
      break;
    case 4:
        much = 30;
      break;
    case 5:
        much = 31;
      break;
    case 6:
        much = 30;
      break;
    case 7:
        much = 31;
      break;
       case 8:
        much = 31;
      break;
    case 9:
        much = 30;
      break;
    case 10:
        much = 31;
      break;
    case 11:
        much = 30;
      break;
    case 12:
        much = 31;
      break;
   
      
  }
  
  return much;
}


  //loads to default setting of status to true
if(localStorage["status"] === undefined)
{
   localStorage["status"] = "true"; 
   document.getElementById("enable").disabled = true; 
    document.getElementById("disable").disabled = false; 
     chrome.browserAction.setBadgeText({ text: " "});
  chrome.browserAction.setBadgeBackgroundColor({color:[0, 255, 0, 255]});
}
 //disable button if status true
  if(localStorage["status"] === "true")
  {
    
    document.getElementById("enable").disabled = true; 
    document.getElementById("disable").disabled = false; 
     chrome.browserAction.setBadgeText({ text: " "});
  chrome.browserAction.setBadgeBackgroundColor({color:[0, 255, 0, 255]});
    
  }
  else
  {
    chrome.browserAction.setBadgeText({ text: " "});
  chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 255]});
    document.getElementById("enable").disabled = false; 
    document.getElementById("disable").disabled = true; 
   
    
  }
  

  //create elements for 2 week cycle
  if(localStorage["line"] === "2week")
  {
    document.getElementById("2week").insertAdjacentHTML('beforeEnd',"<div id='whole'><div id='div1'><span class='size' style='margin-right:20px' class='display'>Week:</span><form action='' class='display'><select name='cars' id='weekselect' class='bigger'><option value='1'>1</option><option value='2'>2</option></select></form></div></div></div>");
    //sets the height of all the button on the homepage to 40px
     var button = ["subject","belltimes","assignment","homework","sync","tutorial","about","bugs","rate"];
  for(var b = 0; b <= 8;b = b+ 1)
  {
     document.getElementById(button[b]).style.height = "30px";
   
  }
  //listener for the week cycle system
   document.getElementById("weekselect").addEventListener("click",function()
   {
     document.getElementById("weekselect").value = localStorage["week"];
   });
  }


//button "enable"
//instructions: enables notifications and changes the badge on the icon to green.
 document.getElementById("enable").addEventListener("click",function()
 {
     localStorage["status"] = "true"; 
   document.getElementById("enable").disabled = true; 
    document.getElementById("disable").disabled = false; 
     chrome.browserAction.setBadgeText({ text: " "});
  chrome.browserAction.setBadgeBackgroundColor({color:[0, 255, 0, 255]});
 });
//button "disable"
//instructions: disables notifications and changes the badge on the icon to red.
  document.getElementById("disable").addEventListener("click",function()
  {
    localStorage["status"] = "false";
      document.getElementById("enable").disabled = false; 
    document.getElementById("disable").disabled = true; 
     chrome.browserAction.setBadgeText({ text: " "});
  chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 255]});
  });
  
  //code for the coming up section
   //based on the line type selects information suitable to generate the table   
   
  var hour = localStorage["time"].substring(0,2);
  var minute = localStorage["time"].substring(3,5);
  function check()
  {
  //for 2week only
  if(localStorage["line"] === "2week")
  {
    
  for(var d = 1; d <= localStorage["periods"]; d = d + 1)
  {
    
    //checks if the variable is undefined to stop any error occuring. This occurs as the substring cannot grab part of a string that is undefined
    if(localStorage["b"+localStorage["today"]+d+"p"] === "undefined" ||localStorage["b"+localStorage["today"]+d+"p"] === undefined || localStorage["b"+"r"+localStorage["today"]+d+"p"] === undefined|| localStorage["b"+"r"+localStorage["today"]+d+"p"] === 'undefined'||localStorage["b"+"r"+localStorage["today"]+d+"p"] === '' || localStorage["b"+localStorage["today"]+d+"p"] === '')
    {
     //checks the current time hour is equal to than the period hour.
    //checker the current time hour is greater or equal to the end time of the period hour
    }
    else 
    {
   
    if(hour >= localStorage["b"+localStorage["today"]+d+"p"].substring(0,2) && hour <= localStorage["b"+"r"+localStorage["today"]+d+"p"].substring(0,2) )
   {
     
    if(hour === localStorage["b"+localStorage["today"]+d+"p"].substring(0,2))
    {
      
      if(localStorage["b"+localStorage["today"]+d+"p"].substring(3,5) <= minute)
      {
        
        if(localStorage["b"+"r"+localStorage["today"]+d+"p"].substring(0,2) === hour)
        {
          
          if(localStorage["b"+"r"+localStorage["today"]+d+"p"].substring(3,5) >= minute)
          {
            
            infodisplay(d);
          }
        }
        else
        {
          
          infodisplay(d);
        }
      }
    }
    else
    {
      if(hour === localStorage["b"+"r"+localStorage["today"]+d+"p"].substring(0,2))
      {
        if(localStorage["b"+"r"+localStorage["today"]+d+"p"].substring(0,2))
        {
          
          infodisplay(d);
        }
      }
      else
      {
        
        infodisplay(d);
      }
    }
  }
  }
  }
  }
  var h = setTimeout(function()
    {
      check();
       
    },1000);
  }
  check();
  //this function caculates what to do with the information and display the correct order on the homepage 123
  function infodisplay(period)
  {
    
    var currentperiod = period;
    var calculation = localStorage["periods"] - currentperiod;
    localStorage["currentperiod"] = currentperiod;
    //checking that the current period is 2 periods from the last period in the system.
    if(calculation <= 2)
    {
      //display period numbers from current period and next 2
    document.getElementById("period1").innerHTML = parseInt(localStorage["periods"]) -2;
    document.getElementById("period2").innerHTML = parseInt(localStorage["periods"]) -1 ;
    document.getElementById("period3").innerHTML = localStorage["periods"];
    //display the subjects and the next 2
    document.getElementById("subject1").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+(parseInt(localStorage["periods"]) - 2)+"p"];
    document.getElementById("subject2").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+(parseInt(localStorage["periods"]) - 1)+"p"];
    document.getElementById("subject3").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+localStorage["periods"]+"p"];
    //display the Room and the next 2
    document.getElementById("room1").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+(parseInt(localStorage["periods"]) - 2)+"p"];
    document.getElementById("room2").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+(parseInt(localStorage["periods"]) - 1)+"p"];
    document.getElementById("room3").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+localStorage["periods"]+"p"];
    switch(calculation)
    {
      case 0:
    document.getElementById("time1").innerHTML = "Passed";
    document.getElementById("time2").innerHTML = "Passed";
    document.getElementById("time3").innerHTML = caculate(localStorage["b"+"r"+localStorage["today"]+(parseInt(localStorage["periods"]))+"p"]);
 
        break;
      case 1:
    document.getElementById("time1").innerHTML = "Passed";
    document.getElementById("time2").innerHTML = caculate(localStorage["b"+"r"+localStorage["today"]+(parseInt(localStorage["periods"]) - 1)+"p"]);
    document.getElementById("time3").innerHTML = caculate(localStorage["b"+localStorage["today"]+(parseInt(localStorage["periods"]))+"p"]);
 
        break;
      case 2:
    document.getElementById("time1").innerHTML = caculate(localStorage["b"+"r"+localStorage["today"]+(parseInt(localStorage["periods"]) - 2)+"p"]);
    document.getElementById("time2").innerHTML = caculate(localStorage["b"+localStorage["today"]+(parseInt(localStorage["periods"]) - 1)+"p"]);
    document.getElementById("time3").innerHTML = caculate(localStorage["b"+localStorage["today"]+(parseInt(localStorage["periods"]))+"p"]);
 
        break;
    }
       }
    else
    {
      
    //display period numbers from current period and next 2
    document.getElementById("period1").innerHTML = currentperiod;
    document.getElementById("period2").innerHTML = currentperiod + 1;
    document.getElementById("period3").innerHTML = currentperiod + 2;
    //display the subjects and the next 2
    document.getElementById("subject1").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+currentperiod+"p"];
    document.getElementById("subject2").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+(currentperiod + 1)+"p"];
    document.getElementById("subject3").innerHTML = localStorage["s"+localStorage["today"]+localStorage["weekselect"]+"d"+(currentperiod + 2)+"p"];
    //display the Room and the next 2
    document.getElementById("room1").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+currentperiod+"p"];
    document.getElementById("room2").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+(currentperiod + 1)+"p"];
    document.getElementById("room3").innerHTML = localStorage["s"+"r"+localStorage["today"]+localStorage["weekselect"]+"d"+(currentperiod + 2)+"p"];
    
    document.getElementById("time1").innerHTML = caculate(localStorage["b"+"r"+localStorage["today"]+localStorage["currentperiod"]+"p"]);
    document.getElementById("time2").innerHTML = caculate(localStorage["b"+localStorage["today"]+(parseInt(localStorage["currentperiod"]) + 1)+"p"]);
    document.getElementById("time3").innerHTML = caculate(localStorage["b"+localStorage["today"]+(parseInt(localStorage["currentperiod"]) + 2)+"p"]);
    

    //time remaining
   
       
    }
  }
  
 function caculate(time)
 {
   if(time === undefined || time === "" || time === "undefined")
   {
     return "Error";
   }
   else
   {
   var seconds = 60 -localStorage["time"].substring(6,8) -1;
   if(localStorage["shortday"] === "error")
   {
     return "Error";
   }
   else
   {
     
   
   if(time.substring(0,2) === localStorage["time"].substring(0,2))
   {
     
     var result = time.substring(3,5) - localStorage["time"].substring(3,5) - 1;
     if(result < 10 && result >= 0)
     {
       result = "0"+result  ;
     }
     if(seconds < 10 && seconds >= 0)
     {
       seconds = "0" + seconds;
     }
     if(result < 0)
     {
       return "Passed";
     }
     else
     {
     return "00" +":"+ result +":"+ seconds;
       
     }
   }
  
   else
   {
     var hours = time.substring(0,2) - localStorage["time"].substring(0,2)- 1;
     
  var minutes = parseInt(time.substring(3,5)) + (60-parseInt(localStorage["time"].substring(3,5)));
     
     while(minutes > 60)
     {
       
       hours = hours + 1;
       minutes = minutes - 60;
       
     }
     if(minutes < 10 && minutes >= 0)
     {
       minutes = "0" + minutes;
     }
     if(seconds < 10 && seconds >= 0)
     {
       seconds = "0" + seconds;
     }
     if(hours  < 10 && hours >= 0)
     {
       hours = "0"+ hours;
     }
     if(hours < 0)
     {
       return "Passed";
     }
     else if(minutes < 0)
     {
       return "Passed";
     }
     else
     {
     return hours + ":" + minutes + ":"+ seconds;
     }
   }
 }
   }
 }
   //updator
  function updator()
  {
     //get the time from background localStorage time and replaces it with the element id as time.
 document.getElementById("time").innerHTML = localStorage["time"]; 
 //get the today from background localstorage today and replaces it with the element today.
document.getElementById("today").innerHTML = localStorage["today"];
//get the month from background localstorage month and replaces it with the element date.
 document.getElementById("date").innerHTML = localStorage["datemonth"]; 
 
  
     //function repeator 
    var t = setTimeout(function()
    {
      updator();
       
    },100);
  }
  updator();
  
  //required
  //html id="whole"
  //body id="body"
  switch(localStorage["style"])
  {
    case "none":
      //nothing
      break;
    case "original":
      
      var cal = parseInt(document.getElementById("whole").offsetWidth)/100 * 16;
      cal = Math.round(cal);
      
      document.getElementById("whole").style.width = parseInt(document.getElementById("whole").offsetWidth)+ cal +"px";
      document.getElementById("body").style.width = parseInt(document.getElementById("whole").offsetWidth)- cal +"px";
      //right side
      var div = document.createElement("div");
      div.id = "box1";
      div.style.width = "6%";
      div.style.height = "100%";
      div.style.background = localStorage["color"];
      div.style.position = "fixed";
      div.style.top ="0px";
      document.getElementById("whole").appendChild(div);
      
        //right side
      var div1 = document.createElement("div");
      div1.id = "box1";
      div1.style.width = "6%";
      div1.style.height = "100%";
      div1.style.background = localStorage["color"];
      div1.style.position = "fixed";
      div1.style.top ="0px";
      div1.style.float = "left";
      div1.style.right = "0px";
      document.getElementById("whole").appendChild(div1);
      document.getElementById("body").style.margin = "auto";
      break;
    case "fullbackground":
      document.getElementById("whole").style.background = localStorage["color"];
      break;
  }
  //button "Tutorial"
  //instructions: sends user to the official school bell reminder website for tutorials
  document.getElementById("tutorial").addEventListener("click",function()
  {
   window.location.replace("../Settings/settings.html");
   
  });
   //button "rate"
  //instructions: sends user to the rating section on chrome web store
  document.getElementById("rate").addEventListener("click",function()
  {
     if(navigator.onLine)
    {
     window.open("https://chrome.google.com/webstore/detail/school-bell-reminder/emealmaijpbafmppjckifilmacnapfii/reviews?hl=en&authuser=2","_blank");

    }
    else
    {
     alert("You cannot rate the extension while you are offline.");
    }
      });
      
  if(localStorage["line"] === "2week")
  {
    document.getElementById("weekselect").value = localStorage["weekselect"];
    document.getElementById("weekselect").addEventListener("change",function()
    {
      localStorage["weekselect"] = document.getElementById("weekselect").value;
      document.getElementById("weekselect").value = localStorage["weekselect"];
    });
  }
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
  document.getElementById("whole").addEventListener("click",function(){
      window.location.replace("/Main_System/Homepage2.0/homepage.html");
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
    alert("The sync page is currently unavaliable");
      //window.location.replace("../Sync/sync.html");
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