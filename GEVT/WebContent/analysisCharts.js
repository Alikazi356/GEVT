var nba = [];	//For HeatMapChart

/*
 * plotAnalysisPieChart(): FUNCTION for plotting PieChart and PieChart3D
 * */
function plotAnalysisPieChart(pieAxisArray, selectedChartType, xSelectedAxisType){	
	if(pieAxisArray.length==0){
		alert("There is no data for this selection. Please visit the \"Help Section\" for proper guidance.");
		return;
	}else{		
		var dataPoints = [];
		var xselectedAxisData = [];
		var yValue = [];
		var timeType = $("#timexAxisList").val();

		switch(xSelectedAxisType){
		case "time":		
			xselectedAxisData = getTimeAxisData(pieAxisArray, timeType);
			for(var i=0; i<pieAxisArray.length; i++){
				yValue[i] = pieAxisArray[i].noOfEvents;
			}		
			break;
		case "space":
			if($("#spacexAxisList").val() == "Districts"){
				xselectedAxisData = getDistrictsData(pieAxisArray);
				yValue = getEventsAxisData(pieAxisArray, "x", selectedChartType, xSelectedAxisType);
			}else{
				alert("Not a valid selection. Please visit the \"Help Section\" for proper guidance.");
				return;
			}
			break;
		case "noOfEvents":
			alert(xSelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			break;
		case "noOfPart":
			xselectedAxisData = getParticipantsAxisData(pieAxisArray, "x");
			yValue = getEventsAxisData(pieAxisArray, "x", selectedChartType, xSelectedAxisType);
			break;
		case "catSubCat":
			xselectedAxisData = getCategoriesAxisData(pieAxisArray, "x");
			yValue = getEventsAxisData(pieAxisArray, "x", selectedChartType, xSelectedAxisType);	
			break;
		default:
			alert(xSelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			return;
		}

		var array2D = new Array();																				
		array2D = [];
		array2D = getChartDataArray2D(xselectedAxisData, yValue);						//2dArray generator

		var chartTitle = $("#pieChartTitle").val();

		if(selectedChartType == "PieChart"){		
			for(var j=0; j<array2D.length; j++){
				dataPoints.push({ label: array2D[j][0], legendText: array2D[j][0], y:array2D[j][1] });
			}

			var chart = new CanvasJS.Chart("chartContainer", {
				title:{
					text: chartTitle              
				},
				animationEnabled: true,
				exportFileName: "Pie Chart",
				exportEnabled: true,
				data: [{
						type: "pie",
				    	showInLegend: true,
				    	dataPoints : dataPoints
				       }]
			});
			chart.render();
			
		}else if(selectedChartType == "PieChart3D"){
			for(var j=0; j<array2D.length; j++){
				dataPoints.push({ label: array2D[j][0], legendText: array2D[j][0], y:array2D[j][1] });
			}
			
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
		            text: chartTitle
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
					data:  array2D
				}]
		    });
		}
	}//END of else
}//END of plotAnalysisPieChart()

/* 
 * splotAnalysisBarCharts(): For Bar Chart 2D/3D plots
 **/ 
