var start_date1;
var start_date2;
var start_date3;
var bararray= new Array();
var bararray2d= new Array();
var arrcount=0;
var countarray=new Array();
var pieHashMap = new Map();


function bmparsing(csv, cath, scath, sdateh, edateh,maxlatp,minlatp,maxlonp,minlonp){
	var i = 0;
	var k=0;
	var csvLines;
	var csvValues;
	var tellyflag=0;
	arrcount=0;
	bararray= new Array();
	bararray2d= new Array();
	bararray2d=[];
	//pieHashMap.clear();
	pieHashMap = new Map();
	csvLines = csv.split("\n");
	if (cath)
	{
		if(scath)
		{
			if (sdateh && edateh)
			{		
				//c s e
					//alert("c s e");
					for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
						tellyflag=0;
						csvValues = csvLines[i].split(",");
						start_date1 = new Date(csvValues[4]);
						start_date2 = new Date(sdateh);
						start_date3= new Date(edateh);
						if((maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp)
								&& Number(-1) != cath.search(csvValues[2]) && Number(-1) != scath.search(csvValues[3]) && start_date1>=start_date2 && start_date1<=start_date3)
						{
							for(k=0;k<bararray2d.length;k++)
							{
								if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[3]==bararray2d[k][2])
								{
									bararray2d[k][3] = bararray2d[k][3]+1;
									tellyflag=1;
								}
							}
							if (tellyflag==0)
							{
								bararray2d[k]=[];
								bararray2d[k][0]=csvValues[0];
								bararray2d[k][1]=csvValues[1];
								bararray2d[k][2]=csvValues[3];  //placing sub category
								bararray2d[k][3]=1;		
							}

						}
					}
					for(k=0;k<bararray2d.length;k++)
					{
						populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
					}
					readpieHashMap("0");
				
			}
			
			else
			{
				//c s
				//alert("c s");
				for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
					tellyflag=0;
					csvValues = csvLines[i].split(",");
					if((maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp)
							&& Number(-1) != cath.search(csvValues[2]) && Number(-1) != scath.search(csvValues[3]))
					{
						for(k=0;k<bararray2d.length;k++)
						{
							if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[3]==bararray2d[k][2])
							{
								bararray2d[k][3] = bararray2d[k][3]+1;
								tellyflag=1;
							}
						}
						if (tellyflag==0)
						{
							bararray2d[k]=[];
							bararray2d[k][0]=csvValues[0];
							bararray2d[k][1]=csvValues[1];
							bararray2d[k][2]=csvValues[3];  //placing sub category
							bararray2d[k][3]=1;		
						}

					}
				}
				for(k=0;k<bararray2d.length;k++)
				{
					populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
				}
				readpieHashMap("0");
				
			}
		}
		else if(sdateh && edateh)
		{
			//c e
				//alert ("c e");
				for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
					tellyflag=0;
					csvValues = csvLines[i].split(",");
					start_date1 = new Date(csvValues[4]);
					start_date2 = new Date(sdateh);
					start_date3= new Date(edateh);
					if((maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp)
							&& Number(-1) != cath.search(csvValues[2]) && start_date1>=start_date2 && start_date1<=start_date3)
					{
						for(k=0;k<bararray2d.length;k++)
						{
							if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[2]==bararray2d[k][2])
							{
								bararray2d[k][3] = bararray2d[k][3]+1;
								tellyflag=1;
							}
						}
						if (tellyflag==0)
						{
							bararray2d[k]=[];
							bararray2d[k][0]=csvValues[0];
							bararray2d[k][1]=csvValues[1];
							bararray2d[k][2]=csvValues[2];
							bararray2d[k][3]=1;		
						}
					}
				}
				for(k=0;k<bararray2d.length;k++)
				{
					populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
				}
				readpieHashMap("1");

		}
		else
		{
			//c
			//alert("c");
			
			for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
				tellyflag=0;
				csvValues = csvLines[i].split(",");
				if((maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp)
						&& Number(-1) != cath.search(csvValues[2]))
				{
					for(k=0;k<bararray2d.length;k++)
					{
						if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[2]==bararray2d[k][2])
						{
							bararray2d[k][3] = bararray2d[k][3]+1;
							tellyflag=1;
						}
					}
					if (tellyflag==0)
					{
						bararray2d[k]=[];
						bararray2d[k][0]=csvValues[0];
						bararray2d[k][1]=csvValues[1];
						bararray2d[k][2]=csvValues[2];
						bararray2d[k][3]=1;		
					}

				}
			}
			for(k=0;k<bararray2d.length;k++)
			{
				populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
			}
			readpieHashMap("1");
		}
	}
	else if(sdateh && edateh)
	{
		//e
		//alert("e");
		for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
			tellyflag=0;
			csvValues = csvLines[i].split(",");
			start_date1 = new Date(csvValues[4]);
			start_date2 = new Date(sdateh);
			start_date3= new Date(edateh);
			if((maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp)
					&& start_date1>=start_date2 && start_date1<=start_date3)
			{
				//NEED TO SEE WHY ARE WE USING COUNT=> IS THAT ALWAYS 1? HOW ARE USING COUNT  IF NOT?
				//ALSO CONFIRM IF THEY CAN PROCEED WITHOUT FILLING THE BOUNDARY BOX?
				for(k=0;k<bararray2d.length;k++)
				{
					if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[2]==bararray2d[k][2])
					{
						bararray2d[k][3] = bararray2d[k][3]+1;
						tellyflag=1;
					}
				}
				if (tellyflag==0)
				{
					bararray2d[k]=[];
					bararray2d[k][0]=csvValues[0];
					bararray2d[k][1]=csvValues[1];
					bararray2d[k][2]=csvValues[2];
					bararray2d[k][3]=1;		
				}
				
			}
		}
		for(k=0;k<bararray2d.length;k++)
		{
			populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
		}
		readpieHashMap("1");

	}
	else //nothing is selected
		{
		//alert("nothing selected");
		for (i=0; i<csvLines.length-1; i++)
		{
			tellyflag=0;
			csvValues = csvLines[i].split(",");
			//alert(maxlatp+" "+csvValues[0]+" "+minlatp+" "+csvValues[0]+" "+maxlonp+" "+csvValues[1]+" "+minlonp+" "+csvValues[1] );
			if( (maxlatp==0 ||csvValues[0]<=maxlatp) && (minlatp==0 ||csvValues[0]>=minlatp) && (maxlonp==0 ||csvValues[1]<=maxlonp) && (minlonp==0 ||csvValues[1]>=minlonp) )
			{
			for(k=0;k<bararray2d.length;k++)
				{
					
					if(csvValues[0]==bararray2d[k][0] && csvValues[1]==bararray2d[k][1] && csvValues[2]==bararray2d[k][2])
						{
							bararray2d[k][3] = bararray2d[k][3]+1;
							tellyflag=1;
						}
				}
				if (tellyflag==0)
				{
					bararray2d[k]=[];
					bararray2d[k][0]=csvValues[0];
					bararray2d[k][1]=csvValues[1];
					bararray2d[k][2]=csvValues[2];
					bararray2d[k][3]=1;
						
				}
			}
		}
		for(k=0;k<bararray2d.length;k++)
		{
			populatePiMap(bararray2d[k][0], bararray2d[k][1], bararray2d[k][2], bararray2d[k][3]);
		}
		readpieHashMap("1");
		}
}


