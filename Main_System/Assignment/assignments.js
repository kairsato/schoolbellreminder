//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
  //automatically generates first assignment table
  document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr><td><b>Assignment 1</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"a"+"subject"+"1"+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"a"+"date"+"1"+"'></td></tr><tr><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"a"+"notes"+"1"+"' style='width: 100%;'></textarea></th></tr>");

if(localStorage["assignmentcounter"] === undefined)
{
  localStorage["assignmentcounter"] = 1;
}
//load previous added assignments
for(var a = 2; a <= localStorage["assignmentcounter"]; a = a + 1)
{
  document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+a+"><td><b>Assignment "+a+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"a"+"subject"+a+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"a"+"date"+a+"'></td></tr><tr id="+a+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"a"+"notes"+a+"' style='width: 100%;'></textarea></th></tr>");

}
//adds a assignment area 
  document.getElementById("add").addEventListener("click",function(){
    if(localStorage["assignmentcounter"] < 10){
    localStorage["assignmentcounter"] = parseInt(localStorage["assignmentcounter"]) + 1;
    console.log(localStorage["assignmentcounter"]);
    document.getElementById("table").insertAdjacentHTML('beforeEnd',"  <tr id="+localStorage["assignmentcounter"]+"><td><b>Assignment "+localStorage["assignmentcounter"]+"</b></td><td><div style='visibility: hidden'>w</div></td><td>Subjects:</td><td><input type = 'text' size = '5' id = '"+"a"+"subject"+localStorage["assignmentcounter"]+"'></td><td>Due Date:</td><td><input type = 'date' size ='4' id = '"+"a"+"date"+localStorage["assignmentcounter"]+"'></td></tr><tr id="+localStorage["assignmentcounter"]+"n"+"><td></td><td></td><td>Notes:</td><th colspan='4'><textarea rows = '4' cols = '30' id = '"+"a"+"notes"+localStorage["assignmentcounter"]+"' style='width: 100%;'></textarea></th></tr>");
    }
    else{
      confirm("You have reached the maxium number of assignments.");
    }
  });
  var fields = ["subject","notes","date"];
  //saves all current information on the event listener change.
  document.getElementById("whole").addEventListener("change",function()
 {
   
   for(var e = 0; e <= 2; e = e + 1)
   {
    for(var f =1; f <= localStorage["assignmentcounter"]; f = f + 1){
       localStorage["a"+fields[e]+f] = document.getElementById("a"+fields[e]+f).value;
      }
   }
 });
  //loads all the information
   for(var g = 0; g <= 2; g = g + 1){
    for(var h =1; h <= localStorage["assignmentcounter"]; h = h + 1){
      if(localStorage["a"+fields[g]+h] !== undefined){
      document.getElementById("a"+fields[g]+h).value =  localStorage["a"+fields[g]+h];
      }
    }
   }
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
     //remove the last element unless there is only one element
    document.getElementById("remove").addEventListener("click",function()
    {
      if(parseInt(localStorage["assignmentcounter"])  > 1){
      if(confirm("Are you sure you want to remove the last assignment.\nThis will remove the information in the fields in which can never be recovered."))
      if(parseInt(localStorage["assignmentcounter"]) >   1)
      {
        var elem = document.getElementById(localStorage["assignmentcounter"]);
        elem.parentNode.removeChild(elem);
         var eleme = document.getElementById(localStorage["assignmentcounter"]+"n");
        eleme.parentNode.removeChild(eleme);
        for(var j = 0; j <= 2; j = j + 1)
         {
           console.log(fields[j]+localStorage["assignmentcounter"]);
         localStorage[fields[j]+localStorage["assignmentcounter"]] = "";
          }
        localStorage["assignmentcounter"] = localStorage["assignmentcounter"] - 1;
        
      }
      }
      else{
        alert("Cannot delete the last assignment.");
      }
    });  
});