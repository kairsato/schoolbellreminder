//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
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
  document.getElementById("secret").addEventListener("click",function(){
     window.location.replace("/Main_System/Administrator/admin.html");
  });
   //button "return" 
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click",function(){
     
     window.location.replace("/Main_System/Homepage2.0/homepage.html");
     });
});