function plotAnalysisBarCharts(xAxisResults, yAxisResults, selectedChartType){
	if(xAxisResults.length==0 || yAxisResults.length==0){
		alert("There is no data for this selection. Please visit the \"Help Section\" for proper guidance.");	
	}else{
		var dataPoints = [];
		var xselectedAxisData = [];
		var yselectedAxisData = [];
		
		var xSelectedAxisType = $("#xAxisList").val();
		var ySelectedAxisType = $("#yAxisList").val();	
		var timeType = $("#timexAxisList").val();
		
		switch(xSelectedAxisType){
		case "time":
			xselectedAxisData = getTimeAxisData(xAxisResults, timeType);	
			break;
		case "space":			
			if($("#spacexAxisList").val() == "Districts"){
				xselectedAxisData = getDistrictsData(xAxisResults);
			}else {
				alert("Not a valid selection. Please visit the \"Help Section\" for proper guidance.");
				return;
			}
			break;
		case "noOfEvents":
			xselectedAxisData = getEventsAxisData(xAxisResults, "x", selectedChartType, xSelectedAxisType);
			break;
		case "noOfPart":
			xselectedAxisData = getParticipantsAxisData(xAxisResults, "x");
			break;
		case "catSubCat":
			xselectedAxisData = getCategoriesAxisData(xAxisResults, "x");
			break;
		default:
			alert(xSelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			return;
		}
		
		switch(ySelectedAxisType){
		case "time":
			yselectedAxisData = getTimeAxisData(xAxisResults, timeType);		
			break;
		case "noOfEvents":
			yselectedAxisData = getEventsAxisData(xAxisResults, "y", selectedChartType, xSelectedAxisType);
			break;
		case "noOfPart":
			yselectedAxisData = getParticipantsAxisData(xAxisResults, "y");
			break;
		case "catSubCat":
			yselectedAxisData = getCategoriesAxisData(xAxisResults, "y");
			break;
		default:
			alert(ySelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			return;
		}

		debugger;
		
		var array2D = new Array();
		array2D = [];
		array2D = getChartDataArray2D(xselectedAxisData, yselectedAxisData);
		
		if(selectedChartType == "BarChart2D"){
			for(var j=0; j<array2D.length; j++){
				if(array2D[j][0] != ""){
					dataPoints.push({ label: array2D[j][0], legendText: array2D[j][0], y:array2D[j][1] });
				}
			}
			
			// Chart legends and labels data
			var barTitle = $("#titleId2").val();
			var xLabel = $("#xId2").val();
			var yLabel = $("#yId2").val();
			var barLegend = $("#legenId2").val();
			var barColor = $("#colorsList2").val();

			if(barColor != ""){
				var chart = new CanvasJS.Chart("chartContainer", {
					title:{
						text: barTitle              
					},
					theme: "theme3",
					animationEnabled: true,
					exportFileName: "Bar Chart",
					exportEnabled: true,
					axisY:{ 
						title: xLabel,
					},
					axisX:{ 
						title: yLabel,
						labelAngle: 60,
						labelFontSize: 20
					},
					data: [{
				    	   type: "column",
				    	   name: barLegend,
				    	   legendText : barLegend,
				    	   showInLegend: true,
				    	   color: "#"+barColor,  //color of bars
				    	   dataPoints: dataPoints
					       }]
				});

				chart.render();
			}else{
				alert("Please select a color for the bars.");
			}
		}else if(selectedChartType == "BarChart3D"){
			var xAxisBar = [];
			var yAxisBar = [];
			for(var j=0; j<array2D.length; j++){
				if(array2D[j][0] != ""){
					xAxisBar.push(array2D[j][0]);
					yAxisBar.push(array2D[j][1]);
				}
			}
			
			// Chart legends and labels data
			var barTitle = $("#titleId3").val();
			var xLabel = $("#xId3").val();
			var yLabel = $("#yId3").val();
			var barLegend = $("#legenId3").val();
			var barColor = $("#colorsList3").val();
			
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
						text: barTitle
					},
					plotOptions: {
						column: {
							depth: 25
						}
					},
					xAxis: {
						categories : xAxisBar,
						title: {
							text: xLabel
						}
					},
					yAxis: {
						title: {
							text: yLabel
						}
					},
					series: [{
						name: barLegend,
						color: "#"+barColor,
						data: yAxisBar
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
	}//END of else
}//END of plotAnalysisBarCharts()

/*
 * plotAnalysis3DCharts(): Function for 3D Chart.
 * */
function plotAnalysis3DCharts(xAxisResults, yAxisResults, zAxisResults, selectedChartType){
	if(xAxisResults.length==0 || yAxisResults.length==0){
		alert("There is no data for this selection. Please visit the \"Help Section\" for proper guidance.");	
	}else{
		var ySelection = true;							//For space in X-Axis
		var spaceSelection = false;
		var dataPoints = [];
		var xselectedAxisData = [];
		var yselectedAxisData = [];
		var zselectedAxisData = [];
		var xSelectedAxisType = $("#xAxisList").val();
		var ySelectedAxisType = $("#yAxisList").val();
		var zSelectedAxisType = $("#zAxisList").val();
		var timeType = $("#timexAxisList").val();
		debugger;
		switch(xSelectedAxisType){
		case "time":
			xselectedAxisData = getTimeAxisData(xAxisResults, timeType);	
			break;
		case "space":
			if($("#spacexAxisList").val() == "Districts"){
				xselectedAxisData = getDistrictsData(xAxisResults);
			}else if($("#spacexAxisList").val() == "Latitude/Longitude"){
				xselectedAxisData = getLatitudesData(xAxisResults);
				yselectedAxisData = getLongitudesData(xAxisResults);
				ySelection = false;
				spaceSelection = true;
			}
			break;
		case "noOfPart":
			xselectedAxisData = getParticipantsAxisData(xAxisResults, "x");
			break;
		case "catSubCat":
			xselectedAxisData = getCategoriesAxisData(xAxisResults, "x");
			break;
		default:
			alert(xSelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			return;
		}
		debugger;
		if(ySelection){
			switch(ySelectedAxisType){
			case "time":
				yselectedAxisData = getTimeAxisData(xAxisResults, timeType);		
				break;
			case "noOfEvents":
				yselectedAxisData = getEventsAxisData(xAxisResults, "y", selectedChartType, xSelectedAxisType);
				break;
			case "noOfPart":
				yselectedAxisData = getParticipantsAxisData(xAxisResults, "y");
				break;
			case "catSubCat":
				yselectedAxisData = getCategoriesAxisData(xAxisResults, "y");
				break;
			default:
				alert(ySelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
				return;
			}
		}
		debugger;

		switch(zSelectedAxisType){
		case "time":
			zselectedAxisData = getTimeAxisData(xAxisResults, timeType);		
			break;
		case "noOfEvents":
			zselectedAxisData = getEventsAxisData(xAxisResults, "z", selectedChartType, xSelectedAxisType);
			break;
		case "noOfPart":
			zselectedAxisData = getParticipantsAxisData(xAxisResults, "z");
			break;
		case "catSubCat":
			zselectedAxisData = getCategoriesAxisData(xAxisResults, "z");
			break;
		default:
			alert(zSelectedAxisType +" is not a valid selection. Please visit the \"Help Section\" for proper guidance.");
			return;
		}

		debugger;
		
		if(selectedChartType == "SplineChart" || selectedChartType == "SplineAreaChart"){
			// Chart legends and labels data
			var splineTitle = $("#titleId4").val();
			var xLabel = $("#xId4").val();
			var yLabel = $("#yId4").val();
			
			var chart = new CanvasJS.Chart("chartContainer",{
				title:{
					text: splineTitle
				},
				animationEnabled: true,
				axisX:{
					labelAngle: 60,
					intervalType: "",
					title: xLabel
				},
				axisY:{
					title: yLabel
				},
				
				data: []
			});

			chart.render();
			if(selectedChartType == "SplineChart"){
				chart = populateStackedDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, chart, "spline");
			}else{
				chart = populateStackedDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, chart, "splineArea");
			}
			debugger;
			var numberOfDataObjects = chart.options.data.length;
			var sortDataPointArray = [];

			for(var i=0; i< numberOfDataObjects; i++){
				sortDataPointArray = chart.options.data[i].dataPoints.sort(sortObjectArray);
				chart.options.data[i].dataPoints = [];
				for(var j=0; j<sortDataPointArray.length; j++){
					chart.options.data[i].dataPoints.push(sortDataPointArray[j]);
				}				
				sortDataPointArray = [];
			}
			debugger;
			chart.render();
		}else if(selectedChartType == "StackedBarChart"){
			// Chart legends and labels data
			var stackTitle = $("#titleId5").val();
			var xLabel = $("#xId5").val();
			var yLabel = $("#yId5").val();
			
			var chart = new CanvasJS.Chart("chartContainer",{
				title:{
					text: stackTitle   
				},
				animationEnabled: true,
				axisX:{
					intervalType: "",
					title: xLabel
				},
				axisY:{
					title: yLabel
				},
				
				data: []
			});

			chart.render();
			
			chart = populateStackedDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, chart, "stackedBar");
			chart.render();
			debugger;
		}else if(selectedChartType == "ScatterChart"){
			// Chart legends and labels data
			var scatterTitle = $("#titleId6").val();
			var scatterSubTitle = $("#subTitleId6").val();
			var xLabel = $("#xId6").val();
			var yLabel = $("#yId6").val();
			var zLabel = $("#zId6").val();

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
						text: scatterTitle
					},
					subtitle: {
						text: scatterSubTitle
					},
					plotOptions: {
						scatter: {
							width: 10,
							height: 10,
							depth: 10
						}
					},
					xAxis: {
						tickInterval: 1,
						gridLineWidth: 1,
						title: {
			                text: xLabel
			            }
					},
					yAxis: {
						tickInterval: 1,
						title: null,
						title: {
			                text: yLabel
			            }
					},					
					zAxis: {
						tickInterval: 1,
						title: {
			                text: zLabel
			            }
					},
					legend: {
						enabled: true
					},
					series: []
			};
			
			populateScatterDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, options);
			
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
		}else if(selectedChartType == "BubbleChart"){
			// Chart legends and labels data
			var bubbleTitle = $("#titleId7").val();
			var xLabel = $("#xId7").val();
			var yLabel = $("#yId7").val();
			var zLabel = $("#zId7").val();
			
			var options = {
					chart: {
						renderTo: 'chartContainer',
						type: 'bubble',
						zoomType: 'xy'
					},
					title: {
			            text: bubbleTitle
			        },
					xAxis: {
						tickInterval: 1,
						gridLineWidth: 1,
						title: {
			                text: xLabel
			            }
					},
					yAxis: {
						tickInterval: 1,
						title: null,
						title: {
			                text: zLabel
			            }
					},					
					zAxis: {
						tickInterval: 1,
						title: {
			                text: xLabel
			            }
					},
					legend: {
						enabled: true
					},
			        series: []
			};
			debugger;
			populateBubbleDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, options);	
			
			$(document).ready(function() {
				chart = new Highcharts.Chart(options);
			});
		}else if(selectedChartType == "HeatMapChart"){
			var xyMerger = new Array();	
			xyMerger = [];
			xyMerger = getChartDataArray2D(xselectedAxisData, yselectedAxisData);
			
			var hash3D = {};
			hash3D = populateHash3D(xyMerger, zselectedAxisData);					//Setting (x,y) as key and corresponding y as value
			
			var xlabelValues = [];
			xlabelValues = xselectedAxisData.filter(getDistinctValues).sort(sortArray);
			
			var ylabelValues = [];
			ylabelValues = yselectedAxisData.filter(getDistinctValues).sort(sortArray);

			var zAxisArray = [];
			
			var zValue = 0;
			var itr = 0;
			nba[0] = [];
			nba[0][0] = "Name";
			for(var k=0; k< xlabelValues.length; k++){				
				nba[0][k+1] = xlabelValues[k];				
			}
			debugger;
			for(var k=0; k< ylabelValues.length; k++){
				nba[k+1] = [];
				nba[k+1][0] = ylabelValues[k];
				for(var e=1; e<nba[0].length; e++){				
					zValue = hash3D[nba[0][e]+","+ylabelValues[k]];
					if(typeof zValue == "undefined"){
						nba[k+1][e] = 0;
						zAxisArray[itr] = 0;
						itr++;
					}else{
						nba[k+1][e] = zValue;										//nba storing values for the hashmap chart
						zAxisArray[itr] = zValue;
						itr++;
					}
				}
			}// End of for loop	
			debugger;
			var maxValue = Math.max.apply(Math,zAxisArray);
			var midValue = maxValue/2;
			var minValue = Math.min.apply(Math,zAxisArray);
			
			/* Convert from tabular format to array of objects. */
			var cols = nba.shift();
			nba = nba.map(function(d) {return pv.dict(cols, function() {return d[this.index];});});
			cols.shift();

			/* The color scale ranges 3 standard deviations in each direction. */
			var x = pv.dict(cols, function(f) {return pv.mean(nba, function(d) {return d[f];});}),
			    s = pv.dict(cols, function(f) {return pv.deviation(nba, function(d) {return d[f];});}),
				//fill = pv.dict(cols, function(f) {return pv.Scale.linear(0, 50, 100).range('green', 'yellow', 'red');});
			    fill = pv.dict(cols, function(f) {return pv.Scale.linear(minValue, midValue, maxValue).range('green', 'yellow', 'red');});

			var w = 50, h = 20;
			
			var vis = new pv.Panel()
				.canvas('chartContainer')
			    .width(cols.length * w)
			    .height(nba.length * h)
			    .top(70)
			    .left(100.5)
			    .right(.5)
			    .bottom(.5);

			vis.add(pv.Panel)
			    .data(cols)
			    .left(function() {return this.index * w;})
			    .width(w)
			  .add(pv.Panel)
			    .data(nba)
			    .top(function() {return this.index * h;})
			    .height(h)
			    .strokeStyle("white")
			    .lineWidth(1)
			    .fillStyle(function(d, f) {return fill[f](d[f]);})
			    .title(function(d, f) {return d.Name + "'s " + f + ": " + d[f];});

			vis.add(pv.Label)
			    .data(cols)
			    .left(function() {return this.index * w + w / 2;})
			    .top(0)
			    .textAngle(-Math.PI / 2)
			    .textBaseline("middle");

			vis.add(pv.Label)
			    .data(nba)
			    .left(0)
			    .top(function() {return this.index * h + h / 2;})
			    .textAlign("right")
			    .textBaseline("middle")
			    .text(function(d) {return d.Name;});

			vis.render();
			$("#chartContainer").css("display","");
			$("#chartContainer").css("overflow","auto");
		}
	}//END of else part
}//END of plotAnalysis3DCharts()

