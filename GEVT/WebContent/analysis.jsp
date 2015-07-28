<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
	<title>Statistical Analysis</title>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>		
	<script src="jQueryAssets/jquery-1.11.1.min.js" type="text/javascript"></script>
	<link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
	<link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet" type="text/css">
	<link href="jQueryAssets/jquery.ui.tabs.min.css" rel="stylesheet" type="text/css">
	<script src="jQueryAssets/jquery.ui-1.10.4.tabs.min.js" type="text/javascript"></script>
	<script src="jQueryAssets/jquery.ui-1.10.4.datepicker.min.js" type="text/javascript"></script>
	<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet" />
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
	<link href="jQueryAssets/jquery.ui.datepicker.min.css" rel="stylesheet" type="text/css">
	<link href="bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="bootstrap-responsive.min.css" rel="stylesheet" type="text/css">
	<script>var __adobewebfontsappname__ = "dreamweaver"</script>
	<script src="http://use.edgefonts.net/montserrat:n4:default;source-sans-pro:n2:default.js" type="text/javascript"></script>
	<link href="ajxmenu1.css" rel="stylesheet" type="text/css">	
	<script src="basic.js" type="text/javascript"></script>
	<script src="example-behaviour.js" type="text/javascript"></script>
	<script src="xmlhttp.js" type="text/javascript"></script>
	<link href="blogPostStyle.css" rel="stylesheet" type="text/css">
	<link href="analysis.css" rel="stylesheet" type="text/css">
	<script src="analysisFunctions.js" type="text/javascript"></script>
	<script src="analysisPost.js" type="text/javascript"></script>
	<script src="analysisCharts.js" type="text/javascript"></script>
	<script src="canvasjs.min.js" type="text/javascript"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/highcharts-3d.js"></script>
	<script src="http://code.highcharts.com/highcharts-more.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
	<script src="jscolor.js" type="text/javascript"></script>
	<script src="protovis.js" type="text/javascript"></script>
	
	<%
	double maxLatitude = Double.parseDouble(request
			.getParameter("maxLatt").trim());
	double minLatitude = Double.parseDouble(request
			.getParameter("minLatt").trim());
	double maxLongitude = Double.parseDouble(request
			.getParameter("maxLonn").trim());
	double minLongitude = Double.parseDouble(request
			.getParameter("minLonn").trim());
	%>
</head>

