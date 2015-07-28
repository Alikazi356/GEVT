/*
 * Global variables
 * */
var map;
var view;
var track;
var vectorSource;
var vectorLayer;
var geolocation;
var importedLat;
var importedLon;
var pointerimgsrc;
var pointerimgsrc1;
var featuresOverlay;
var viewCoordinates;
var dateFrom=null,dateTo=null;
var searchlayer;
var searchSource;

var csv;
var cath;
var scath;
var sdateh;
var edateh;
var relatedh;

var boundingBoxArray = [];

var dateFromHeatMap=0,dateToHeatMap=0;

var numPieCharts = 1, data=[], colors=[], r1, r2;
var i, p;
var canvas;
var image;

var datastring;

/*
 * Mouse positioning functions : mousePositionFunc(), mouseProjectionFunc()
 * */
function mousePositionFunc(){
	mousePositionControl = new ol.control.MousePosition({
		coordinateFormat: ol.coordinate.createStringXY(4),
		projection: 'EPSG:4326',
		className: 'custom-mouse-position',
		target: document.getElementById('map'),
		undefinedHTML: '&nbsp;'
	});
}// END mousePositionFunc()

function mouseProjectionFunc(){
	var projectionSelect = new ol.dom.Input(document.getElementById('projection'));
	projectionSelect.bindTo('value', mousePositionControl, 'projection').transform(
			function(code) {
				return ol.proj.get(/** @type {string} */ (code));
			},
			function(projection) {
				return projection.getCode();});
	var precisionInput = document.getElementById('precision');
	precisionInput.addEventListener('change', function() {
		var format = ol.coordinate.createStringXY(precisionInput.valueAsNumber);
		mousePositionControl.setCoordinateFormat(format);
	}, false);
}// END mouseProjectionFunc()

function addBarOnTheMap(img){
	addmarker(11.4922582, 48.12, img);
}// END addLayer()

/*
 * Marker function: addmarker()
 * 
 */
function addmarker(lat, lon, catg, labelmarker){
	var la = Number(lat);
	var lo = Number(lon);
	
	switch (catg) {
	case "accident": 
		pointerimgsrc="accident.png";
		break;
	case "concert": 
		pointerimgsrc="Concert.png";
		break;
	case "conference": 
		pointerimgsrc="accident.png";
		break;
	case "construnction": 
		pointerimgsrc="Construction.png";
		break;
	case "educational": 
		pointerimgsrc="Educational.png";
		break;
	case "exhibition": 
		pointerimgsrc="Exhibition.png";
		break;
	case "natural": 
		pointerimgsrc="accident.png";
		break;
	case "others": 
		pointerimgsrc="Others.png";
		break;
	case "political": 
		pointerimgsrc="Political.png";
		break;
	case "social": 
		pointerimgsrc="Social.png";
		break;
	case "sport": 
		pointerimgsrc="Sports.png";
		break;
	case "traffic": 
		pointerimgsrc="Traffic.png";
		break;
	default: pointerimgsrc="Others.png";
	}
	
	var iconFeature = new ol.Feature({		
		geometry: new ol.geom.Point(ol.proj.transform([lo, la], 'EPSG:4326', 'EPSG:3857')),
		name: labelmarker
	});


	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 0.75,
			//src: 'data/icon.png'
			src: pointerimgsrc
		}))
	});

	iconFeature.setStyle(iconStyle);

	vectorSource = new ol.source.Vector({
		features: [iconFeature]
	});

	vectorLayer = new ol.layer.Vector({
		source: vectorSource
	});

	map.addLayer(vectorLayer);

}// END addmarkerr()

function addmarkersearch(lat, lon, pointerimgsrc){

	var la = Number(lat);
	var lo = Number(lon);
	var iconFeature = new ol.Feature({		
		geometry: new ol.geom.Point(ol.proj.transform([lo, la], 'EPSG:4326', 'EPSG:3857')),
		name: 'hello'
	});


	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 0.75,
			//src: 'data/icon.png'
			src: pointerimgsrc
		}))
	});

	iconFeature.setStyle(iconStyle);

	searchSource = new ol.source.Vector({
		features: [iconFeature]
	});

	searchlayer = new ol.layer.Vector({
		source: searchSource
	});

	map.addLayer(searchlayer);

}

/*
 * Clear Map Layer : clearLayer()
 * */
function clearLayer(){
	//map.removeLayer(vectorLayer);
	var i;
	var maplayers=map.getLayers();
	for (i = maplayers.getLength(); i > 0; i--) {
		map.removeLayer(maplayers.item(i));
	}

}// END clearLayer()

/*
 * Add Map Layer : addLayer() - sample to check the markers
 * */