/*
 * populateStackedDataPoints(): Function for populating dataPoints for Stacked bar Chart.
 * */
function populateStackedDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, chart, chartType){
	var dPoints = [];

	var xzMerger = new Array();	
	xzMerger = [];
	xzMerger = getChartDataArray2D(xselectedAxisData, zselectedAxisData);
	
	var hash3D = {};
	hash3D = populateHash3D(xzMerger, yselectedAxisData);					//Setting (x,z) as key and corresponding y as value
			
	var temp = [];
	var xAxis = [];
	var yAxis = [];
	var zAxis = [];
	var iterator = 0;
	for (var key in hash3D){												//Getting x,y,z axis values of k size for the chart
		temp = key.toString().split(",");
		xAxis[iterator] = temp[0];
		yAxis[iterator] = hash3D[key];
		zAxis[iterator] = temp[1];
		iterator++;
	}

	var xlabelValues = [];
	xlabelValues = xAxis.filter(getDistinctValues).sort(sortArray);			//Getting distinct and ordered values
	
	var zlabelValues = [];
	zlabelValues = zAxis.filter(getDistinctValues).sort(sortArray);			//Getting distinct and ordered values

	var dataPointxValue = 0;
	debugger;
	for(var c=0; c<zlabelValues.length; c++){
		for(var i=0; i<zAxis.length; i++){
			if(zlabelValues[c] == zAxis[i]){
				dataPointxValue = getXValue(xAxis[i]);
				if($("#timexAxisList").val() == "Days"){
					dPoints.push({ label: xAxis[i], x: new Date(dataPointxValue), y: yAxis[i] });
				}else if($("#timexAxisList").val() == "Months"){
					chart.options.axisX.intervalType = "month";
					dPoints.push({ x: new Date(xAxis[i]), y: yAxis[i] });
				}else if($("#timexAxisList").val() == "Weeks"){
					chart.options.axisX.intervalType = "week";
					chart.options.axisX.valueFormatString = "####-Week(##)";					
					dPoints.push({ x: Number(dataPointxValue), y: yAxis[i] });
				}else if($("#timexAxisList").val() == "Seasons"){
					chart.options.axisX.valueFormatString = "####-#";					
					dPoints.push({ x: Number(dataPointxValue), y: yAxis[i] });
				}
				else if($("#timexAxisList").val() == "Years"){
					chart.options.axisX.intervalType = "year";						
					chart.options.axisX.interval= 1;
					chart.options.axisX.valueFormatString = "";					
					dPoints.push({ x: Number(dataPointxValue), y: yAxis[i] });
				}else{
					//dPoints.push({ label: xAxis[i], x: Number(i), y: yAxis[i] });
					chart.options.axisX.interval= 1;
					dPoints.push({ x: Number(dataPointxValue), y: yAxis[i] });
				}
			}
		}
		if (dPoints.length > 0){
			stackedRenderer(zlabelValues[c], dPoints, chart, chartType);				
		}
		dPoints = [];
	}
	return chart;
}//END of populateStackedDataPoints()

