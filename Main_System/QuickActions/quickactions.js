//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function() 
{
  document.getElementById("return").addEventListener("click",function(){
      window.location.replace("/Main_System/Homepage2.0/homepage.html");
  });
  
    document.getElementById("dropdown").addEventListener("change",function(){
    remove();
    load();
    });
  document.getElementById("number").addEventListener("change",function(){
    if(document.getElementById("number").value > 5 || document.getElementById("number").value < 0){
      alert("Out of range error. The number cannot exceed 5 and cannot go below 0");
      document.getElementById("number").value = 0;
    }  
    
    save();
    remove();
    load();
  });
  
  document.getElementById("add").addEventListener("change",function(){
      save();
  });
  
  
  //dropdown
  function dropdown(){
    var subject = localStorage["subjects"].split(",");
    var item;
    for(item in subject){
      document.getElementById("dropdown").insertAdjacentHTML('beforeEnd',"<option>"+ subject[item]+"</option>");
     }
  }
 
  function load(){
      document.getElementById("subject").innerHTML = "Buttons for "+document.getElementById("dropdown").value;
   var item;
   var raw;
   var temp;
   var read = localStorage["quickaction"].split("|*splitwhole*|");
   var pos;
   for(item in read){
     temp = read[item].split("|*split*|");
     if(document.getElementById("dropdown").value === temp[0]){
       pos = parseInt(item);
     }
   }

   read = read[pos];
   raw = read.split("|*split*|"); 
 
   document.getElementById("number").value = parseInt(raw[1]);
    if(parseInt(raw[1]) >= 1){
   for(var a =1; a <= parseInt(raw[1]); a += 1){
     
     document.getElementById("add").insertAdjacentHTML('beforeEnd',"<tbody  id='addition'><tr><td style='font-weight:bold;  '>Button "+a+"</td></tr><tr><td>Button Name<input id="+a+",name"+" style='width:75px;margin-left:10px' type='text'/></td><td>Link<input id="+a+",link"+" type='text' style='width:125px;margin-left:10px'/></td></tr></tbody>");
     document.getElementById(a+",name").value = raw[a + a];
     document.getElementById(a+",link").value = raw[a + a + 1];
   }
    }     
   
    //loads the acutal information    
   
   
  }
  
  function save(){
     var item;
   var raw;
   var temp;
   var read = localStorage["quickaction"].split("|*splitwhole*|");
   var pos;
   for(item in read){
     temp = read[item].split("|*split*|");
     if(document.getElementById("dropdown").value === temp[0]){
       pos = parseInt(item);
     }
   }
   raw = read[pos].split("|*split*|"); 
   
    if(parseInt(raw[1]) >= 1){
   for(var a =1; a <= parseInt(raw[1]); a += 1){
    console.log(a);
     raw[a + a] = document.getElementById(a+",name").value;
     raw[a + a + 1] = document.getElementById(a+",link").value;
     }
    }
    raw[1] = document.getElementById("number").value;
    read[pos] = raw.join("|*split*|");
    read = read.join("|*splitwhole*|");
    localStorage["quickaction"] = read;
  }
  
  function remove(){
    for(var t =0; t <= 5; t += 1){
      if(document.getElementById("addition") !== null){
     document.getElementById("addition").remove(document.getElementById("addition"));
    }}
    document.getElementById("subject").innerHTML = "";
  }
    
  dropdown();
  load(); 
  
});