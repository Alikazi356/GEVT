<%@ page import="java.util.*" %>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>GEVT</title>
	
	<script src="http://openlayers.org/en/v3.0.0/build/ol.js" type="text/javascript"></script>
	<link href="http://openlayers.org/en/v3.0.0/css/ol.css" type="text/css" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
	<link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet" type="text/css">
	<link href="jQueryAssets/jquery.ui.tabs.min.css" rel="stylesheet" type="text/css">
	<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/smoothness/jquery-ui.css" rel="stylesheet"/>
	<!-- <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet"/> -->
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
	<script src="jQueryAssets/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="jQueryAssets/jquery.ui-1.10.4.tabs.min.js" type="text/javascript"></script>
	<script src="jQueryAssets/jquery.ui-1.10.4.datepicker.min.js" type="text/javascript"></script>
	<script src="bootstrap.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="bootstrap-responsive.min.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.3.0/build/cssreset/reset-min.css">
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="analysis.css" type="text/css">
	<script src="example-behaviour.js" type="text/javascript"></script>
	<script>var __adobewebfontsappname__="dreamweaver"</script><script src="http://use.edgefonts.net/montserrat:n4:default;source-sans-pro:n2:default.js" type="text/javascript"></script>
	<link rel="stylesheet" href="ajxmenu1.css" type="text/css">
	<link href="jQueryAssets/jquery.ui.datepicker.min.css" rel="stylesheet" type="text/css">
	<link href="blogPostStyle.css" rel="stylesheet" type="text/css">
	
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.3.0/build/cssreset/reset-min.css">
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	<script src="OSMFunctions.js" type="text/javascript"></script>
	<script src="clone-form-td.js" type="text/javascript"></script>
	<script src="xls.js" type="text/javascript"></script>
	<script src="heatmap.js" type="text/javascript"></script>
	<script src="pieMapData.js" type="text/javascript"></script>
	<script src="advanceSearchFunctions.js" type="text/javascript"></script>
	<script src="basic.js" type="text/javascript"></script>
</head>

<body>
<%
	ServletContext sc = request.getServletContext();
	List<String> years = (List<String>)sc.getAttribute("yearsList");
	List<String> categroies = (List<String>)sc.getAttribute("categories");
	List<String> subCategroies = (List<String>)sc.getAttribute("subCategories");
	session.setAttribute("categories", categroies);
	
%>

<div id="mainwrapper">
  <header>
    <div id="logo"><img src="cooltext1934183787.png" width="100" height="35"><!-- Company Logo text --></div>
    <div class="AJXCSSMenuURSOXCA"><!-- AJXFILE:ajxmenu1.css -->
		<ul>
			<li><a href="index.jsp">Home</a></li>
 			<li><a href="help.jsp">Help&nbsp;Section</a></li>
 			<li><a href="contact.jsp">Contact&nbsp;Us</a></li>
		</ul>
	</div>
  </header>
  <div id="content">  	
    <div id="mainContent">
      <div class="map" id="map">
      <div id="popup"></div>
      </div>
      <canvas id="piechart" width="15" height="15" style="display:none"></canvas>
      <div class="latlongDisplay" id="latlingDisplay" width="95%" height="30"><br>     	        
        <form style="display:none">
        	<label>Projection </label>
        	<select id="projection">
            	<option value="EPSG:4326">EPSG:4326</option>
            	<option value="EPSG:3857">EPSG:3857</option>
        	</select> 
        	<label>Precision </label>
        	<input id="precision" type="number" min="0" max="12" value="4"/>
    	</form>
 		<!-- Mouse Position: <input type="text" class="mouse-position" id="mouse-position" readonly>   -->
  		You Clicked:<input type="text" id="latLongposition" readonly>
      	<div id="exportDiv" style="float: right; margin-right: 1%;">
			<div id="no-download" class="alert alert-error" style="display: none"></div>
			<a id="export-png" class="btn" download="Snapshot.png"> Export Map</a>
			<a id="clearMainMap" class="btn" onClick="clearLayer()"> Clear Map</a>
		</div>
	</div>
    </div>
