//https://www.livestrong.com/article/92939-calculate-bmi-hand/

//Obtain user inputs

//global variables

var heightFeetInput;
var heightInchesInput;
var heightInInches;
var heightInCm;
var weightPounds;
var weightKg;
var ree = 0;
var sex;
var age;
var activityLevel;
var protein = 0;
var fat = 0;
var carbs = 0;
var reeAfter = 0;
var BMI;
var idealWeight;
var lowestHealthyWeight;
var userGoal;
var ajaxCall;
var youTubeQuery;
var edamamCall;
var lowFat = 'low-fat';
var highProtein = 'high-protein';
var lowCarb = 'low-carb';
var searchTerms;
// varbiables for activity levels: couchPotatoe, moderatelyActive, highlyActive, triathlonRunner


//calculate variables based on inputs

function createChart(fprotein, fcarbs, ffat) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [{
            label: '# of Votes',
            data: [fprotein, fcarbs, ffat],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 5
        }]
    },
    options: {
        legend: {
            display: false
         },
    }
    });
}
$('.goal').hover(function () {
    var id=$(this).attr('id');
    $('#' + id).css('color', 'grey');
    switch (id) {
        case "loseWeight":
        $('#loseWeightTitle').css('color', 'grey');
        $('#loseWeightText').css('color', 'grey');
        $('#loseWeightImg').attr('src', 'assets/images/waist (1).png');
        break;

        case "buildMuscle":
        $('#buildMuscleTitle').css('color', 'grey');
        $('#buildMuscleText').css('color', 'grey');
        $('#buildMuscleImg').attr('src', 'assets/images/muscle-flex-outline (1).png');
        break;

        case "getToned":
        $('#getTonedTitle').css('color', 'grey');
        $('#getTonedText').css('color', 'grey');
        $('#getTonedImg').attr('src', 'assets/images/gym (1).png');
    }
}, function() {
    var id=$(this).attr('id');
    switch (id) {
        case "loseWeight":
        $('#loseWeightTitle').css('color', 'black');
        $('#loseWeightText').css('color', 'black');
        $('#loseWeightImg').attr('src', 'assets/images/waist.png');
        break;

        case "buildMuscle":
        $('#buildMuscleTitle').css('color', 'black');
        $('#buildMuscleText').css('color', 'black');
        $('#buildMuscleImg').attr('src', 'assets/images/muscle-flex-outline.png');
        break;

        case "getToned":
        $('#getTonedTitle').css('color', 'black');
        $('#getTonedText').css('color', 'black');
        $('#getTonedImg').attr('src', 'assets/images/gym.png');
    }
})
$('.goal').on('click', function() {
    $('#goals').css('display', 'none');
    userGoal = $(this).attr('id');

    if(userGoal === 'loseWeight') {
        $('.goalsTitle').text('That\'s great, you want to lose weight!');
    } else if (userGoal === 'buildMuscle') {
        $('.goalsTitle').text('That\'s great, you want to build muscle!');
    } else {
        $('.goalsTitle').text('That\'s great, you want to get toned!')
    }
    setTimeout(function() {
        $('.goals').fadeOut(500);
    }, 500)

    setTimeout(function() {
        $('#userInputs').fadeIn(500);
    }, 1000)

});

