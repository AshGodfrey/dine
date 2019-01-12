
//display results
function displayRandom(result) {
	console.log(result.recipes[0]);
	$('.results').removeClass('hidden');
	$('#random-results').append(`<img src="${result.recipes[0].image}" class="results-img">`)
}

function displaySearch() {
	//display primary search
}





//perform searches
function searchRandom() {
	let userValue = $("#random-recipe").val();
	$.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=${userValue}`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
       displayRandom(result);
   }, 
   error : function(result) { 
   	alert("there's an error")
   } 
});
}

function searchStandard() {
	//see above for a guide
}







//Search Click Events
function submitRandomForm() {
	$('#random-search').submit(event => {
    event.preventDefault();
    searchRandom();
    $('#random-results').empty();
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

