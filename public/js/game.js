'use strict';

var gameOver = false;
var gameStarted = false;
var isMoving = false;
var score = 0;
var direction = "none";
var movementSpeed = 50;
var lives = 3;

var questionLocation = 0;
var optionLocation = 0;

var questionList = [];
var focusedChoice = -1;
var startingPointX = -1;
var startingPointY = -1;
var maxPoints = 0;

document.getElementById("startGame").addEventListener("click", function () {
    if (!gameStarted) {
        gameStarted = true;
        gameInitialize();
    }

});
document.getElementById("gradeButton").addEventListener("click", function () {
    console.log("?");
    alert("Your Score was: " + score + "/" + maxPoints);

});

async function gameInitialize() {
    score = 0;
    var gameData = "";
    const gameID = `${document.location.pathname.split('/').pop()}`;
    const data_uri = `/game/games/data/` + gameID;
    console.log(data_uri);
    try {
        const response = await fetch(data_uri);
        gameData = await handleResponse(response);

    } catch (error) {
        console.log(error);
    }

    var container = document.getElementById("gameContainer");
    var gameTitle = document.createElement("h4");
    gameTitle.id = "questionTitle";

    var scoreKeeper = document.createElement("h4");
    maxPoints = gameData.questions[0].maxPoints
    scoreKeeper.innerHTML = "Score : 0/" + maxPoints;
    console.log(gameData.questions[0]);
    scoreKeeper.id = "score";
    gameTitle.innerHTML = gameData.questions[0].title;
    container.insertBefore(gameTitle, container.firstChild);
    container.appendChild(scoreKeeper);
    var button = document.getElementById("startGame");
    button.remove();
    var gradeButton = document.createElement("BUTTON");
    gradeButton.innerHTML = "Grade Me!";
    gradeButton.className = "btn btn-primary";
    gradeButton.id = "gradeButton";
    container.appendChild(gradeButton);


    document.getElementById("gradeButton").addEventListener("click", function () {
        console.log("?");
        alert("Your Score was: " + score + "/" + maxPoints);

    });

    gameLoop(gameData.questions);
}

function updateScore() {
    var scoreHeader = document.getElementById("score");
    console.log(score);
    scoreHeader.innerHTML = "Score : " + score + "/" + maxPoints;
}
function questionAnswer(question, choice) {
    if (question.correct == choice) {
        score += 1;
        updateScore();

    }
    else {
        lives--;
    }
    questionList.splice(focusedChoice, 1);
    if (lives > 0) {
        drawOptions();
    }
    else {
        console.log("game Over");
        gameOver = true;
        endTheGame();
    }

}

function endTheGame() {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.font = "bold 36 px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", c.width / 2, c.height / 2);
}

function drawSides(c, ctx) {


    ctx.beginPath();
    ctx.rect(0, 0, 100, c.height);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("CORRECT", 50, c.height / 2);
}

function drawChoice(choice) {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
}

function drawDebugging() {

    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < questionList.length; i++) {


        var testObject = questionList[i];
        ctx.rect(testObject.xPosition, testObject.yPosition, testObject.width, testObject.height);
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
    var positionTest = 0;
    if (positionTest == 1) {
        var x0 = questionList[0].xPosition;
        var y0 = questionList[0].yPosition;
        var questionHeight = questionList[0].height;
        var questionWidth = questionList[0].width;
        var realCoords = getMousePos(document.getElementById("gameCanvas"), event);
        var xPosition = realCoords.x;
        var yPosition = realCoords.y;
        ctx.font = " 14 px Arial";
        console.log("Question at X: " + x0 + " Y: " + y0);
        if (xPosition > x0 && xPosition < (x0 + questionWidth) && yPosition > y0 && yPosition < (y0 + questionHeight)) {
            console.log(questionList[0]);
            console.log("ON TOP!");
            console.log("Mouse X: " + xPosition + " Y: " + yPosition);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = "green";
            ctx.fillText("Mouse X: " + xPosition + " Y: " + yPosition, 100, 50);
        }
        else {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = "red";
            ctx.fillText("Mouse X: " + xPosition + " Y: " + yPosition, 100, 50);
        }


        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "black";
        ctx.fillText("Question at X: " + x0 + " Y: " + y0, 300, 50);
    }

}

