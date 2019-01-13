

$.fn.trivia = function() {   
    var ThisThing = this;    
    ThisThing.userPick = null; 
    ThisThing.answers = { 
        correct: 0,
        incorrect: 0
    };
    ThisThing.images = null;  // images
    ThisThing.count = 30; // time count to answer thr question 
    ThisThing.current = 0; // start arrray for the question

    ThisThing.questions = [ {
        question: "What is Erin's first name? ",
        choices: ["Pam", "Holly", "Kelly", "Angela"],
        images: "assets/images/Erin.jpg", // image 
        correct: 2
    
    }, { 
        question: "Which of the companies founders committed suicide?",
        choices: ["David Wallace", "Robert Mifflin", "Robert Dunder", "Robert California"],
        correct: 1
    },
     {
        question: "Which restaurant chain was Pam banned from?",
        choices: ["Red Lobster", "TGI Friday's", "Chili's", "P. F. Chang's"],
        correct: 2
    
    }, 
    {
        question: "During the first dundies episode, which employee received the 'Don't go in there after me award?'",
        choices: ["Kevin", "Oscar", "Pam", "Dwight"],
        correct: 0
    
    }, 
    {
        question: "What is the name of the book that Michael Scott wrote?",
        choices: ["Somehow I Manage", "Tale of Two Offices", "It's Rough Out There", "Dikinflika"],
        correct: 0
    
    }, 
    {
        question: "What type of farm does Dwight own?",
        choices: ["Bear Farm", "Carrot Farm", "Bettle Farm", "Beet Farm"],
        correct: 3
    
    }, 
    {
        question: "How long were Pam and Roy engaged?",
        choices: ["10 Months", "3-4 Years", "2 Years", "4-5 Years"],
        correct: 1
    
    }, 
    {
        question: "What name did Pam and Angela fight over for their babies?" ,
        choices: ["Arthur", "Andrew", "James", "Philip"],
        correct: 3
    
    }, 
    {
        question: "Where does Jim tell Pam about his feelings? " ,
        choices: ["The office parking lot", "The warehouse", "Chili's", "The office"],
        correct: 0
    
    },
    {
        question: "Which of Angela's cats does Dwight freeze?" ,
        choices: ["Sprinkles", "Mittens", "Fluffy", "Wiskers"],
        correct: 0
    
    },
    ];
//if an if statement below double digit else
    ThisThing.ask = function() {
        if (ThisThing.questions[ThisThing.current]) { // starts at 
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
            $("#question_div").html(ThisThing.questions[ThisThing.current].question);
            var choicesArr = ThisThing.questions[ThisThing.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(ThisThing.timer, 1000); // count down in one sec interval 
        } else {
            $('.card-body').append($('<div />', {
                text: 'Unanswered: ' + (
                    ThisThing.questions.length - (ThisThing.answers.correct + ThisThing.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('.card-body').show();
        }
    };
    ThisThing.timer = function() {   //Makes the time
        ThisThing.count--;  // count down from 20 
        if (ThisThing.count <= 0) { 
            setTimeout(function() { // Display an alert box after ThisThing.next + 1000 (in ThisThing.next func) 
                ThisThing.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " seconds");
        }
    };
    ThisThing.nextQ = function() {
        ThisThing.current++;
        clearInterval(window.triviaCounter); //stops the timer 
        ThisThing.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            ThisThing.cleanUp();
            ThisThing.ask();
        }, 3000)
    };
    ThisThing.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + ThisThing.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + ThisThing.answers.incorrect);
    };
    ThisThing.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        ThisThing.answers[string]++;
        $('.' + string).html(string + ' answers: ' + ThisThing.answers[string]);
    };
    return ThisThing;
};
 
// Trivia Function ends

var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        ThisThing = Trivia || $(window).trivia(),
        index = ThisThing.questions[ThisThing.current].correct,
        correct = ThisThing.questions[ThisThing.current].choices[index];
       
    if (userPick !== index) {
        $('#choices_div').text("False! The correct answer was: " + correct);
        ThisThing.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        ThisThing.answer(true);
    }
    ThisThing.nextQ();
});