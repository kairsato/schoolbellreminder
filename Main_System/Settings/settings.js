//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{ 
  
  //ideas
  //background
  // background: linear-gradient(-90deg, red, yellow);
  
  
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
 //loads default
 if(localStorage["instant"] === "" || localStorage["instant"] === undefined || localStorage["instant"] === "undefined")
 {
   localStorage["instant"] = false;
 }
 //loads localStorage
    if(localStorage["instant"])
    {
     document.getElementById("enable").checked = true;
     document.getElementById("disable").checked = false;
    }
    else
    {
      document.getElementById("enable").checked = false;
      document.getElementById("disable").checked = true;
    }
    
  //loads default
 if(localStorage["tab"] === "" || localStorage["tab"] === undefined || localStorage["tab"] === "undefined")
 {
   localStorage["tab"] = false;
 }
 //loads localStorage
    if(localStorage["tab"] === "vertical")
    {
     document.getElementById("vertical").checked = true;
     document.getElementById("horizontal").checked = false;
    }
    else
    {
      document.getElementById("vertical").checked = false;
      document.getElementById("horizontal").checked = true;
    }  
 //saves change 
document.getElementById("whole").addEventListener("change",function()
  {
    if(document.getElementById("enable").checked)
    {
      
      localStorage["instant"] = "true";
      chrome.browserAction.setPopup({popup:"/Main_System/HomepageNA/homepagena.html",});
      
    }
    else
    {
      localStorage["instant"] = "false";
      chrome.browserAction.setPopup({popup:"/Main_System/Homepage/homepage.html",});
    }
    if(document.getElementById("vertical").checked)
    {
      
      localStorage["tab"] = "vertical";
      
    }
    else
    {
     localStorage["tab"] = "horizontal";
    }
    
  });
  
  document.getElementById("color").value =  localStorage["color"];
  switch(localStorage["style"])
  {
    case "none":
      document.getElementById("none").checked = true;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = false;
      break;
    case "original":
      document.getElementById("none").checked = false;
      document.getElementById("original").checked = true;
      document.getElementById("fullbackground").checked = false;
      break;
    case "fullbackground":
      document.getElementById("none").checked = false;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = true;
      break;
      
    default:
    document.getElementById("none").checked = true;
      document.getElementById("original").checked = false;
      document.getElementById("fullbackground").checked = false;
  }
  
  //saves all 2 inputs by "change listener"
  //change listener activates when a change appears in the radio and colour input boxes/buttons
  document.getElementById("whole").addEventListener("change",function()
  {
    
    var style = ["none","original","fullbackground"];
    for(var i = 0; i <=2 ; i = i + 1)
    {
      
      if(document.getElementById(style[i]).checked === true)
      {
        localStorage["style"] = style[i];
      }
    }
    localStorage["color"] = document.getElementById("color").value;
  });
   //button "return" 
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click",function(){
     
     window.location.replace("/Main_System/Homepage2.0/homepage.html");
     });
});