function stackedRenderer(zLabel, dataPoints, chart, chartType){
	var dataset;
	dataset = { 
				//type : 'stackedBar',
				type : chartType,
	        	showInLegend: true,
				name: zLabel,
				dataPoints : dataPoints
				};
	chart.options.data.push(dataset);
	//chart.render();
}

/*
 * populateScatterDataPoints(): Function for populating dataPoints for Scatter Chart.
 * */
function populateScatterDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, options){	
	var xzMerger = new Array();	
	xzMerger = [];
	xzMerger = getChartDataArray2D(xselectedAxisData, zselectedAxisData);
	
	var hash3D = {};
	hash3D = populateHash3D(xzMerger, yselectedAxisData);					//Setting (x,z) as key and corresponding y as value
	
	var zlabelValues = [];
	zlabelValues = zselectedAxisData.filter(getDistinctValues).sort(sortArray);
	
	var xlabelValues = [];
	xlabelValues = xselectedAxisData.filter(getDistinctValues).sort(sortArray);
	
	var dPoints = [];
	var temp = [];
	var xAxis = [];
	var yAxis = [];
	var zAxis = [];
	var iterator = 0;
	for (var key in hash3D){												//Getting x,y,z axis values of k size for the chart
		temp = key.toString().split(",");
		xAxis[iterator] = temp[0];
		yAxis[iterator] = hash3D[key];
		zAxis[iterator] = temp[1];
		iterator++;	
	}		
	
	iterator = 0;
	var xAxisIndex = -1;
	for(var c=0; c<zlabelValues.length; c++){
		if(zlabelValues[c] != ""){
			for(var i=0; i<zAxis.length; i++){
				if(zlabelValues[c] == zAxis[i]){
					xAxisIndex = findValueInArray(xlabelValues, xAxis[i]);
					dPoints.push({ x : Number(xAxisIndex), y: Number(yAxis[i]), z : Number(c)});
				}
			}
		}
		if (dPoints.length > 0){
			options.series[iterator] = new Object();
			options.series[iterator].name = zlabelValues[c];
			options.series[iterator].data = new Array();
			options.series[iterator].data = dPoints;
			iterator++;
			/*if(zlabelValues[c] == zAxis[i]){
				dPoints.push({ label: xAxis[i], y: yAxis[i] });
			}*/
		}
		dPoints = [];
	}
	options.xAxis.categories = xlabelValues;
	options.zAxis.categories = zlabelValues;
		
}//END of populateScatterDataPoints()