function addLayer(){
	//map.addLayer(vectorLayer);
	pointerimgsrc='map-pointer-icon.png';
	pointerimgsrc1='Google_Maps_Marker.png';
	addmarker(73.00, 23.00, pointerimgsrc);
	addmarker(11.4922582, 48.12, pointerimgsrc1);
}// END addLayer()

/*
 * Map Generation function: mapShow() 
 */
function mapShow(){
	map = new ol.Map({
		target: document.getElementById('map'),
		controls: ol.control.defaults({
			attributionOptions: ({
				collapsible: true
			})
		}).extend([mousePositionControl]),
		//controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
		layers: [
		         new ol.layer.Tile({source: new ol.source.OSM()})],
		         view: view = new ol.View({
		        	 center: [0, 0],
		        	 zoom: 2
		         })
	});

	/*var ol3d = new olcs.OLCesium({map: map}); // map is the ol.Map instance
	var scene = ol3d.getCesiumScene();
	var terrainProvider = new Cesium.CesiumTerrainProvider({
		  url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
		});
		scene.terrainProvider = terrainProvider;
	ol3d.setEnabled(true);*/

	var zoomslider = new ol.control.ZoomSlider(); //for slider
	map.addControl(zoomslider);
	var fullscreen = new ol.control.FullScreen();  //for full screen option of map
	map.addControl(fullscreen);
	// Displaying coordinated on click based mouse position
	map.on('singleclick', function(evt){
		var coord = evt.coordinate;
		latLongposition = ol.proj.transform(coord, "EPSG:900913", "EPSG:4326");
		$('#latLongposition').attr('value', latLongposition);
	});

	map.getView().setCenter(ol.proj.transform([11.57,48.13], 'EPSG:4326', 'EPSG:3857'));
	map.getView().setZoom(14);

	heatmapSource = new ol.source.Vector({features: []});

	vector = new ol.layer.Heatmap({source: heatmapSource});
}// END mapShow()




/*
 * Get Current Location of user and print it: getLocation()
 * */
function getLocation(id){
	var cbox = document.getElementById(id);
	var num = id.slice(-1);
	if (isNaN(num)){
		num = "";
	}

	var ProjectionName = "EPSG:4326";

	var geolocation = new ol.Geolocation({
		projection: ProjectionName,
		tracking: true
	});

	var latlongarray = null;

	if(cbox.checked){
		geolocation.once('change', function(evt) {
			latlongarray = geolocation.getPosition();
			/*map.getView().setCenter(ol.proj.transform(latlongarray, 'EPSG:4326', 'EPSG:3857'));
			map.getView().setZoom(17);*/
			//document.getElementById("centerlatlong").innerHTML = "Lat: " + latlongarray[0] + " Long: " + latlongarray[1];
			document.getElementById("lon"+num).value = Math.round(Number(latlongarray[0]) * 10000000) / 10000000;
			document.getElementById("lat"+num).value = Math.round(Number(latlongarray[1]) * 10000000) / 10000000;
		});
	}
}// END getLocation()

/*
 * Print the map
 * */ 
function printmap(){
	var exportPNGElement = document.getElementById('export-png');

	if ('download' in exportPNGElement) {
		exportPNGElement.addEventListener('click', function(e) {
			map.once('postcompose', function(event) {
				var canvas = event.context.canvas;
				exportPNGElement.href = canvas.toDataURL('image/png');
			});
			map.renderSync();
		}, false);
	} else {
		var info = document.getElementById('no-download');
		info.style.display = 'Some error occured in printing';
	}
}//End of map printing

function loadSubCategories(){
	var value = [];
	var v = document.getElementById("categoryHeatMap");	

	for (var i = 0; i < v.length; i++) {
		if (v.options[i].selected) value.push(v.options[i].value);
	}

	var dataString =  'categoryToFillSubCat=' + value;

	if (value.length > 1){
		var subcategory = document.getElementById('subcategoryHeatMap');
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
				createSubCategoriesComboBox(arr);
			}
		});
	}


	return false;
}

