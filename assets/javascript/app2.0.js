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

var gameArea = $('#quizSpace');
var startCounter = 30;

//Click Events

$(document).on('click', '.goAgain', function (e) {
    quiz.reset();
});

$(document).on('click', '.answerBtn', function (e) {
    quiz.clicked(e);
});

$(document).on('click', '#begin', function (e) {
    $('.timer').append("<h2>Time Remaining: <span id='numeric-counter'>30</span> Seconds </h2>");
    quiz.startTrivia();
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
    image: "assets/images/theFlash.jpg",
}];

var quiz = {
    questions: questions,
    currentQuestion: 0,
    counter: startCounter,
    corret: 0,
    incorrect: 0,
    countdown: function () {
        quiz.counter--;
        $('numeric-counter').html(quiz.counter);

        if (quiz.counter === 0) {
            console.log("TIME'S UP");
            quiz.timesUp();
        }
    },
    startTrivia: function () {
        timer = setInterval(quiz.countdown, 1000);
        gameArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) 
        
        {
            var button = $("<button>")
            button.attr({
                "class": 'answerBtn',
                "data-name": questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] 
            });
        }

    },
    nextQuestion: function () {
        quiz.counter = startCounter;
        $('#numeric-counter').html(quiz.counter);
        quiz.currentQuestion++;
        quiz.startTrivia();
    },
    timesUp: function () {
        clearInterval(timer);
        $('#numeric-counter').html(quiz.counter);

        gameArea.html('<h2>Times Up</h2>');
        gameArea.append('<h3>The Right Choice was: ' + questions[this.currentQuestion].rightAnswer); gameArea.append('img src="' + questions[this.currentQuestion].image + '"/>');

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3000);
        }
        else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    results: function () {
        clearInterval(timer);

        gameArea.html("<h2>Well done, here's your final score!</h2>");
        $('#numeric-counter').html(quiz.counter);
        gameArea.append('<h3>Correct Answers: ' + quiz.rightAnswer + '</h3>');
        gameArea.append('<h3>Incorrect Answers: ' + quiz.wrongAnswer + '</h3>');
        gameArea.append('<h3>Left Blank: ' + (questions.length - (quiz.wrongAnswer + quiz.rightAnswer)) + '</h3>');
        gameArea.append('<br><button id="restart">Think You Could Do Better?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions
        [this.currentQuestion].rightAnswer) {
            this.rightAnswer();
        } else {
            this.wrongAnswer();
        }
    },
    wrongAnswer: function () {
        clearInterval(timer);
        quiz.incorrect++;
        gameArea.html("<h2>Sorry, Try Again!</h2>");
        gameArea.append("<h3>The Right Answer is: " + questions[quiz.currentQuestion].rightAnswer + "</h3>");
        gameArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />');

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3000);
        } else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    rightAnswer: function () {
        clearInterval(timer);
        quiz.correct++;
        gameArea.html("<h2>You're Right!</h2>");
        gameArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />');

        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3000);
        } else {
            setTimeout(quiz.nextQuestion, 3000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = startCounter;
        this.correct = 0;
        this.incorrect = 0;
        this.startTrivia();
    }

};