/*
 * populateBubbleDataPoints(): Function for populating dataPoints for Scatter Chart.
 * */
function populateBubbleDataPoints(xselectedAxisData, yselectedAxisData, zselectedAxisData, options){
	var xzMerger = new Array();	
	xzMerger = [];
	xzMerger = getChartDataArray2D(xselectedAxisData, zselectedAxisData);
	
	var hash3D = {};
	hash3D = populateHash3D(xzMerger, yselectedAxisData);					//Setting (x,z) as key and corresponding y as value
	
	debugger;
	
	var zlabelValues = [];
	zlabelValues = zselectedAxisData.filter(getDistinctValues).sort(sortArray);
	
	var xlabelValues = [];
	xlabelValues = xselectedAxisData.filter(getDistinctValues).sort(sortArray);
	
	var dPoints = [];
	var temp = [];
	var xAxis = [];
	var yAxis = [];
	var zAxis = [];
	var iterator = 0;
	for (var key in hash3D){												//Getting x,y,z axis values of k size for the chart
		temp = key.toString().split(",");
		xAxis[iterator] = temp[0];
		yAxis[iterator] = hash3D[key];
		zAxis[iterator] = temp[1];
		iterator++;	
	}		
	debugger;
	iterator = 0;
	var xAxisIndex = -1;
	for(var c=0; c<zlabelValues.length; c++){
		if(zlabelValues[c] != ""){
			for(var i=0; i<zAxis.length; i++){
				if(zlabelValues[c] == zAxis[i]){
					xAxisIndex = findValueInArray(xlabelValues, xAxis[i]);
					dPoints.push({ x : Number(xAxisIndex), y: Number(yAxis[i]), z : Number(yAxis[i])});
				}
			}
		}
		if (dPoints.length > 0){
			options.series[iterator] = new Object();
			options.series[iterator].name = zlabelValues[c];
			
			options.series[iterator].data = new Array();
			options.series[iterator].data = dPoints;
			iterator++;
		}
		dPoints = [];
	}
	debugger;
	options.xAxis.categories = xlabelValues;
	options.zAxis.categories = zlabelValues;
}//END of populateBubbleDataPoints()