/*
 * 
 * Function to get count of same category events at a particular place
 * */




/*
 * loadPieSubCategories(): loading sub-categories for selected category
 * */
function loadPieSubCategories(){
	var value = [];
	var v = document.getElementById("categoryPieMap");	

	for (var i = 0; i < v.length; i++) {
		if (v.options[i].selected) 
			value.push(v.options[i].value);
	}
	var dataString =  'categoryToFillSubCat=' + value;

	if (value.length > 1){
		var subcategory = document.getElementById('subCategoryPieMap');
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
				createPieSubCategoriesComboBox(arr);
			}
		});
	}


	return false;
}

function createPieSubCategoriesComboBox(array){

	var subcategory = document.getElementById('subCategoryPieMap');
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

var startDate = "";
var endDate = "";

function postPieOnMapData(){
	var postPieMapString = "";
	var pieMapQueryType = "";
	var maxLatPie = $("#maxLatPie").val();
	var minLonPie = $("#minLonPie").val();
	var maxLonPie = $("#maxLonPie").val();
	var minLatPie = $("#minLatPie").val();
	var category = $("#categoryPieMap").val();
	var subcategory = $("#subCategoryPieMap").val();

	//flagOnlyBoundingBox
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate=="" && endDate=="" && category==null && subcategory==null){
		pieMapQueryType = "flagOnlyBoundingBox";
	}
	//flagOnlyDates
	if(maxLatPie=="" && minLonPie=="" && maxLonPie=="" && minLatPie=="" && startDate!="" && endDate!="" && category==null && subcategory==null){
		pieMapQueryType = "flagOnlyDates";
	}
	//flagOnlyCats
	if(maxLatPie=="" && minLonPie=="" && maxLonPie=="" && minLatPie=="" && startDate=="" && endDate=="" && category!=null && subcategory==null){
		pieMapQueryType = "flagOnlyCats";
	}
	//flagOneCatAndSubCats
	if(maxLatPie=="" && minLonPie=="" && maxLonPie=="" && minLatPie=="" && startDate=="" && endDate=="" && category!=null && subcategory!=null){
		pieMapQueryType = "flagOneCatAndSubCats";
	}
	//flagBoundingBoxAndDates
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate!="" && endDate!="" && category==null && subcategory==null){
		pieMapQueryType = "flagBoundingBoxAndDates";
	}
	//flagBoundingBoxAndCats
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate=="" && endDate=="" && category!=null && subcategory==null){
		pieMapQueryType = "flagBoundingBoxAndCats";
	}
	//flagBoundingBoxAndOneCatAndSubCats
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate=="" && endDate=="" && category!=null && subcategory!=null){
		pieMapQueryType = "flagBoundingBoxAndOneCatAndSubCats";
	}
	//flagDatesAndCats
	if(maxLatPie=="" && minLonPie=="" && maxLonPie=="" && minLatPie=="" && startDate!="" && endDate!="" && category!=null && subcategory==null){
		pieMapQueryType = "flagDatesAndCats";
	}
	//flagDatesAndOneCatAndSubCats
	if(maxLatPie=="" && minLonPie=="" && maxLonPie=="" && minLatPie=="" && startDate!="" && endDate!="" && category!=null && subcategory!=null){
		pieMapQueryType = "flagDatesAndOneCatAndSubCats";
	}
	//flagBoundingBoxAndDatesAndCats
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate!="" && endDate!="" && category!=null && subcategory==null){
		pieMapQueryType = "flagBoundingBoxAndDatesAndCats";
	}//flagBoundingBoxAndDatesAndOneCatAndSubCats
	if(maxLatPie!="" && minLonPie!="" && maxLonPie!="" && minLatPie!="" && startDate!="" && endDate!="" && category!=null && subcategory!=null){
		pieMapQueryType = "flagBoundingBoxAndDatesAndOneCatAndSubCats";
	}
	postPieMapString = "postPieMapString="+"&maxLatPie="+maxLatPie+"&minLonPie="+minLonPie+"&maxLonPie="+maxLonPie+"&minLatPie="
	+minLatPie+"&startDate="+startDate+"&endDate="+endDate+"&category="+category+"&subcategory="
	+subcategory+"&pieMapQueryType="+pieMapQueryType;	

	$.ajax({
		type: "POST",
		dataType: "json", 
		url: "DistributionServlet",
		data: postPieMapString,

		cache: false,
		success: function(responseObj) {
			var arr = new Array();
			var parseObj = JSON.stringify(responseObj);
			arr = JSON.parse(parseObj);
			
			var flagSubCat = 0;
			for(var i=0; i<arr.length; i++){
				var tempCat = arr[0].category; 
				if(arr[i].category != tempCat){
					flagSubCat = 1;
					break;
				}		
			}
			pieHashMap = new Map();
			if (flagSubCat == 1){
				var latt, lonn, catg, events;
				for (var i=0; i<arr.length; i++){
					latt = arr[i].latitude;
					lonn = arr[i].longitude;
					catg = arr[i].category;
					events = arr[i].noOfEvents;
					populatePiMap(latt, lonn, catg, events);
				}
			}else{
				var latt, lonn, subcatg, events;
				for (var i=0; i<arr.length; i++){
					latt = arr[i].latitude;
					lonn = arr[i].longitude;
					subcatg = arr[i].subcategory;
					events = arr[i].noOfEvents;
					populatePiMap(latt, lonn, subcatg, events);
				}
			}
			
			
			readpieHashMap(flagSubCat);
		}
	});

	return false;
}

