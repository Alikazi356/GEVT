<!DOCTYPE html>

<html>

<head>

<title>Help Page</title>

<script src="http://code.jquery.com/jquery-1.9.1.js"></script>

<link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet"

type="text/css">

<link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet"

type="text/css">

<link href="jQueryAssets/jquery.ui.tabs.min.css" rel="stylesheet"

type="text/css">

<link

href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css"

rel="stylesheet" />

<script

src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

<link rel="stylesheet" href="bootstrap.min.css" type="text/css">

<link rel="stylesheet" href="bootstrap-responsive.min.css"

type="text/css">

<!--The following script tag downloads a font from the Adobe Edge Web Fonts server for use within the web page. We recommend that you do not modify it.-->

<script src="jQueryAssets/jquery-1.11.1.min.js" type="text/javascript"></script>

<script src="jQueryAssets/jquery.ui-1.10.4.tabs.min.js"

type="text/javascript"></script>

<script src="jQueryAssets/jquery.ui-1.10.4.datepicker.min.js"

type="text/javascript"></script>

<script>

var __adobewebfontsappname__ = "dreamweaver"

</script>

<script

src="http://use.edgefonts.net/montserrat:n4:default;source-sans-pro:n2:default.js"

type="text/javascript"></script>

<link rel="stylesheet" href="ajxmenu1.css" type="text/css">

<link href="jQueryAssets/jquery.ui.datepicker.min.css" rel="stylesheet"

type="text/css">

<script src="basic.js" type="text/javascript"></script>

<script src="example-behaviour.js" type="text/javascript"></script>

<script src="analysisFunctions.js" type="text/javascript"></script>

<script src="analysisPost.js" type="text/javascript"></script>

<link href="blogPostStyle.css" rel="stylesheet" type="text/css">

<link href="help.css" rel="stylesheet" type="text/css">

<script src="xmlhttp.js" type="text/javascript"></script>

</head>



<body>




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

<h1>Reference Guide</h1>

<dl>

<dt><a href="#place_search">Place Search</a></dt><br/>

<ul>

<li><a href="#lat_lon">LatLon</li></a>

<li><a href="#category">Category</li></a>

<li><a href="#name_event">Name of event</li></a>

<li><a href="#duration">Duration</li></a>

</ul>

<dt><a href="#heat_map">Heat Map</a></dt><br/>

<ul>

<li><a href="#category_heat">Category</li></a>

<li><a href="#subcategory_heat">Subcategory</li></a>

<li><a href="#time_heat">Time Window</li></a>

</ul>

<dt><a href="#distribution">Distribution</a></dt><br/>

<ul>

<li><a href="#boundingbox_pie">Bounding box</a></li>

<li><a href="#timewindow_pie">Time Window</a></li>

<li><a href="#category_pie">Category</a></li>

<li><a href="#subcategory_pie">Subcategories</a></li>

</ul>

<dt><a href="#analysis">Analysis</a></dt><br/>

<dt><a href="#graphgeneration">Graphs Generation</a></dt><br/>

<ul>

<li><a href="#piechart">Pie Chart</a></li>

<li><a href="#piechart3d">Pie Chart 3D</a></li>

<li><a href="#barchart">Bar Chart 2D</a></li>

<li><a href="#barchart3d">Bar Chart 3D</a></li>

<li><a href="#splinechart">Spline Chart</a></li>

<li><a href="#splinearea">Spline Area Chart</a></li>

<li><a href="#scatterchart">Scatter Chart</a></li>

<li><a href="#bubblechart">Bubble Chart</a></li>

<li><a href="#stackedbar">Stacked Bar Chart</a></li>

<li><a href="#heatmapchart">Heat Map Chart</a></li>

</ul>

<dt><a href="#graph_options">Graph Options</a></dt><br/>

<dt><a href="#categorization_type">Categorization Types</a></dt><br/>

<dt><a href="#file_format">File Format</a></dt><br/>

</dl>


<h2><a id="place_search">Place Search</a></h2>


This Section is used to search for events based on configured conditions. The resulting events will be displayed on the 

map in the form of markers. A marker will depict each event on the map and the color of the marker will be based on the 

category of the event.<br/>



Upto 5 conditions can be configured for each query. The conditions can have and/not/or between them. The system will traverse 

the conditions from top to bottom. Since not is a binary operation, the system will not allow further queries after the first 

not condition is selected.<br/>



Each condition can be of one of the following types:<br/>


