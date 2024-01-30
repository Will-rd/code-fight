// Arrays of random values to keep the fighters appear to be unique.

let names = ["Lethal Larry", "Gangrene George", "Ruthless Ricky", "Lazareth the Lucky", "Porky Sloppins", "Dead Ned", "Cornholio the Great and Powerful", "Nasty Nate", "Prince of Pain", "Mike the Maniac", "Jack out the Box", "Severus Snape", "Albus Dumbledore"];
let height = ["5 foot 3 inches", "7 foot 7 inches", "6 foot 4 inches", "3 foot 3 inches", "5 meters", "one foot tall", "5 foot 11 inches", "6 foot 11 inches", "6 foot 6 inches", "4 foot 10 inches", "14 inches", "10mm", "10 feet tall"];
let weight = ["420 lbs", "300 lbs", "20 lbs", "185 lbs", "225 lbs", "378 lbs", "12 tons", "73 kg", "12 sacks of corn", "28 grams", "36 oz", "829 lbs", "296 lbs"];

//This array is to gather values to use for damage after combat begins
let randoNums = []




//A function to output a random item from an array.
let randomEl = function rand(arr) {
    return arr[Math.floor(arr.length * Math.random()) | 0]
}

//This function pushes random values into an array to be used as operands for decrementing hp
function strikes() {
    for (i = 0; i < 25; i++) {
        let pushedValue = Math.floor(Math.random() * 25);
        randoNums.push(pushedValue)
    }
}

//This function generates a random number between 1 & 99 to decide which fighter strikes first.
function isFirst() {
    let roll = Math.floor(Math.random() * 100);
    return roll;
}

//Template objects for fighter generation and mutation.
let redCorner = {
    "name": randomEl(names),
    "height": randomEl(height),
    "weight": randomEl(weight),
    "hp": 100,
    "firstRoll": isFirst(),
    "nextRoll": isFirst()
}
let blueCorner = {
    "name": randomEl(names),
    "height": randomEl(height),
    "weight": randomEl(weight),
    "hp": 100,
    "firstRoll": isFirst(),
    "nextRoll": isFirst()
}


function combat() {
    getBlue();
    getRed();
    announcement();
    console.log("LETS GET READY TO RUMBLE!")
    console.log(`In the blue corner, standing at ${blueCorner.height}, weighing ${blueCorner.weight} we have ${blueCorner.name}!`)
    console.log(`And in the red corner, standing at ${redCorner.height}, weighing ${redCorner.weight} we have ${redCorner.name}!`)
    console.log("Reds roll: " + redCorner.firstRoll)
    console.log("Blues roll: " + blueCorner.firstRoll)

    if (blueCorner.firstRoll < redCorner.firstRoll) {
        redCorner.hp = redCorner.hp - randoNums.pop()

    } else {
        blueCorner.hp = blueCorner.hp - randoNums.pop()

    }

    while (blueCorner.hp > 0 && redCorner.hp > 0) {
        let nextRedMove = isFirst();
        let nextBlueMove = isFirst();
        blueCorner.nextRoll = nextBlueMove
        redCorner.nextRoll = nextRedMove

        if (blueCorner.nextRoll > redCorner.nextRoll) {
            redCorner.hp = redCorner.hp - randoNums.pop()
            console.log("Red hp: " + redCorner.hp)
            console.log("Red next roll: " + redCorner.nextRoll)

        } else {
            blueCorner.hp = blueCorner.hp - randoNums.pop()
            console.log("Blue hp: " + blueCorner.hp)
            console.log("Blue next roll: " + blueCorner.nextRoll)

        }
    }

    if (redCorner.hp <= 0) {
        //return console.log(`${blueCorner.name} WINS!`)
        var resultInfo = document.getElementById('results');
        var resultText = document.createElement('h1');
        resultInfo.textContent = `${redCorner.name} WINS!`;
        resultInfo.appendChild(resultText);




    }
    if (blueCorner.hp <= 0) {
        //return console.log(`${redCorner.name} WINS!`)
        var resultInfo = document.getElementById('results');
        var resultText = document.createElement('h1');
        resultInfo.textContent = `${blueCorner.name} WINS!`;
        resultInfo.appendChild(resultText);



    }

}
function rematch() {
    location.reload();
}


function getRed() {
    var redBase = document.getElementById('redCorner')
    var redCardEl = document.createElement('h3')
    redCardEl.setAttribute('class', "redCard col-md-5 p-3 mb-2 font-weight-bold");
    // redCardEl.textContent = "The Red Corner: "

    var redNameBox = document.createElement('h3');
    redNameBox.textContent = `${redCorner.name}`;

    redBase.appendChild(redCardEl)
    redCardEl.appendChild(redNameBox);
}
function getBlue() {
    var blueBase = document.getElementById('blueCorner');
    var blueCardEl = document.createElement('h2')
    blueCardEl.setAttribute('class', "blueCard col-md-5 p-3 mb-2 font-weight-bold");
    // blueCardEl.textContent = "The Blue Corner: "

    var blueNameBox = document.createElement('h4');
    blueNameBox.textContent = `${blueCorner.name}`;

    blueBase.appendChild(blueCardEl);
    blueCardEl.appendChild(blueNameBox);
}
function announcement() {
    var announcementDiv = document.getElementById('announcementBox');
    var announcements = document.createElement('p');
    announcements.textContent = (`In the blue corner, standing at ${blueCorner.height}, weighing ${blueCorner.weight} we have ${blueCorner.name}!` + ` And in the red corner, standing at ${redCorner.height}, weighing ${redCorner.weight} we have ${redCorner.name}!`)

    announcementDiv.appendChild(announcements);
}

strikes();
document.getElementById("startFight").addEventListener("click", combat)
document.getElementById("rematch").addEventListener("click", rematch)


