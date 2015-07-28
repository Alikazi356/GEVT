var globalCounter = 0;

$(function () {$('#btnAdd').click(function () {
        var num     = $('.clonedInput').length, // Checks to see how many "duplicatable" input fields we currently have
            newNum  = new Number(num + 1),      // The numeric ID of the new input field being added, increasing by 1 each time
            newElem = $('#entry' + num).clone().attr('id', 'entry' + newNum).fadeIn('slow'); // create the new element via clone(), and manipulate it's ID using newNum value
        // searchControls
	
        newElem.find('.searchControlsd').attr('id', 'searchControlsd' + newNum );
        newElem.find('.searchControls').attr('id', 'searchControls' + newNum ).removeAttr("disabled").val('');

        if(num == 1 && $("#searchControls").val() == ""){
        	alert("Please select search type.");
        }else if($("#searchControls"+Number(newNum-1)).val() != ""){
        	//latlong - div
            newElem.find('.latlong').attr('id', 'latlong' + newNum );
            newElem.find('.lat').attr('id', 'lat' + newNum ).removeAttr("disabled").val('');
            newElem.find('.lon').attr('id', 'lon' + newNum ).removeAttr("disabled").val('');
            newElem.find('.distance').attr('id', 'distance' + newNum ).removeAttr("disabled").val('');
            newElem.find('.clocation').attr('id', 'clocation' + newNum ).val([]);
            newElem.find('.searchBox').attr('id', 'searchBox' + newNum ).removeAttr("disabled").val('');
            newElem.find('.bbutton').attr('id', 'bbutton' + newNum );
            newElem.find('.cbutton').attr('id', 'cbutton' + newNum );
            // newElem.find('.selectdecision').attr('id', 'selectdecision' + newNum ).val('');
            newElem.find('.divBasicSearchResults').attr('id', 'divBasicSearchResults' + newNum).val('');
            
            //category - div
            newElem.find('.category').attr('id', 'category' + newNum);
            newElem.find('.chooseCategory').attr('id', 'chooseCategory' + newNum).removeAttr("disabled").val('');
            //newElem.find('.selectdecisioncat').attr('id', 'selectdecisioncat' + newNum ).val('');
            
            //event name - div
            newElem.find('.eventName').attr('id', 'eventName' + newNum);
            newElem.find('.inputEventName').attr('id', 'inputEventName' + newNum).removeAttr("disabled").val('');
            //newElem.find('.selectdecisionevt').attr('id', 'selectdecisionevt' + newNum ).val('');
            
            //duration - div
            newElem.find('.duration').attr('id', 'duration' + newNum);
            newElem.find('.fromSearch').attr('id', 'fromSearch' + newNum).removeAttr("disabled").val('');
            newElem.find('.toSearch').attr('id', 'toSearch' + newNum).removeAttr("disabled").val('');
            //newElem.find('.selectdecisiondur').attr('id', 'selectdecisiondur' + newNum ).val('');
            
           //and-or - div
            newElem.find('.selectdecisiondiv').attr('id', 'selectdecisiondiv' + newNum);
            newElem.find('.selectdecision').attr('id', 'selectdecision' + newNum ).removeAttr("disabled").val('');
            

           // Insert the new element after the last "duplicatable" input field
            //$('#searchControls' + newNum).val([]);
           //alert($('#searchControls' + newNum).selectedIndex);
           // document.getElementById("stateSelect").selectedIndex
            $('#entry' + num).after(newElem);
          //  $('#ID' + newNum + '_title').focus();

        // Enable the "remove" button. This only shows once you have a duplicated section.
            $('#btnDel').attr('disabled', false);

        // Right now you can only add 4 sections, for a total of 5. Change '5' below to the max number of sections you want to allow.
            if (newNum == 5){
            	$('#btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached	
            }
        
            globalCounter = globalCounter + 1;
    		/*if (globalCounter == 4){
    			document.getElementById('notIn').style.display = 'block';
    		}*/
        }else{
        	alert("Please select search type.");
        }
        
        
    });

    $('#btnDel').click(function () {
    // Confirmation dialog box. Works on all desktop browsers and iPhone.
        if (confirm("Are you sure you wish to remove this section? This cannot be undone."))
            {
                var num = $('.clonedInput').length;
                // how many "duplicatable" input fields we currently have
                $('#entry' + num).slideUp('slow', function () {$(this).remove();
                // if only one element remains, disable the "remove" button
                    if (num -1 === 1)
                $('#btnDel').attr('disabled', true);
                // enable the "add" button
                $('#btnAdd').attr('disabled', false).prop('value', "add section");});
            }
        return false; // Removes the last section you added
    });
    // Enable the "add" button
    $('#btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('#btnDel').attr('disabled', true);
});