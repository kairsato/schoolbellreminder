//



//creation of initial save
  function initialloadsubjects(){
     var item;
     var dayselection = localStorage["dayselection"].split(",");
     var timeline = localStorage["timeline"].split(",");
     var split;
     var subjects = localStorage["subjects"].split(",");
     var periods = parseInt(localStorage["periods"]);
     var saved = "";
     for(item in timeline){
       split = dayselection[item];
       split = split.split(".");
       if(item === "0"){
          saved = timeline[0]+"|";
       }else{
         saved += "|"+ timeline[item]+"|";
       }
        for(var a = 1; a<= periods; a+= 1){
       for(var i =0; i <= 6 ; i += 1){
      if(split[i] === "True"){
         saved += a + "." + i+"."+subjects[0]+"."+ "/";
      }}}
     }
     localStorage["subjectsinfo"] = saved;
     
  }
    function initialloadbelltimes(){
     var item;
     var dayselection = localStorage["dayselection"].split(",");
     var timeline = localStorage["timeline"].split(",");
     var split;
     var periods = parseInt(localStorage["periods"]);
     var saved = "";
     for(item in timeline){
       split = dayselection[item];
       split = split.split(".");
       if(item === "0"){
          saved = timeline[0]+"|";
       }else{
         saved += "|"+ timeline[item]+"|";
       }
        for(var a = 1; a<= periods; a+= 1){
       for(var i =0; i <= 6 ; i += 1){
      if(split[i] === "True"){
         saved += a + "." + i+"."+"."+"/";
      }}}
     }
     localStorage["belltimes"] = saved;
     
  }
  function initialloadquickactions(){
    var item;
    var subject = localStorage["subjects"].split(",");
    var output = "";
    for(item in subject){
      output += subject[item]+"|*split*|"+"0"+"|*split*||*split*||*split*||*split*||*split*||*split*||*split*||*split*||*split*||*split*||*splitwhole*|";  
      
    }
    localStorage["quickaction"] = output;
  }
  
  function initialhomework(){
    var output = "1|*splitwhole*|";
    var names = ["notes","date","subject"];
    var subject = localStorage["subjects"].split(",");
    for(var t =1; t <= 10; t+= 1){
    for(var i =0; i <= 2; i += 1){
      if(i !== 2){
      output += names[i]+t + "|*split*||*split*|";
      }else{
        output += names[i]+t + "|*split*|"+subject[0];
        } 
      }
      if(t !== 10){
      output += "|*splitday*|";
      }
    }
  
    localStorage["homework"] = output;
  }
if(localStorage["initial_load"] === undefined || localStorage["initial_load"] === "undefined" || localStorage["initial_load"] === ""){
   initialloadsubjects();
   initialloadbelltimes();
   initialloadquickactions();
   initialhomework();
   localStorage["initial_load"] = "Loaded!!!";
}

  
  
  
