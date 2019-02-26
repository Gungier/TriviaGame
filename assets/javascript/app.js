// need to setTimeout ()
// for repeated fxn setInteval().  To stop fxn use clearTimeout.
// fxns in timeouts are the code to be executed AFTER timer expires.
// create questions where player can only pick one answer
// if player doesn't pick within x amount of time == incorrect
// if player picks answer that is wrong == incorrect
// if player picks one correct answer == correct


//game trackers

var currMqIdx = undefined;
var mqDetector = $("#mq-detector");
var mqSelectors = [
    mqDetector.find(".visible-xs"),
    mqDetector.find(".visible-sm"),
    mqDetector.find(".visible-md"),
    mqDetector.find(".visible-lg")
];

var checkForResize = function() {
    for (var i = 0; i <= mqSelectors.length; i++) {
        if (mqSelectors[i].is(":visible")) {
            if (currMqIdx != i) {
                currMqIdx = i;
                console.log(mqSelectors[i].attr("class"));
            }
            break;
        }
    }
};

$(window).on('resize', checkForResize);

checkForResize();



    var correct = 0;
    var incorrect = 0;


    var trivia = []
    trivia.push({
        red: 'xyz',
        orange: 'xyz',
        yellow: 'xyz',
        green: 'xyz',
        blue: 'xyz',
        purple: 'xyz',
    });
    console.log("Trivia: " + trivia);
    console.log(trivia.yellow);





    function shuffle(trivArray) {

        var trivArray = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
        ];
        var index = trivArray.length, temporaryValue, randomIndex;

        while (0 !== index) {
            randomIndex = Math.floor(Math.random() * index);
            index -= 1;

            temporaryValue = trivArray[index];
            trivArray[index] = trivArray[randomIndex];
            trivArray[randomIndex] = temporaryValue;

            console.log("trivArray: " + trivArray);
        }
        return trivArray;

    }

    shuffle();

    var start = function () {
        for (var i = 0; i < 5; i++) {


            $(".answer").empty();


            var trivArray = suffle(trivArray);
            var answer = $("<div>");
            answer.attr({
                "class": '.answer',
                "data-random": trivtrivArray
            });

        }
    }

    $('myObject').css(
        "background-image", 'url(' + 'https://pmcvariety.files.wordpress.com/2018/09/marvels-spider-man-review.png?w=1000&h=563&crop=1' + ')');
});