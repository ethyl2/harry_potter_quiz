var questions = [
  {"question": "You find a 100 dollar bill on the sidewalk. What do you do with it?",
    "options":
      {"optionA":
        {"text": "No one is around, so you pocket the money.",
        "house": "S"},
      "optionB":
        {"text": "Walk around and ask if someone lost some money.",
        "house": "H"},
      "optionC":
        {"text":"Leave it there. Someone might come back looking for it.",
        "house": "R"},
      "optionD":
        {"text" : "Take it to the police and keep informed if someone claims it.",
        "house": "G"}
      }
  },
  {"question": "Who would you most like to hang out with?",
    "options":
      {"optionA":
        {"text": "Newt Scamander",
        "house": "H"},
      "optionB":
        {"text": "Albus Dumbledore",
        "house": "G"},
      "optionC":
        {"text": "Garrick Ollivander",
        "house": "R"},
      "optionD":
        {"text": "Merlin",
        "house": "S"}
      }
    },
    {"question": "What means would you prefer to use to stop an attacker?",
    "options":
      {"optionA":
        {"text": "Turn them into a toad.",
          "house": "G"},
      "optionB":
        {"text": "Cast a Full-Body Bind Charm.",
          "house": "R"},
      "optionC":
        {"text": "Use Devil's Snare weed to entangle them.",
          "house": "H"},
      "optionD":
        {"text": "Throw a vial of Shrinking Potion onto them.",
          "house": "S"}
      }
    },
    {"question": "Which of these traits is most important to you?",
    "options":
      {"optionA":
        {"text": "Intellect",
        "house": "R"},
      "optionB":
        {"text": "Bravery",
        "house": "G"},
      "optionC":
        {"text": "Winning",
        "house": "S"},
      "optionD":
        {"text": "Hard Work",
        "house": "H"}
      }
    }
]

var answerArray = [];
var questionIndex = 0;

$(document).ready(function() {
  clearDisplay();
  showQuestion();
});

// Calculate functions
function calculateHouse() {
  var houseTally = {
    "G": 0,
    "R": 0,
    "S": 0,
    "H": 0
  };
  for (var i=0; i < answerArray.length; i++) {
    var userResponse = answerArray[i];
    var house = questions[i]["options"][userResponse]["house"];
    houseTally[house]++;
    }
  return houseTally;
};

function calculateWinner(houseTally) {
  var wholeNames = {"H": "Hufflepuff", "G": "Gryffindor", "S": "Slytherin",
    "R": "Ravenclaw"};
  var max = 0;
  var maxHouse;
  var keys = Object.keys(houseTally);

  for (var house in keys) {
    var key = keys[house];
    var tally = houseTally[key];

    if (tally > max) {
      maxHouse = key;
      max = tally;
    }
  }
  return wholeNames[maxHouse];
}

// Display functions
function showQuestion() {
  var selection = questions[questionIndex];

  $("#quiz").show();
  $("#next").hide();
  $("#optionButtons").show();
  $("#options").empty();
  $("#question").html(selection["question"]);
  var letterArray = ["A", "B", "C", "D"];
  var letterIndex = 0;
  for (var option in selection["options"]) {
    if (selection["options"].hasOwnProperty(option)) {
      $("#options").append(letterArray[letterIndex]+ ": "
        + selection["options"][option]["text"] + "<br>");
    }
    letterIndex++;
  }
}

function showResults() {
  $("#quiz").hide();
  $("#results").show();
  var output = calculateHouse();
  var winner = calculateWinner(output);

  $("#gResults").append(" " + output["G"]);
  $("#hResults").append(" " + output["H"]);
  $("#sResults").append(" " + output["S"]);
  $("#rResults").append(" " + output["R"]);
  $("#houseResult").append(winner).hide().fadeIn("slow");
}

function clearDisplay() {
  $("#results").hide();
  $("#gResults").html("Gryffindor: ");
  $("#rResults").html("Ravenclaw: ");
  $("#sResults").html("Slytherin: ");
  $("#hResults").html("Hufflepuff: ");
  $("#houseResult").empty();
}

// Click Handlers
$("#optionButtons").click(function(e) {
  questionIndex++;
  var chosenAnswer = e.target.id;
  answerArray.push(chosenAnswer);
  if (questionIndex == questions.length) {
    showResults();
  } else {
  $("#optionButtons").hide();
  $("#next").show();
  }
});

$("#next").click(function() {
  if (questionIndex <= questions.length) {
    showQuestion();
  }
});

$("#reset").click(function() {
  answerArray = [];
  questionIndex = 0;
  clearDisplay();
  showQuestion();

});
