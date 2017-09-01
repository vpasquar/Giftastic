var topics = ["chicago cubs","brooklyn nets","new york yankees","cleveland cavaliers"];

$("#add-topic").on("click",function(event) {
	event.preventDefault();
	addButton();
});

function deployButtons() {

	$("#button-area").empty();
    
    for (var i=0;i<topics.length;i++) {
      
     var a = $("<button>");
     a.addClass("gif-button").attr("data-name",topics[i]);
     a.text(topics[i])

     $("#button-area").append(a);

    }

};


function addButton() {

  var tempTopic = $("#topic-input").val().trim();
  console.log(tempTopic);
  topics.push(tempTopic);
  console.log(topics);
  deployButtons();
}


function displayGifs() {

	$("#giphy-output-area").empty();

	var queryTopic = $(this).attr("data-name");   

	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=58c03f6c7b9047b390ec22639b2b50e6&q="
	 + queryTopic +"&limit=10"

      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
      
      for (x = 0; x < response.data.length; x ++) {

      console.log(response);
      
      var img = $("<img>").addClass("gif")
      var imgURL    = response.data[x].images.original.url
      var imgMoving = response.data[x].images.original.url
      var imgStill  = response.data[x].images.original_still.url
      console.log(imgURL);

      img.attr("src",imgStill).attr("data-still",imgStill).attr("data-animate",imgMoving)
      img.attr("data-state","still")


      $("#giphy-output-area").prepend(img);

      
      }

      });
};     


function animateGifs() {
   var state = $(this).attr("data-state");


   if (state === "still") {
      $(this).attr("data-state","animate");
      $(this).attr("src",$(this).attr("data-animate"));

   }
   else {
   	  $(this).attr("data-state","still");
   	  $(this).attr("src",$(this).attr("data-still"));
   }

};


$(document).on("click",".gif",animateGifs);

$(document).on("click", ".gif-button", displayGifs);

deployButtons();      	