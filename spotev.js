var NumberBlocks;
var position=new Array();
var blocks=new Array();
var rep="";
function reset(){
	$("#textarea").val("");
	$("#result").html("Result");
}
////////////////////////////
function showResult(){
    var inputProgram=document.getElementById("textarea").value;
	if(inputProgram.indexOf(";")!=(-1)){
		$('#alertMSG').html("The seprator should be ' , ' Not ' ; '  !");
        $('#alertMSG').show();
        Vider("alertMSG");
	}
	else{
	var tabInput = inputProgram.split(",");
	for(var i=0;i<tabInput.length;i++){
	   tabInput[i]=tabInput[i].trim().toLowerCase();
	}
	NumberBlocks=tabInput[0];
	for(var i=0;i<NumberBlocks;i++){
        blocks[i]=new Array();
        blocks[i].push(i);
        position[i]=i;
    }
	var i=1;
	while(tabInput[i]!=="quit"){  //Exit when verb is quit
             var tabToken=tabInput[i].split(" "); //Parse the commands
			 if(tabToken.length!==4){
				 $('#alertMSG').html("Command is not correct!");
                 $('#alertMSG').show();
                 Vider("alertMSG");
				 break;
			 }
			 var firstString=tabToken[0];
			 var A=parseInt(tabToken[1]);
			 var secondString=tabToken[2];
			 var B=parseInt(tabToken[3]);

			 if(A !== B || position[A] !== position[B]){
			   if(firstString=="move"){
			   if(secondString=="onto"){
			      MoveOnto(A,B);
			   }  
			   else
               if(secondString=="over")	
                  MoveOver(A,B);			   
			 }
		     } 
			 else{
				  $('#alertMSG').html("illegal command! A = B or A and B are in the same stack of blocks!");
                  $('#alertMSG').show();
                  Vider("alertMSG");	
			 }
		     i++;
			 
		}
/////////////DSPLAY RESULT///////////////		
	    var rep="";	
        for(var i=0;i<blocks.length;i++){
	        rep+=i+":";
	        for(var j=0;j<blocks[i].length;j++){
		        rep+=" "+blocks[i][j];
		    }
		    rep+="<br>";
	    }
	    document.getElementById("result").innerHTML=rep;
	}
}
//////////////////////////////MoveOnto()////////
function MoveOnto(A,B){
    ClearAbove(B);
    MoveOver(A,B);
}
//////////////////////////////MoveOver()///////
function MoveOver(A,B){
   ClearAbove(A);
   //Remove stack a from its current position and Stack stack a onto the top of stack b
   blocks[position[B]].push(blocks[position[A]].pop()); 
   position[A] = position[B];
}
/////////////////////////////ClearAbove()////////////
function ClearAbove(block){
    while(blocks[position[block]][blocks[position[block]].length-1]!=block){
         Intial(blocks[position[block]].pop());
   }
}
/////////////////////////////Intial()//////////
function Intial(block){   
        while(blocks[block].length!=0) {
           Intial(blocks[block].pop());
        }
        blocks[block].push(block);
        position[block] =block;
}
////////////////////Vider()////////////////////////
function Vider(elem){
	var theId="#"+elem;
    setTimeout(function(){ $(theId).hide(); }, 3000);
}