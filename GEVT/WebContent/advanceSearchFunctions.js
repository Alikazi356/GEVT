var selectedSearchType = ""; 
var selectedDecisionType = "";
var cloneID = "";	//num

var requestQuery = "";
var enteredLat = "";
var enteredLon = "";
var enteredDistance = "";
var selectedCategory = "";
var eventName = "";
var dateFrom = null;
var dateTo = null;
var selectedDecision = "";

var addFlag = true;	// flag to handle removed sections
var colorFlag = true;
var sectionFlag = false; //for disabling non-selected sections

function showHideType(id){
	cloneID = id.slice(-1);
	if (isNaN(cloneID)){
		cloneID = "";
	}
	if(cloneID != ""){
		colorFlag = false;
	}else if(cloneID%2 == 0){
		colorFlag = true;		
	}else{
		colorFlag = false;
	}
	sectionFlag = true;
	var v1 = document.getElementById(id);
	var value1 = v1.options[v1.selectedIndex].value;
	if(value1 == 'LatLon'){
		document.getElementById('latlong'+cloneID).style.display = 'block';
	 	document.getElementById("category"+cloneID).style.display = 'none';
	 	document.getElementById("eventName"+cloneID).style.display = 'none';
	 	document.getElementById("duration"+cloneID).style.display = 'none';
	}
	if(value1 == 'Category'){
		document.getElementById('category'+cloneID).style.display = 'block';
	 	document.getElementById("latlong"+cloneID).style.display = 'none';
	 	document.getElementById("eventName"+cloneID).style.display = 'none';
	 	document.getElementById("duration"+cloneID).style.display = 'none';
	}
	if(value1 == 'Name of event'){
		document.getElementById('eventName'+cloneID).style.display = 'block';
	 	document.getElementById("latlong"+cloneID).style.display = 'none';
	 	document.getElementById("category"+cloneID).style.display = 'none';
	 	document.getElementById("duration"+cloneID).style.display = 'none';
	}		
	if(value1 == 'Duration'){
		document.getElementById('duration'+cloneID).style.display = 'block';
	 	document.getElementById("category"+cloneID).style.display = 'none';
	 	document.getElementById("eventName"+cloneID).style.display = 'none';
	 	document.getElementById("latlong"+cloneID).style.display = 'none';
	}	
}

function constructQuery(){
	debugger;
	if(sectionFlag == false){
		
	}else{
		var selectionKey = 0;
		var temp = "";
		
		if(addFlag == false){
			addFlag == true;
		}else{
			var searchOption = document.getElementById("searchControls"+cloneID);
			selectedSearchType = searchOption.options[searchOption.selectedIndex].value;

			var dOption = document.getElementById("selectdecision"+cloneID);
			selectedDecision = dOption.options[dOption.selectedIndex].value;
			
			if(selectedSearchType == "LatLon"){ //1
				selectionKey = 1;
				enteredLat = document.getElementById("lat"+cloneID).value;
				enteredLon = document.getElementById("lon"+cloneID).value;
				var lOption = document.getElementById("distance"+cloneID);
				enteredDistance = lOption.options[lOption.selectedIndex].value;
				temp = enteredLat + "," + enteredLon + "," + enteredDistance;
			}if(selectedSearchType == "Category"){ //3
				selectionKey = 3;
				var cOption = document.getElementById("chooseCategory"+cloneID);
				selectedCategory = cOption.options[cOption.selectedIndex].value;
				temp = selectedCategory;
			}
			if(selectedSearchType == "Name of event"){ //2
				selectionKey = 2;
				eventName = document.getElementById("inputEventName"+cloneID).value;
				temp = eventName;
			}
			if(selectedSearchType == "Duration"){ //4
				selectionKey = 4;
				temp = dateFrom + "," + dateTo;
			}

			if(selectedDecision == "a"){
				requestQuery = requestQuery + selectionKey + "," + temp + "," + "a" +"|";
			}else if(selectedDecision == "o"){
				requestQuery = requestQuery + selectionKey + "," + temp + "," + "o" +"|";
			}else if(selectedDecision == "n"){
				requestQuery = requestQuery + selectionKey + "," + temp + "," + "n" +"|";
			}else if(selectedDecision == "none"){
				requestQuery = requestQuery + selectionKey + "," + temp + "," + "none" +"|";
			}
		}//END else

		$('#latlong'+ cloneID+ ' :input').attr('disabled', true);
		$('#category'+ cloneID+ ' :input').attr('disabled', true);
		$('#eventName'+ cloneID+ ' :input').attr('disabled', true);
		$('#duration'+ cloneID+ ' :input').attr('disabled', true);

		$('#searchControls'+ cloneID).attr('disabled', true);
		$('#selectdecision'+ cloneID).attr('disabled', true);
		sectionFlag = false;
	}
	
	
}

$( document ).ready(function() {
	$("#submitBtn").click(function() {
		debugger;
		
		constructQuery();
		//alert("Submit:	"+requestQuery);

		var checkString = requestQuery.slice(-2).split("|").toString();
		checkString = checkString.replace(',', "");
		
		alert("requestQuery = "+ requestQuery);

		if(!(checkString == "a" || checkString == "o")){
			$.ajax({
				type: "POST",
				url: "EventFinder",
				dataType: "json",
				data: "requestQuery="+requestQuery,
				cache: false,

				success: function(responseObj){
					var arr = new Array();
					var parseObj = JSON.stringify(responseObj);
					arr = JSON.parse(parseObj);
					var latt, lonn, catg;
					for (var i=0; i<arr.length; i++){
						latt = arr[i].latitude;
						lonn = arr[i].longitude;
						catg = arr[i].category;
						var labelmarker= "Category: " + arr[i].category + " SubCategory: "+ arr[i].subcategory +" Number of Participants: "+arr[i].noOfParticipants;
						//pointerimgsrc='map-pointer-icon.png';
						addmarker(latt/10000000, lonn/10000000, catg, labelmarker);
					}
					
					if(arr.length == 0){
						alert("No result found for your selection.");
					}
				},
				error: function(){
					alert('Server failure in retrieving search data!');
				}
			});
		}else{
			alert("Note: You can only select NOT or None in the last proposition! REFRESH NOW!!!");
		}
	});
});

function disableAddMore(){	
	var v = document.getElementById("selectdecision"+cloneID);
	if(v.options[v.selectedIndex].value == 'n'){
		document.getElementById("btnAdd").disabled = true;
	}else{
		document.getElementById("btnAdd").disabled = false;
	}
}

function removeSection(){
	constructQuery();
	cloneID = cloneID - 1;
	var removeStr = "";
	var removeString = requestQuery.split("\|");
	removeString[removeString.length-2] = "";
	removeStr = removeString.join("\|");
	addFlag = false;
	requestQuery = removeStr.substring(0, removeStr.length-1);
	//alert("AFTER = " +removeStr.substring(0, removeStr.length-1));
}

function getFromSearchDate(yearFrom, monthFrom, date){
	dateFrom = yearFrom+"-"+monthFrom+"-"+date;
}

function getToSearchDate(yearTo, monthTo, date){
	dateTo = yearTo+"-"+monthTo+"-"+date;
}