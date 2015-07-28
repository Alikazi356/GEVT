var labelx; 
var labely;
var title;
var cat1color;
var cat2color;
var leg1name;
var leg2name;
var chart;

var chartYear = null;
var category = "";
var selectedSeason = null;
var selectedMonths = [];
var yAxis = "";
var selectList = "";
var dataString = "";

var chartType  = "barChart3d";										


function jsonDataPieChart() {
	var yValue = document.getElementById("yearPieChart");				// selected year
	chartYear = yValue.options[yValue.selectedIndex].value;
	
	selectList = document.getElementById("seasonsList1");				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("monthsList1");				// selecting months
	for (var i = 0; i < selectList.options.length; i++) {						
	     if(selectList.options[i].selected ==true){
	    	 selectedMonths[i] = [selectList.options[i].value];
	      }else{
	    	  selectedMonths[i] = 0;
	      }
	}
	
	selectList = document.getElementById("axisList1");				// selecting dimension
	yAxis = selectList.options[selectList.selectedIndex].value;
	
	dataString = 'chartType=' + chartType + '&year=' + chartYear +'&selectedSeason=' + selectedSeason 
				+ '&selectedMonths=' + selectedMonths + '&yAxis=' + yAxis;
	
	alert(dataString);
	// AJAX code to submit form.
	$.ajax({
		type: "POST",
		dataType: "json", 
		url: "ChartGenerator",
		data: dataString,
	
		cache: false,
		success: function(responseObj) {
			var arr = new Array();
			var parseObj = JSON.stringify(responseObj);
			 arr = JSON.parse(parseObj);
			generatePiechart(arr);
		}
	});
	return false;
}

function generatePiechart(array){
	
	title = document.getElementById('titleId1').value;
	if(array.length==0){
		alert("no data for the selection");
		return;
	}
	var dataPoints = [];
	for (var i = 0; i <= array.length-1 ; i++) {	
		dataPoints.push( { label : array[i].category, legendText: array[i].category, y:array[i].noOfEvents});
	}
	
	var chart = new CanvasJS.Chart("chartContainer", {

      title:{
        text: title              
      },
      animationEnabled: true,
      exportFileName: "Pie Chart",
		exportEnabled: true,
      data: [//array of dataSeries              
        { //dataSeries object

         type: "pie",
         showInLegend: true,
  
         dataPoints : dataPoints
       }
       ]
       });

    chart.render();
}

function jsonData3dPieChart() {
	var yValue = document.getElementById("yearPieChart3D");				// selected year
	chartYear = yValue.options[yValue.selectedIndex].value;
	
	selectList = document.getElementById("seasonsList13D");				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("monthsList13D");				// selecting months
	for (var i = 0; i < selectList.options.length; i++) {						
	     if(selectList.options[i].selected ==true){
	    	 selectedMonths[i] = [selectList.options[i].value];
	      }else{
	    	  selectedMonths[i] = 0;
	      }
	}
	
	selectList = document.getElementById("axisList13D");				// selecting dimension
	yAxis = selectList.options[selectList.selectedIndex].value;
	
	dataString = 'chartType=' + chartType + '&year=' + chartYear +'&selectedSeason=' + selectedSeason 
				+ '&selectedMonths=' + selectedMonths + '&yAxis=' + yAxis;
	
	alert(dataString);
	// AJAX code to submit form.
	$.ajax({
		type: "POST",
		dataType: "json", 
		url: "ChartsGenerator",
		data: dataString,
	
		cache: false,
		success: function(responseObj) {
			var arr = new Array();
			var parseObj = JSON.stringify(responseObj);
			 arr = JSON.parse(parseObj);
			 generate3dPieChart(arr);
		}
	});
	return false;
}

function generate3dPieChart(array){		 
	var data = [];

	for (var i = 0; i <= array.length-1 ; i++) {	
		data.push({name : array[i].category, y : array[i].yAxisData});
	}
	$(function () {
		$('#chartContainer').highcharts({
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45,
					beta: 0
				}
			},
			title: {
				text: 'No. of Events per Category per Year'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Category share',
				data:  data
			}]
		});
	});
}

