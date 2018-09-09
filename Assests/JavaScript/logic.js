$(document).ready(function(event){

	var women = ["Michelle Obama", "Ruth Bader Ginsburg", "Rosa Parks", "Chimamanda Ngozi Adichie", "Frida Kahlo"]; 
	 

	function search () {
		// Storing our giphy API for a search for anything/anyone
		var limits = 10 ; 
		var key = "vYTrQMlbi3VzLIsdjs9Qs2a3BGUqMUXU" ; 
		var search = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=" + key + "&limit=" + limits;

		// Empty giph - default page is empty
		$(".giph").empty(); 

		// Performing an AJAX GET request to our queryURL
		$.ajax({
			url: queryURL, 
			method: "GET"
		})
			// After the data form the AJAX equest comes back
			.then(function(response){
			console.log(response); 
			for (var j = 0 ; j < limits ; j++) {
			
				var holder = $("<div>");
				holder.addClass("holders"); 
				console.log(holder)
				var stillImg = $("<img>").attr({
					"src": response.data[j].images.fixed_height_still.url, 
					"data-still": response.data[j].images.fixed_height_still.url, 
					"data-animate": response.data[j].images.fixed_height.url, 
					"data-state": "still", 
					"class": "pics"
				});
			
					console.log(stillImg); 

				var ratings = $("<p>").text("Ratings: " + response.data[j].rating);
					console.log(ratings)

				$(holder).append(stillImg); 
				$(holder).append(ratings); 

				$(".giph").append(holder); 

				loop(); 

			}; 

		}); 

	}; 



	function loop () {

		$(".category").empty();

		for (var i = 0 ; i < women.length ; i++) {	

			var buttons = $("<button>");
			buttons.text(women[i]); 
			buttons.addClass("tabs");
			buttons.attr("data-name", women[i])
			$(".category").append(buttons);

		};
	};

		$("#add-women").on("click", function (event) {

			event.preventDefault();
			var userAdd = $("#women-input").val().trim()
			women.push(userAdd);  

			
			loop (); 

		
		}); 

		function play () {
		 	var state = $(this).attr("data-state"); 
          		console.log("Initial State: " + state)
        	var dataAnimate = $(this).attr("data-animate");
        	var dataStill = $(this).attr("data-still"); 

        	if (state === "still") {
       			$(this).attr("src", dataAnimate); 
        		$(this).attr("data-state", "animate"); 
			 }

			else  { 
        		$(this).attr("src", dataStill); 
        		$(this).attr("data-state", "still");
      		}
      	}; 

		$(document).on("click", ".tabs", search); 
		$(document).on("click", ".pics", play); 
			
		loop(); 
		


}); 