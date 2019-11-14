var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d") ;
var body = document.querySelector('body');
canvas.width = 1270;
canvas.height = 570;

function menu() {
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Help me, Obi-Wan Kenobi. You are my only hope', canvas.width / 2, canvas.height / 4);
    ctx.font = '24px Arial';
    ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
    ctx.font = '18px Arial';
    ctx.fillText('Up/Down/Right/Left keys to move, Space to shoot.', canvas.width / 2, (canvas.height / 4) * 3);
    ctx.font = '18px Arial';
    ctx.fillText('Destroy 50 Tie Fighters To Win!', canvas.width / 2, (canvas.height / 4 ) * 1.5);
    document.querySelector("body").addEventListener('click', startGame);
  }

  function startGame() {
    //
    // reset
    //
    score = 0;

    ennemiesArray = [];

    enemiesBulletArray = [];

    newHealth();

    gameOver = false;
    
    // newEnnemies();
    
    requestAnimationFrame(update);
}

function scoreBoard() {
    ctx.fillStyle = 'white';
    ctx.font = '36px STARWARS';
    ctx.fillText(`Score : ${score}`, 1050 , 50);
    ctx.fillText("Health :" , 1030 , 100);
}

function showGameOver() {
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '36px STARWARS';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 4);
    ctx.font = '24px STARWARS';
    ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px STARWARS';
    ctx.fillText(`Your Score : ${score}` , canvas.width / 2, canvas.height / 3);
    document.querySelector("body").addEventListener('click', startGame);
  }

  function showYouWin() {
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '36px STARWARS';
    ctx.textAlign = 'center';
    ctx.fillText('YOU WIN !', canvas.width / 2, canvas.height / 4);
    ctx.font = '24px STARWARS';
    ctx.font = '24px STARWARS';
    ctx.fillText(`Your Score : ${score}` , canvas.width / 2, canvas.height / 3);
    ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2);
    document.querySelector("body").addEventListener('click', startGame);
  }

var score = 0;

var frames = 0;

var gameOver = false;

var youWin = false;

var vaisseauMere = new spaceShip();

var ennemiesArray = [];

var healthArray = [];

var enemiesFrequence = 300;

function newHealth() {
    health1 = new HealthIcon(1120 , 70);
    health2 = new HealthIcon(1170 , 70);
    health3 = new HealthIcon(1220 , 70);
    healthArray.push(health3 , health2 , health1)
}

newHealth()

function keysMove() {
    if (vaisseauMere.keys[38]) {
        if (vaisseauMere.speedY > -vaisseauMere.speed) {
            vaisseauMere.speedY--;
        }
    }
    if (vaisseauMere.keys[40]) {
        if (vaisseauMere.speedY < vaisseauMere.speed) {
            vaisseauMere.speedY++;
        }
    }
    if (vaisseauMere.keys[39]) {
        if (vaisseauMere.speedX < vaisseauMere.speed) {
            vaisseauMere.speedX++;
        }
    }
    if (vaisseauMere.keys[37]) {
        if (vaisseauMere.speedX > -vaisseauMere.speed) {
            vaisseauMere.speedX--;
        }
    }

    vaisseauMere.speedY *= vaisseauMere.friction;
    vaisseauMere.y += vaisseauMere.speedY;
    vaisseauMere.speedX *= vaisseauMere.friction;
    vaisseauMere.x += vaisseauMere.speedX;

    if (vaisseauMere.x >= canvas.width - 100) {
        vaisseauMere.x = canvas.width - 100;
    } else if (vaisseauMere.x <= 5) {
        vaisseauMere.x = 5;
    }
    if (vaisseauMere.y >= canvas.height - 100) {
        vaisseauMere.y = canvas.height - 100;
    } else if (vaisseauMere.y <= 5) {
        vaisseauMere.y = 5;
    }
}

function moreEnnemies() {
    setInterval(function() {
        return enemiesFrequence -= 60;
    }, 30000)
}

moreEnnemies();

function detectCollision(a , b) {
    return a.x < b.x + b.w && 
    a.x + a.w > b.x && 
    a.y < b.y + b.h && 
    a.y + a.h > b.y
}
function handleCollisions() {
    ennemiesArray.forEach(function(enemy , i) {
        vaisseauMere.playerBulletArray.forEach(function(bullet) {
        if (detectCollision(bullet, enemy)) {
          drawExplosion(enemy.x , enemy.y)
          ennemiesArray.splice(i , 1);
          score ++;
        }
      });
    });
    ennemiesArray.forEach(function(enemy , i) {
        if(detectCollision(enemy , vaisseauMere)){
            drawExplosion(enemy.x , enemy.y)
            drawExplosion(vaisseauMere.x , vaisseauMere.y)
            ennemiesArray.splice(i , 1);
            healthArray.splice(0 , 1);
            if(healthArray.length === 0){
                gameOver = true;
            }
        }
    })
    ennemiesArray.forEach(function(enemy , i) {
        enemy.enemiesBulletArray.forEach(function(bullet , i) {
            if(detectCollision(vaisseauMere , bullet)){
                drawExplosion(vaisseauMere.x , vaisseauMere.y)
                enemy.enemiesBulletArray.splice(i , 1);
                healthArray.splice(0 , 1);
                if(healthArray.length === 0){
                gameOver = true;
            }
            }   
        })   
    })
}
const img = document.createElement('img');
img.src = "./images/explode/explode.png"