function populatePiMap(latt, lonn, catg, events){
	var key = latt+","+lonn;
	if(catg != ""){
		if (key in pieHashMap)
			pieHashMap[key].push([catg+":"+events]);
		else
			pieHashMap[key] = [ [catg+":"+events] ];
	}
}

function readpieHashMap(flagSubCat){
	for (var k in pieHashMap){
		var temp = k.toString().split(",");
		var latt = temp[0];
		var lonn = temp[1];

		datapie(Number(latt), Number(lonn), pieHashMap[k].toString(), flagSubCat);	
	}	
	pointer();	
}

function getPieMapBoundingBox(){
	var mapExtent = map.getView().calculateExtent(map.getSize());
	var coordbr = ol.extent.getBottomRight(mapExtent);
	var coordtl = ol.extent.getTopLeft(mapExtent);
	coord1 = ol.proj.transform(coordbr, "EPSG:900913", "EPSG:4326");
	coord2 = ol.proj.transform(coordtl, "EPSG:900913", "EPSG:4326");

	document.getElementById("minLatPie").value = coord1[1];
	document.getElementById("maxLatPie").value = coord2[1];
	document.getElementById("minLonPie").value = coord2[0];
	document.getElementById("maxLonPie").value = coord1[0];
}

$(function() {
	$("#startPieMapDate").datepicker({
		onSelect: function(dateText, inst) {
			sDate = new Date(dateText);
			var yearFrom = sDate.getFullYear(); // selected year
			var monthFrom = sDate.getMonth() + 1;
			var date = sDate.getDate();
			startDate = yearFrom+"-"+monthFrom+"-"+date;  
		}
	});
});

$(function() {
	$("#endPieMapDate").datepicker({
		onSelect: function(dateText, inst) {
			eDate = new Date(dateText);
			var yearFrom = eDate.getFullYear(); // selected year
			var monthFrom = eDate.getMonth() + 1;
			var date = eDate.getDate();
			endDate = yearFrom+"-"+monthFrom+"-"+date;  
		}
	});
});
