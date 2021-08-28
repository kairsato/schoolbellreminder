//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function() 
{
 //new Script
 //defautls for subjectsinfo
 if(localStorage["subjectsinfo"] === "" || localStorage["subjectsinfo"] === undefined || localStorage["subjectsinfo"] === "undefined"){
   localStorage["subjectsinfo"] = [];
 }
 //selection the what he line is selected to
 var selection;
 var periods = parseInt(localStorage["periods"]);
 var timeline = localStorage["timeline"].split(",");
 var dayselection = localStorage["dayselection"].split(",");
 var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 var subjects = localStorage["subjects"].split(",");
 var position;
 var item;
 

 //defines selection and position
  function dropdowndisplay(){
    var items;
    for(items in timeline){
     document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option id='"+timeline[items]+"' value='"+timeline[items]+"'>"+timeline[items]+"</option>");
    }
  }
 
   
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
    //defines storage
  if(localStorage["subjectperiods"] === "" || localStorage["subjectperiods"] === "undefined" || localStorage["subjectperiods"] === undefined){
   var c_dayselection = dayselection[position].split(".");
    var counter = true;
    var day;
   for(var e = 0; e < c_dayselection.length; e +=1){
      for(var o =0;o<periods; o += 1){
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


 //splits the dayselection of selection into variable
function structure(){
 //periods
 
 for(var a = 1; a <= periods; a += 1){
     document.getElementById("table").insertAdjacentHTML('beforeEnd',"<tr  class='height external' id='"+a+"'><td class='left'>Period "+a+"</td></tr>");
 }

 //days of the week
 var c_dayselection = dayselection[position].split(".");
 for(var i = 0; i <= c_dayselection.length-1; i +=1){
   if(c_dayselection[i] === "True"){
     document.getElementById("days").insertAdjacentHTML('beforeEnd',"<td class='sub' id='"+days[i]+"'>"+days[i]+"</td>");
   
   }
 } 
}



//detele tr 2-periods number
function removetable(){
  
   for(var c = 1; c <= periods; c += 1){
      var x = document.getElementById(c);
      x.remove(x);  
   }
   document.getElementById("days").remove(document.getElementById("days"));
     document.getElementById("table").insertAdjacentHTML('beforeEnd', "<tr id='days'><td></td></tr>"); 
}
 //create fieldboxes
 function createsubjectdropdown(periods,timeline){
   var subjects = localStorage["subjects"].split(",");
   var output = "<select style='width: 90px;' id='"+"selectionbox,"+periods+","+timeline+""+"'>";
   var item;
   for(item in subjects){
     output += "<option>"+subjects[item]+"</option>";
   }
   output += "</select>";
   return output;
 }
 
 function fieldboxesdisplay()
 {
 var field;
    var c_dayselection = dayselection[position].split(".");
    var counter = 0;
   for(var i = 0; i <= c_dayselection.length-1; i +=1){
   if(c_dayselection[i] === "True"){

   for(var c = 1; c <= periods; c += 1){
     document.getElementById(c).insertAdjacentHTML('beforeEnd',"<td class='sub' id='"+"period"+periods+",day"+days[i]+"'>"+createsubjectdropdown(c,i)+"<input id='"+"textbox,"+c+","+i+""+"' class='display' type='text' style='width: 86px;' placeholder='Room'></td>");
   }
   }}
 }



 
function load(){
    //displays the most current dropdown menu option
  displaystatus();
  var now;
  var box;
  var read = localStorage["subjectsinfo"].split("|");
  var item;
  var positionofsave;
  for(item in read){
    if(read[item] ==  timeline[position]){
      positionofsave = item;
     
    }
  } 
  read = read[parseInt(positionofsave) + 1].split("/");
  for(var i = 0; i < read.length; i += 1){
     now = read[i].split(".");
        if(now.length >= 2){
          document.getElementById("selectionbox,"+now[0]+","+now[1]).value = now[2];  
        }
        if(now.length >= 3){
          document.getElementById("textbox,"+now[0]+","+now[1]).value = now[3]; 
        }
      
        }
        
}

//displays the current timeline selection into dropdown
  dropdowndisplay();
//displays the selected dropdown menu option
  displaystatus();
//splits the dayselection of selection into variable
  structure();
//input fields adder
 fieldboxesdisplay();
//loads the previous saved information
 load();
 
 
//test
function save(){
  //displays the most current dropdown menu option
  displaystatus();
  var item;
  var now;
  var altered;
  var read = localStorage["subjectsinfo"].split("|");
  var positionofsave;
  for(item in read){
    if(read[item] ==  timeline[position]){
      positionofsave = item;
     
    }
  } 
  altered = read[parseInt(positionofsave) + 1].split("/");

  for(var i = 0; i < altered.length-1; i += 1){
    now = altered[i].split(".");
    now = now[0] + "." + now[1] + "." + document.getElementById("selectionbox,"+now[0]+","+now[1]).value + "." +  document.getElementById("textbox,"+now[0]+","+now[1]).value;
    altered[i] = now; 
   }
   altered = altered.join("/");
  read[parseInt(positionofsave) + 1] = altered;
  read = read.join("|");
  localStorage["subjectsinfo"] = read;

}


//defines selection and position
 document.getElementById("dropdown").addEventListener("change",function(){

   var item;
   for(item in timeline){
      if(document.getElementById("dropdown").value === timeline[item])
      {
        position = item;
        selection = timeline[position];
      }
   }
   
   removetable();
   displaystatus();
   structure(); 
   fieldboxesdisplay();
   load();
   
 });
 
document.getElementById("info").addEventListener("change",function(){
  
     save();
  
  
  
});
 
 function weekcounter(){
    var c_dayselection = dayselection[position].split(".");
    var counter = 0;
 for(var i = 0; i <= c_dayselection.length-1; i +=1){
   if(c_dayselection[i] === "True"){
     counter += 1;
   }
   
 }
 return counter;
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
  document.getElementById("return").addEventListener("click",function()
  {
          window.location.replace("/Main_System/Homepage2.0/homepage.html");
  });
  

});