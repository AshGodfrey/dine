//display results
function displayRandom(result) {
	console.log(result.recipes[0]);
	$('.results').removeClass('hidden');
	$('.random-results').append(`<h4>${result.recipes[0].title}</h4>
		<img src="${result.recipes[0].image}" class="results-img"><br>
    <p><a href="${result.recipes[0].sourceUrl}">Read detailed instructions at "${result.recipes[0].sourceName}."</a>`)
	
}

function displayParam(result) {
	//display primary search
  console.log(JSON.stringify(result));
   $('.results').removeClass('hidden');
    appendParam(result);
}

function displayWine(result) {
  console.log(JSON.stringify(result));
  $('.results').removeClass('hidden');
  result.recommendedWines.forEach(wine => appendWineHTML(wine));
}


function appendWineHTML(wine){
  $('#wine-results').append(`<h4>${wine.title}</h4><img src="${wine.imageUrl}" class="wine-img"><p>${wine.description}</p><p>Price: ${wine.price}</p>`)
}

function appendParam(food){
  $('#param-results').append(`<h4>${food.title}</h4><img src="${food.image}" class="results-img"> <p><a href="${food.sourceUrl}">Read detailed instructions at "${food.sourceName}.</p>`)
}


//perform searches
function searchRandom() {
	var arg = returnArg(buildTags());
	//if unique identifier for each response
	$.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1${arg}`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
       displayRandom(result);

   }, 
   error : function(result) { 
   $('.results').removeClass('hidden');
   $('#param-results').append(`<section role="status"><h4>No Results Found</h4> <BR>
    Your search returned no results! Try again?</p></section>`)
   } 
});
}

function searchParam() {
	let searchNumber = $('#num-of-results option:selected').val();
  let query = $('#keyword').val();
  $.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=${searchNumber}&offset=0&instructionsRequired=true&query=${query}"`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
      if (result.totalResults == 0) {
      $('.results').removeClass('hidden');
      $('#param-results').append(`<section role="status"><h4>No Results Found</h4> <BR>
        Your search returned no results! Try again?</p></section>`)
      } else {
        getID(result);
      }
   }, 
   error : function(result) { 
    alert("there's an error")
   } 
});
}

//change search param format into ID format

function getID(result) {
  console.log(JSON.stringify(result))
  result.results.forEach(identifier => searchID(identifier));
}

function searchID(identifier) {
  $.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${identifier.id}/information`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) { 
       displayParam(result);

   }, 
   error : function(result) { 
    alert("there's an error")
   } 
});
}



function searchWine() {
	let wine = $("#wine-type option:selected").val();

	$.ajax({ 
   type : "GET", 
   dataType: "json",
   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?maxPrice=50&minRating=0.7&number=3&wine=${wine}`, 
   beforeSend: function(xhr){xhr.setRequestHeader('X-RapidAPI-Key', 'fbf613818dmsh4d46ff50d583636p1e4b42jsn8c77729e63e4');},
   success : function(result) {
      
      displayWine(result);

   }, 
   error : function(result) { 
   	alert("there's an error")
   } 
  });
};


function buildQueryArg() {

	//loop through elements and build tags array with string value
	$("#random-search-button").click(function(){
	});
};

function buildTags(){
  var tags = [];
  $.each($("input[name='random']:checked"), function(){
    tags.push($(this).val());
  });
  return tags
};

function returnArg(tags){
	var arg = ""
	if (tags.length > 0) {
		arg = "&tags=" + tags[0];
		for (i = 1; i < tags.length; i++) {
			arg += "%2C+" + tags[i];
		}
	}
	return arg
};



//Search Click Events
function submitRandomForm() {
	$('#random-search').submit(event => {
    event.preventDefault();
    searchRandom();
    $('#param-search-button').addClass('hidden')
    $('#random-search-button').addClass('hidden')
    $('#search-by-random').addClass('hidden')
    $('#main-paragraph').addClass('hidden')
    $("#search-by-params").addClass('hidden')
    $("#search-by-random").addClass('hidden')
  });
}

function submitSearch() {
	$('#param-search').submit(event => {
    event.preventDefault();
    searchParam();
    $('#param-search-button').addClass('hidden')
    $('#random-search-button').addClass('hidden')
    $('#search-by-params').addClass('hidden')
    $('#main-paragraph').addClass('hidden')
    $("#search-by-params").addClass('hidden')
    $("#search-by-random").addClass('hidden')
  });
}


function submitWineSearch() {
	$('#wine-search').submit(event => {
    event.preventDefault();
    searchWine();
    $('#wine-results').empty();
  });
}

//other click events
$('#param-search-button').click(event => {
  if ($(this).attr('aria-expanded') == 'true')  {
    $(this).attr('aria-expanded', 'false');
    $("#search-by-params").addClass('hidden')
  } else {
    $("#search-by-params").removeClass('hidden')
   $(this).attr('aria-expanded', 'true')
  }
});

$('#random-search-button').click(event => {
  if ($(this).attr('aria-expanded') == 'true')  {
    $(this).attr('aria-expanded', 'false');
    $("#search-by-random").addClass('hidden')
  } else {
    $("#search-by-random").removeClass('hidden')
   $(this).attr('aria-expanded', 'true')
  }
});

$('#wine-search-expand').click(event => {
  if ($(this).attr('aria-expanded') == 'true')  {
     $("#search-by-wine").removeClass('hidden')
   $(this).attr('aria-expanded', 'true')
   
  } else {
    $(this).attr('aria-expanded', 'false');
    $("#search-by-wine").addClass('hidden')
  }
});

$('#search-again').click (event => {
  location.reload()
});


//Run the app
submitRandomForm();
submitSearch();
buildQueryArg();
submitWineSearch();
