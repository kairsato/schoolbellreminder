//Copyright 2016, Kai Sato, All rights reserved.
document.addEventListener('DOMContentLoaded', function() 
{
  document.getElementById("download").addEventListener("click",function()
  {
    //console.log();

    text = JSON.stringify(localStorage);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "schoolbelldata");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);


     
      
    //print();
  });

  document.getElementById("intergrate").addEventListener("click",function()
  {
    
    if (confirm("Warning this with clear all existing data.")) { 
      localStorage.clear();

      var fileToLoad = document.getElementById("upload").files[0];

      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var data = JSON.parse(textFromFileLoaded);
        
        Object.keys(data).forEach(function (k) {
          localStorage.setItem(k, data[k]);
        });
      };
    
      fileReader.readAsText(fileToLoad, "UTF-8");

    

      

    }  

  });
  
 //button "return"
  //instruction: returns to home page "homepage.html"
  document.getElementById("return").addEventListener("click",function()
  {
         
        window.location.replace("/Main_System/Homepage2.0/homepage.html");
    
  });
});