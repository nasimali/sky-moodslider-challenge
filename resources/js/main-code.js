/**
*     Author Nasim ali
*     Sky Software engineering coding test
**/

var loadedProgrammeList = new Array();
var fiveSelectedMovies = new Array();

var defaultMood = {moodNumber:2,moodString:"default"};
var lastSelectedMood = defaultMood;

/**
    This method will find from the list of movies the selected movie type of mood
    chosen by the user and will store it in an array, and then output it to the
    GUI.
**/
function getMovieData(selectedMood){
    var tempLastMood;
    //loops to get the fist mood selected list of movies
    for(i = 0; i < loadedProgrammeList.length; i++){

       if (loadedProgrammeList[i].mood.toUpperCase() == selectedMood.moodString.toUpperCase()){

                fiveSelectedMovies.push(loadedProgrammeList[i]);

            }

       }

      //outputs the movie title and image to gui
      for (i = 0; i<5; i++){
        $("#image"+i).attr("src",fiveSelectedMovies[i].imagePath);
        $("#label"+i).text(fiveSelectedMovies[i].name);
      }

      fiveSelectedMovies = new Array();
      tempLastMood = lastSelectedMood;
      lastSelectedMood = selectedMood;
      organisingMoodSelected(tempLastMood);

}
//Method to trigger the file finder window
$("#file-upload-button").click(function () {

    $("#file-uploader").trigger('click');

    var locat = $('#file-uploader').val();

});
/**
    Once the file has been selected the function will then retrieve the movie
    list and store it as an Object in an array
**/
$('input[type=file]').change(function () {

    var fileToGet = event.target.files[0];

    var reader = new FileReader();

    reader.readAsText(fileToGet);

    reader.onload = function(event){
        //parsing the xml so its retrievable
        var xmlDoc = $.parseXML( this.result );

        var $xml = $(xmlDoc);

        var $programmeList = $xml.find("programme");

        $programmeList.each(function(){
          //storing each movie as an object to access later on
            loadedProgrammeList.push({
                name: $(this).find('name').text(),
                imagePath: $(this).find('imagePath').text(),
                mood: $(this).find('mood').text()
            });

        });

    }

});

//This defaults the last mood selector back to original
function organisingMoodSelected(lastLastMood){

            if (lastLastMood.moodString == "agitated" && lastSelectedMood.moodString == "calm" || lastLastMood.moodString == "calm" && lastSelectedMood.moodString == "agitated" || lastLastMood.moodString == "happy" && lastSelectedMood.moodString == "sad" || lastLastMood.moodString == "sad" && lastSelectedMood.moodString == "happy" || lastLastMood.moodString == "tired" && lastSelectedMood.moodString == "wide awake" || lastLastMood.moodString == "wide awake" && lastSelectedMood.moodString == "tired" || lastLastMood.moodString == "scared" && lastSelectedMood.moodString == "fearless" || lastLastMood.moodString == "fearless" && lastSelectedMood.moodString == "scared") {

            } else if (lastSelectedMood.moodString == defaultMood.moodString){
              //ignore
            }else if (lastLastMood.moodString === "agitated" || lastLastMood.moodString === "calm"){
                //mood defaults back to neutral

                  document.getElementById("agitated-calm").value = 2;

            } else if (lastLastMood.moodString == "happy" || lastLastMood.moodString == "sad"){

                  document.getElementById("happy-sad").value = 2;

            } else if (lastLastMood.moodString == "tired" || lastLastMood.moodString == "wide awake"){

                    document.getElementById("tired-wide awake").value = 2;

            } else if (lastLastMood.moodString == "scared" || lastLastMood.moodString == "fearless"){

                    document.getElementById("scared-fearless").value = 2;

            }

}
/**
    Once the user selects a mood it will send the mood selected and mood number
    to getMovieData so that it can find the selected mood also if no mood is selectedMood
    then page will be reset to no content shown.
**/
$('input[type="range"]').change(function() {

    var moodSelected = $(this).val();

    var getElementId = event.target.id;

    var diffMoods = getElementId.split("-");

    var moodString;

    var tempLast;
    //Resets page
    if (document.getElementById("agitated-calm").value == 2 && document.getElementById("happy-sad").value == 2 && document.getElementById("tired-wide awake").value == 2 && document.getElementById("scared-fearless").value == 2 ){
      for (i = 0; i<5; i++){
        $("#image"+i).attr("src","./resources/images/no-content.jpg");
        $("#label"+i).text("No Content");
      }
      lastSelectedMood = defaultMood;
    }  else if (diffMoods.length > 0){
        //Using the mood number finds which mood is selected
        if (moodSelected == 1){

            getMovieData({moodNumber:moodSelected,moodString:diffMoods[0]});

        } else if (moodSelected == 3){

            getMovieData({moodNumber:moodSelected,moodString:diffMoods[1]});

        }

    }
})
