//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
  //button done
  //document.getElementById("assignment1").addEventListener("click",function()
  //{
    //document.getElementById("")
  //});
  //automatically generates first homework table
  document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr><td><b>Homework 1</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"h"+"subject"+"1"+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+"1"+"'></td></tr><tr><td style='float: left;'></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+"1"+"' style='width: 100%;'></textarea></th></tr>");
if(localStorage["homeworkcounter"] === undefined)
{
  localStorage["homeworkcounter"] = 1;
}
//load previous added homework
for(var a = 2; a <= localStorage["homeworkcounter"]; a = a + 1)
{
  
  document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+a+"><td><b>Homework "+a+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"h"+"subject"+a+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+a+"'></td></tr><tr id="+a+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+a+"' style='width: 100%;'></textarea></th></tr>");

}
  document.getElementById("add").addEventListener("click",function(){
    if(localStorage["homeworkcounter"] < 10)
    {
    localStorage["homeworkcounter"] = parseInt(localStorage["homeworkcounter"]) + 1;
    
    document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+localStorage["homeworkcounter"]+"><td><b>Homework "+localStorage["homeworkcounter"]+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"h"+"subject"+localStorage["homeworkcounter"]+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+localStorage["homeworkcounter"]+"'></td></tr><tr id="+localStorage["homeworkcounter"]+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+localStorage["homeworkcounter"]+"' style='width: 100%;'></textarea></th></tr>");
    }
    else
    {
      confirm("You have reached the maxium number of homeworks.");
    }
  });
   var fields = ["subject","notes","date"];
  //saves all current information on the event listener change.
  document.getElementById("whole").addEventListener("change",function()
 {
   
   for(var e = 0; e <= 2; e = e + 1)
   {
    for(var f =1; f <= localStorage["homeworkcounter"]; f = f + 1)
    {
     
       localStorage["h"+fields[e]+f] = document.getElementById("h"+fields[e]+f).value;
          }
   }
 });
  //loads all the information
 
   for(var g = 0; g <= 2; g = g + 1)
   {
    for(var h =1; h <= localStorage["homeworkcounter"]; h = h + 1)
    {
      document.getElementById("h"+fields[g]+h).value =  localStorage["h"+fields[g]+h];
    }
   }
     //remove the last element unless there is only one element
    document.getElementById("remove").addEventListener("click",function()
    {
      if(parseInt(localStorage["homeworkcounter"]) > 1)
      {
        var elem = document.getElementById(localStorage["homeworkcounter"]);
        elem.parentNode.removeChild(elem);
         var eleme = document.getElementById(localStorage["homeworkcounter"]+"n");
        eleme.parentNode.removeChild(eleme);
        for(var j = 0; j <= 2; j = j + 1)
         {
           
         localStorage[fields[j]+localStorage["assignmentcounter"]] = "";
          }
        localStorage["homeworkcounter"] = localStorage["homeworkcounter"] - 1;
      }
    });  
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
      console.log(cal);
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
   //button "return" 
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click",function(){
     
     window.location.replace("/Main_System/Homepage2.0/homepage.html");
     });
    
});