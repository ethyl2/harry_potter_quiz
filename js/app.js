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
    }
]

var answerArray = [];
var questionIndex = 0;

$(document).ready(function() {
  showQuestion();
  $("#next").hide();
  $("#results").hide();
});

function showQuestion() {
  var selection = questions[questionIndex];
  $("#next").hide();
  $("#optionButtons").show();
  $("#options").empty();
  $("#question").html(selection["question"]);
  var letterArray = ["A", "B", "C", "D"];
  var letterIndex = 0;
  for (var option in selection["options"]) {
    if (selection["options"].hasOwnProperty(option)) {
      $("#options").append(letterArray[letterIndex]+ ": " + selection["options"][option]["text"] + "<br>");
    }
    letterIndex++;
  }
}

$("#optionButtons").click(function(e) {
    questionIndex++;
    var chosenAnswer = e.target.id;
    answerArray.push(chosenAnswer);
    console.log(answerArray);
    if (questionIndex == questions.length) {
      console.log("Time to tally");
      $("#quiz").hide();
      $("#results").show();

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
