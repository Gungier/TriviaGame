// need to setTimeout ()
// for repeated fxn setInteval().  To stop fxn use clearTimeout.
// fxns in timeouts are the code to be executed AFTER timer expires.
// create questions where player can only pick one answer
// if player doesn't pick within x amount of time == incorrect
// if player picks answer that is wrong == incorrect
// if player picks one correct answer == correct
var currMqIdx = undefined;
var mqDetector = $("#mq-detector");
var mqSelectors = [
    mqDetector.find(".visible-xs"),
    mqDetector.find(".visible-sm"),
    mqDetector.find(".visible-md"),
    mqDetector.find(".visible-lg")
];

var checkForResize = function () {
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

var gameArea = $('#gameSpace');
var secLeft = 30;


//Click Events

$(document).on('click' + 'touch', '.goAgain', function (e) {
    e.preventDefault();
    quiz.reset();
});

$(document).on('click touch', '.answerBtn', function (e) {
    e.preventDefault();
    quiz.clicked(e);
});

$(document).on('click touch', '#start', function (e) {
    $('#timer').text('Time Remaining: ' + quiz.counter);
    $("button").click(function () {
        $("h2").css("color", "white");

        quiz.startTrivia();
        quiz.countdown();
        console.log("timer: " + quiz.startTrivia);
    });
});
//Trivia Questions

var questions = [{
    question: "Who is the original Ant-Man (Hint, not the Ant-Man Paul Rudd plays).",
    answers: ["Scott Lang", "Steve Rogers", "Hank Pym", "Mickey Rourk"],
    rightAnswer: "Hank Pym",
    image: "assets/images/Ant-Man.jpg"
}, {
    question: "Most think that the villian Sabretooth first appeared with Wolverine (that's a hint), but what comic hero DID his appearance coincide with?",
    answers: ["Incredible X-men", "Hero's for Hire", "Justice League", "Iron Fist"],
    rightAnswer: "Iron Fist",
    image: "assets/images/sabretooth.jpg"
}, {
    question: "Who killed Gwen Stacey?",
    answers: ["Green Goblin", "Willem Defoe", "James Franco", "Doc Oc"],
    rightAnswer: "Green Goblin",
    image: "assets/images/gwenStacey.jpg",
}, {
    question: "Who was the the first alterego of the Flash?",
    answers: ["Alan Scott", "Jay Garrick", "Clark Kent", "Barry Allen"],
    rightAnswer: "Jay Garrick",
    image: "assets/images/theFlash.jpeg",
}];
var quest = $("<h3>");

quest.attr({
    "class": 'textColor',
});

quest.css({
    'font-color': 'white'
});

var quiz = {
    questions: questions,
    currentQuestion: 0,
    counter: secLeft,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        quiz.counter--;
        $("#timer").text("Time Remaining: " + quiz.counter);

        console.log("Timer:" + quiz.counter)

        if (quiz.counter === 0) {
            console.log("TIME'S UP");
            quiz.timesUp();
            console.log(countdown)
        }
    },


    startTrivia: function () {
        timer = setInterval(quiz.countdown, 1000);
        gameArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            gameArea.append("<button class='answerBtn' id='button'" + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }

    },
    nextQuestion: function () {
        quiz.counter = secLeft;
        $('#timer').html("Time Remaining: " + quiz.counter);
        quiz.currentQuestion++;
        quiz.startTrivia();
    },
    timesUp: function () {
        clearInterval(timer);
        $('#timer').html("Time Remaining: " + quiz.counter);

        gameArea.html('<h2>Times Up</h2>');
        gameArea.append('<h3>The Right Choice was: ' + questions[this.currentQuestion].rightAnswer);
        gameArea.append('img src="' + questions[this.currentQuestion].image + '"/>');
        timesUp.css({
            "font-color": "white"
        });

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3000);
        }
        else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    results: function () {
        clearInterval(timer);

        gameArea.html('<h2>Well done, here is your final score!</h2>');
        $('#timer').html(quiz.counter);
        gameArea.append('<h3>Correct Answers: ' + quiz.correct + '</h3>');
        gameArea.append('<h3>Incorrect Answers: ' + quiz.incorrect + '</h3>');
        gameArea.append('<h3>Left Blank: ' + (questions.length - (quiz.incorrect + quiz.correct)) + '</h3>');
        gameArea.append("<br><button id='restart'>Think You Could Do Better?</button>");

    },
    clicked: function (e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions
        [this.currentQuestion].rightAnswer) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    },
    wrongAnswer: function () {
        clearInterval(timer);
        quiz.incorrect++;
        gameArea.html('<h2>Sorry, Try Again!</h2>');
        gameArea.append('<h3>The Right Answer is: ' + questions[quiz.currentQuestion].rightAnswer + '</h3>');
        gameArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />');

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3000);
        } else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    correctAnswer: function () {
        clearInterval(timer);
        quiz.correct++;
        gameArea.html('<h2>You Are Correct!</h2>');
        gameArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />');

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3000);
        } else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = timer;
        this.correct = 0;
        this.incorrect = 0;
        this.startTrivia();
    }

};