function createSubCategoriesComboBox(array){

	var subcategory = document.getElementById('subcategoryHeatMap');
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


function generateHeatMap() {
	try{
		var dataString;
		var category = $("#categoryHeatMap").val();
		var subCategory = $("#subcategoryHeatMap").val();
		var fullQuery=false;

		if(category.length > 0 && subCategory == null){
			subCategory = "";
		}
		if (category != null && subCategory != null   &&  (dateFromHeatMap != 0 && dateToHeatMap != 0)){
			fullQuery=true;
		}
		if(category == null && subCategory == null   &&  (dateFromHeatMap != 0 && dateToHeatMap != 0)){
			category = "";
			subCategory = "";
		}
		if(category != null && subCategory == null   &&  (dateFromHeatMap != 0 && dateToHeatMap != 0)){
			subCategory = "";
		}
		if(category == null && subCategory == null   &&  (dateFromHeatMap == 0 && dateToHeatMap == 0)){
			category = "";
			subCategory = "";
		}		
		dataString = 'category=' + category  + '&subCategory=' + subCategory +
		'&dateTo=' + dateToHeatMap  + '&dateFrom=' + dateFromHeatMap +"&fullQuery=" + fullQuery;
		map.removeLayer(vector);

		// Returns successful data submission message when the entered information is stored in database.

		if ((category == ""  && subCategory == "" && (dateFromHeatMap == 0 && dateToHeatMap == 0))) {
			alert("Please Select atleast one option");
		} else {
			// AJAX code to submit form.
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

					var eventName,lan,lon,i;
					for ( i=0; i<arr.length; i++){
						lan = arr[i].latitude;
						lon = arr[i].longitude;
						eventName = arr[i].eventName;
						addHeapMapLayer(lan,lon,eventName);
					}

				}
			});
		}
		return false;
	}catch(error){
		alert(error);		
	}finally{
		dateToHeatMap=0;
		dateFromHeatMap=0;

	}
}

function clearsearchLayer(){
	map.removeLayer(searchlayer);

}
////jquery calendar code

$(function() {
	$("#from").datepicker({
		dateFormat: 'dd-mm-yy'
	});
});
$(function() {
	$("#to").datepicker({
		dateFormat: 'dd-mm-yy'
	});
});

$(function() {
	$("#fromHeat").datepicker();
});
$(function() {
	$("#toHeat").datepicker();
}); 

function addHeapMapLayer(latitude,longitude,eventName){
	someFeature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.transform([Number(longitude),Number(latitude)], 'EPSG:4326', 'EPSG:3857')),
		//	geometry: new ol.geom.Point([latitude,longitude]),
		name: eventName
	});

	heatmapSource.addFeature(someFeature);
	map.addLayer(vector);
	map.getView().setCenter(ol.proj.transform([11.58,48.14], 'EPSG:4326', 'EPSG:3857'));
	map.getView().setZoom(12);

}

function getBoundingBox(){
	var mapExtent = map.getView().calculateExtent(map.getSize());
	var coordbr = ol.extent.getBottomRight(mapExtent);
	var coordtl = ol.extent.getTopLeft(mapExtent);
	coord1 = ol.proj.transform(coordbr, "EPSG:900913", "EPSG:4326");
	coord2 = ol.proj.transform(coordtl, "EPSG:900913", "EPSG:4326");

	document.getElementsByName("minLonn")[0].value = coord2[0];
	document.getElementsByName("maxLonn")[0].value = coord1[0];
	document.getElementsByName("minLatt")[0].value = coord1[1];
	document.getElementsByName("maxLatt")[0].value = coord2[1];
		
	document.getElementsByName("minLonn")[1].value = coord2[0];	
	document.getElementsByName("maxLonn")[1].value = coord1[0];	
	document.getElementsByName("minLatt")[1].value = coord1[1];	
	document.getElementsByName("maxLatt")[1].value = coord2[1];

/*	document.getElementsByName("minLat")[0].value = coord2[0];
	document.getElementsByName("maxLat")[0].value = coord1[0];
	document.getElementsByName("minLon")[0].value = coord1[1];
	document.getElementsByName("maxLon")[0].value = coord2[1];*/
}


/*
 * PIE MAP DISTRIBUTION FUNCTIONS
 * 
 */

function datapie(lat,long,datastring, flagSubCat)
{	

	var dataline=new Array();
	var datacolor=new Array();
	var datavalue=new Array();
	var sum=0;
	var val;

	dataline=datastring.split(',');

	if(flagSubCat == 1){
		for (var i=0;i<dataline.length;i=i+1){
			datacolor=dataline[i].split(':');
			switch (datacolor[0]) {
			case "accident": 
				colors.push(['red']);
				break;
			case "concert": 
				colors.push(['red']);
				break;
			case "conference": 
				colors.push(['red']);
				break;
			case "construnction": 
				colors.push(['blue']);
				break;
			case "educational": 
				colors.push(['green']);
				break;
			case "exhibition": 
				colors.push(['orange']);
				break;
			case "natural": 
				colors.push(['red']);
				break;
			case "others": 
				colors.push(['blue']);
				break;
			case "political": 
				colors.push(['purple']);
				break;
			case "social": 
				colors.push(['blue']);
				break;
			case "sport": 
				colors.push(['green']);
				break;
			case "traffic": 
				colors.push(['pink']);
				break;
			default: colors.push(['yellow']);
			}
		}// END for
	}else{
		for (var i=0;i<dataline.length;i=i+1){
			datacolor=dataline[i].split(':');
			switch (datacolor[0]) {
			case "Tram": 
				colors.push(['red']);
				break;
			case "Falls": 
				colors.push(['blue']);
				break;
			case "Criminal": 
				colors.push(['green']);
				break;
			case "Bicycle": 
				colors.push(['Yellow']);
				break;
			case "Bus": 
				colors.push(['Orange']);
				break;			
			default: colors.push(['Black']);
			}
		}// END for
	}//END else
	
	for(i=0;i<dataline.length;i=i+1)		//for data sum
	{
		datavalue=dataline[i].split(':');
		//data.push([datavalue[1]]);
		sum=sum+parseInt(datavalue[1]);
	}
	for(i=0;i<dataline.length;i=i+1) 	//for data 
	{	
		datavalue=dataline[i].split(':');
		data.push([Math.floor((datavalue[1] / sum) * 100)]); 
	}		
	makepie(lat,long,datastring,sum);

}

