<!DOCTYPE html>
<html>
<head>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="two.min.js"></script>

</head>

<body>
	<div id="draw">
        <div class="two-container"></div>
    </div>
	<script>
      var elem = document.getElementById('draw').children[0];
      var two = new Two({ width: 285, height: 200 }).appendTo(elem);

      var Tevn = ["11", "9", "2", "0", "14", "7"];     
      var colors = ["#0000FF", "#00CC00", "#FF0000","#FFCC00","#CC00CC","#000000"];
      var rect;
      var width = 15;
      var height = 10;
      var i = 0;
      var value;
      
      var xOffset = 70;
      var yOffset = 56; 

      for(value in Tevn){
        rect = two.makeRectangle(xOffset, yOffset, width, value*height);
        rect.fill = colors[i];
      
        i = i + 1;
        //xOffset = 70+i*width;
        yOffset = yOffset+value*height;
      }

      
      two.bind('update', function(frameCount) {}).play();
    </script>
    
	<img id="canvasimg" src="" style="background-color:blue;"/>
	
	<script type="text/javascript">
		var width=10;
		var height=10;
		//var img = document.getElementById('canvasimg');
		
		//$("#canvasimg").attr("src", $("#draw").get(0).toDataURL("img/png"));
		//$("#canvasimg").attr(two.getImageData(0, 0, img.width, img.height));
	</script>

	
	
</body>

</html>














<!-- //http://www.javascriptoo.com/two-js

function drawBars(){
	var cheight = 1500;
    var cwidth = 285;
    var elem = document.getElementById('drawBarsOnMap').children[0];
    var two = new Two({ width: cwidth, height: cheight }).appendTo(elem);
	  
    var width = 15;
    var height = 100;

    
    var rect = two.makeRectangle(70, 56, width, height);
    rect.fill = 'rgba(0, 200, 255, 0.75)';
	
    
    
    
    
    
    
	 var canvas = document.getElementById("drawBarsOnMap");
     var ctx=canvas.getContext("2d");
     //draw a red box
     ctx.fillStyle="#FF0000";
     ctx.fillRect(10,10,30,30);

     var url = canvas.toDataURL();

     var newImg = document.createElement("img"); // create img tag
     newImg.src = url;
     
     return newImg;
}









/*
for(value in Tevn){
    if(i != 0){
    	yOffset = yOffset+value*height;	
    }
  	var rect = two.makeRectangle(70+i*width, yOffset, width, value*height);
  	rect.fill = colors[i];
    i = i + 1;
  }
*/
 -->