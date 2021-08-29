//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function () 
{
  //test scripts
  function test(){
  var CLIENT_ID = '856897471670-etpomk2ibjn4kar68ahasce6uj9lo85c.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive.file';

jQuery(window).load(function() {
   gapi.auth.authorize({
     client_id: CLIENT_ID,
     scope: SCOPES,
     immediate: false
  }, function(authResult) {
        if (authResult && !authResult.error) {
           window.alert('Auth was successful!');
        } else {
           window.alert('Auth was not successful');
        }
     }
   );
 });
  }
  //end of test
  
  //sets default load page
   chrome.browserAction.setPopup({popup:"/Startup_Setup/Basic_Info/basic_info.html"});
  
  //captilises first letter
  document.getElementById("firstname").addEventListener("keydown",function()
  {
    var phrase = document.getElementById("firstname").value;
    if(phrase.length == 1)
    {
      document.getElementById("firstname").value = phrase[0].toUpperCase() + phrase.substring(1,phrase.length);

    }
     });
     document.getElementById("lastname").addEventListener("keydown",function()
  {
    var phrase = document.getElementById("lastname").value;
    if(phrase.length == 1)
    {
      document.getElementById("lastname").value = phrase[0].toUpperCase() + phrase.substring(1,phrase.length);

    }
     });
  
  //First time or not
  if(localStorage["schoolbellreminder"] === "undefined" || localStorage["schoolbellreminder"] === undefined)
  {
    localStorage["schoolbellreminder"] = "Initiated";
      }
  //if variables are undefined and loads information
  var input = ["firstname","lastname","schoolname"];
  for(var a = 0; a <= 2; a = a + 1)
  {
    //checks
    if(localStorage[input[a]] === "undefined" || localStorage[input[a]] === undefined)
    {
      localStorage[input[a]] = "";
    }
    //loads info
    document.getElementById(input[a]).value = localStorage[input[a]];
  }

  //function that save data
  function save()
  {
    for(var a = 0; a <= 2; a = a + 1)
  {
    localStorage[input[a]] = document.getElementById(input[a]).value;
  }
  }
  //saves all 3 inputs by "change listener"
  //change listener activates when a change appears in the input box
  document.getElementById("whole").addEventListener("change",function(){
   save();
  });



  var flag = true;
  //button "next" 
  //instruction: sends to next page "Theme info" + Force save + Checks required fields filled
  document.getElementById("next").addEventListener("click",function(){
    //goes through each input to check whether its filled
	
	//Updated: changed loop to not include the school name for required info
    for(var a = 0; a <= 1; a = a + 1)
  {
    var element = document.getElementById("c"+input[a]);
    //if the input is not filled
    if(localStorage[input[a]] === "")
    {
      //flag states that there are unfilled
      flag = false;
      //checks whether the * element exists
     if (typeof(element) === 'undefined' || element === null)
      {
        //places an * element
       document.getElementById("r"+input[a]).insertAdjacentHTML('beforeEnd',"<h1 id="+"c"+input[a]+">*</h1>");
      }
    }
    //If it input is filled
    else
    {
      //checks whether the * element exists
     if (typeof(element) !== 'undefined' && element !== null)
      {
        //removes the * element at the current input
        var child = document.getElementById("c"+input[a]);
        var parent = document.getElementById("r"+input[a]);
        parent.removeChild(child);
      }
    }
  }
  //If the all the inputs are filled save all data and continue to next setup page
  if(flag)
  {
    save();
    if(localStorage["adjustments"] === "true")
    {
       localStorage["adjustments"] = "false";
       window.location.replace("../System_Initial_Load/System_Initial_Load.html");
    }
    else
    {
		window.location.replace("../Timetable_Info/timetable_info.html");
		//decided to remove theme setting in setup.
    //window.location.replace("../Theme_Info/theme_info.html");
    }
  }
  //Presents an alert stating missing fields and reset the process of checking
  else
  {
    alert("Missing Required Fields *");
    flag = true;
  }
     });
   
  //if adjustments are made the buttons are either removed or changed
  if(localStorage["adjustments"] === "true")
  {
    document.getElementById("next").innerHTML = "Return";
  }
});