/*
 * pieChartDataArrayGenerator(): Function for populating dataPoints for pie charts.
 * */
function getChartDataArray2D(xAxisData, yAxisData){
	var xyMergedArray = new Array();
	xyMergedArray = [];
	
	//MERGING point to point x-Axis with y-Axis
	for(var n=0; n<xAxisData.length; n++){
		xyMergedArray[n] = [];
		xyMergedArray[n][0] = xAxisData[n];
		
		// y-Axis is supposed to be of the same range as x-Axis is!
		if(n < yAxisData.length){
			xyMergedArray[n][1] = yAxisData[n];
		}else{
			xyMergedArray[n][1] = 0;
		}
	}

	//REMOVING empty values from MERGED 2D array
	var temp2D = new Array();
	temp2D = [];
	var iterate = 0;
	
	for(var n=0; n<xyMergedArray.length; n++){
		if(xyMergedArray[n][0] != "" || xyMergedArray[n][0] != 0){
			temp2D[iterate] = [];
			temp2D[iterate][0] = xyMergedArray[n][0];
			temp2D[iterate][1] = xyMergedArray[n][1];
			iterate++;
		}
	}

	//SUMMING up & ORDERING x-Axis.
	var tempDistinctxAxisPoints = xAxisData.filter(getDistinctValues).sort(sortArray);
	var distinctxAxisPoints = [];
	iterate = 0;
	for(var n=0; n<tempDistinctxAxisPoints.length; n++){
		if(tempDistinctxAxisPoints[n] != "" || tempDistinctxAxisPoints[n] != 0){
			distinctxAxisPoints[iterate] = tempDistinctxAxisPoints[n];
			iterate++;
		}
	}
	
	//POPULATING array2D finally.
	var entryFlag = 0;	
	iterate = 0;
	var array2D = new Array();
	array2D = [];
	array2D[iterate] = [];	
	if (typeof yAxisData[0] === "string"){
		array2D[0][0] = "";
		array2D[0][1] = "";
	}else{
		array2D[0][0] = "";
		array2D[0][1] = 0;
	}
	
	for(var i=0; i<distinctxAxisPoints.length; i++){
		for(var k=0; k<temp2D.length; k++){
			if(distinctxAxisPoints[i] == temp2D[k][0]){
				array2D[iterate][0] = temp2D[k][0];
				array2D[iterate][1] = array2D[iterate][1] + temp2D[k][1];
				entryFlag = 1;
				
				if(typeof(array2D[iterate][1]) == "string"){
					iterate++;
					array2D[iterate] = [];
					array2D[iterate][0] = "";
					array2D[iterate][1] = "";
				}
			}
		}//END of inner for loop
		if((typeof(array2D[iterate][1]) != "string") && entryFlag == 1 && i<distinctxAxisPoints.length-1) {
			iterate++;
			array2D[iterate] = [];
			array2D[iterate][0] = "";
			array2D[iterate][1] = 0;
			entryFlag = 0;
		}
	}//END of outer for loop
return array2D;
}//END of pieChartDataArrayGenerator()

/*
 * populateHash3D(): Function for populating hashmap with xzMerger as key and yAxis as value
 * */
function populateHash3D(xzMerger, yselectedAxisData){
	var hashMap = {};
	var value = 0;
	for(var i=0; i<xzMerger.length; i++){
		value = 0;
		if(xzMerger[i][0] != ""){
			if(xzMerger[i][1] != ""){
				if(hashMap[xzMerger[i]] == undefined){
					hashMap[xzMerger[i]]  = yselectedAxisData[i];
				}else{
					value = hashMap[xzMerger[i]] + yselectedAxisData[i];
					hashMap[xzMerger[i]] =  value;
				}
			}
		}		
	}
	return hashMap;
}//END of populateHash3D()

/* getTimeAxisData(): Function for getting the time data.
 */
