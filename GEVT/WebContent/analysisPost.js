/*
 * POST string variables
 * */
var submitPostRequest = "";
var outerBoundaryValues = "";
var xChartValues = "";
var yChartValues = "";
var zChartValues = "";
/*
 * Chart variables
 * */
var axisType = "";
var timeSelection = [];		//Other than year
var timeSelectionId = 0;
var spaceSelection = "";
var spaceSelectionId = 0;
var noOfEventsCat = [];
var noOfEventsSubCat = [];
var noOfPartCat = [];
var noOfPartSubCat = [];
var catSubCatCat = [];
var catSubCatSubCat = [];
var district = "";

var xflag = "";
var yflag = "";
var zflag = "";

/*
 * Functions for analysis.jsp
 * */
function submitAnalysisData(){
	getDistrict(48.11, 11.57);

	//Emptying the variables
	timeSelection = [];
	timeSelectionId = 0;
	spaceSelection = "";
	spaceSelectionId = 0;
	noOfEventsCat = [];
	noOfEventsSubCat = [];
	noOfPartCat = [];
	noOfPartSubCat = [];
	catSubCatCat = [];
	catSubCatSubCat = [];
	submitPostRequest = "";
	
	var maxLat = $("#maxLat0").val();
	var minLong = $("#minLon0").val();
	var maxLong = $("#maxLon0").val();
	var minLat = $("#minLat0").val();
	var startDate = $("#from0").val();
	var endDate = $("#to0").val();
	
	outerBoundaryValues = '&maxLat='+maxLat+'&minLat='+minLat+'&maxLong='+maxLong+'&minLong='+minLong+'&startDate='+startDate
							+'&endDate='+endDate;

	if(selectedChartType == "PieChart" || selectedChartType == "PieChart3D"){
		
		xflag = "yes";
		
		getChartValues('x');	
		xChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
	}
	if((selectedChartType == "BarChart2D") || (selectedChartType == "BarChart3D") || (selectedChartType == "HeatMapChart")){
		xflag = "yes";
		yflag = "yes";
		
		getChartValues('x');		
		xChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
		
		getChartValues('y');		
		yChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
	}
	if((selectedChartType == "SplineChart") || (selectedChartType == "SplineAreaChart") || (selectedChartType == "BubbleChart")
			|| (selectedChartType == "ScatterChart") || (selectedChartType == "StackedBarChart")){
		
		xflag = "yes";
		yflag = "yes";
		zflag = "yes";
		
		getChartValues('x');
		xChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
		
		getChartValues('y');		
		yChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
		
		getChartValues('z');		
		zChartValues = '&timeSelection='+timeSelection+'&timeSelectionId='+timeSelectionId+'&spaceSelection='+"space"+'&spaceSelectionId='
			+spaceSelectionId+'&noOfEventsCat='+noOfEventsCat+'&noOfEventsSubCat='+noOfEventsSubCat+'&noOfPartCat='+noOfPartCat
			+'&noOfPartSubCat='+noOfPartSubCat+'&catSubCatCat='+catSubCatCat+'&catSubCatSubCat='+catSubCatSubCat;
	}
	
	submitPostRequest = "chartType="+selectedChartType+outerBoundaryValues+"&xChartValues="+xflag+xChartValues+"&yChartValues="+yflag+yChartValues+"&zChartValues="+zflag+zChartValues;
	
	var xAxisResults = "";
	var yAxisResults = "";
	var zAxisResults = "";
	
	if(startDate != "" && endDate != ""){
		$.ajax({
			type: "POST",
			url: "ChartGenerator",
			data: submitPostRequest,
			dataType: "json",
			cache: false,
			
			success: function(responseObj){
				var arr = new Array();
				var parseObj = JSON.stringify(responseObj);						
				arr = JSON.parse(parseObj);
				
				xAxisResults = arr[0].xAxis;
				yAxisResults = arr[1].yAxis;
				zAxisResults = arr[2].zAxis;
				
				switch (selectedChartType){
				case "PieChart":
				case "PieChart3D":
					plotAnalysisPieChart(xAxisResults, selectedChartType, axisType);
					break;
				case "BarChart2D":
				case "BarChart3D":
					plotAnalysisBarCharts(xAxisResults, yAxisResults, selectedChartType);
					break;
				case "SplineChart":
				case "SplineAreaChart":	
				case "ScatterChart":
				case "BubbleChart":
				case "StackedBarChart":
				case "HeatMapChart":
					plotAnalysis3DCharts(xAxisResults, yAxisResults, zAxisResults, selectedChartType);
					break;			
				default:
					alert("Selected chart is not available. Please visit the \"Help Section\" for proper guidance.");
				break;
				}//END of Charts switch
				
			},
			error: function(){
				alert('Server failure in retrieving chart data.');
		    }
		});
	}else{
		alert("Required dates are not provided. Please visit the \"Help Section\" for proper guidance.");
	}

}