function jsonDataBarChart() {
	chartYear = ""; selectedSeason = ""; selectedMonths = []; yAxis = ""; selectList = "";
	
	selectList = document.getElementById("yearBarChart2D");				// selecting year
	chartYear = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("seasonsList2");				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("monthsList2");				// selecting months
	for (var i = 0; i < selectList.options.length; i++) {						
	     if(selectList.options[i].selected ==true){
	    	 selectedMonths[i] = [selectList.options[i].value];
	      }else{
	    	  selectedMonths[i] = 0;
	      }
	}
	
	selectList = document.getElementById("axisList2");				// selecting dimension
	yAxis = selectList.options[selectList.selectedIndex].value;
	
	dataString = 'chartType=' + chartType + '&year=' + chartYear + '&selectedSeason=' + selectedSeason
						+ '&selectedMonths=' + selectedMonths + '&yAxis=' + yAxis;
		
		// AJAX code to submit values to server.
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "ChartsGenerator",
		data: dataString,
	
		cache: false,
		success: function(responseObj) {
			var arr = new Array();
			var parseObj = JSON.stringify(responseObj);
			 arr = JSON.parse(parseObj);
			 generateBarchart(arr);
		}
		});
	return false;
}

function generateBarchart(array){
	
	labelx = document.getElementById('xId2').value; 
	labely = document.getElementById('yId2').value;
	title = document.getElementById('titleId2').value;
	cat1color = document.getElementById('colorsList2').value;
	leg1name = document.getElementById('legenId2').value;
	
	if(array.length==0){
		alert("no data for the selection");
		return;
	}
	var dataPoints = [];
	for (var i = 0; i <= array.length-1 ; i++) {	
		dataPoints.push( { label : array[i].category, y: array[i].yAxisData});
	}
	
	var chart = new CanvasJS.Chart("chartContainer", {

	      title:{
	        text: title              
	      },
	      theme: "theme3",
	      animationEnabled: true,
	      exportFileName: "Bar Chart",
			exportEnabled: true,
	      axisY:{ 
	    	   title: labelx,
	    	 },
	    	 axisX:{ 
	    		   title: labely,
	    		 },
	      data: [//array of dataSeries              
	        { //dataSeries object

	         /*** Change type "column" to "bar", "area", "line" or "pie"***/
	         type: "column",
	         name: leg1name,
	         showInLegend: true,
	         color: cat1color,  //color of bars
	         dataPoints: dataPoints
	       }
	       ]
	     });

	chart.render();
}
function jsonData3DBarChart() {
	chartYear = ""; selectedSeason = ""; selectedMonths = []; yAxis = ""; selectList = "";
	
	selectList = document.getElementById("yearBarChart3D");				// selecting season
	chartYear = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("seasonsList3");				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	
	selectList = document.getElementById("seasonsList3");				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("monthsList3");				// selecting months
	for (var i = 0; i < selectList.options.length; i++) {						
	     if(selectList.options[i].selected ==true){
	    	 selectedMonths[i] = [selectList.options[i].value];
	      }else{
	    	  selectedMonths[i] = 0;
	      }
	}
	
	selectList = document.getElementById("axisList3");				// selecting dimension
	yAxis = selectList.options[selectList.selectedIndex].value;
	
	dataString = 'chartType=' + chartType + '&year=' + chartYear + '&selectedSeason=' + selectedSeason
				+ '&selectedMonths=' + selectedMonths + '&yAxis=' + yAxis;
		
	// AJAX code to submit values to server.
	$.ajax({
	type: "POST",
	dataType: "json", 
	url: "ChartsGenerator",
	data: dataString,

	cache: false,
	success: function(responseObj) {

		var arr = new Array();
		var parseObj = JSON.stringify(responseObj);
		 arr = JSON.parse(parseObj);
		generate3DBarChart(arr);
	}
	});
	return false;
}