function getTimeAxisData(axisArray, timeType){
	var timeData = [];
	
	switch(timeType){
	case "Years":		
		for(var i=0; i<axisArray.length; i++){
			timeData[i] = new Date(axisArray[i].time).getFullYear().toString();		//getting year from the date
		}
		break;
	case "Seasons":
		for(var i=0; i<axisArray.length; i++){									//getting season with year from the date
			var year = new Date(axisArray[i].time).getFullYear().toString();		
			var month = (new Date(axisArray[i].time).getUTCMonth() + 1).toString();
			var season = "";
			
			switch(month){
			case "12":
			case "1":
			case "2":
				season = "Winter";
				break;
			case "3":
			case "4":
			case "5":
				season = "Spring";
				break;
			case "6":
			case "7":
			case "8":
				season = "Summer";
				break;
			case "9":
			case "10":
			case "11":
				season = "Autumn";
				break;
			default:
				alert("Season cannot be calculate for the given date.");
			}
			timeData[i] = year+"-"+season;
		}
		break;
	case "Months":
		for(var i=0; i<axisArray.length; i++){									//getting month with year from the date
			var year = new Date(axisArray[i].time).getFullYear().toString();		
			var month = new Date(axisArray[i].time).getUTCMonth() + 1;
			timeData[i] = year+"-"+month;
		}
		break;
	case "Weeks":
		for(var i=0; i<axisArray.length; i++){									//getting week with year from the date
			var year = new Date(axisArray[i].time).getFullYear().toString();		
			var week = new Date(axisArray[i].time).getWeek().toString();
			if(week.length == 1){
				timeData[i] = year+"-0"+week;	
			}else{
				timeData[i] = year+"-"+week;	
			}
		}
		break;
	case "Days":
		for(var i=0; i<axisArray.length; i++){
			timeData[i] = axisArray[i].time.toString();							//getting only the date
		}
		break;
	default:
		alert("Functionality not found for axis type");
	}
	return timeData; 
}//END of getTimeAxisData()

/*
 * getEventsAxisData(); Function for getting categories data
 */ 
function getEventsAxisData(axisArray, coordinate, chartType, axisType){
	if((chartType == "PieChart" || chartType == "PieChart3D") && (axisType == "catSubCat")){	//First 2 check only to solve PieCharts issue 
		var selectedCatg = $("#catSubCatCat"+coordinate+"AxisList").val();
		var selectedSubCatg = $("#catSubCatSubCat"+coordinate+"AxisList").val();
	}else if((chartType == "PieChart" || chartType == "PieChart3D") && (axisType == "noOfPart")){
		var selectedCatg = $("#noOfPartCat"+coordinate+"AxisList").val();
		var selectedSubCatg = $("#noOfPartSubCat"+coordinate+"AxisList").val();
	}else{
		var selectedCatg = $("#noOfEventsCat"+coordinate+"AxisList").val();
		var selectedSubCatg = $("#noOfEventsSubCat"+coordinate+"AxisList").val();
	}
	
	var eventsArray = [];
	
	if(selectedSubCatg == null || selectedSubCatg == ""){
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].category, selectedCatg) == -1){				//Filtering process, considering selected categories			
				eventsArray[i] = 0;
			}else{
				eventsArray[i] = axisArray[i].noOfEvents;
			}
		}
	}else {
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].subcategory, selectedSubCatg) == -1){		//Filtering process, considering selected subcategories			
				eventsArray[i] = 0;
			}else{
				eventsArray[i] = axisArray[i].noOfEvents;
			}
		}
	}
	return eventsArray;
}//END of getEventsAxisData()


/*
 * getParticipantsAxisData(); Function for getting participants data
 * */
function getParticipantsAxisData(axisArray, coordinate){
	var selectedCatg = $("#noOfPartCat"+coordinate+"AxisList").val();
	var selectedSubCatg = $("#noOfPartSubCat"+coordinate+"AxisList").val();
	
	var partsArray = [];
	
	if(selectedSubCatg == null || selectedSubCatg == ""){
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].category, selectedCatg) == -1){				//Filtering process, considering selected categories			
				partsArray[i] = "";
			}else{
				partsArray[i] = axisArray[i].noOfParticipants;
			}
		}
	}else {
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].subcategory, selectedSubCatg) == -1){		//Filtering process, considering selected subcategories			
				partsArray[i] = "";
			}else{
				partsArray[i] = axisArray[i].noOfParticipants;
			}
		}
	}
	return partsArray;
}//END of getParticipantsAxisData()

/*
 * getCategoriesAxisData(); Function for getting categories data
 * */
function getCategoriesAxisData(axisArray, coordinate){
	var selectedCatg = $("#catSubCatCat"+coordinate+"AxisList").val();
	var selectedSubCatg = $("#catSubCatSubCat"+coordinate+"AxisList").val();
	
	var catsArray = [];
	
	if(selectedSubCatg == null || selectedSubCatg == ""){
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].category, selectedCatg) == -1){		//Filtering process, considering selected categories			
				catsArray[i] = "";
			}else{
				catsArray[i] = axisArray[i].category;
			}
		}
	}else {
		for(var i=0; i<axisArray.length; i++){
			if(jQuery.inArray(axisArray[i].subcategory, selectedSubCatg) == -1){		//Filtering process, considering selected subcategories			
				catsArray[i] = "";
			}else{
				catsArray[i] = axisArray[i].subcategory;
			}
		}
	}
	return catsArray;
}//END of getCategoriesAxisData()

/*
 * FUNCTION for getting Latitudes
 * */
function getLatitudesData(axisArray){
	debugger;
	var latsArray = [];
	for(var i=0; i<axisArray.length; i++){
		latsArray[i] = Number(axisArray[i].latitude)/10000000;		
	}
	return latsArray;
}

/*
 * FUNCTION for getting Longitudes
 * */
