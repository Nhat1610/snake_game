var gameOver = false;
var height = 60, width = 60
var headx = 30, heady = 30
var foodx = Math.floor(Math.random() * 40)+10
var foody =  Math.floor(Math.random() * 40 )+10
var movex = 0, movey = 1
var tailx = []
var taily = []
var body = 1
var score = 0
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function check(){
    for (var i = 0; i < body-1; i++){
        if (tailx[i] == headx && taily[i] == heady){
            gameOver = true
        }
    }
}
function draw(){
    s = ""
    console.clear()
    for (var i = 0; i <= height; i++){
        for (var j = 0; j <= width; j++){
            if (i == 0 || i == height || j == 0 || j == width){
                s += "#"
            }
            else if (i == headx && j == heady){
                s += "0"
            }
            else if (i == foodx && j == foody){
                s += "*"
            }
            else{
                var bodyPart = false
                for (var l = 0; l < body; l++){
                    if (i == tailx[l] && j == taily[l]){
                        s += "0"
                        bodyPart = true
                    }
                }
                if (!bodyPart){
                    s += " "
                }
            }
        }
        console.log(s)
        s = ""
    }
    console.log("SCORE:", score)
    console.log("LENGTH:",body)
    console.log("Press 'q' to quit")
}      
function update(){
    headx += movex
    heady += movey
    if (headx < 0){
        headx = height
    }
    if (headx > height){
        headx = 0
    }
    if (heady < 0){
        heady = width
    }
    if (heady > width){
        heady = 0
    }
    if (tailx.length <= body && taily.length <= body){
        tailx.push(headx)
        taily.push(heady)
    }
    for (var i = 0; i < body - 1; i++){
        tailx[i] = tailx[i+1]
        taily[i] = taily[i+1]
    }
    tailx[body - 1] = headx
    taily[body - 1] = heady
}
function control(){
   const readline = require("readline")
   readline.emitKeypressEvents(process.stdin)
   process.stdin.setRawMode(true)
   process.stdin.on('keypress',(str,key) =>{
        switch (key.name){
            case "w":
                if (movex == 1 && movey == 0){
                    heady++
                }
                movex = -1
                movey = 0
                break
            case "s":
                if (movex == -1 && movey == 0){
                    heady++
                }
                movex = 1
                movey = 0
                break
            case "a":
                if (movex == 0 && movey == 1){
                    headx++
                }
                movex = 0
                movey = -1
                break
            case "d":
                if (movex == 0 && movey == -1){
                    headx++
                }
                movex = 0
                movey = 1
                break
            case "q":
                gameOver = true
                break
        }
   });
}
var rSpawnFood = () =>{
    if (headx == foodx && heady == foody){
        body += 1
        score += 10
        foodx = Math.floor((Math.random() * 40)) + 10
        foody =  Math.floor((Math.random() * 40)) + 10
    }
}        
async function main(){
    while (!gameOver){
        draw()
        control()
        update()
        check()
        rSpawnFood()
        await sleep(100)
    }
}
main()