<div id="sidebar">
  <div id="Tabs1">
    <ul>
      <li><a href="#tabs-1" title="Use this section to find locations of events fulfilling the criteria.">Place Search</a></li>
      <li><a href="#tabs-2" title="Displays a heat map layer on the map based on data of eligible events.">Heat Map</a></li>
      <li><a href="#tabs-3" title="Displays the number of events at a particular place in the form of pie charts.">Distribution</a></li>
      <li><a href="#tabs-4" title="Use this section for statistical analysis of events data on various forms of graphs.">Analysis</a></li>
</ul>
    <div id="tabs-1">
     <form action="#" method="post" id="sign-up_area">							
		<div id="entry1" class="clonedInput">
		<hr>
		<div id="searchControlsd" class="searchControlsd" >
		Select search type:
			<select id="searchControls" title ="Chose the type of search criteria to be used." class="searchControls" name="types" onChange="showHideType(this.id)">
	    		<option hidden="true"></option>
				<option value="LatLon">LatLon</option>
				<option value="Category">Category</option>
				<option value="Name of event">Name of event</option>
				<option value="Duration">Duration</option>
			</select>
		</div>
		<div id="latlong" class="latlong" style="display:none">
			<table style="width:100%">							
				<tr>
				   <td>Latitude:</td>
				   <td><input type="text" id="lat" class="lat"></td>
				</tr>
				<tr>
				   <td>Longitude:</td>
				   <td><input type="text" id="lon" class="lon"></td>
				</tr>
				<tr>
				    <td><input type="checkbox" title="Use the latitude and longitude of your current location." id="clocation" class="clocation" value="false" onclick="getLocation(this.id)"> </td>
				    <td>Current Location</td>
				</tr>
				<tr>
					<td>Radius: </td>
				    <td>
						    <select id="distance" title="Choose the radius(in KMs) for finding eligible events." class="distance">
						    	<option hidden="true"></option> 
								<%  for (int i =0; i<=20; i++){ %>
			 						<option value="<%=i+5%>"><%=i+5%></option>
			 					<% }%>
						</select>
						</td>
				</tr>				
				<tr>
				    <td>Search:</td>
				    <td><input id="searchBox" title="Search a location to find values for latitude and longitude" class="searchBox" type="text"/></td>
				</tr>
		
				<tr>
				    <td><input type="button" title="Click to find locations matching the value entered in  Search field." id="bbutton" class="bbutton" value="Basic Search" onclick="doBasicSearchClick(this.id);"></td>
				    <td><input type="button" title="Click to clear the results for Basic Search" id="cbutton" class="cbutton" value="Clear Search" onclick="clearsearch(this.id);"></td>
				</tr>			
				<tr>
					<td></td><td><span id="divBasicSearchResults" class="divBasicSearchResults"></span></td>
				</tr>
			</table>
		</div>
		<div id="category" class="category" style="display:none">
			<table style="width:100%">
				<tr>
				    <td>Choose category:</td>
				    <td>
				    	<select id="chooseCategory" class="chooseCategory" title="Choice the categories for matching the eligible events">
			    			<option >Please Select</option>
								<%  for (int i =0; i<categroies.size(); i++){ %>
			 						<option value="<%=categroies.get(i)%>"><%=categroies.get(i)%></option>
			 					<% }%>
				    	</select>
					</td>
				</tr>
			</table>
		</div>
		<div id="eventName" class="eventName" style="display:none;"> 
			<table style="width:100%">
				<tr>
				    <td>Event Name:</td>
				    <td>
				    <input id="inputEventName" class="inputEventName" type="text" title="Search events matching an event name."/>
				    </td>
				</tr>					
			</table>
		</div>
		<div id="duration" class="duration" style="display:none;">
			<table style="width:100%">
				<tr>
		  			<td><label for="from">Start Date</label></td>
		  			<td><input type="text" title="Select the start of time interval for matching event dates." id="fromSearch" class="fromSearch"></td>
		  		</tr>
		  		<tr>
		  			<td><label for="to">End Date</label></td>
		  			<td><input title="Select the end of time interval for matching event dates." type="text" id="toSearch" class="toSearch"></td>
		  		</tr>
			</table>
		</div>
		<div id="selectdecisiondiv" class="selectdecisiondiv" style="bottom:0px">
		Select decision type:
			<select id="selectdecision" title="Chose the decision type for this search criteria" class="selectdecision" onChange="disableAddMore()">
				<option hidden="true"></option>
				<option value="a">AND</option>
				<option value="o">OR</option>
				<option value="n">NOT</option>
				<option value="none">None</option>
			</select>
		</div>	
		<hr>
		</div>
		<div id="addDelButtons">
	        <input type="button" title="Click to add a new section for filter criteria. A maximum of 5 sections can be entered." id="btnAdd" value="add section" onClick="constructQuery()">  
	        <input type="button" title="Remove the above section." id="btnDel" value="remove section above" onClick="removeSection()">
	    </div>
	    <div id="submitButton">
	        <input type="button" id="submitBtn" value="SUBMIT">
	    </div>
	    <a href="#" onclick="window.open('reference.jpg', 'Marker Reference', 'width=200,height=150');">Marker Color Reference</a>
	</form>
    </div>
    <div id="tabs-2">      
      <table style="width:100%">
		<tr>
	    	<td>Select Category:</td>
	    	<td>
		    	<select id="categoryHeatMap" title="Choose categories for filtering the events data used to generate heat map." name="categoryHeatMap" multiple="multiple" onChange="loadSubCategories()">
					<% 
						 for (int i =0; i<categroies.size(); i++){ %>
 						<option value="<%=categroies.get(i)%>"><%=categroies.get(i)%></option>
 					<% }%>
				</select>
	    	</td>
	  	</tr>
	  	<tr>
	    	<td>Select SubCategory:	</td>
	    	<td>
		    	<select id="subcategoryHeatMap" title="Choose subcategories for filtering the events data. Note: This section is only available when one category is selected." name="subcategoryHeatMap" multiple="multiple">
					<!-- this drop down is filling subcategories based on category selection dynamically from db -->
				</select>
	    	</td>
	  	</tr>
	  	<tr>
		  	<td>Start Date:<br></td><td><input type="text" title="Select the start of time interval for matching event dates." id="fromHeat" name="from"></td>
 		</tr>
		<tr>
		  	<td>End Date:<br></td><td><input type="text" title="Select the end of time interval for matching event dates." id="toHeat" name="to"></td>
		</tr>
        <tr>
          <td><label>Select to import external data?</label></td>
          <td>
		  <input type="checkbox" id="heatDatasource" onClick="showDataSource()"></td>
	  	</tr>
      </table>
  	  <input type="submit" id="submitHeatToDB" value="Submit" onClick="generateHeatMap()" title="To use the search criteria on the data base."><br>
  	  <input type="file" name="filename" id="filename" title="Use your external data for generating heat map based on configured criteria." disabled>	
  	  <a title="Please use xls sheet. The first column should be latitude, followed by longitude, category, subcategory and date of event. Each 
  	  row will correspond to one event.">Format for file upload?</a>			
    </div>
    <div id="tabs-3">
      <table style="width:100%">
		  <tr>
		    <td>Provide Coordinates for Coordinate box:</td>
		  </tr>
		  <tr>
		    <td>Maximum Latitude:</td><td><input type="text" id="maxLatPie" readonly></td>
		  </tr>
		  <tr>
		    <td>Minimum Longitude:</td><td><input type="text" id="minLonPie" readonly></td>
		  </tr>
		  <tr>
		    <td>Maximum Longitude:</td><td><input type="text" id="maxLonPie" readonly></td>
		  </tr>
		  <tr>
		    <td>Minimum Latitude:</td><td><input type="text" id="minLatPie" readonly></td>
		  </tr>
		  <tr>
			<td><input type="button" title="Click to populate the above fields based on the area displayed in the map on the left." id="populateV" value="Populate Coordinates" onClick="getPieMapBoundingBox()"></td>
		  </tr>
		  <tr>
		  	<td><label for="from">From</label></td><td><input title="Select the start of time interval for matching event dates." type="text" id="startPieMapDate" name="from"></td>
		  </tr>
		  <tr>
		  	<td><label for="to">To</label></td><td><input type="text" title="Select the end of time interval for matching event dates." id="endPieMapDate" name="to"></td>
		  </tr>
		  <tr>
		    <td>Select Category:</td>
		    <td>
		    	<select id="categoryPieMap" title="Choose categories for filtering the events." name="category" multiple="multiple" onChange="loadPieSubCategories();">
					<% 
						 for (int i =0; i<categroies.size(); i++){ %>
 						<option value="<%=categroies.get(i)%>"><%=categroies.get(i)%></option>
 					<% }%>
				</select>
		    </td>
		  </tr>
		  <tr>
		    <td>Select SubCategory:	</td>
		    <td>
		    	<select id="subCategoryPieMap" title="Choose subcategories for filtering the events. Note: This section is only available when one category is selected." name="subcategory" multiple="multiple">
					<!-- this drop down is filling subcategories based on category selection dynamically from db -->
				</select>	
		    </td>
		  </tr>
		  <tr>
          	<td><label>Select to import external data?</label></td>
		    <td><input type="checkbox" id="pieDatasource" onClick="showDataSource()"></td>
		  </tr>
		  <tr>
		  	<td><input type="button" id="submitPieToDB" value="Submit" onClick="postPieOnMapData()" title="To use the search criteria on the data base."></td>
		  </tr>
		  <tr>
	  		<td><input type="file" name="filename" id="filename1" title="Use your external data for displaying pie charts based on configured criteria."></td>
	  	</tr>
	</table>
	<a title="Please use xls sheet. The first column should be latitude, followed by longitude, category, subcategory and date of event. Each 
  	  row will correspond to one event.">Format for file upload?</a>
    </div>
    <div id="tabs-4">
      <table>
        <tr><td>Maximum Latitude:</td><td><input type="text" name="maxLatt" disabled></td></tr>
        <tr><td>Minimum Longitude:</td><td><input type="text" name="minLonn" disabled></td></tr>
        <tr><td>Maximum Longitude:</td><td><input type="text" name="maxLonn" disabled></td></tr>
        <tr><td>Minimum Latitude:</td><td><input type="text" name="minLatt" disabled></td></tr>
        <tr>
            <td><input type="button" id="populateValues" value="Populate Coordinates       " onClick="getBoundingBox()" title="Click to populate the above fields based on the area displayed in the map on the left."></td>
        </tr>
    </table>
    <form method="post" fname="redirectForm" action="analysis.jsp" onsubmit="return validateForm()" >
	    <table>
	        <tr><td><input type="hidden" id="redirectLatt" name="maxLatt" class="maxLat1" ></td></tr>
	        <tr><td><input type="hidden" name="minLonn" class="minLon1" ></td></tr>
	        <tr><td><input type="hidden" name="maxLonn" class="maxLon1" ></td></tr>
	        <tr><td><input type="hidden" name="minLatt" class="minLat1" ></td></tr>
	        <tr>
	            <td><input type="submit" id="proceedS" value="Redirect to Analysis" title="Click to redirect to the section for statistical analysis of events data on various forms of graphs."/></td>
	        </tr>
	    </table>
    </form>
    </div>