function getLongitudesData(axisArray){
	var lonsArray = [];
	for(var i=0; i<axisArray.length; i++){
		lonsArray[i] = Number(axisArray[i].longitude)/10000000;
	}
	return lonsArray;
}

/*
 * FUNCTION for getting Districts
 * */
function getDistrictsData(axisArray){
	var districtsArray = [];
	var lat;
	var lon;
	for(var i=0; i<axisArray.length; i++){
		lat = Number(axisArray[i].latitude)/10000000;
		lon = Number(axisArray[i].longitude)/10000000;
		districtsArray[i] = getDistrict(lat, lon);
	}
	return districtsArray;
}

/*
 * FUNCTION for getting week and year from date
 * */
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math
			.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

/*
 * FUNCTION for getting x value for the dataPoint
 * */
function getXValue(xvalue){
	var returnXValue;
	switch($("#timexAxisList").val()){
	case "Years":
		returnXValue = xvalue;
		break;
	case "Seasons":
		var temp = xvalue.split("-");
		if(temp[1] == "Spring"){
			returnXValue = 0;
		}else if(temp[1] == "Summer"){
			returnXValue = 1;
		}else if(temp[1] == "Winter"){
			returnXValue = 2;
		}else if(temp[1] == "Autumn"){
			returnXValue = 3;
		}
		returnXValue = temp[0]+returnXValue;
		break;
	case "Months":
		var temp = xvalue.split("-");
		returnXValue = temp[0]+temp[1];
		break;
	case "Weeks":
		var temp = xvalue.split("-");
		returnXValue = temp[0]+temp[1];
		break;
	case "Days":		
		returnXValue = xvalue;
		break;
	default:
		break;
	}
	return returnXValue;
	//return [returnXValue, chart];
}

/*
 * FUNCTION for searching a value in array
 * */
function compare(value, cat){
	var v=0;
	
	for(v; v<cat.length-1; v++){
		if(value == cat[v]){
			return true;
		}
	}
	return false;
}

/*
 * FUNCTION for sorting an array
 * */
function sortArray(a,b) {
  return parseInt(a) - parseInt(b);
}

/*
 * FUNCTION for sorting an array
 * */
function sortObjectArray(a,b) {
	if(a.x < b.x){
		return -1;
	}
	if(a.x > b.x){
		return 1;
	}
	return 0;
}

/*
 * getDistinctValues(): get unique values
 * */
function getDistinctValues(value, index, self) { 
    return self.indexOf(value) === index;
}

/*
 * findValueInArray(): find value in array
 * */
function findValueInArray(aray, value){	
	for(var v=0; v<aray.length; v++){
		if(value == aray[v]){
			return v;
		}
	}
}

/*
 * FUNCTION for showing slide bar
 * */
function showSlider(){
	
	if(document.getElementById('sliders').style.display == 'none' || document.getElementById('sliders').style.display == 'block'){
		document.getElementById('sliders').style.display = 'block';	 
	}else{
		document.getElementById('sliders').style.display = 'none';
	}
}

/*
 *Function to hide y axis on Lat/Long selection at x-axis 
 * */
function hideYaxis(){
	debugger;
	if($("#xAxisList").val() == "space" && $("#spacexAxisList").val() == "Latitude/Longitude"){
		$("#yAxisList").prop("disabled", true);
	}else{
		$("#yAxisList").prop("disabled", false);
	}
}

/*
 * getDataPoints(): Dummy data provider
 * */
function getDataPoints(){
	var responseStr  = '['+
				  '{"category": "sport", "subcategory": "Basketball" , "noOfEvents": 9, "time": "2013-01-26", "noOfParticipants": "3-4"},'+
				  '{"category": "accident", "subcategory": "Criminal" , "noOfEvents": 3, "time":  "2014-02-07", "noOfParticipants": "100 to 1000"},'+
				  '{"category": "concert", "subcategory": "Comedy" , "noOfEvents": 12, "time": "2015-02-07", "noOfParticipants": "1000 to 10000"},'+
				  '{"category": "conference", "subcategory": "Academic" , "noOfEvents": 4, "time": "2011-08-21", "noOfParticipants": "3-9"},'+
				  '{"category": "educational", "subcategory": "Lectures" , "noOfEvents": 7, "time": "2010-04-23", "noOfParticipants": "50-200"},'+
				  '{"category": "political", "subcategory": "Protest" , "noOfEvents": 1, "time": "2007-03-23", "noOfParticipants": "20-25"},'+
				  '{"category": "sport", "subcategory": "Swimming" , "noOfEvents": 7, "time": "2006-03-23", "noOfParticipants": "20-25"},'+
				  '{"category": "political", "subcategory": "Rally" , "noOfEvents": 15, "time": "2014-03-23", "noOfParticipants": "20-25"},'+
				  '{"category": "social", "subcategory": "Party" , "noOfEvents": 2, "time": "2009-04-23", "noOfParticipants": "200-1000"}]';
	
	var jsonObj = {};
	jsonObj = JSON.stringify(eval("(" + responseStr + ")"));
	return JSON.parse(jsonObj);
}//END of getDataPoints()