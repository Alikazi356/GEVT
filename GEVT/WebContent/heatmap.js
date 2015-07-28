var csvLines;
var csvValues;
var category;
var start_date1;
var start_date2;
var start_date3;
var scategory;



function hmparsing(csv, cath, scath, sdateh, edateh){
	
	
	//alert("I am");
	//scath=null;		
	//cath=null;
	//alert("I am "+ scath);
	//alert("I am" + cath);
	if (!cath)
	{
		//alert("I am" + cath);
		cath=null;
	}
	
	if (scath == "Please Select")
	{
		//alert("I am "+ scath);
		scath=null;
	}
	
	
	csvLines = csv.split("\n");
	if (cath)
		{
		
		if (scath)
			{
				if (sdateh && edateh)
					{
					//code for all three
					for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
						csvValues = csvLines[i].split(",");
						start_date1 = new Date(csvValues[4]);
						start_date2 = new Date(sdateh);
						start_date3= new Date(edateh);
						if( Number(-1) != cath.search(csvValues[2]) && Number(-1) != scath.search(csvValues[3]) && start_date1>=start_date2 && start_date1<=start_date3)
							{
								//alert (csvValues + " 1 2 3");
								addHeapMapLayer(csvValues[0], csvValues[1], "");
							}
					}
					
					}
				else{
					//code for c and s
					for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
						csvValues = csvLines[i].split(",");
						if(Number(-1) != cath.search(csvValues[2]) && Number(-1) != scath.search(csvValues[3]))
							{
							//alert (csvValues + " 1 2");
								addHeapMapLayer(csvValues[0], csvValues[1], "");
							}
					}
				}
			}
			else if (sdateh && edateh)
			{
				//code for c and t
				for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
					csvValues = csvLines[i].split(",");
					start_date1 = new Date(csvValues[4]);
					start_date2 = new Date(sdateh);
					start_date3= new Date(edateh);
					if(Number(-1) != cath.search(csvValues[2]) && start_date1>=start_date2 && start_date1<=start_date3)
						{
						//	alert (csvValues + " 1 3");
							addHeapMapLayer(csvValues[0], csvValues[1], "");
						}
				}
			}
			else
			{
				// code for c
				for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
					csvValues = csvLines[i].split(",");
					if(Number(-1) != cath.search(csvValues[2]))
						{
							//alert (csvValues + " 1");
							addHeapMapLayer(csvValues[0], csvValues[1], "");
						}
				}
			}
			
		}
	else if (edateh && sdateh)
		{
		
		//code for t
		for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
			csvValues = csvLines[i].split(",");
			start_date1 = new Date(csvValues[4]);
			start_date2 = new Date(sdateh);
			start_date3= new Date(edateh);
			if(start_date1>=start_date2 && start_date1<=start_date3)
				{
					//alert (csvValues + " 3");
					addHeapMapLayer(csvValues[0], csvValues[1], "");
				}
		}
		}
	else
		{
		for(i=0; i<csvLines.length-1; i++){  //an extra row is coming
			csvValues = csvLines[i].split(",");
			addHeapMapLayer(csvValues[0], csvValues[1], "");
		}
		
		
		}	
}

function showDataSource(){
	if(document.getElementById("heatDatasource").checked){
		document.getElementById("filename").disabled = false;
		document.getElementById("submitHeatToDB").disabled = true;
	}else{
		document.getElementById("submitHeatToDB").disabled = false;
		document.getElementById("filename").disabled = true;
	}
	
	if(document.getElementById("pieDatasource").checked){
		document.getElementById("filename1").disabled = false;
		document.getElementById("submitPieToDB").disabled = true;
	}else{
		document.getElementById("submitPieToDB").disabled = false;
		document.getElementById("filename1").disabled = true;
	}
	
}