function drawOptions() {
    console.log("We are Drawing");
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    drawSides(c, ctx);

    for (var i = 0; i < questionList.length; i++) {
        var choice = questionList[i];
        ctx.beginPath();

        ctx.rect(choice.xPosition, choice.yPosition, choice.width, choice.height);
        ctx.fillStyle = "cyan";
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "black";

        ctx.fillText(choice.textInside, choice.xPosition + choice.width / 2, choice.yPosition + choice.height / 2);
    }
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function checkIfInChoiceSide(x, y, width, height) {
    var leftSide = 100;
    var rightSide = document.getElementById("gameCanvas").width - 100;

    if (x < leftSide) {
        questionAnswer(questionList[focusedChoice], true);
    }

}

function gameLoop(questions) {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var optionCount = questions[0].options.length;
    var boxHeight = canvasHeight / (optionCount + 1);
    var fontSize = Math.floor(boxHeight);
    ctx.font = fontSize + "px Arial";
    var xPos = canvasWidth / 2;
    var yPos = boxHeight;
    for (var i = 0; i < optionCount; i++) {
        questionList.push({
            xPosition: xPos - (ctx.measureText(questions[0].options[i].option).width / 2),
            yPosition: yPos - (fontSize / 2),
            width: ctx.measureText(questions[0].options[i].option).width,
            height: fontSize,
            textInside: questions[0].options[i].option,
            correct: questions[0].options[i].correctness
        });
        yPos += boxHeight;
    }
    drawOptions();
    var isMousedown = false;

    document.addEventListener("mousedown", function (event) {
        var isOnTopOfChoice = false;
        if (!gameOver) {
            if (focusedChoice == -1) {
                var realCoords = getMousePos(document.getElementById("gameCanvas"), event);
                var xPosition = realCoords.x;
                var yPosition = realCoords.y;
                for (var i = 0; i < questionList.length; i++) {
                    var choice = questionList[i];
                    if ((xPosition > choice.xPosition && xPosition < (choice.xPosition + choice.width)) && (yPosition > choice.yPosition && yPosition < (choice.yPosition + choice.height))) {
                        isOnTopOfChoice = true;
                        focusedChoice = i;
                        startingPointX = choice.xPosition;
                        startingPointY = choice.yPosition;
                    }
                }
            }
            if (isOnTopOfChoice && focusedChoice != -1) {
                console.log("TRUE");
                isMousedown = true;
            }
        }
    });

    document.addEventListener("mouseup", function (event) {
        if (focusedChoice != -1 && !gameOver) {
            var realCoords = getMousePos(document.getElementById("gameCanvas"), event);
            var xPosition = realCoords.x;
            var yPosition = realCoords.y;

            var minBx = xPosition;
            var maxBx = xPosition + questionList[focusedChoice].width;
            var minBy = yPosition;
            var maxBy = minBy + questionList[focusedChoice].height;
            var canBeMoved = true;
            for (var i = 0; i < questionList.length; i++) {
                if (i != focusedChoice) {
                    var choice = questionList[i];

                    var minAx = choice.xPosition;
                    var minAy = choice.yPosition;
                    var maxAx = choice.xPosition + choice.width;
                    var maxAy = choice.yPosition + choice.height;

                    var aLeftOfB = maxAx < minBx;
                    var aRightOfB = minAx > maxBx;
                    var aAboveB = minAy > maxBy;
                    var aBelowB = maxAy < minBy;

                    if (!(aLeftOfB || aRightOfB || aAboveB || aBelowB)) {

                        canBeMoved = false;
                        //startingPointX = xPosition;
                        //startingPointY = yPosition;
                        console.log("THIS IS BLOCKING");
                        console.log(questionList[i]);
                    }

                }
            }
            if (canBeMoved) {
                questionList[focusedChoice].xPosition = minBx;
                questionList[focusedChoice].yPosition = minBy;
                drawOptions();
                checkIfInChoiceSide(questionList[focusedChoice].xPosition, questionList[focusedChoice].yPosition, questionList[focusedChoice].width, questionList[focusedChoice].height);

            }
            else {
                questionList[focusedChoice].xPosition = startingPointX;
                questionList[focusedChoice].yPosition = startingPointY;
                drawOptions();
            }

        }
        focusedChoice = -1;
        isMousedown = false;
    });



    document.addEventListener("mousemove", function (event) {
        if (isMousedown && focusedChoice != -1 && !gameOver) {
            var realCoords = getMousePos(document.getElementById("gameCanvas"), event);
            var xPosition = realCoords.x;
            var yPosition = realCoords.y;
            questionList[focusedChoice].xPosition = xPosition;
            questionList[focusedChoice].yPosition = yPosition;
            drawOptions();
        }
        else {
            /* debugging */
            // drawDebugging();
        }
    });

}


async function handleResponse(response) {
    const contentType = response.headers.get('content-type');

    if (!contentType.includes('application/json')) {
        throw new Error(`Sorry, content-type '${contentType}' not supported`);
    }

    if (!response.ok) {
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        });
    }

    return await response.json();
}