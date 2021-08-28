//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
 //defaults for counter
if(localStorage["homeworkcounter"] === undefined || localStorage["homeworkcounter"] === "undefined" || localStorage["homeworkcounter"] === "")
{
  localStorage["homeworkcounter"] = 1;
}



function createtable(){
  var homework = localStorage["homework"].split("|*splitwhole*|");
   var subjects = localStorage["subjects"].split(",");
  for(var a = 0; a < parseInt(homework[0]); a += 1){
   document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+(a+1)+"><td style='width:75px'><b>Homework "+(a+1)+"</b></td><td>Subjects:</td><td><select id = '"+"h"+"subject"+(a+1)+"'></select></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+(a+1)+"'></td></tr><tr id="+(a+1)+"n"+"><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+(a+1)+"' style='width: 100%;'></textarea></th></tr>");
   var items;
    for(items in subjects){
      console.log(subjects[items]);
     document.getElementById("h"+"subject"+(a+1)).insertAdjacentHTML('beforeEnd',"<option>"+subjects[items]+"</option>");
     
    }
    document.getElementById("h"+"subject"+(a+1)).selectedIndex = 1;
  }
  
   
  }
  createtable();

function removetable(){
  var homework = localStorage["homework"].split("|*splitwhole*|");
  
  for(var num=1; num <= parseInt(homework[0]); num += 1){
     var elem = document.getElementById(num);
        elem.parentNode.removeChild(elem);
         var eleme = document.getElementById(num+"n");
        eleme.parentNode.removeChild(eleme);
  }
}

function load(){
  var fieldposition = [1,3,5];
  var fields = ["notes","date","subject"];
  var homework = localStorage["homework"].split("|*splitwhole*|");
  var read = homework[1].split("|*splitday*|");
  console.log(read);
   for(var n = 1; n < parseInt(homework[0])+1; n += 1){
     var temp = read[n-1];
     temp = temp.split("|*split*|");
    for(var i =0; i <= 2 ; i += 1){
     document.getElementById("h"+fields[i]+n).value = temp[fieldposition[i]];
    }
  }
}  
load(); 
function save(){
  
  //saves fields
    var fieldposition = [1,3,5];
  var fields = ["notes","date","subject"];
  var homework = localStorage["homework"].split("|*splitwhole*|");
  var read = homework[1].split("|*splitday*|");
   for(var n = 1; n < parseInt(homework[0])+1; n += 1){
     var temp = read[n-1];
     temp = temp.split("|*split|");
     
    for(var i =0; i <= 2 ; i += 1){
      console.log(fields[i]+n);
     temp[fieldposition[i]] = document.getElementById("h"+fields[i]+n).value; 
    }
     temp = temp.join("|*split*|");
    read[n-1] = temp;
  }
  homework[1] = read.join("|*splitday*|");
    homework = homework.join("|*splitwhole*|");
  localStorage["homework"] = homework;
  
}

  document.getElementById("add").addEventListener("click",function(){
      var homework = localStorage["homework"].split("|*splitwhole*|");
    if(homework[0] < 10){
    removetable();
    homework[0] = parseInt(homework[0]) + 1;
    localStorage["homework"] = homework.join("|*splitwhole*|");
    createtable();
    load();
    //document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+homework[0]+"><td><b>Homework "+homework[0]+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"h"+"subject"+localStorage["homeworkcounter"]+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+localStorage["homeworkcounter"]+"'></td></tr><tr id="+localStorage["homeworkcounter"]+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+localStorage["homeworkcounter"]+"' style='width: 100%;'></textarea></th></tr>");
    }
    else{
      confirm("You have reached the maxium number of homeworks.");
    }
  
  });
  //saves all current information on the event listener change.
  document.getElementById("whole").addEventListener("change",function()
 {
   save();
 });
 
     //remove the last element unless there is only one element
    document.getElementById("remove").addEventListener("click",function()
    {
         var homework = localStorage["homework"].split("|*splitwhole*|");
    if(homework[0] > 1){
    if(confirm("Do you want to delete the last homework?")){
    removetable();
    homework[0] = parseInt(homework[0]) - 1;
    localStorage["homework"] = homework.join("|*splitwhole*|");
    createtable();
    load();
    //document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+homework[0]+"><td><b>Homework "+homework[0]+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"h"+"subject"+localStorage["homeworkcounter"]+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"h"+"date"+localStorage["homeworkcounter"]+"'></td></tr><tr id="+localStorage["homeworkcounter"]+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"h"+"notes"+localStorage["homeworkcounter"]+"' style='width: 100%;'></textarea></th></tr>");
    }
    }
    else{
      confirm("You cannot remove the last homework. Remove the fields to remove notification");
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