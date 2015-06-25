<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- <link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet"/> -->
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	

<title>Example</title>
	<script>
	// data array
	var arr;
	// send ajax post call to Example Servlet
	function callServletWithAjax(){
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		
		//prepare post data
		var dataString= "fname="+fname+"&lname="+lname;
		
		if (fname == '' && lname == '' ){
			alert("Please Fill Fields");
		}else{
			alert("you entered "+fname +" "+lname);
			$.ajax({
				type: "POST",
				dataType: "json", 
				url: "ExampleServlet",
				data: dataString,

				cache: false,
				success: function(responseObj) {
					//responseObj holds data in json format from server
					// we need to parse json
					arr = new Array();
					var parseObj = JSON.stringify(responseObj);
					//in arr we get json
					arr = JSON.parse(parseObj);
					//alert(arr);
				// json response is in arr, you can also iterate through arr to get values 
				// fname and lname contains the data 
				document.getElementById('responsediv').style.display = 'block';
				document.getElementById('fnameServer').innerHTML = arr.fname;
				document.getElementById('lnameServer').innerHTML = 	arr.lname;
					
				}
			});
			return false;
		}
				
	}

	</script>
</head>
<body>
	<table style="width:100%">							
				<tr>
				   <td>First Name:</td>
				   <td><input type="text" id="fname"></td>
				</tr>
				<tr>
				   <td>Last Name:</td>
				   <td><input type="text" id="lname"></td>
				</tr>
				<tr>
					<td>
			        <input type="button"  value="Submit" onClick="callServletWithAjax()">  

					</td>
				</tr>
	</table>
	<div id="responsediv" style="display:none">
		<!-- the response in these label are coming from server -->
		<label><b>Response from server</b></label><br>
		<label>First Name</label> &nbsp<label id="fnameServer"></label><br>
		<label>Last Name</label>&nbsp<label id="lnameServer"></label>
	</div>		
</body>
</html>