var explodeX;
var explodeY;
var srcX;
var srcY;
sheetWidth = 1080;
sheetHeight = 130;
cols = 9;
rows = 1;
w = sheetWidth / cols;
h = sheetHeight / rows;
var currentFrame = 0;
function updateExplosion(explodeX , explodeY){
	//Updating the frame index 
	currentFrame = ++currentFrame % cols; 
	//Calculating the x coordinate for spritesheet 
    srcX = ++currentFrame * w;
    srcY = 0;
    ctx.clearRect(explodeX , explodeY , w , h);
}

function drawExplosion(explodeX , explodeY) {
    updateExplosion(explodeX , explodeY);
    ctx.drawImage(img, srcX , srcY , w , h , explodeX , explodeY, w , h);
};

/*
##     ## ########  ########     ###    ######## ######## 
##     ## ##     ## ##     ##   ## ##      ##    ##       
##     ## ##     ## ##     ##  ##   ##     ##    ##       
##     ## ########  ##     ## ##     ##    ##    ######   
##     ## ##        ##     ## #########    ##    ##       
##     ## ##        ##     ## ##     ##    ##    ##       
 #######  ##        ########  ##     ##    ##    ######## 
*/
function update() {
    frames++;
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    vaisseauMere.sound.play();
    healthArray.forEach(health => {
        health.drawHealth();
    });

    vaisseauMere.playerBulletArray.forEach(bullet => {
        bullet.draw();
        bullet.move();
        bullet.clean();
    });


    if (frames % enemiesFrequence === 0) {
        enemie = new enemieship();
        ennemiesArray.push(enemie);
    }

    ennemiesArray.forEach(ennemie => {
        ennemie.draw();

        if (frames % Math.floor(Math.random()*300) === 0) {
            ennemie.moveLeft();
        }

        if (frames % Math.floor(Math.random()*300) === 0) {
            ennemie.moveRight();
        }

        if (frames % Math.floor(Math.random()*240) === 0) {
            ennemie.shoot();
        }

        if (frames % Math.floor(Math.random()*500) === 0) {
            ennemie.moveDown();
        }


        ennemie.speedY *= ennemie.friction;
        ennemie.y += ennemie.speedY;
        ennemie.speedX *= ennemie.friction;
        ennemie.x += ennemie.speedX;

        if (ennemie.x >= canvas.width - 50) {
            ennemie.x = canvas.width - 50;
        } else if (ennemie.x <= 50) {
            ennemie.x = 50;
        }

        ennemie.enemiesBulletArray.forEach(bullet => {
            bullet.draw();
            bullet.moveDown();
            bullet.clean();
        });
        
    });

    keysMove();

    vaisseauMere.draw();
    
    handleCollisions();
    
    scoreBoard();

    if(score >= 50){
        showYouWin();
    }
    
    if(!gameOver){
        requestAnimationFrame(update);
    } 
    else{
        showGameOver();
    }
}

/*
##    ## ######## ##    ##  ######  
##   ##  ##        ##  ##  ##    ## 
##  ##   ##         ####   ##       
#####    ######      ##     ######  
##  ##   ##          ##          ## 
##   ##  ##          ##    ##    ## 
##    ## ########    ##     ###### 
*/
document.onkeydown = function(e) {
    if(e.keyCode === 38) {
        //vaisseauMere.moveForward();
        vaisseauMere.speedY -= 1;
    }
    else if(e.keyCode === 40) {
        //vaisseauMere.moveBackward();
        vaisseauMere.speedY += 1
    }
    else if(e.keyCode === 39) {
        //vaisseauMere.moveRight();
        vaisseauMere.speedX += 1
    }
    else if(e.keyCode === 37) {
        //vaisseauMere.moveLeft();
        vaisseauMere.speedX -= 1
    }
    else if(e.keyCode === 32) {
        vaisseauMere.shoot();
    }
}

document.body.addEventListener("keydown", function (e) {
    vaisseauMere.keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    vaisseauMere.keys[e.keyCode] = false;
});

/*
.##.....##....###....####.##....##
.###...###...##.##....##..###...##
.####.####..##...##...##..####..##
.##.###.##.##.....##..##..##.##.##
.##.....##.#########..##..##..####
.##.....##.##.....##..##..##...###
.##.....##.##.....##.####.##....##
*/

menu();

