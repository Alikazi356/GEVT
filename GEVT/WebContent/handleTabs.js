$(document).ready(function($) {
	$('#tabs').tabulous({
		effect: 'customScale'
	});
});


function showHideTab(id){
    var e = document.getElementById(id);
    if((id == "tabs-1")){
    	e.style.display = 'block';
 	    document.getElementById("tabs-2").style.display = 'none';
 	    document.getElementById("tabs-3").style.display = 'none';
 	    document.getElementById("tabs-4").style.display = 'none';
    }else if((id == "tabs-2")){
  	    e.style.display = 'block';
  	    document.getElementById("tabs-1").style.display = 'none';
  	    document.getElementById("tabs-3").style.display = 'none';
  	    document.getElementById("tabs-4").style.display = 'none';
  	    /*document.getElementById('chooseType').style.display = 'none';*/
     }else if((id == "tabs-3")){
   	    e.style.display = 'block';
  	    document.getElementById("tabs-1").style.display = 'none';
  	    document.getElementById("tabs-2").style.display = 'none';
  	    document.getElementById("tabs-4").style.display = 'none';
  	    document.getElementById('chooseType').style.display = 'none';
     }
     else if((id == "tabs-4")){
 	    e.style.display = 'block';
	    document.getElementById("tabs-1").style.display = 'none';
	    document.getElementById("tabs-2").style.display = 'none';
	    document.getElementById("tabs-3").style.display = 'none';
     }
}