function generate3DBarChart(array){
	var  categories = [];
	var  noOfEvents = [];
	for (var i = 0; i <= array.length-1 ; i++) {	
		categories.push(array[i].category);
		noOfEvents.push(array[i].yAxisData);
	}
	
	$(function () {
		var chart = new Highcharts.Chart({
	        chart: {
	        	renderTo: 'chartContainer',
	            type: 'column',
	            margin: 75,
	            options3d: {
	                enabled: true,
	                alpha: 15,
	                beta: 15,
	                depth: 50,
	                viewDistance: 25
	            }
	        },
	        title: {
	            text: '3D chart with null values'
	        },
	        subtitle: {
	            text: 'Notice the difference between a 0 value and a null point'
	        },
	        plotOptions: {
	            column: {
	                depth: 25
	            }
	        },
	        xAxis: {
	        	categories : categories
	        },
	        yAxis: {
	            title: {
	                text: null
	            }
	        },
	        series: [{
	            name: 'Categories',
	            data: noOfEvents
	        }]
	    });
	    
	    function showValues() {
	        $('#R0-value').html(chart.options.chart.options3d.alpha);
	        $('#R1-value').html(chart.options.chart.options3d.beta);
	    }

	    // Activate the sliders
	    $('#R0').on('change', function () {
	    	chart.options.chart.options3d.alpha = this.value;
	        showValues();
	        chart.redraw(false);
	    });
	    $('#R1').on('change', function () {
	    	chart.options.chart.options3d.beta = this.value;
	        showValues();
	        chart.redraw(false);
	    });

	    showValues();
	});
	
	showSlider();
}

function jsonDataSplineChart(splineID, value) {
	var chartCategory = ""; chartYear = ""; selectedSeason = ""; selectedMonths = []; yAxis = ""; selectList = "";
	
	selectList = document.getElementById("yearScatterChart");					// selecting season
	chartYear = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("category"+splineID);					// selecting season
	chartCategory = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("seasonsList"+splineID);				// selecting season
	selectedSeason = selectList.options[selectList.selectedIndex].value;
	
	selectList = document.getElementById("monthsList"+splineID);				// selecting months
	for (var i = 0; i < selectList.options.length; i++) {
	    if(selectList.options[i].selected ==true){
	    	selectedMonths[i] = [selectList.options[i].value];
	    }else{
	    	selectedMonths[i] = 0;
	    }
	}
	
	selectList = document.getElementById("axisList"+splineID);				// selecting dimension
	yAxis = selectList.options[selectList.selectedIndex].value;
	
	dataString = 'chartType=' + "spline" + '&category=' + chartCategory + '&selectedSeason=' + selectedSeason
				+ '&selectedMonths=' + selectedMonths + '&yAxis=' + yAxis;
	
	var splineType=null;	
	
	if(value == 'Spline'  ){
		splineType = "spline";
		
	}else if (value == 'SplineArea'){
		splineType = "splineArea";
	}

	// AJAX code to submit values to server.
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "ChartsGenerator",
		data: dataString,
		cache: false,

		success: function(responseObj){
			var arr = new Array();
			var parseObj = JSON.stringify(responseObj);
			arr = JSON.parse(parseObj);
			if (value == 'Spline'  || value == 'SplineArea'){
				generateSpline(arr, splineType);
			}else if (value == 'Scatter'){
				generateScatter(arr);
			}
		}
	});
	return false;
}

