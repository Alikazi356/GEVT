/*
 * Selected Chart Variables
 * */
var selectedChartType = "";
var selectedAxisType = "";
var yAxis = "";
var xAxis = "";

function showHideChartControls(){
		var v = document.getElementById("chartsList");
		selectedChartType = v.options[v.selectedIndex].value;
		
		switch (selectedChartType){
		   case "PieChart":
		   case "PieChart3D":
				dateId = 1;
				$("#xAxisList option[value='noOfEvents']").hide();
				$('#PieChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').hide();
				$('#defineZAxis').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#HeatMapChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
		       break;
		   case "BarChart2D":
				dateId = 2;
				$("#xAxisList option[value='noOfEvents']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$('#BarChart2D').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').hide();
				$('#PieChart').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#HeatMapChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
				break;
		   case "BarChart3D":
			    dateId = 3;
			    $("#xAxisList option[value='noOfEvents']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$('#BarChart3D').show();
				$('#barSliders').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').hide();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#HeatMapChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
				break;
		   case "SplineChart":
		   case "SplineAreaChart":
			    dateId = 4;
			    $("#xAxisList option[value='noOfEvents']").hide();
			    $("#xAxisList option[value='noOfPart']").hide();
				$("#xAxisList option[value='catSubCat']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$("#zAxisList option[value='time']").hide();
				$("#zAxisList option[value='noOfEvents']").hide();
				$('#SplineChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').show();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#HeatMapChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
				break;
		   case "StackedBarChart":
			   	dateId = 8;
			   	$("#xAxisList option[value='noOfEvents']").hide();
			    $("#xAxisList option[value='noOfPart']").hide();
				$("#xAxisList option[value='catSubCat']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$("#zAxisList option[value='time']").hide();
				$("#zAxisList option[value='noOfEvents']").hide();
				$('#StackedBarChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').show();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#BubbleChart').hide();
				
				break;
		   case "ScatterChart":
			    dateId = 6;
			    $("#xAxisList option[value='noOfEvents']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$("#zAxisList option[value='time']").hide();
				$("#zAxisList option[value='noOfEvents']").hide();
				$('#ScatterChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').show();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#HeatMapChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
				break;
		   case "BubbleChart":
			   	dateId = 7;
			   	$("#xAxisList option[value='noOfEvents']").hide();
				$("#yAxisList option[value='time']").hide();
				$("#yAxisList option[value='space']").hide();
				$("#yAxisList option[value='noOfPart']").hide();
				$("#yAxisList option[value='catSubCat']").hide();
				$("#zAxisList option[value='time']").hide();
				$("#zAxisList option[value='noOfEvents']").hide();
				$('#BubbleChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').show();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#HeatMapChart').hide();
				$('#StackedBarChart').hide();
				
				break;
		   case "HeatMapChart":
			   	dateId = 8;
			   	$("#yAxisList option[value='noOfEvents']").hide();
			   	$("#yAxisList option[value='time']").hide();
			   	$("#zAxisList option[value='time']").hide();
				$("#zAxisList option[value='space']").hide();
				$("#zAxisList option[value='noOfPart']").hide();
				$("#zAxisList option[value='catSubCat']").hide();
				$('#HeatMapChart').show();
				$('#defineXAxis').show();
				$('#defineYAxis').show();
				$('#defineZAxis').show();
				$('#PieChart').hide();
				$('#BarChart2D').hide();
				$('#BarChart3D').hide();
				$('#SplineChart').hide();
				$('#SplineAreaChart').hide();
				$('#ScatterChart').hide();
				$('#BubbleChart').hide();
				$('#StackedBarChart').hide();
				
				break;

		   default: 
		       alert('Functionality not available!');
		}
}

var dataArrayCategories = new Array();		//for analysis categories
var dataArraySubCategories = new Array();	//for analysis sub-categories

function getCategoriesOnLoad(){
	$.ajax({
		type: "POST",
		url: "HeatMapGenerator",
		data: "analysisCategories",
		dataType: "json",
		cache: false,
		
		success: function(responseObj){
			var parseObj = JSON.stringify(responseObj);
			dataArrayCategories = JSON.parse(parseObj);
		},
		error: function(){
			alert('Server failure in retrieving search data!');
	    }
	});
	
}
/*
 * showAxis(coordinate) where coordinate is x, y or z
 * This is the only function to show all types of axis for all types of charts
 * */
function showAxis(coordinate){
	var axisList = coordinate + "AxisList";
	var v = document.getElementById(axisList);
	selectedAxisType = v.options[v.selectedIndex].value;
	
	var dataArray = new Array();
    
    var tr, td;
    var table, tableBody;
    var dropdown, opt, i;
    
    if (document.getElementById(axisList+"Table")){
    	document.getElementById(axisList+"Table").remove();
    }
    
    table = document.createElement('TABLE');    
    table.setAttribute("id", axisList+"Table");
	table.setAttribute("class", axisList+"Table");
    table.width='100%';
    
    tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
	
	if(selectedAxisType == "time"){
		dataArray = ["Years", "Seasons", "Months", "Weeks", "Days"];
	    
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "time"+axisList);
	    dropdown.setAttribute("class", "timeAxisList");
	    
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Time selection on the basis of:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    for (i=0; i<dataArray.length; i++){
		    td = document.createElement('TD');
	    	opt = document.createElement("option");
	    	opt.text = dataArray[i];
	    	opt.value = dataArray[i];
	    	opt.id = dataArray[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop
	    $(".axisTable").html("");
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	}
	else if(selectedAxisType == "space"){
		dataArray = ["Latitude/Longitude", "Districts"];
	    
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "space"+axisList);
	    dropdown.setAttribute("class", "spaceAxisList");
	    dropdown.setAttribute("onClick", "hideYaxis()");
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Space selection by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    for (i=0; i<dataArray.length; i++){
		    td = document.createElement('TD');
	    	opt = document.createElement("option");
	    	opt.text = dataArray[i];
	    	opt.value = dataArray[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop
	    $(".axisTable").html("");
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	}
	else if(selectedAxisType == "noOfEvents"){
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "noOfEventsCat"+axisList);	 // noOfEventsCatxAxisList
	    dropdown.setAttribute("class", "noOfEventsCatAxisList"); // noOfEventsSubCatxAxisList
	    dropdown.setAttribute("onchange", "loadAnalysisSubCategories('noOfEventsCat"+axisList+"', 'noOfEventsSubCat"+axisList+"')");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Events by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArrayCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArrayCategories[i];
	    	opt.value = dataArrayCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop
	    $(".axisTable").html("");
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	    
	    dataArraySubCategories = [""];
	    
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "noOfEventsSubCat"+axisList);
	    dropdown.setAttribute("class", "noOfEventsSubCatAxisList");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Events by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArraySubCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArraySubCategories[i];
	    	opt.value = dataArraySubCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop

	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	}
	else if(selectedAxisType == "noOfPart"){
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "noOfPartCat"+axisList);
	    dropdown.setAttribute("class", "noOfPartCatAxisList");
	    dropdown.setAttribute("onchange", "loadAnalysisSubCategories('noOfPartCat"+axisList+"', 'noOfPartSubCat"+axisList+"')");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);

		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Participants by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArrayCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArrayCategories[i];
	    	opt.value = dataArrayCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop

	    $(".axisTable").html("");
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	    
	    dataArraySubCategories = [""];
	    
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "noOfPartSubCat"+axisList);
	    dropdown.setAttribute("class", "noOfPartSubCatAxisList");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Participants by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArraySubCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArraySubCategories[i];
	    	opt.value = dataArraySubCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop

	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	}
	else if(selectedAxisType == "catSubCat"){
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "catSubCatCat"+axisList);
	    dropdown.setAttribute("class", "catSubCatCatAxisList");
	    dropdown.setAttribute("onchange", "loadAnalysisSubCategories('catSubCatCat"+axisList+"', 'catSubCatSubCat"+axisList+"')");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Categories:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArrayCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArrayCategories[i];
	    	opt.value = dataArrayCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop

	    $(".axisTable").html("");
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	    
	    dataArraySubCategories = [""];
	    
	    dropdown = document.createElement("select");
	    dropdown.setAttribute("id", "catSubCatSubCat"+axisList);
	    dropdown.setAttribute("class", "catSubCatSubCatAxisList");
	    dropdown.multiple = "multiple";
	    dropdown.size = "5";
	    tr = document.createElement('TR');
		tableBody.appendChild(tr);
		
		td = document.createElement('TD');
		td.width='40%';
	    td.appendChild(document.createTextNode("Sub-Categories by:"));
	    tr.appendChild(td);
	    
	    opt = document.createElement("option");
	    opt.hidden="true";
	    dropdown.options.add(opt);
	    
	    td = document.createElement('TD');
	    for (i=0; i<dataArraySubCategories.length; i++){
	    	opt = document.createElement("option");
	    	opt.text = dataArraySubCategories[i];
	    	opt.value = dataArraySubCategories[i];
	    	dropdown.options.add(opt);
		    td.appendChild(dropdown);
		    
		    tr.appendChild(td);
	    }// END of for loop
	   
	    document.getElementById("define"+coordinate.toUpperCase()+"Axis").appendChild(table);
	}
}// END of showAxis()

$(function() {	
	$("#from0").datepicker({
		dateFormat: 'dd-mm-yy'
	}); 
});

$(function() {
	$("#to0").datepicker({
		dateFormat: 'dd-mm-yy'
	});
});