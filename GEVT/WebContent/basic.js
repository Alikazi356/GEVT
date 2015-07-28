var HOST_URL = 'http://open.mapquestapi.com';
var id="";
var num;
var f;
// var SAMPLE_POST = HOST_URL + '/nominatim/v1/search.php?format=json&json_callback=renderBasicSearchNarrative1&limit=50';
var SAMPLE_POST = HOST_URL + '/nominatim/v1/search.php?format=json&json_callback=renderBasicSearchNarrative1&limit=50&viewbox=47.16%2C49.18%2C9.49%2C13.65&bounded=1';

var searchType = '';

function doBasicSearchClick(id1) {
	id=id1;
	num = id.slice(-1);
	
	if (isNaN(num)){
		num = "";
	}
	var str = document.getElementById('searchBox'+num).value;
	str = str.split(' ').join('+');
	var newURL = SAMPLE_POST + "&q="+str;
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = newURL;
    //alert(newURL);
    document.body.appendChild(script);
};

function renderBasicSearchNarrative1(response) {
    var html = '';
   var i = 0;
   var j = 0;
	
	if(response){
		html += '<table><tr><th colspan="5">Search Results</th></tr>'
		//html += '<tr><td><b>#</b></td><td style="min-width:150px;"><b>Name</b></td><td><b>Lat/Long</b></td></tr>';
			html += '<tr><td><b>#</b></td><td style="min-width:150px;"><b>Name</b></td></tr>';
		html += '<tbody>'
		f=0;
		for(var i =0; i < response.length; i++){
			var result = response[i];
			//var resultNum = i+1;			
			if(result.lat>47.85733801443013 && result.lat<48.41455443759449 && result.lon>10.844902343750004 && result.lon<12.367882080078127){ //this loop is to restrict the results to Munich
			var resultNum = f+1;
			f=f+1;
			latlong = result.lat + "," +result.lon;
			html += "<tr valign=\"top\">";
			html += "<td>" + resultNum + "</td>";
			
			html += "<td onclick=\"setval(" + latlong+ ")\">";
			if(result.display_name){
				//alert("result: "+result.display_name);
				var new_display_name = result.display_name.replace(/,/g, ",<br />")
				html += new_display_name;				
			}
			html += "</td>";
			
			//html += "<td>" + result.lat + ", " + result.lon + "</td>";
			addmarkersearch(result.lat, result.lon, "map-pointer-icon.png");
			
			html += "</tr>";
		} //end of for loop for Munich
	}
		html += '</tbody></table>';
	}
	
	//alert("hello "+html);
	if(f==0)
		{
			alert("No matching results found for the name.");
		}
	document.getElementById('divBasicSearchResults'+num).style.display = "";
	document.getElementById('divBasicSearchResults'+num).innerHTML = html;
	
}



function clearsearch(id) {
	var num = id.slice(-1);
	if (isNaN(num)){
		num = "";
	}
	document.getElementById('divBasicSearchResults'+num).innerHTML = "";
	document.getElementById("searchBox"+num).value="";
	//clearsearchLayer();
	clearLayer();
}


function setval(val1, val2){
	//alert(val1 + " "+ val2);
	document.getElementById('lat'+num).value = val1;
	document.getElementById('lon'+num).value = val2;
}