<ol>

  <li><a id="lat_lon">Events within a certain radius of a particular point (combination of latitude and longitude)</a></li>

  The combination of latitude and longitude can be provided by one of the following ways:

  <ol type="a">

  <li>Manually keying in the latitude and longitude</li>

  In this case help can be taken by the display of latitude and longitude (at the bottom of the map) based on mouse 

  position on the map. Also, clicking at any particular place on the map fills the 'You clicked' field at 

  the bottom of the map. The field id populated with the latitude and longitude of the position where the click was done.

  <li>Current location </li>

  Clicking the current location check box fills the latitude and longitude field with the coordinates of 

  the current location of the user.

  <li>Basic Search </li>

  This section can be used to search for the coordinates of places based on their names. Fill in the name of the 

  location you want to search in 'Search' field and click on 'Basic Search'.  The results will be displayed below 

  along with a marker representing each point on the map. Click on the result you want to select and the corresponding 

  coordinates of the location will filled in the latitude and longitude section. Use 'Clear Search' button to clear the 

  results of your search.

  </ol>

  The 'Radius' field is used to provide the desired radius in kilometers for the search.

  <li><a id="category">Category</a></li>

  Events can be searched for (or filtered) based on their category. One or more categories can be selected using the 

  'Choose category' field. 

  <li><a id="name_event">Name of event</a></li>

  Events can be searched (or filtered) based on their names.

  <li><a id="duration">Duration</a></li>

  Events can be searched (or filtered) based on their date of happening. A window of time frame can be selected for 

  filtering criteria using the 'Start Date' and 'End Date'.

</ol>

'Add Section' can be used to add a new section. 'Remove Section' can be used to remove the above section.

<h2><a id="heat_map">Heat Map</a></h2>


This section is used to generate a heat map layer on the map. <br/>

The filtering criteria for selecting the events to be considered for heat map generation can be following:<br/>

<ol>

<li><a id="category_heat">Category</a></li>

Use 'Select Category' section to select the categories of events to be considered in heat map generation.

<li><a id="subcategory_heat">Subcategories</a></li>

Use 'Select SubCategory' section to select the subcategories of events to be considered in heat map generation.

Note: This section is only available if only one Category is selected in 'Select Category' field.

<li><a id="time_heat">Time Window</a></li>

A time frame can be provided for selecting eligible events. All the events that happen in this time frame will be considered.

</ol>

Leaving a criteria section empty will mean that criteria is not being used. Also, only events that fulfill all criteria

will be considered for heat map generation. <br/>

For the heat map generation, either the events in the database can be used. For using this option after providing the criteria

 	click on the 'Submit' button. Users can also provide their own data set of events for the heat map generation. For this 

 	option use the 'Choose File' (Refer to <a href="#file_format">file format </a>section for the format of file). The selection criteria will apply on

 	both types of data.


<h2><a id="distribution">Distribution</a></h2>

This section is used for representing the distribution of events in the form of pie charts on the map. 

A pie chart appears at every location on the map. The size of the pie chart is proportional to the number of 

events at the location and the colors of segments depict the categories.<br/>

The filtering criteria for selecting the events to be considered for pie charts generation can be following:<br/>

<ol>

<li><a id="boundingbox_pie">Bounding box</a></li>

For filling the fields 'Maximum Latitude', 'Minimum Latitude', 'Maximum Longitude' and 

'Minimum Longitude' adjust the view of the map to cover the area you want to be considered for 

selecting events. After this click on the 'Populate Bounding Box' button and the bounding window 

coordinates of the map will be populated in the above-mentioned fields.

<li><a id="timewindow_pie">Time Window</a></li>

A time frame can be provided for selecting eligible events. All the events that happen in this time frame will be considered.

<li><a id ="category_pie">Category</a></li>

Use 'Select Category' section to select the categories of events to be considered in pie charts generation.

<li><a id="subcategory_pie">Subcategories</a></li>

Use 'Select SubCategory' section to select the subcategories of events to be considered in pie charts generation.<br/>

Note: This section is only available if only one Category is selected in 'Select Category' field.

</ol>

For the pie charts generation, either the events in the database can be used. For using this option after providing 

the criteria click on the 'Submit' button. Users can also provide their own data set of events for the pie charts generation. 

For this option use the 'Choose File' (Refer to <a href="#file_format">file format </a> section for the format of file). The selection criteria will apply 

on both types of data.


<h2><a id="analysis">Analysis</a></h2>

