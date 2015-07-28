<!DOCTYPE html>
<html>
<head>
	<title>GEVT</title>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>	
	<script src="http://openlayers.org/en/v3.0.0/build/ol.js" type="text/javascript"></script>
	<link href="http://openlayers.org/en/v3.0.0/css/ol.css" type="text/css" rel="stylesheet" >
	<script src="example-behaviour.js" type="text/javascript"></script>
	<script src="HorizontalBar/js/modernizr.custom.js"></script> 
	<script src="HorizontalBar/js/cbpHorizontalMenu.min.js"></script>
	<link href="HorizontalBar/css/component.css" rel="stylesheet" type="text/css" />
	
	<link rel="stylesheet" href="bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="bootstrap-responsive.min.css" type="text/css">
	
	<link href='tabulous.css' rel='stylesheet' type='text/css'>
	<script src="tabulous.js" type="text/javascript"></script>
	
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.3.0/build/cssreset/reset-min.css">
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	<script src="OSMFunctions.js" type="text/javascript"></script>
	<script src="handleTabs.js" type="text/javascript"></script>
	<script src="clone-form-td.js" type="text/javascript"></script>
	<script src="xls.js" type="text/javascript"></script>
	<script src="heatmap.js" type="text/javascript"></script>
	<script src="pieMapData.js" type="text/javascript"></script>
	<script src="advanceSearchFunctions.js" type="text/javascript"></script>
	<link rel="stylesheet" href="layout.css" type="text/css">
	<link rel="shortcut icon" href="../favicon.ico">
	
</head>

