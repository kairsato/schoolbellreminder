//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
  //time
  chrome.browserAction.setPopup({popup:"/Main_System/Homepage2.0/homepage.html",});
  function time(){
    
    document.getElementById("time").innerHTML = localStorage["time"];
    setTimeout(function(){ 
      time(); 
      infograb();
      
    }, 500);
  }
  time();
  
   var divide = localStorage["datemonth"].split(" ");
    switch(divide[1].substring(divide[1].length - 1)){
      case "1":
        divide[1] += "st";
        break;
      case "2":
        divide[1] += "nd";
        break;
      case "3":
        divide[1] += "rd";
        break;
      default:
        divide[1] += "th";
        break;
    }
    document.getElementById("date").innerHTML = divide[0].substring(0,3) + " "+divide[1] + ", "+ localStorage["today"] ;
  
  //event Listeners
  document.getElementById("options").addEventListener("click",function(){
      window.location.replace("../Options/options.html");
  });
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
  
  //selection the what he line is selected to
 var selection;
 var periods = parseInt(localStorage["periods"]);
 var timeline = localStorage["timeline"].split(",");
 var dayselection = localStorage["dayselection"].split(",");
 var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 var position;
 var item;
 

 document.getElementById("dropdown").addEventListener("change",function(){
   //document.getElementById("dropdown").value
 });
 //defines selection and position
  function dropdowndisplay(){
    var items;
    for(items in timeline){
     document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option id='"+timeline[items]+"' value='"+timeline[items]+"'>"+timeline[items]+"</option>");
    }
  }
 
    dropdowndisplay();
 function displaystatus(){
   var item;
     for(item in timeline){
       
      if(document.getElementById("dropdown").value === timeline[item])
      {
        
        
        position = item;
        selection = timeline[item];
      }
      
      
   }
  }
  
   displaystatus();
    //defines storage
  if(localStorage["subjectperiods"] === "" || localStorage["subjectperiods"] === "undefined" || localStorage["subjectperiods"] === undefined){
   var c_dayselection = dayselection[position].split(".");
    var counter = true;
    var day;
   for(var e = 0; e < c_dayselection.length; e +=1){
      for(var o =0;o < periods; o += 1){
        if(counter === true){
          localStorage["subjectperiods"] += days[o];
        }
        counter = false;  
       localStorage["subjectperiods"] +=  ",";
        if(c_dayselection.length -2  == o){
        counter = true;  
        }
        
       
   }
  
 }
 }




 //create fieldboxes
 function createsubjectdropdown(periods,timeline){
   var subjects = localStorage["subjects"].split(",");
   var output = "<select id='"+"selectionbox,"+periods+","+timeline+""+"'>";
   var item;
   for(item in subjects){
     output += "<option>"+subjects[item]+"</option>";
   }
   output += "</select>";
   return output;
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
      
      
      if(localStorage["a"+fields[j]+ h] === "" || localStorage["a"+fields[j]+ h] === "undefined" || localStorage["a"+fields[j]+ h] === undefined)
      {
         if(ran === h)
          {
            ran += 1;
          }
      }
      else
      {
        
         detectedassignment = true;
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

//end of old code

function quickactions(subject){
  var read = localStorage["quickaction"].split("|*splitwhole*|");
   var positionofsubject;
   var item;
   var temp;
  
  for(item in read){
    temp = read[item].split("|*split*|");
    if(temp[0] === subject){
      positionofsubject = parseInt(item);
    }
  }
 read = read[positionofsubject].split("|*split*|"); 
  document.getElementById("id").innerHTML = "Quick Actions "+"("+subject+")";
  for(var i =1; i<= parseInt(read[1]); i += 1){
    
    document.getElementById("button").insertAdjacentHTML('beforeEnd',"<a target='_blank' href="+read[i + i + 1]+"><button  >"+read[i + i]+"</button></a>");
  }  
}


//coming up section


//Doens't Work... XD
//finds the closest day
function closestday(){
  
var item;
var dayposition;
var belltimeposition; 
var read;
var raw;
var currentposition;
var currettime = localStorage["time"];
var belltimes = localStorage["belltimes"].split("|");

for(item in days){
  if(localStorage["today"] === days[item]){
    dayposition = item;
  }
}
//gets position(current line)

  displaystatus();
  for(item in belltimes){
    if(belltimes[item] == timeline[position]){
      
      belltimeposition = parseInt(item);
    }
  }
  read = belltimes[belltimeposition + 1].split("/");
  for(var i = 0; i < read.length-1; i += 1){
    raw = read[i];
    raw = raw.split(".");
  
    if(days[raw[1]] === localStorage["today"]){
      //raw2= 11:25
      //raw3= 12:14
      //curretntime=09:57
      
      //11===09 X
      //25 <= 57  Yes
      //OR
      //09 < 12 Yes
      //
      // 12==09 X
      //25>=57 X
      //Or
      //12>09 Yes
      
      
    //05:00
    //08:10
      //verifies hourly and minutly time postion
      
        //verifies the start belltimes with current time
      if(parseInt(raw[2].substring(0,2)) === parseInt(currettime.substring(0,2)) && parseInt(raw[2].substring(3,5)) <= parseInt(currettime.substring(3,5)) || parseInt(raw[2].substring(0,2)) < parseInt(currettime.substring(0,2))){
        //verifies the end belltimes with current time
        
        if(parseInt(raw[3].substring(0,2)) === parseInt(currettime.substring(0,2)) && parseInt(raw[3].substring(3,5)) >= parseInt(currettime.substring(3,5)) || parseInt(raw[3].substring(0,2)) > parseInt(currettime.substring(0,2)))
        //console.log(raw[2]+"|"+raw[3]+"@"+currettime);
          currentposition = i;
      }

    }
  }

  return currentposition;
}
//caculates timeleft of selection
function timeleft(period){
  //console.log(period)
  var read = localStorage["belltimes"];
  read = read.split("|");
  var item;
  var pos;
  var output = "";
  var currenttime = localStorage["time"];
  for(item in read){
    if(read[item] === selection){
      pos = parseInt(item);
    }
  }
  read = read[pos + 1].split("/");
  var time = read;
  var certainday;
  var temp;
  var result;
  
  
  for(item in time){
    temp = time[item].split(".");
    for(certainday in days){
      if(days[temp[1]] === localStorage["today"]){
        
        if(parseInt(temp[0]) === parseInt(period)){
          
          result = temp;
        }
      }
    }
  }
  
  time = result;


 
    
   if(time !== undefined){
		 if(time[3] !== "" && time[3] !== undefined){
	  time = time[3];
	 //if the hour is equal to that of the current time
	  if(parseInt(time.substring(0,2)) === parseInt(currenttime.substring(0,2))){
		output += "00";
	   output += ":";
	   if(parseInt(time.substring(3,5) - currenttime.substring(3,5)) < 10){
		output += "0" + (parseInt(time.substring(3,5)) - parseInt(currenttime.substring(3,5) - 1));
	  }else{
		output += parseInt(time.substring(3,5) - currenttime.substring(3,5) - 1);
	  }

	   }else{
		 //difference is 1hr and  50 minutes
		 //13:30 -15:20
		 //find the amount of minutes
		 
		 //30 + 20 = 50
		 // 15 -13 - 1 = 1
		 
		 //13:00
		 //15:20
		 
		 //60 + 20 = 80 upgrate to 1hr
		 //15-13-1 = 1
		 
		 //2hr and 20 minutes
		 var minutes = -1;
		 var hour = 0;
		 
		 minutes += 60 - parseInt(currenttime.substring(3,5));
		 minutes += parseInt(time.substring(3,5));
		 
		 hour += parseInt(time.substring(0,2) - currenttime.substring(0,2) - 1);
		 
		 if(minutes >= 60){
		   hour += 1;
		   minutes -= 60;
		 }
		
		  if(parseInt(hour) < 10){
		output += "0" + hour;
	  }else{
		output += hour;
	  }
	  output += ":";
	   if(parseInt(minutes) <  10){
		output += "0" + minutes;
	  }else{
		output += minutes;
		
	  }
	  
	   }
	 //hour
	  output += ":";
	  //second
	  if(60 - parseInt(currenttime.substring(6,8)) < 10){
		output += "0" + parseInt(60 - currenttime.substring(6,8));
	  }else{
		 output += parseInt(60 - currenttime.substring(6,8));
	  }
	  return output;
	  }
	}else{
	return "00:00:00";
	}

}


 
 
//Grabs revelant info according to closest date prediction
function infograb(){
  var read = localStorage["subjectsinfo"].split("|");
  var item;
  var temp;
  var currentperiod = 0;
  var positionofsubject;
  for(item in read){
    if(read[item] === timeline[position]){
      positionofsubject = parseInt(item);
    }
  }
  var currentposition = closestday(positionofsubject);
  read = read[positionofsubject + 1].split("/");

  if(currentposition !== undefined){
  temp = read[currentposition].split(".");
  //console.log(temp);
  currentperiod = parseInt(temp[0]);
  
  info = temp[2];
  
  //Chnages All 3 possible outcomes. 
  //If there only the lasttwo the periods left
  //If there only the last period
  //If all 3 elements are active..
  
  if(parseInt(periods - currentperiod) === 1){
    document.getElementById("t2").innerHTML = "Period " + (currentperiod ) + "(Current)";
    document.getElementById("t3").innerHTML = "Period " + (currentperiod + 1);
    
     document.getElementById("t2s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t2r").innerHTML = "Room: " + temp[3];
  document.getElementById("t2t").innerHTML = "Timeleft: " + timeleft(currentperiod);
  temp = read[currentposition + 1].split(".");
  document.getElementById("t3s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t3r").innerHTML = "Room: " + temp[3];
  document.getElementById("t3t").innerHTML = "Timestart: " + timeleft(currentperiod + 1);
  
  }else if(parseInt(periods - currentperiod) === 0){
     document.getElementById("t3").innerHTML = "Period " + (currentperiod ) + "(Current)";
    
  document.getElementById("t3s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t3r").innerHTML = "Room: " + temp[3];
  document.getElementById("t3t").innerHTML = "Timeleft: " + timeleft(currentperiod);
     
  }else{

  document.getElementById("t1").innerHTML = "Period " + (currentperiod) +"(Current)";
  document.getElementById("t2").innerHTML = "Period " + (currentperiod + 1);
  document.getElementById("t3").innerHTML = "Period " + (currentperiod + 2);
  
  
  document.getElementById("t1s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t1r").innerHTML = "Room: " + temp[3];
  document.getElementById("t1t").innerHTML = "Timeleft: " + timeleft(currentperiod);
  temp = read[currentposition + 1].split(".");
  
  document.getElementById("t2s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t2r").innerHTML = "Room: " + temp[3];
  document.getElementById("t2t").innerHTML = "Timestart: " + timeleft(currentperiod + 1);
    temp = read[currentposition + 2].split(".");
  document.getElementById("t3s").innerHTML = "Subject: " + temp[2];
  document.getElementById("t3r").innerHTML = "Room: " + temp[3];
  document.getElementById("t3t").innerHTML = "Timestart: " + timeleft(currentperiod + 2);
  }
    
  }
}
var info = "";
infograb();
if(info !== ""){
quickactions(info);
}
 
  
});