/*
 * Post: Hit mapquest-nominatim for postcodes
 * */
function getDistrict(lat, lon){
	var url = "http://open.mapquestapi.com/nominatim/v1/reverse?format=xml&lat="+lat+"&lon="+lon+"&zoom=18&addressdetails=1";
	var district = "abcd";
	var temp = [];
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		contentType: "application/xml; charset=utf-8",
		dataType: "xml",
		
		success: function(responseObj){
			district = $(responseObj).find('city_district').text();
			temp = $(responseObj).find('city_district').text().split(" ");
			district = temp[temp.length-1]
		},
		error: function(){
			alert('Server failure in retrieving district data!');
	    }
	});
	return district;
}

/*
 * getChartValues(cord): Where cord= x or y or z
 * */
function getChartValues(cord){
	axisType = $("#"+cord+"AxisList").val();

	if(axisType == "time"){
		timeSelection = $('#time'+cord+'AxisList').val();
		
		if(timeSelection == "Years"){
			timeSelectionId = 1; 				// for Years
		}
		else if(timeSelection == "Seasons"){
			timeSelectionId = 2; 				// for Seasons
		}
		else if(timeSelection == "Months"){
			timeSelectionId = 3; 				// for Months
		}
		else if(timeSelection == "Weeks"){
			timeSelectionId = 4; 				// for Weeks
		}
		else if(timeSelection == "Days"){
			timeSelectionId = 5; 				// for Days
		}
	}else if(axisType == "space"){
		spaceSelection = $('#space'+cord+'AxisList').val();
		
		if(spaceSelection == "Latitude/Longitude"){
			spaceSelectionId = 1; 				// for Latitude/Longitude
		}
		else if(spaceSelection == "Districts"){
			spaceSelectionId = 2; 				// for Seasons
		}
	}else if(axisType == "noOfEvents"){
		noOfEventsCat = $('#noOfEventsCat'+cord+'AxisList').val();
		noOfEventsSubCat = $('#noOfEventsSubCat'+cord+'AxisList').val();
	}
	else if(axisType == "noOfPart"){
		noOfPartCat = $('#noOfPartCat'+cord+'AxisList').val();
		noOfPartSubCat = $('#noOfPartSubCat'+cord+'AxisList').val();
	}
	else if(axisType == "catSubCat"){
		catSubCatCat = $('#catSubCatCat'+cord+'AxisList').val();
		catSubCatSubCat = $('#catSubCatSubCat'+cord+'AxisList').val();
	}
}// END of getChartValues()

/*
 * loadAnalysisSubCategories(): loading sub-categories for selected category
 * */

function loadAnalysisSubCategories(thisCatID, thisSubCatID){
	var value = [];
	var v = document.getElementById(thisCatID);	

	for (var i = 0; i < v.length; i++) {
		if (v.options[i].selected) 
			value.push(v.options[i].value);
	}
	var dataString =  'categoryToFillSubCat=' + value;

	if (value.length > 1){
		var subcategory = document.getElementById(thisSubCatID);
		for(var j=subcategory.options.length-1;j>=0;j--){
			subcategory.remove(j);
		}
	}else{
		$.ajax({
			type: "POST",
			dataType: "json", 
			url: "HeatMapGenerator",
			data: dataString,

			cache: false,
			success: function(responseObj) {
				var arr = new Array();
				var parseObj = JSON.stringify(responseObj);
				arr = JSON.parse(parseObj);
				createAnalysisSubCategoriesComboBox(arr, thisSubCatID);
			}
		});
	}
	return false;
}

function createAnalysisSubCategoriesComboBox(array, thisSubCatID){
	var subcategory = document.getElementById(thisSubCatID);
	var opt = null;

	if (subcategory.options.length > 0){
		for(var j=subcategory.options.length-1;j>=0;j--){
			subcategory.remove(j);
		}
	}

	for(var i=0; i<array.length; i++) { 
		opt = document.createElement('option');
		opt.value = array[i];
		opt.innerHTML = array[i];
		subcategory.appendChild(opt);
	}
}