function generateScatter(arr){	
	var options = {
			chart: {
				renderTo: 'chartContainer',
				type: 'scatter',
				options3d: {
					enabled: true,
					alpha: 10,
					beta: 30,
					depth: 250,
					viewDistance: 5,

					frame: {
						bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
						back: { size: 1, color: 'rgba(0,0,0,0.04)' },
						side: { size: 1, color: 'rgba(0,0,0,0.06)' }
					}
				}
			},
			title: {
				text: 'Draggable box'
			},
			subtitle: {
				text: 'Click and drag the plot area to rotate in space'
			},
			plotOptions: {
				scatter: {
					width: 10,
					height: 10,
					depth: 10
				}
			},
			yAxis: {
				min: 1,
				max: 20,
				title: null
			},
			xAxis: {
				min: 2000,
				max: 2015,
				gridLineWidth: 1
			},
			zAxis: {
				min: 1,
				max: 200
			},
			legend: {
				enabled: true
			},
			series: []
	};

	var categories = [];
	var dPoints = [];

	for (var i=0; i<arr.length-1; i++){
		if((compare(arr[i].category, categories)) == true){
		}
		else{
			categories.push(arr[i].category);
		}
	}
	options.series = new Array();
	for (var cat=0; cat<categories.length-1; cat++){
		for(var i=0; i<arr.length-1; i++){
			if(categories[cat] == arr[i].category){
				dPoints.push({ x : Number(arr[i].eventYear), y: i, z : arr[i].noOfEvents});
			}
		}
		if (dPoints.length > 0){
			options.series[cat] = new Object();
			options.series[cat].name = categories[cat];
			options.series[cat].data = new Array();
			options.series[cat].data = dPoints;
		}
		dPoints = [];
	}	

	$(document).ready(function() {
		chart = new Highcharts.Chart(options);
	});

	// Add mouse events for rotation
	$(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
		e = chart.pointer.normalize(e);

		var posX = e.pageX,
		posY = e.pageY,
		alpha = chart.options.chart.options3d.alpha,
		beta = chart.options.chart.options3d.beta,
		newAlpha,
		newBeta,
		sensitivity = 5; // lower is more sensitive

		$(document).bind({
			'mousemove.hc touchdrag.hc': function (e) {
				// Run beta
				newBeta = beta + (posX - e.pageX) / sensitivity;
				newBeta = Math.min(100, Math.max(-100, newBeta));
				chart.options.chart.options3d.beta = newBeta;

				// Run alpha
				newAlpha = alpha + (e.pageY - posY) / sensitivity;
				newAlpha = Math.min(100, Math.max(-100, newAlpha));
				chart.options.chart.options3d.alpha = newAlpha;

				chart.redraw(false);
			},
			'mouseup touchend': function () {
				$(document).unbind('.hc');
			}
		});
	});
}

function compare(value, cat){
	var v=0;
	
	for(v; v<cat.length-1; v++){
		if(value == cat[v]){
			return true;
		}
	}
	return false;
}

function generateSpline(arr,splineType){
	
	chart = new CanvasJS.Chart("chartContainer",{
		title:{
			text: "Number of Events per Category per Year"             
		}, 
		animationEnabled: true,     
		axisY:{
			titleFontFamily: "arial",
			titleFontSize: 12,
			includeZero: false
		},
		toolTip: {
			shared: true
		},
		data: [],

		legend:{
			cursor:"pointer",
			itemclick:function(e){
				if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else {
					e.dataSeries.visible = true;            
				}
				chart.render();
			}
		}

			});
	chart.render();
	
	var categories = [];
	var dPoints = [];

	for (var i=0; i<arr.length-1; i++){
		if((compare(arr[i].category, categories)) == true){
		}
		else{
			categories.push(arr[i].category);
		}
	}
	
	for (var cat=0; cat<categories.length-1; cat++){
		for(var i=0; i<arr.length-1; i++){
			if(categories[cat] == arr[i].category){
				dPoints.push({ label : arr[i].eventYear, legendText: arr[i].category,  y: arr[i].noOfEvents});
			}
		}
		if (dPoints.length > 0){
			splineRenderer(categories[cat], dPoints, splineType);
		}
		dPoints = [];
	}	
}



function splineRenderer(category, dataPoints, splineType){
	var dataset;
	dataset = { //type: "spline", 
				type : splineType,
	        	showInLegend: true,
				name: category,
				dataPoints : dataPoints
				};
	chart.options.data.push(dataset);
	chart.render();
}

function showSlider(){
	
	if(document.getElementById('sliders').style.display == 'none' ){
		document.getElementById('sliders').style.display = 'block';	 
	}else{
		document.getElementById('sliders').style.display = 'none';
	}
}