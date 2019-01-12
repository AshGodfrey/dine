//api key
const apiKey = "fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4";

//display results
function displayRandom(result) {
	console.log(result.recipes[0].image);
}

//perform searches
function searchRandom() {
	$.ajax({ 
   type : "GET", 
   dataType: "json",
   url : "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian%2Cdessert", 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
       displayRandom(result);
   }, 
   error : function(result) { 
   	alert("there's an error")
   } 
});
}

//Search Click Events
function submitRandomForm() {
	$('#random-search').submit(event => {
    event.preventDefault();
    searchRandom();
  });
}

function submitSearch() {
	$('#param-search').submit(event => {
    event.preventDefault();
    alert("clicked");
  });
}

//Run the app
submitRandomForm();
submitSearch();

