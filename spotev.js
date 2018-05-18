var NumberBlocks;
var positionBlocks=new Array();
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
	NumberBlocks=parseInt(tabInput[0]);
	for(var i=0;i<NumberBlocks;i++){
        blocks[i]=new Array();
        blocks[i].push(i);
        positionBlocks[i]=i;
    }
	var i=1;
	while(tabInput[i]!=="quit"){  //Exit when command is quit
             var tabToken=tabInput[i].split(" "); //Parse the command
			 if(tabToken.length!==4){
				 $('#alertMSG').html("Command is not correct!");
                 $('#alertMSG').show();
                 Vider("alertMSG");
				 break;
			 }
			 var firstToken=tabToken[0];
			 var A=parseInt(tabToken[1]);
			 var secondToken=tabToken[2];
			 var B=parseInt(tabToken[3]);

			 if(A !== B || positionBlocks[A] !== positionBlocks[B]){
			   if(firstToken=="move"){
			   if(secondToken=="onto"){
			      MoveOntoAB(A,B);
			   }  
			   else
               if(secondToken=="over")	
                  MoveOverAB(A,B);			   
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
//////////////////////////////MoveOntoAB()////////
function MoveOntoAB(A,B){
    popLast(B);
    MoveOverAB(A,B);
}
//////////////////////////////MoveOverAB()///////
function MoveOverAB(A,B){
   popLast(A);
   //Remove stack A from its current position and Stack stack A onto the top of stack B
   blocks[positionBlocks[B]].push(blocks[positionBlocks[A]].pop()); 
   positionBlocks[A] = positionBlocks[B];
}
/////////////////////////////popLast()////////////
function popLast(block){
    while(blocks[positionBlocks[block]][blocks[positionBlocks[block]].length-1]!=block){
		  initialization(blocks[positionBlocks[block]].pop()); 
   }
}
/////////////////////////////popLast()////////////
function initialization(block){   
        while(blocks[block].length!=0) {
           initialization(blocks[block].pop());
        }
        blocks[block].push(block);
        positionBlocks[block] =block;
}
////////////////////Vider()////////////////////////
function Vider(elem){
	var theId="#"+elem;
    setTimeout(function(){ $(theId).hide(); }, 3000);
}