This section is used for statistical analysis of events data on various forms of graphs.<br/>

For filling the fields 'Maximum Latitude', 'Minimum Latitude', 'Maximum Longitude' and 'Minimum Longitude' 

adjust the view of the map to cover the area you want to be considered for selecting events. After this click on 

the 'Populate Bounding Box' button and the bounding window coordinates of the map will be populated in the above-mentioned fields.

After filling the coordinate box, click on 'Redirect to Analysis'. The user will be redirected to the second page to provide 

further information for generating various forms of graphs.


<h2><a id="graphgeneration">Graphs Generation</a></h2>

The bounding box populated on this page is brought in from the previous page under 'Analysis' tab. 

The duration window filled in under the bounding box can be used for filtering the events based on their date.<br/>

Note: The bounding box and duration window selected here will be used for all graphs generated.<br/>

The following types of graphs can be generated:<br/>

<ol>

<li><a id="piechart">Pie Chart</a></li>

To create a pie chart select 'Pie Chart' from the selection box 'Select Chart Type'. 

Use 'Title of the pie chart' to give a title to be displayed with the pie chart. 

Use 'Define X-axis' to select the type of categorization of data to be displayed on the pie chart. 

To see the eligible options refer to <a href="#piechart_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="piechart3d">Pie Chart 3D</a></li>

To create a 3D pie chart select 'Pie Chart 3D' from the selection box 'Select Chart Type'. 

Use 'Title of the pie chart' to give a title to be displayed with the pie chart. Use 'Define X-axis' 

to select the type of categorization of data to be displayed on the pie chart. To see the eligible options 

refer to <a href="#piechart3d_go">Graph Options</a>.<br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="barchart">Bar Chart 2D</a></li>

To create a 2D bar chart select 'Bar Chart 2D' from the selection box 'Select Chart Type'. 

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X' and 'Select Label Y' to give labels to X and Y axis respectively. Use 'Legend' 

field to give description for the legends. Use 'Select Color' to choose color of the bars on the chart. 

Use 'Define X-axis' and 'Define Y-axis' to select the type of categorization of data to be displayed on the chart.

To see the eligible options refer to <a href="#barchart_go">Graph Options</a>. <br/>

 	Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="barchart3d">Bar Chart 3D</a></li>

To create a 3D bar chart select 'Bar Chart 3D' from the selection box 'Select Chart Type'.

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X' and 'Select Label Y' to give labels to X and Y-axis respectively. 

Use 'Legend' field to give description for the legends. Use 'Select Color' to choose color of the bars on 

the chart. Use 'Define X-axis' and 'Define Y-axis' to select the type of categorization of data to be displayed on 

the chart. To see the eligible options refer to <a href="#barchart3d_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="splinechart">Spline Chart</a></li>

To create a Spline chart select 'Spline' from the selection box 'Select Chart Type'.  

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X' and 'Select Label Y' to give labels to X and Y-axis respectively.

Use 'Define X-axis', 'Define Y-axis' and 'Define Z-axis' to select the type of categorization of data to be displayed on the chart. To see the eligible options refer to 

<a href="#splinechart_go"> Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="splinearea">Spline Area Chart</a></li>

To create a Spline Area chart select 'Spline Area' from the selection box 'Select Chart Type'.  

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X' and 'Select Label Y' to give labels to X and Y-axis respectively. 

Use 'Define X-axis', 'Define Y-axis' and 'Define Z-axis' to select the type of categorization 

of data to be displayed on the chart. 

To see the eligible options refer to <a href="#splinearea_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.



<li><a id="stackedbar">Stacked Bar Chart</a></li>

To create a Stacked Bar chart select 'Stacked Bar' from the selection box 'Select Chart Type'.  

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X' and 'Select Label Y' to give labels to X and Y-axis respectively. 

Use 'Define X-axis', 'Define Y-axis' 

and 'Define Z-axis' to select the type of categorization of data to be displayed on the chart. 

To see the eligible options refer to <a href="#stackedbar_go">Graph Options</a>.<br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="scatterchart">Scatter Chart</a></li>

To create a Scatter chart select 'Scatter' from the selection box 'Select Chart Type'.  

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X', 'Select Label Y' and 'Select Label Z' to give labels to X , Y and Z-axis respectively. 

Use 'Define X-axis', 

'Define Y-axis' and 'Define Z-axis' to select the type of categorization of data to be displayed on the chart. 

To see the eligible options refer to <a href="#scatterchart_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.


