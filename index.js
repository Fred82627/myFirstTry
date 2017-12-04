

var b_showError=false;
var b_InsertDatabase=false;
var b_lastInsert=false;//change for git test

$(document).ready(function(){

    var b_RF_POWER=true,b_Remote=false,b_Open=false, b_RF_Voltage=false;

	 
	
	$.timer(1000,function(timer){  
	    
	  
	  Status();
	  if( b_InsertDatabase ){
	    Insert();
		b_InsertDatabase=false;
	  }	
	 
	  if( pcm.ReadVariable("getMessageValue") )
      {
         getMessage = pcm.LastVariable_tValue;  //Warning  pcm.LastVariable_tValue return string

    
        $("#Reply_Message").html(getMessage);
      }

	});//Timer end

var Auto_debounce = _.debounce(Auto_Click, 1500);  // Interlock_Click
$('#Auto').click(Auto_debounce );

function  Auto_Click() {
  pcm.WriteVariable("timer", 20);//default 20s
  if( pcm.ReadVariable("timer") ){
   /* if(pcm.LastVariable_vValue < 1 ){  //delat timer can't be 0
      alert("Timer can't be 0, please set Timer ");
	  return;
    }
    */	
    if( pcm.ReadVariable("command") ){
      if(pcm.LastVariable_vValue != 2 ) 
        pcm.WriteVariable("command",2);
	  
    }
  }
}
var Cycle_debounce = _.debounce(Cycle_Click, 150);  // Open_Click
$('#Cycle').click(Cycle_debounce);
  
function Cycle_Click(){
      var ch1;
     $.post('../Chart/emptyDatabase.php',{
            
            'ch1' : ch1
           
            

        },function(response){
            $("#dbdisplay").html(response); 
			if( response.substring(0,7)=="Critical" )
			{
			  $("#critical").html(response);   

			}  
        }//end function
     );//end post

     if( pcm.ReadVariable("timer") ){
       if(pcm.LastVariable_vValue < 1 ){  //delat timer can't be 0
        alert("Timer can't be 0, please set Timer ");
	    return;
       }
	 }  
	 if( pcm.ReadVariable("cycleTimes") ){
       if(pcm.LastVariable_vValue < 1 ){  //delat timer can't be 0
        alert("Cycle times can't be 0, please set it ");
	    return;
       }
	 }  
	 if( pcm.ReadVariable("command")){ 
	   if( pcm.LastVariable_vValue != 3 ){  //not active 
	     pcm.WriteVariable("command",3);  //relay on
       } 
       
	 }  
}

  

    var Close_debounce = _.debounce(Close_Click, 1500);  // Interlock_Click
    $('#Close').click(Close_debounce);

    function Close_Click() {
     
    if( pcm.ReadVariable("command")){ 
	   if( pcm.LastVariable_vValue != 0 ){  //not active 
	     pcm.WriteVariable("command",0);  //relay on
         $(this).css("background-color","red");
       } 
       
	 }  
	
	
  	
  }

    var Open_debounce = _.debounce(Open_Click, 1500);  // Open_Click
    $('#Open').click(Open_debounce);
  
   function Open_Click(){
   
	 if( pcm.ReadVariable("command")){ 
	   if( pcm.LastVariable_vValue != 1 ){  //not active 
	     pcm.WriteVariable("command",1);  //relay on
         $(this).css("background-color","red");
       } 
       
	 }  
	   
	  
  	
  }
  function Insert(){
     
        var i=0;           //$('#res').html(j+=1);  output increase j value at id=res position
        var ch1;

                
        

        
        for(i=0;i<=5;i++ ){
            if(pcm.ReadVariable("travelTime"))
            {
                ch1=pcm.LastVariable_vValue;
                break;
            }
        }
        
		        

        $.post('../Chart/insertData.php',{
            
            'ch1' : ch1
           
            

        },function(response){
            $("#dbdisplay").html(response); 
			if( response.substring(0,7)=="Critical" )
			{
			  $("#critical").html(response);   

			}  
        }//end function
     );//end post
	
  } 
  
    $('#b_Timer').click(function() {
        pcm.WriteVariable("timer", $('#Timer').val() );
		pcm.WriteVariable("cycleTimes", $('#CycleTimes').val() );

    });
	
  
  
  $('#Stop').click(function() {  //Need to stop at close position
       
	 if( pcm.ReadVariable("command")){ 
	   if( pcm.LastVariable_vValue != 0 ){  //not active 
	     pcm.WriteVariable("command",0);  //relay on
         $(this).css("background-color","red");
       } 
       
	 }  
	  
	
  	
  });	
  $('#cycleStop').click(function() {  //Need to stop at close position
       
	 if( pcm.ReadVariable("command")){ 
	   if( pcm.LastVariable_vValue != 0 ){  //not active 
	     pcm.WriteVariable("command",0);  //relay on
         $(this).css("background-color","red");
       } 
       
	 }  
	  
	
  	
  });	
  
  
  $('#Request').click(function() {
      
	  requestCommand=$('#rCommand').val();  //0-100%
	//  pcm.WriteVariable("steps",2);
	  pcm.WriteVariable("consoleCommand",requestCommand);
	   pcm.WriteVariable("controlCommand",2);
  	
  });
  $('#Remote').click(function() {
	  if(!b_Remote){
        pcm.WriteVariable("b_remote", 1 );
		b_Remote=true;
		$('#Remote').css("background-color","red");
	  }	
	  else{
		pcm.WriteVariable("b_remote", 0 );
        b_Remote=false;
		$('#Remote').css("background-color","green");
	  }	
		
    });  
	$('#Piston').click(function() {
	  if(!b_Remote){
        pcm.WriteVariable("b_Piston", 1 );
		b_Piston=true;
		$('#Piston').css("background-color","red");
	  }	
	  else{
		pcm.WriteVariable("b_Piston", 0 );
        b_Piston=false;
		$('#Piston').css("background-color","green");
	  }	
		
    });  
  
  

			  
});  //jQuery function ready 		


//var channelData1= new Array(MAX_SLAVE);    //MAX SLAVE= Maximum slave controller -1

function CommError(){
  alert("Communication error!! check hardware or FreeMaster");
	  return;
}
function Status(){

  if( pcm.ReadVariable("command") )
  {
                if(pcm.LastVariable_vValue == 0 )
                  $('#Close').css("background-color","red");
				else
				  $('#Close').css("background-color","green");
				if(pcm.LastVariable_vValue == 1 )  //active low
                  $('#Open').css("background-color","red");
				else
				  $('#Open').css("background-color","green");  
				if( pcm.LastVariable_vValue == 2 ) 
                    $('#Auto').css("background-color","red"); 
				else
				  $('#Auto').css("background-color","green");  
				if( pcm.LastVariable_vValue == 3 ) 
                    $('#Cycle').css("background-color","red"); 
				else
				  $('#Cycle').css("background-color","green");   
  }
  if( pcm.ReadVariable("cycleTimes") ){
     cycled_Times = pcm.LastVariable_vValue;  //Warning  pcm.LastVariable_tValue return string
	 
	 $("#Have_Cycle").html(cycled_Times);
	 
	 
  }
  
  if( pcm.ReadVariable("b_CloseTrigger") ){
     var b_insert = pcm.LastVariable_vValue;  //Warning  pcm.LastVariable_tValue return string
	 
	 if( b_lastInsert != 0 && b_insert == 0)
	   b_InsertDatabase=true;
	   
	 b_lastInsert= b_insert; 
	   
	 	 
	 
	 
  }
  


}
