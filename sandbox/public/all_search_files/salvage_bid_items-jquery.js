$(document).ready(function(){

 //global error messages
  var amountMsg    = " * Please enter a valid dollar amount with 2 decimal places. (10,000.00 and 10.000.00 are invalid examples, 10000.00 is a valid example)";
  var amountAlert  = "Please enter a valid dollar amount with 2 decimal places. (10,000.00 and 10.000.00 are invalid examples, 10000.00 is a valid example)";
  var reserveMsg   = " * Please enter a valid dollar amount above the reserve price.";
  var reserveAlert = "As of March 23rd, we are no longer accepting bids under reserve.";
  
//add searched location text to header
   var searchedLocale = $("input[name='stores']").val();
   var searchedText = '';
   switch (searchedLocale) {
	   	case "%":
	   		searchedText = "All Branches";
			break;
		case "RE":
			searchedText = "Regina";
			break;
		case "SA":
			searchedText = "Saskatoon";
			break;
		case "MJ":
			searchedText = "Moose Jaw";
			break;
		case "NB":
			searchedText = "North Battleford";
			break;
		case "YK":
			searchedText = "Yorkton";
			break;
    }
   $("#searchedLocation").html(searchedText);

/* --------- Tablesorter rules --------- */
  //Bid Results table
	  $("#bid_results").tablesorter({
						  	  	widgets: ['zebra'],
							  	sortList: [[0,1]]
						});

  //List vehicles/items table
	  $("#bid_items").tablesorter({
								widgets: ['zebra'],
								//sortList: [[0,1]],
								headers: { 8:{sorter: false}}
						});
	 //reset tab order, enable all fields - on page load
	  $(".bidBox:first").focus();
	  $(':input').each(function(i, e) { $(e).attr('tabindex', i) });
	  $('.bidBox').each(function(){
		  $(this).removeAttr('disabled');					   
	   });
	 //reset tab order - after user re-sorts
	  $("#bid_items").bind("sortEnd",function() { 
			$(':input').each(function(i, e) { $(e).attr('tabindex', i) });
	   });

/* ------------ VALIDATION ----------- */
 //-- bid validation on blur --
  $('.bidBox').blur(function() {
      var sNum, rDollars, rsrv_dollars;
      var bid_dollars  = $(this).val();

      if (bid_dollars) {
		  //something entered
			if (!val_dollar_format(bid_dollars)) {
			 //invalid dollar format - show warnings
			   $showWarning(amountMsg, "#amount_err", this);
			   alert(amountAlert);
             } else {
			    //valid dollar format - get reserve amount
			      sNum     = $(this).attr("id");
			      rDollars = $("#rPrice_" + sNum).text();
		         //unformat reserve text, convert to float	
			      rsrv_dollars = money_str_to_num(rDollars);
			      if (bid_dollars < rsrv_dollars) {
			         $showWarning(reserveMsg, "#reserve_err", this);
			         alert(reserveAlert);
                   } else {
					   //bid is valid format and above reserve
   			            $(this).removeClass("redborder");
				    }
			  }
       } else {
		  //empty field - remove border
		  $(this).removeClass("redborder");
		}
   });

 //-- submit validation --
  $("form").submit(function(event){
	 var some_bids = false;
	 var rsrv_alert = false;
	 var amount_alert = false;

     $("#reserve_err").empty();
	 $("#amount_err").empty();
	 
     $('.bidBox').each(function(){
        var sNum, rDollars, rsrv_dollars;
        var bid_dollars  = $(this).val();
        $(this).removeClass("x_invalid_x");

        if (bid_dollars) {
		   //something entered
	        some_bids = true;

			if (!val_dollar_format(bid_dollars)) {
			 //invalid dollar format - show warnings
			   event.preventDefault();
			   $showWarning(amountMsg, "#amount_err", this);
			   amount_alert = true;
			   $(this).addClass("x_invalid_x");        //arbitrary class - used as error flag
             } else {
			  //valid dollar format - get and check against reserve amount
			      sNum     = $(this).attr("id");
			      rDollars = $("#rPrice_" + sNum).text();
			      rsrv_dollars = money_str_to_num(rDollars);

			      if (bid_dollars < rsrv_dollars) {
                    //bid under reserve
					 event.preventDefault();
			         $showWarning(reserveMsg, "#reserve_err", this);
			         rsrv_alert = true;
					 $(this).addClass("x_invalid_x");
                   } else {
					   //bid is valid format and above reserve
   			            $(this).removeClass("redborder");
				    }
			  }
         } else {
		   //empty field
   			 $(this).removeClass("redborder");
		     $(this).attr('disabled','disabled');
		  }
      });
	 
     if (!some_bids) {
		event.preventDefault();
       //refresh page - to enable all fields
	    location.reload(true);
	  } else {
		  //show alerts
		   if (amount_alert) { alert(amountAlert); }
		   if (rsrv_alert) { alert(reserveAlert); }
		  //set cursor at first invalid bid
           $(".x_invalid_x:first").focus();
	   }

   }); //close submit

//-----common subroutines------
  //in: string $9,999.99 - out: float 9999.99
  function money_str_to_num(money_str) {
	  money_str = money_str.replace('$', '');
	  money_str = money_str.replace(',', '');
	  var money_fl = parseFloat(money_str);
	  return money_fl;
   }

  function $showWarning(theMsg, msgWhere, borderWhat) {
      $(msgWhere).html(theMsg);
	  $(borderWhat).addClass("redborder");
   }
	
  function val_dollar_format(value) {
      if  ((value) && (/^(\d+\.\d{1,2})$/.test(value))) {
         return true;
       } else {
            return false;
	    }
   }

}); //close document.ready