<body>
	<div class="header">
		<nav id="cbp-hrmenu" class="cbp-hrmenu">
			<ul>
				<li><a href="/GEVT/main.jsp" style="background:#B5DAF0;">Home</a></li>
				<!-- <li><a href="/GEVT/analysis.jsp">Analysis</a></li> -->
				<li><a href="#">About Us</a></li>
				<li><a href="#">Contact Us</a></li>
			</ul>
		</nav>
		<script>
			$(function() {
				cbpHorizontalMenu.init();
			});
		</script>
	</div>

	<div class = "mainBody">
		<%
		HttpSession sess = request.getSession(); 
		sess.setAttribute("maxLatitude", "");
		sess.setAttribute("minLatitude", "");
		sess.setAttribute("maxLongitude", "");
		sess.setAttribute("minLongitude", "");
		%>
		<div class="mainContainer">
			<div id="map" class="map"></div>
			<div class="latlongDisplay">
				<div id="exportDiv" style="float:right;">
					<div id="no-download" class="alert alert-error" style="display: none"></div>
					<a id="export-png" class="btn" download="Snapshot.png"> Export Map</a>
		   		</div>
				<div style="bottom:0;">
					<table style="width:70%">
						<tr>
						  <td style="width:20px;"><b>Coordinates: </b></td>
						  <td style="width:150px;"><div id="mouse-position" class="mouse-position"></div></td>
						</tr>
						<tr>
						  <td style="width:20px;"><b>You clicked: </b></td>
						  <td style="width:150px;"><div id="latLongposition" ></div></td>
						</tr>
					</table>
				</div>			
			</div>
			<form style="display:none">
				<label>Projection </label>
				<select id="projection">
					<option value="EPSG:4326">EPSG:4326</option>
					<option value="EPSG:3857">EPSG:3857</option>
				</select> 
				<label>Precision </label>
				<input id="precision" type="number" min="0" max="12" value="4"/>
			</form>
		</div>
		<div class="mapControls">
			<div id="tabs">
				<ul>
					<li><a href="#tabs-1" title="" style="width:60%; text-align:center;" onClick='showHideTab("tabs-1")'>Search</a></li>
					<li><a href="#tabs-2" title="" style="width:60%; text-align:center;" onClick='showHideTab("tabs-2")'>Heat Map</a></li>
					<li><a href="#tabs-3" title="" style="width:60%; text-align:center;" onClick='showHideTab("tabs-3")'>Data on Map</a></li>
					<li><a href="#tabs-4" title="" style="width:60%; text-align:center;" onClick='showHideTab("tabs-4")'>Analysis</a></li>
				</ul>
				<div id="tabs_container" style="width:100%; height:100%">
					<div id="tabs-1" style="width:100%; height:100%; top:40px">
							<!-- <div id="searchControlsdiv" class="searchControlsdiv" > -->
							<form action="#" method="post" id="sign-up_area">							
	 						<div id="entry1" class="clonedInput">
								<div id="searchControlsd" class="searchControlsd" >
								Select search type:
									<select id="searchControls" class="searchControls" name="types" onChange="showHideType(this.id)">
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
											<td>Radius: </td>
										    <td>
 											    <select id="distance" class="distance">
											    	<option hidden="true"></option> 
													<option value="a">50</option>
													<option value="o">100</option>
												</select>
												</td>
										</tr>
										<tr>
										    <td><input type="checkbox" id="clocation" class="clocation" value="false" onclick="getLocation(this.id)"> </td>
										    <td>Current Location</td>
										</tr>
										<tr>
										    <td>Search:</td>
										    <td><input id="searchBox" class="searchBox" type="text"/></td>
										</tr>
								
										<tr>
										    <td><input type="button" id="bbutton" class="bbutton" value="Basic Search" onclick="doBasicSearchClick(this.id);"></td>
										    <td><input type="button" id="cbutton" class="cbutton" value="Clear Search" onclick="clearsearch(this.id);"></td>
										</tr>			
										<tr>
											<td></td><td><span id="divBasicSearchResults" class="divBasicSearchResults"></span></td>
										</tr>
									</table>
								</div>
								<div id="category" class="category" style="display:none">
									<table style="width:100%">
										<tr>
										    <td> Choose category:</td>
										    <td>
										    	<select id="chooseCategory" class="chooseCategory">
										    		<option value="c1">Cat 1</option>
													<option value="c2">Cat 2</option>
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
										    <input id="inputEventName" class="inputEventName" type="text" />
										    </td>
										</tr>					
									</table>
								</div>
								<div id="duration" class="duration" style="display:none;">
									<table style="width:100%">
										<tr>
								  			<td><label for="from">Start Date</label></td>
								  			<td><input type="text" id="fromSearch" name="from"></td>
								  		</tr>
								  		<tr>
								  			<td><label for="to">End Date</label></td>
								  			<td><input type="text" id="toSearch" name="to"></td>
								  		</tr>
									</table>
								</div>
								<div id="selectdecisiondiv" class="selectdecisiondiv" style="bottom:0px">
								Select decision type:
									<select id="selectdecision" class="selectdecision" onChange="disableAddMore()">
										<option hidden="true"></option>
										<option value="a">AND</option>
										<option value="o">OR</option>
										<option value="n">NOT</option>
									</select>
								</div>	
							</div>
							<div id="addDelButtons">
				                <input type="button" id="btnAdd" value="add section" onClick="constructQuery()">  
				                <input type="button" id="btnDel" value="remove section above" onClick="removeSection()">
				            </div>
				            <div id="submitButton">
				                <input type="button" id="submit" value="SUBMIT" onClick="sendRequest()">
				            </div>
						</form>
					</div>
					<div id="tabs-2" style="display:none;">
						<table style="width:100%">
							<tr>
						    	<td>Select Category:</td>
						    	<td>
							    	<select id="category" name="category">  <!-- onChange="loadSubCategories();" -->
										<option >Please Select</option> 
										<%-- <% 
											 for (int i =0; i<categroies.size(); i++){ %>
					 						<option value="<%=categroies.get(i)%>"><%=categroies.get(i)%></option>
					 					<% }%> --%>
									</select>
						    	</td>
						  	</tr>
						  	<tr>
						    	<td>Select SubCategory:	</td>
						    	<td>
							    	<select id="subcategory" name="subcategory" >
										<option >Please Select</option>
										<!-- this drop down is filling subcategories based on category selection dynamically from db -->
									</select>
						    	</td>
						  	</tr>
						  	 <tr>
							  	<td><label for="from">From</label></td><td><input type="text" id="fromHeat" name="from"></td>
							  </tr>
							  <tr>
							  	<td><label for="to">To</label></td><td><input type="text" id="toHeat" name="to"></td>
							  </tr>
							  <tr>
						  		<td><input type="checkbox" id="Datasource" onClick="showDataSource()">Do you want to upload data for this function?<br></td>
						  	</tr>
						  	<tr>
						  		<td><input type="submit" id="submitToDB" value="Submit" disabled></td>
						  	</tr>
						  	<tr>
						  		<td><input type="file" name="filename" id="filename" disabled></td>
						  	</tr>
						</table>
					</div>
					<div id="tabs-3">
						<table style="width:100%">
							  <tr>
							    <td>Provide Coordinates for Coordinate box:</td>
							  </tr>
							  <tr>
							    <td>Maximum Latitude:</td><td><input type="text" name="maxLat" readonly></td>
							  </tr>
							  <tr>
							    <td>Minimum Longitude:</td><td><input type="text" name="minLon" readonly></td>
							  </tr>
							  <tr>
							    <td>Maximum Longitude:</td><td><input type="text" name="maxLon" readonly></td>
							  </tr>
							  <tr>
							    <td>Minimum Latitude:</td><td><input type="text" name="minLat" readonly></td>
							  </tr>
							  <tr>
								<td><input type="button" id="populateV" value="Populate Boundary Box" onClick="getBoundingBox()"></td>
							  </tr>
							  <tr>
							    <td>Select Category:</td>
							    <td>
							    	<select id="category" name="category">  <!-- onChange="loadSubCategories();" -->
										<option >Please Select</option> 
										<%-- 	<% 
												 for (int i =0; i<categroies.size(); i++){ %>
						 						<option value="<%=categroies.get(i)%>"><%=categroies.get(i)%></option>
						 					<% }%> --%>
									</select>
							    </td>
							  </tr>
							  <tr>
							    <td>Select SubCategory:	</td>
							    <td>
							    	<select id="subcategory" name="subcategory" >
										<option >Please Select</option> 
										<!-- this drop down is filling subcategories based on category selection dynamically from db -->
									</select>	
							    </td>
							  </tr>
							  <tr>
							  	<td><label for="from">From</label></td><td><input type="text" id="from" name="from"></td>
							  </tr>
							  <tr>
							  	<td><label for="to">To</label></td><td><input type="text" id="to" name="to"></td>
							  </tr>
							  <tr>
							  	<td><input type="button" value="Submit"></td>
							  </tr>
							  <tr>
						  		<td><input type="file" name="filename" id="filename1"></td>
						  	</tr>
						</table>
					</div>
					<div id="tabs-4">
							<table>
								<tr><td>Maximum Latitude:</td><td><input type="text" name="maxLatt" readonly></td></tr>
								<tr><td>Minimum Longitude:</td><td><input type="text" name="minLonn" readonly></td></tr>
								<tr><td>Maximum Longitude:</td><td><input type="text" name="maxLonn" readonly></td></tr>
								<tr><td>Minimum Latitude:</td><td><input type="text" name="minLatt" readonly></td></tr>
								<tr>
									<td><input type="button" id="populateValues" value="Populate Boundary Box" onClick="getBoundingBox()"></td>
								</tr>
							</table>
							<form method="post" action="analysis.jsp">
							<table>
								<tr><td><input type="hidden" name="maxLatt" class="maxLat1" ></td></tr>
								<tr><td><input type="hidden" name="minLonn" class="minLon1" ></td></tr>
								<tr><td><input type="hidden" name="maxLonn" class="maxLon1" ></td></tr>
								<tr><td><input type="hidden" name="minLatt" class="minLat1" ></td></tr>
								<tr>
									<td><input type="submit" id="proceedS" value="Redirect to Analysis" /></td>
								</tr>
							</table>
							</form>
								
					</div>
				</div><!--End tabs container-->
			</div><!--End tabs-->
			<script>
				showHideTab("tabs-1");
			</script>
		</div>
				
		<script>
			var csv;
		    var cath;
		    var scath;
		    var sdateh;
		    var edateh;
		 
		  	$("#filename").change(function(e) {
			  var ext = $("input#filename").val().split(".").pop().toLowerCase();
			  if($.inArray(ext, ["xls"]) == -1) {
			  alert('Upload CSV');
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
						cath=document.getElementById("category").value;
						scath=document.getElementById("subcategory").value;
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
		 
		  	$("#filename1").change(function(e) {
			  var ext = $("input#filename1").val().split(".").pop().toLowerCase();
			  if($.inArray(ext, ["xls"]) == -1) {
			  	alert('Upload CSV');
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
					cath=document.getElementById("category").value;
					scath=document.getElementById("subcategory").value;
					sdateh=document.getElementById("from").value;
					edateh=document.getElementById("to").value;
					bmparsing(csv, cath, scath, sdateh, edateh,""); // function for barcharts
					};
		    		reader.readAsBinaryString(f);		    		
		  		 }
			  return false;
			  });	 
		</script>
	</div>	
	<div class="footer"></div>
	<script src="basic.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		mousePositionFunc();
		mouseProjectionFunc();
		mapShow();
		printmap();
	</script>
</body>

</html>