</div>
</div>
    
    <!--<footer> 
    <!--************************************************************************
    Footer starts here
    ****************************************************************************-->
    <!--</footer>
  </div>
<div id="footerbar"><!-- Small footerbar at the bottom --></div>
</div>
	<script>
		function validateForm() {
			debugger;
		    var x = $("#redirectLatt").val();
		    if (x == null || x == "") {
		        	alert("Please populate the coordinates.");
		        return false;
		    }
		}
	</script>
	<script type="text/javascript">
		mousePositionFunc();
		mouseProjectionFunc();
		mapShow();
		printmap();
		pointer();		
	</script>
	<script type="text/javascript">
	$(function() {
		$( "#Tabs1" ).tabs({
			heightStyle:"content",
			show:{effect: "drop"}
		}); 
	});
	
	$('body').on('focus', '.fromSearch', function(){
		var $this = $(this);
	    if(!$this.data('datepicker')) {
	    	$this.removeClass("hasDatepicker");
	    	$this.datepicker({
	    		onSelect: function(dateText, inst) {
		             var startDate = new Date(dateText);
		             var yearFrom = startDate.getFullYear(); // selected year
		             var monthFrom = startDate.getMonth() + 1;
		             var date = startDate.getDate();
		             getFromSearchDate(yearFrom, monthFrom, date);
		        }
	    	});
	    	$this.datepicker("show");	    	
	    }
	});
	
	$('body').on('focus', '.toSearch', function(){
		var $this = $(this);
	      if(!$this.data('datepicker')) {
	       $this.removeClass("hasDatepicker");
	       $this.datepicker({
	    	   onSelect: function(dateText, inst) {
	    		   var endDate = new Date(dateText);          
	               var yearTo = endDate.getFullYear(); // selected year
	               var monthTo = endDate.getMonth() + 1;
	               var date = endDate.getDate();
		           getToSearchDate(yearTo, monthTo, date);
		       }
	       });
	       $this.datepicker("show");
	      }
		
	});


	</script>
	<script>
			var csv;
		    var cath;
		    var scath;
		    var sdateh;
		    var edateh;
		 
		  	$("#filename").change(function(e) {
			  var ext = $("input#filename").val().split(".").pop().toLowerCase();
			  if($.inArray(ext, ["xls"]) == -1) {
			  	alert('Please upload in XLS format');
			  return false;
			  }
	
			  if(!window.cfbs) window.cfbs = {};
				var files = e.target.files;
		  		 for (i = 0, f = files[i]; i != files.length; ++i) { 
		    		var reader = new FileReader();
		    		var name = f.name;
		    		reader.onload = function(e) {		      			
		    			var data = e.target.result;
		      			var cfb = XLS.CFB.read(data, {type:'binary'});
		      			window.cfbs[name] = cfb;
						var wb = XLS.parse_xlscfb(cfb);
					  	var ws = wb.Sheets[wb.Directory[0]];
					    csv = XLS.utils.make_csv(ws);
					    if($("#categoryHeatMap").val()!= null)
				    	{cath=$("#categoryHeatMap").val().toString();}
					
				    if($("#subcategoryHeatMap").val()!= null){
				    	scath=$("#subcategoryHeatMap").val().toString();
				    }
				    
						sdateh=document.getElementById("fromHeat").value;
						edateh=document.getElementById("toHeat").value;
						hmparsing(csv, cath, scath, sdateh, edateh);  // function for heatmap		
					};
		    		reader.readAsBinaryString(f);		    		
		  		 }
		  	
			  return false;
	
			  });	 
		</script>
		<script>
		var csv;
	    var cath;
	    var scath;
	    var sdateh;
	    var edateh;
	    var maxlatp;
	    var minlatp;
	    var maxlonp;
	    var minlonp;
	    
	 
	  	$("#filename1").change(function(e) {
		  var ext = $("input#filename1").val().split(".").pop().toLowerCase();
		  if($.inArray(ext, ["xls"]) == -1) {
		  	alert('Please Upload xls format');
		  return false;
		  }

		  if(!window.cfbs) window.cfbs = {};
			var files = e.target.files;
	  		 for (i = 0, f = files[i]; i != files.length; ++i) { 
	    		var reader = new FileReader();
	    		var name = f.name;
	    		reader.onload = function(e) {
	      			
    			var data = e.target.result;
      			var cfb = XLS.CFB.read(data, {type:'binary'});
      			window.cfbs[name] = cfb;
				var wb = XLS.parse_xlscfb(cfb);
			  	var ws = wb.Sheets[wb.Directory[0]];
			    csv = XLS.utils.make_csv(ws);
			    if($("#categoryPieMap").val()!= null)
			    	{cath=$("#categoryPieMap").val().toString();}
				
			    if($("#subCategoryPieMap").val()!= null){
			    	scath=$("#subCategoryPieMap").val().toString();
			    }
				
				sdateh=document.getElementById("startPieMapDate").value;
				edateh=document.getElementById("endPieMapDate").value;
				maxlatp=document.getElementById("maxLatPie").value;
				minlatp=document.getElementById("minLatPie").value;
				maxlonp=document.getElementById("maxLonPie").value;
				minlonp=document.getElementById("minLonPie").value;
				
				//alert("cath= "+cath+"scath= "+scath+"sdateh= "+sdateh+"edateh= "+edateh+"maxlatp= "+maxlatp +"minlatp= "+maxlatp+"others= "+maxlonp+minlonp);
				bmparsing(csv, cath, scath, sdateh, edateh,maxlatp,minlatp,maxlonp,minlonp);
				};
	    		reader.readAsBinaryString(f);		    		
	  		 }
		  return false;
		  });
		</script>
</body>
</html>