<body onload="getCategoriesOnLoad()">
	<div id="mainwrapper">
		<header>
			<div id="logo">
				<img src="cooltext1934183787.png" width="100" height="35">
				<!-- Company Logo text -->
			</div>
			<div class="AJXCSSMenuURSOXCA">
				<!-- AJXFILE:ajxmenu1.css -->
				<ul>
					<li><a href="index.jsp">Home</a></li>
		 			<li><a href="help.jsp">Help&nbsp;Section</a></li>
		 			<li><a href="contact.jsp">Contact&nbsp;Us</a></li>
				</ul>
			</div>
		</header>
		<div id="content">
			<div id="mainContent">
				<!-- <div class="map" id="map"></div> -->
				<!-- <div id="chartContainer" style="height: 600px; margin: 0 auto"></div> -->
				<div id="chartContainer"></div>
				<div id="sliders" style="display:none">
					<table>
						<tr><td>Alpha Angle</td><td><input id="R0" type="range" min="0" max="45" value="15"/> <span id="R0-value" class="value"></span></td></tr>
					    <tr><td>Beta Angle</td><td><input id="R1" type="range" min="0" max="45" value="15"/> <span id="R1-value" class="value"></span></td></tr>
					</table>
				</div>

			</div>
			<div id="sidebar">
				<table style="width: 100%" style="background-color:red;">
					<tr>
						<td>Boundary Box Coordinates:</td>
					</tr>
					<tr>
						<td>Maximum Latitude:</td>
						<td><input type="text" id="maxLat0" value="<%=maxLatitude%>"
							disabled></td>
					</tr>
					<tr>
						<td>Minimum Longitude:</td>
						<td><input type="text" id="minLon0" value="<%=minLongitude%>"
							disabled></td>
					</tr>
					<tr>
						<td>Maximum Longitude:</td>
						<td><input type="text" id="maxLon0" value="<%=maxLongitude%>"
							disabled></td>
					</tr>
					<tr>
						<td>Minimum Latitude:</td>
						<td><input type="text" id="minLat0" value="<%=minLatitude%>"
							disabled></td>
					</tr>
					<tr>
						<td><label for="from">Start Date</label></td>
						<td><input type="text" id="from0" name="from"></td>
					</tr>
					<tr>
						<td><label for="to">End Date</label></td>
						<td><input type="text" id="to0" name="to"></td>
					</tr>
					<tr>
						<td width="15%">Select Chart Type:</td>
						<td width="15%"><select id="chartsList" name="chartsList"
							onChange="showHideChartControls()">
								<option hidden="true"></option>
								<option value="PieChart">Pie Chart 2D</option>
								<option value="PieChart3D">Pie Chart 3D</option>
								<option value="BarChart2D">Bar Chart 2D</option>
								<option value="BarChart3D">Bar Chart 3D</option>
								<option value="SplineChart">Spline Chart</option>
								<option value="SplineAreaChart">Spline Area Chart</option>
								<option value="StackedBarChart">Stacked Bar Chart</option>
								<option value="ScatterChart">Scatter Chart</option>
								<option value="BubbleChart">Bubble Chart</option>								
								<option value="HeatMapChart">Heat Map Chart</option>
						</select></td>
					</tr>
				</table>
				<div id="chartHandler">
					<div id="PieChart">
						<table style="width: 100%">
							<tr>
								<td width="40%"><label>Title of the pie chart:</label></td>
								<td><input id="pieChartTitle" type="text"></td>
							</tr>
						</table>
					</div>
					<div id="BarChart2D">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId2" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId2" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId2" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Legend:</td>
								<td><input id="legenId2" type="text"></td>
							</tr>
							<tr id="selectColor2">
								<td width="40%">Select Color:</td>
								<td><input class="color" id="colorsList2" value="66ff00"></td>
							</tr>
						</table>
					</div>
					<div id="BarChart3D">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId3" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId3" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId3" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Legend:</td>
								<td><input id="legenId3" type="text"></td>
							</tr>
							<tr id="selectColor3">
								<td width="40%">Select Color:</td>
								<td><input class="color" id="colorsList3" value="66ff00"></td>
							</tr>
						</table>
					</div>
					<div id="SplineChart">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId4" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId4" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId4" type="text"></td>
							</tr>
						</table>
					</div>
					<div id="StackedBarChart">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId5" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId5" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId5" type="text"></td>
							</tr>
						</table>
					</div>
					<div id="ScatterChart">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId6" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId6" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId6" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Z:</td>
								<td><input id="zId6" type="text"></td>
							</tr>
						</table>
					</div>
					<div id="BubbleChart">
						<table style="width: 100%">
							<tr>
								<td width="40%">Title of the chart:</td>
								<td><input id="titleId7" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label X:</td>
								<td><input id="xId7" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Y:</td>
								<td><input id="yId7" type="text"></td>
							</tr>
							<tr>
								<td width="40%">Label Z:</td>
								<td><input id="zId7" type="text"></td>
							</tr>
						</table>
					</div>
					<div id="HeatMapChart"></div>
					
					<div id="defineXAxis" style="display: none;">
						<table style="width: 100%">
							<tr>
								<td width="40%"><label>Define X-axis:</label></td>
								<td><select id="xAxisList" onChange='showAxis("x")'>
										<option hidden="true"></option>
										<option value="time">Time</option>
										<option value="space">Space</option>
										<option value="noOfEvents">Number of Events</option>
										<option value="noOfPart">Number of Participants</option>
										<option value="catSubCat">Category/Sub-Category</option>
								</select></td>
							</tr>
						</table>
					</div>
					<div id="defineYAxis" style="display: none;">
						<table style="width: 100%">
							<tr>
								<td width="40%"><label>Define Y-axis:</label></td>
								<td><select id="yAxisList" onChange="showAxis('y')">
										<option hidden="true"></option>
										<option value="time">Time</option>
										<option value="space">Space</option>
										<option value="noOfEvents">Number of Events</option>
										<option value="noOfPart">Number of Participants</option>
										<option value="catSubCat">Category/Sub-Category</option>
								</select></td>
							</tr>
						</table>
					</div>
					<div id="defineZAxis" style="display: none;">
						<table style="width: 100%">
							<tr>
								<td width="40%"><label>Define Z-axis:</label></td>
								<td><select id="zAxisList" onChange="showAxis('z')">
										<option hidden="true"></option>
										<option value="time">Time</option>
										<option value="space">Space</option>
										<option value="noOfEvents">Number of Events</option>
										<option value="noOfPart">Number of Participants</option>
										<option value="catSubCat">Category/Sub-Category</option>
								</select></td>
							</tr>
						</table>
					</div>
					<input type="button" id="submitAnalysisData" value="SUBMIT"
						onClick="submitAnalysisData()" style="width: 20%;">
				</div>
			</div>

		</div>
		<div id="footerbar">
			<!-- Small footerbar at the bottom -->
		</div>
	</div>	
	

</body>

</html>