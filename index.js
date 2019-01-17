

//display results
function displayRandom(result) {
	console.log(result.recipes[0]);
	$('.results').removeClass('hidden');
	$('#random-results').append(`<h4>${result.recipes[0].title}</h4><br>
		<img src="${result.recipes[0].image}" class="results-img"><br>
		<p>${result.recipes[0].analyzedInstructions[0].steps[0]}</p>`)
	//analyzed instructions + ingredients
}

function displaySearch() {
	//display primary search
}


//will need to use a loop to go through instructions
let tags = [];
let arg = "";

//perform searches
function searchRandom() {
	returnArg();
	//if unique identifier for each response
	$.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1${arg}`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
   	alert(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1${arg}`, )
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


function buildQueryArg() {

	//loop through elements and build tags array with string value
	$("#random-search-button").click(function(){
		tags = [];
		$.each($("input[name='random']:checked"), function(){
			tags.push($(this).val());
		});
		return tags
	});
}

function returnArg(){
	arg = ""
	if (tags.length > 0) {
		arg = "&tags=" + tags[0];
		for (i = 1; i < tags.length; i++) {
			arg += "%2C+" + tags[i];
		}
	}
	return arg
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
buildQueryArg();

