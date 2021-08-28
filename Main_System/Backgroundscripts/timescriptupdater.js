//Copyright 2016, Kai Sato, All rights reserved.
 //adds 0 to number less than 10 from current time

function checkTime(i) {
    if (i<10)
    {
      i = "0" + i;
      
    }  
    return i;
}
  //time function that grabs the time ever 500ms and updates it on localstorage to see on the homepage
  function startTime() {
    //grabs the computer time and then it is split into different variables
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    //to add any necessary zero's
    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);
   //set the format of the time in HMS mode
    localStorage.setItem("time", h+":"+m+":"+s);
   
    //function repeator 
    
    var t = setTimeout(function()
    {
      startTime();
       
    },500);
    }



//initate the function
startTime();

function day()
{
//get week day
var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()];
 localStorage.setItem("today", n);
  
//gets date and month
var h = new Date();
var month = new Array([]);
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var s = month[h.getMonth()];
var l = h.getDate();
var f = h.getMonth();
localStorage["datemonth"] = s + " " + l;
//function repeator 
    var t = setTimeout(function()
    {
      day();
       
    },1000);
}

//initate function
day();