//provided will be lat, long, string("accident,5|concert,6")
//csvValues = csvLines[i].split(",");

function makepie(lat,long,datastring,sum) {

	//canvas = document.createElement('canvas');--changed
	canvas = document.getElementById("piechart");
	var context = canvas.getContext('2d');
	canvas.setAttribute('width', '20'); //2700 		----changed
	canvas.setAttribute('height', '20'); //1400			-----changed

	var totalArc = -90*Math.PI / 180;
	var percentToRadians = 1 / 100*360 *Math.PI / 180;
	var wedgeRadians;

	function drawWedge(percent, color) {

		var cX = Math.floor(canvas.width / 2);
		var cY = Math.floor(canvas.height / 2);
		var radius=findradius(sum)

		wedgeRadians = percent * percentToRadians;

		context.save();
		context.beginPath();
		context.moveTo(cX, cY);
		context.arc(cX, cY, radius, totalArc, totalArc + wedgeRadians, false);
		context.closePath();
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 0;
		context.strokeStyle = 'rgba(0,0,0,0)';
		context.stroke();
		context.restore();

		totalArc += wedgeRadians;
	}

	var drawPie = function(data, colors) {
		for(var i=0;i<data.length;i++){
			drawWedge(data[i],colors[i]);
		}
	}

	for(var i=0; i<data.length;i++){
		drawPie(data[i], colors[i]);
	}
	showpie(canvas,lat,long,datastring);
};

function showpie(canvas,lat,long,datastring) {
	image = new Image();
	image.src = canvas.toDataURL();
	var iconFeaturep = new ol.Feature({		
		geometry: new ol.geom.Point(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857')),
		name: datastring
	});


	var iconStylep = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 1,//opacity: 0.75,
			//src:'Google_Maps_Marker.png'
			src: image.src
		}))
	});

	iconFeaturep.setStyle(iconStylep);

	vectorSourcep = new ol.source.Vector({
		features: [iconFeaturep]
	});

	piechartLayer = new ol.layer.Vector({
		source: vectorSourcep
	});

	map.addLayer(piechartLayer,datastring);


}


function pointer(){
	var element = document.getElementById('popup');
	var popup = new ol.Overlay({
		element: element,
		positioning: 'bottom-center',
		stopEvent: false
	});
	map.addOverlay(popup);

	// display popup on click
	map.on('click', function(evt) {
		var feature = map.forEachFeatureAtPixel(evt.pixel,
				function(feature, layer) {
			return feature;
		});
		if (feature) {
			var geometry = feature.getGeometry();
			var coord = geometry.getCoordinates();
			popup.setPosition(coord);
			$(element).popover('destroy');
			$(element).popover({
				'placement': 'top',
				'html': true,
				'content': feature.get('name')
			});
			$(element).popover('show');
		} else {
			$(element).popover('destroy');
		}
	});
	// change mouse cursor when over marker
	map.on('pointermove', function(e) {
		if (e.dragging) {
			$(element).popover('destroy');
			return;
		}
	});
}
/* change this is Jandel's code*/

function findradius(sum)
{
	var rad;
	if (sum<=10)
		rad=5;
	else if(sum<=15)
		rad=5.5;
	else if(sum<=20)
		rad=6;
	else if(sum<=25)
		rad=6.5;
	else if(sum<=30)
		rad=7;
	else if(sum<=35)
		rad=7.5;
	else if(sum<=40)
		rad=8;
	else if(sum<=45)
		rad=8.5;
	else if(sum<=50)
		rad=9;
	else if(sum<=55)
		rad=9.5;
	else if(sum>50)
		rad=10;
	return rad;

}

/*
 * END OF PIE MAP DISTRIBUTION
 * 
 */