<li><a id="bubblechart">Bubble Chart</a></li>

To create a Bubble chart select 'Bubble' from the selection box 'Select Chart Type'.  

Use 'Title of the chart' to give a title for the chart. This will appear on top of the chart. 

Use 'Select Label X', 'Select Label Y' and 'Select Label Z' to give labels to X , Y and Z-axis respectively. 

Use 'Define X-axis', 

'Define Y-axis' and 'Define Z-axis' to select the type of categorization of data to be displayed on the chart. 

To see the eligible options refer to <a href="#bubblechart_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.



<li><a id="heatmapchart">Heat Map Chart</a></li>

To create a Heat Map select 'Heat Map' from the selection box 'Select Chart Type'. 

Use 'Define X-axis', 'Define Y-axis' and 'Define Z-axis' to select the type of categorization of 

data to be displayed on the chart. To see the eligible options refer to <a href="#heatmapchart_go">Graph Options</a>. <br/>

Refer to the section <a href="#categorization_type">Categorization Types</a> for details on the categorization types.



</ol>



<h2><a id="graph_options">Graph Options</a></h2>

<ol>

<li><a id="piechart_go">Pie</a></li>

<ol type="a">

<li>Title</li>

<li>Axis</li>

<ol type="i">

<li>Time</li>

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

</ol>

<li><a id="piechart3d_go">3D pie</a></li>

<ol type="a">

<li>Title</li>

<li>Axis</li>

<ol type="i">

<li>Time</li>

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

</ol>

<li><a id="barchart_go">Bar Chart 2D</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>Legend</li>

<li>Select Color</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

</ol>

<li><a id="barchart3d_go">Bar Chart 3D</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>Legend</li>

<li>Select Color</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

</ol>

<li><a id="splinechart_go">Spline</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

</ol>

<li><a id="splinearea_go">Spline Area</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

</ol>

<li><a id="stackedbar_go">Stacked Bar</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Number of Participants</li>

<li>Category/Sub-category</li>

</ol>

</ol>

<li><a id="scatterchart_go">Scatter Chart</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>Label Z</li>

<li>Legend</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

</ol>

<li><a id="bubblechart_go">Bubble Chart</a></li>

<ol type="a">

<li>Title</li>

<li>Label X</li>

<li>Label Y</li>

<li>Label Z</li>

<li>X Axis</li>

<ol type="i">

<li>Time</li>

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

</ol>

<li><a id="heatmapchart_go">Heat Map</a></li>

<ol type="a">

<li>X Axis</li>

<ol type="i">

<li>Time</li>

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

<li>Y Axis</li>

<ol type="i">

<li>Category/Sub-category</li>

<li>Number of Participants</li>

</ol>

<li>Z Axis</li>

<ol type="i">

<li>Number of Events</li>

</ol>

</ol>

</ol>




<h2><a id="categorization_type">Categorization Types</a></h2>

<ol>

<li>Time</li>

If 'Time' is selected, the user can further define the type of categorization of time to be used for 

displaying the pie chart. The events data can be divided based on dates, week of the year, session, month or year.

<li>Number of Events</li>

If 'Number of Events' is selected, the event count is selected based on further filters on categories and subcategories

(if one category is used).

<li>Number of Participants </li>

If 'Number of Participants' is selected, the participant count is selected based on further filters on categories and 

subcategories (if one category is used).

<li>Category/Sub-category</li>

If 'Category/Sub-category' is selected, the events are selected based on further filters on categories and 

subcategories (if one category is used).

<li>Space</li>

If 'Space' is selected, the events can be categorized based on their location. There are two further types of 

space namely 'Districts' and 'Latitude/Longitude'. The 'Districts' type divides the events into the administrative 

districts of Munich (25 in total). The 'Latitude/Longitude' type divides the events based on their latitude and longitude.<br/>

Note: In case 'Latitude/Longitude' is selected it will count for two axis and one will be used for latitude and one for longitude.

</ol>



<h2><a id="file_format">File Format</a></h2>

In case users want to upload their own data set, the uploaded file should fulfill the following criteria:

<ol>

<li>It should of the type '.xls'.</li>

<li>The columns should reflect the data (in order) latitude, longitude, category, subcategory and date.</li>

<li>Each row of data should correspond to one event.</li>

</ol>






</div>

<div id="sidebar">



</div>




</div>

<div id="footerbar">

<!-- Small footerbar at the bottom -->

</div>

</div>

</body>



</html>