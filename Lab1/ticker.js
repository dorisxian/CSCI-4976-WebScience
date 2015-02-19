$(document).ready(function() {
	// read json file
	$.getJSON("tweets.json", function(data){
		var output = "";
		// for each tweet entry, fetch user name and tweet content 
		// and create a section with class 'tweet'
		for (var i=0; i < data.length; i++) {
			output += "<section class='tweet'>";
			var item = data[i];
			output += "<h3>" + item.user.name + "</h3>";
			output += "<p>" + item.text + "</p>";
			output += "</section>";
		}
        // put output into html container
        $('#tweet-container').html(output);

        // show only first 5 tweets
        $('.tweet:lt(5)').show();

        var timer, index = 0;
        // hide one and show one (cycle through) every 3 seconds
		timer = setInterval(function(){
			// exit loop when there's no more tweets to show
			if(index >= data.length){
				clearInterval(timer);
				return;
			}
			$('.tweet').eq(index).slideUp(2000);
			$('.tweet').eq(index+5).fadeIn(2000);
			// go to next entry
			index += 1;
		}, 3000);
	});
});