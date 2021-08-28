//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function() 
{
  var initialtext = "School Bell Reminder Data Download. This text document contains information about inputted information from the chrome extension 'School Bell Reminder'. It is not recommened to edit this document in anyway as it may become unreadable to the system thus useless. ";
    var areas = ["subjects","belltimes","quickactions","assignments","homework"];
    var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    var subjects = "";
    var number = 0;
  var counter = "";
  switch(localStorage["line"])
  {
    case "day":
      number = parseInt(localStorage["days"]);
      counter = JSON.parse("["+temp+"]");
      break;
    case "2week":
      number = 10;
      counter = ["Monday1","Tuesday1","Wednesday1","Thursday1","Friday1","Monday2","Tuesday2","Wednesday2","Thursday2","Friday2"];
      break;
    case "normal":
      number = 5;
      counter = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
      break;
  }
  
   
   for(var h = 1; h <= localStorage["periods"]; h = h + 1)
   {
    for(var j =0; j < number; j = j + 1)
    {
      
      subjects = subjects + "s"+counter[j]+"d"+h+"p"+":" + localStorage["s"+counter[j]+"d"+h+"p"] + ", "+ "s"+"r"+counter[j]+"d"+h+"p"+": "+localStorage["s"+"r"+counter[j]+"d"+h+"p"]+", ";
       
    }
   }
    var belltimes = "";
    for(var a = 1; a <= localStorage["periods"]; a = a + 1)
    {
      for(var b = 0; b < 5; b = b + 1)
      {
        belltimes = belltimes +"b"+weekday[b]+a+"p"+": "+localStorage["b"+weekday[b]+a+"p"] +", "+"b"+"r"+weekday[b]+a+"p"+": "+localStorage["b"+"r"+weekday[b]+a+"p"] +", ";
      }
    }
    var fields = ["subject","notes","date"];
    var assignment = "";
    for(var c = 1; c <= localStorage["assignmentcounter"]; c = c + 1)
    {
     for(var d = 0; d <= 2; d = d + 1)
     {
       assignment = assignment + "a"+fields[d]+c+": "+localStorage["a"+fields[d]+c]+", ";
     }
    }
    var homework = "";
    for(var e = 1; e <= localStorage["homeworkcounter"]; e = e + 1)
    {
     for(var f = 0; f <= 2; f = f + 1)
     {
       homework = homework + "h"+fields[f]+e+": "+localStorage["h"+fields[f]+e]+", ";
     }
    }
    //offline
    //all data download
  document.getElementById("oalldata").addEventListener("click",function()
  {
    
    var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(initialtext+","+areas[0]+","+subjects+","+areas[1]+","+belltimes+","+areas[2]+","+assignment+
","+areas[3]+","+homework+"."
  );
hiddenElement.target = '_blank';
hiddenElement.download = 'School_Bell_Reminder_Data.txt';

hiddenElement.click();
document.getElementById("status").innerHTML = "Offline: All Data has been succesfully downloaded";
  });
  //subjects only
   document.getElementById("osubjects").addEventListener("click",function()
  {
    
    var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(initialtext+","+areas[0]+","+subjects+"."
  );
hiddenElement.target = '_blank';
hiddenElement.download = 'School_Bell_Reminder_Data.txt';

hiddenElement.click();
document.getElementById("status").innerHTML = "Offline: Subject Data has been succesfully downloaded";
  });
  //bell times only
    document.getElementById("obelltimes").addEventListener("click",function()
  {
    
    var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(initialtext+","+areas[1]+","+belltimes+"."
  );
hiddenElement.target = '_blank';
hiddenElement.download = 'School_Bell_Reminder_Data.txt';

hiddenElement.click();
document.getElementById("status").innerHTML = "Offline: Bell Times Data has been succesfully downloaded";
  });
  //assignments only
    document.getElementById("oassignments").addEventListener("click",function()
  {
    
    var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(initialtext+","+areas[2]+","+assignment+"."
  );
hiddenElement.target = '_blank';
hiddenElement.download = 'School_Bell_Reminder_Data.txt';

hiddenElement.click();
document.getElementById("status").innerHTML = "Offline: Assignment Data has been succesfully downloaded";
  });
  //homework only
    document.getElementById("ohomework").addEventListener("click",function()
  {
    
    var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(initialtext+","+areas[3]+","+homework+"."
  );
hiddenElement.target = '_blank';
hiddenElement.download = 'School_Bell_Reminder_Data.txt';

hiddenElement.click();
document.getElementById("status").innerHTML = "Offline: Homework Data has been succesfully downloaded";
  });
  //online
  //all data sync
  document.getElementById("salldata").addEventListener("click",function()
  {
    for(var k = 1; k <= localStorage["periods"]; k = k + 1)
   {
    for(var v =0; v < number; v = v + 1)
    {
      var time = "s"+counter[v]+"d"+k+"p";
      var time2 = "s"+"r"+counter[v]+"d"+k+"p";
      chrome.storage.sync.set({ time: localStorage["s"+counter[v]+"d"+k+"p"]});
      chrome.storage.sync.set({ time2: localStorage["s"+"r"+counter[v]+"d"+k+"p"]});
    }
   }
   for(var n = 1; n <= localStorage["periods"]; n = n + 1)
    {
      for(var r = 0; r < 5; r = r + 1)
      {
      var time3 = "b"+weekday[r]+n+"p";
      var time4 = "b"+"r"+weekday[r]+n+"p";
      chrome.storage.sync.set({ time3: localStorage["b"+weekday[r]+n+"p"]});
      chrome.storage.sync.set({ time4: localStorage["b"+"r"+weekday[r]+n+"p"]});
      }
    }
     for(var c = 1; c <= localStorage["assignmentcounter"]; c = c + 1)
    {
     for(var d = 0; d <= 2; d = d + 1)
     {
        var time5 = "a"+fields[d]+c;
        chrome.storage.sync.set({ time5: localStorage["a"+fields[d]+c]});
     }
    }
     for(var e = 1; e <= localStorage["homeworkcounter"]; e = e + 1)
    {
     for(var f = 0; f <= 2; f = f + 1)
     {
        var time6 = "h"+fields[f]+e;
        chrome.storage.sync.set({ time6: localStorage["h"+fields[f]+e]});
       homework = homework + "h"+fields[f]+e+": "+localStorage["h"+fields[f]+e]+", ";
     }
    }
  });
  //subject online sync
   document.getElementById("ssubjects").addEventListener("click",function()
  {
   for(var k = 1; k <= localStorage["periods"]; k = k + 1)
   {
    for(var v =0; v < number; v = v + 1)
    {
      var time = "s"+counter[v]+"d"+k+"p";
      var time2 = "s"+"r"+counter[v]+"d"+k+"p";
      chrome.storage.sync.set({ time: localStorage["s"+counter[v]+"d"+k+"p"]});
      chrome.storage.sync.set({ time2: localStorage["s"+"r"+counter[v]+"d"+k+"p"]});
    }
   }
  });
  //belltimes
  document.getElementById("ssubjects").addEventListener("click",function()
  {
  for(var n = 1; n <= localStorage["periods"]; n = n + 1)
    {
      for(var r = 0; r < 5; r = r + 1)
      {
      var time3 = "b"+weekday[r]+n+"p";
      var time4 = "b"+"r"+weekday[r]+n+"p";
      chrome.storage.sync.set({ time3: localStorage["b"+weekday[r]+n+"p"]});
      chrome.storage.sync.set({ time4: localStorage["b"+"r"+weekday[r]+n+"p"]});
      }
    }
  });
  //assignments
  document.getElementById("sassignments").addEventListener("click",function()
  {
  for(var c = 1; c <= localStorage["assignmentcounter"]; c = c + 1)
    {
     for(var d = 0; d <= 2; d = d + 1)
     {
        var time5 = "a"+fields[d]+c;
        chrome.storage.sync.set({ time5: localStorage["a"+fields[d]+c]});
     }
    }
  });
  //homework
  document.getElementById("shomework").addEventListener("click",function()
  {
   
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
      
      var cal = parseInt(document.getElementById("whole").offsetWidth)/100 * 13;
      cal = Math.round(cal);
      cal = cal*2;
      console.log(cal);
      console.log(document.getElementById("whole").offsetWidth);
      document.getElementById("body").style.width = document.getElementById("whole").offsetWidth +"px";
      document.getElementById("whole").style.width = parseInt(document.getElementById("whole").offsetWidth)+ cal +"px";
      
      //right side
      var div = document.createElement("div");
      div.id = "box1";
      div.style.width = "7%";
      div.style.height = "100%";
      div.style.background = localStorage["color"];
      div.style.position = "fixed";
      div.style.top ="0px";
      document.getElementById("whole").appendChild(div);
      
        //right side
      var div1 = document.createElement("div");
      div1.id = "box1";
      div1.style.width = "7%";
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