$('#submitInfo').on('click', function(event) { 
    $('#userInputs').css('display', 'none');
    

if ($("#userHeightFeet").val() !== '' && $("#userHeightInches").val() !== '' && $("#userWeight").val() && $("#userSex").val() !== '' && $("#userAge").val() !== '') {    
event.preventDefault();

$('.resultsContainer').css('display', 'block');
heightFeetInput = $("#userHeightFeet").val();
heightInchesInput = $("#userHeightInches").val();
heightInInches = (parseInt(heightFeetInput) * 12) + parseInt(heightInchesInput);
heightInCm = heightInInches * 2.54;
weightPounds = $("#userWeight").val();
weightKg = weightPounds * .454;
sex = $("#userSex").val();
userAge = $("#userAge").val();
activityLevel = $("#userActivity").val();

idealWeight = ((heightInInches * 24) * heightInInches)/705
lowestHealthyWeight = ((heightInInches * 18.5) * heightInInches)/705

var BMI = ((parseInt(weightPounds) * 705)/heightInInches)/heightInInches;
BMI = Math.round(BMI);

$("#userHeightFeet").val('');
$("#userHeightInches").val('');
$("#userWeight").val('');
$("#userSex").val('');
$("#userAge").val('');
$("#userActivity").val('');
$('#userName').val('');

if (sex === "male") {
    ree = (10 * weightKg) + (6.25 * heightInCm) - (5 * userAge) + 5;
} else {
    ree = (10 * weightKg) + (6.25 * heightInCm) - (5 * userAge) - 161;
}

ree = Math.round(ree);

switch(activityLevel) {
    case "couchPotato": 
    reeAfter = ree * 1.2;
    break;

    case "moderatelyActive":
    reeAfter = ree * 1.375;
    break;

    case "highlyActive":
    reeAfter = ree* 1.55;
    break;

    case "triathlonRunner":
    reeAfter = ree * 1.725;
    break;
};

reeAfter=Math.round(reeAfter);
$('#cCount').text(reeAfter);
switch(userGoal) {

    case "loseWeight":
    reeAfter *= .9;
    protein = Math.round((reeAfter * .35)/4);
    fat = Math.round((reeAfter * .2)/9);
    carbs = Math.round((reeAfter * .45)/4);
    youTubeQuery = "exercises+lose+weight";
    searchTerms = lowFat;
    break;

    case "buildMuscle":
    reeAfter *= 1.1;
    protein = Math.round((reeAfter * .35)/4);
    fat = Math.round((reeAfter * .2)/9);
    carbs = Math.round((reeAfter * .45)/4);
    youTubeQuery = "exercises+build+muscle";
    searchTerms = highProtein;
    break;

    case "getToned":
    protein = Math.round((reeAfter * .50)/4);
    fat = Math.round((reeAfter * .30)/9);
    carbs = Math.round((reeAfter * .20)/4);
    youTubeQuery = "exercises+get+toned";
    searchTerms = lowCarb;
    break;
};

reeAfter = Math.round(reeAfter);

$('#BMI').text(BMI);
if (BMI <= 18) {
    $('#BMI').css('color', 'orange');
} else if (BMI < 25) {
    $('#BMI').css('color', 'green');
} else if (BMI < 30) {
    $('#BMI').css('color', 'yellow');
} else  {
    $('#BMI').css('color', 'red');
}
$('#BMIinfo').css('display', 'inline-block');

$('#macroChart').css('display', 'inline-block');

$('#nutrientInfo').append('<h3 class="nutrients">Protein needed: ' + protein + '<h3>');
$('#nutrientInfo').append('<h3 class="nutrients">Carbs needed: ' + carbs + '<h3>');
$('#nutrientInfo').append('<h3 class="nutrients">Fat needed: ' + fat + '<h3>');
createChart(protein, carbs, fat);

$('#videos').css('display', 'block');

$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&videoDuration=medium&q=" + youTubeQuery + "&type=video&videoDefinition=high&key=AIzaSyBAhh8JN12Xz7fLIavO-XuhO0V9bXHjAMI&maxResults=10",
    method: "GET"
  }).then(function(response) {

      ajaxCall = response.items;

      for(var i = 0; i < ajaxCall.length; i++) {
          var newDiv = $('<div>');
          newDiv.attr('class', 'video card');
          newDiv.css({'width': '33rem','margin': '10px','height' : '340px' , 'display': 'inline-block', 'border' : 'solid 1px lightgrey'});
          newDiv.attr('id', 'youtubeVideo#' + i);

          var newAnchor = $('<a>');
          newAnchor.attr('href', 'https://www.youtube.com/watch?v=' + ajaxCall[i].id.videoId);
          newAnchor.attr('target', '_blank');
          
          var newImage = $('<img>');
          newImage.attr('class', 'card-img-top');
          newImage.attr('src', ajaxCall[i].snippet.thumbnails.medium.url)
        newAnchor.append(newImage);

        var newTitle = $('<h3>');
        newTitle.attr('class', 'card-title');
        newTitle.text(ajaxCall[i].snippet.title);
        newAnchor.append(newTitle);

        $(newDiv).append(newAnchor);

        $('#videos').append(newDiv);


      }
    });

      var edamamCall;

var lowFat = 'low-fat';
var highProtein = 'high-protein';
var lowCarb = 'low-carb';
var searchTerms = [lowFat, highProtein, lowCarb];

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/" + "https://api.edamam.com/search?q=" + searchTerms + "&app_id=618ffb44&app_key=70e58eb1b0363201c44e518f1cd8b7f6",
    method: "GET"
}).then(function (response) {

    edamamCall = response.hits;
    for (var i = 0; i < edamamCall.length; i++) {
        var recipeDiv = $('<div>');
        recipeDiv.attr('id', 'receipeInfo' + i);
        recipeDiv.attr('class', 'card rounded');
        recipeDiv.attr('style', 'width: 33rem;');
        recipeDiv.css({'height': '340px', 'margin' : '10px', 'display' : 'inline-block'});

        var recipeAnchor = $('<a>')
        recipeAnchor.attr('href', edamamCall[i].recipe.url);
        recipeAnchor.attr('target', '_blank');

        var recipePic = $('<img>');
        recipePic.attr('class', 'card-img-top rounded')
        recipePic.attr('src', edamamCall[i].recipe.image);
        recipePic.attr('alt', 'pic of food');
        recipeAnchor.append(recipePic);


        var recipeTitle = $('<h3>');
        recipeTitle.attr('class', 'card-text text-center text-wrap card-title');
        recipeTitle.text(edamamCall[i].recipe.label);
        recipeAnchor.append(recipeTitle);

        recipeDiv.append(recipeAnchor);
        $('#recipes').append(recipeDiv)

    }
    $('#recipes').css('display', 'block');
});

} else {
    alert("You have not filled out the form correctly. Please try again!");
}
});