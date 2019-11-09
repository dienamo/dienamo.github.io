class enemieship {
    constructor() {
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = -50;
        this.w = 80;
        this.h = 80;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 4;
        this.friction = 0.98;
        const img = document.createElement('img');
        this.img = img;
        img.src = "./images/tiedrop.png"
        this.enemiesBulletArray = [];
    }
    draw() {
        ctx.drawImage(this.img, this.x , this.y , this.w , this.h);
    }
    moveDown(){
        if (this.speedY < this.speed) {
            this.speedY ++;
        }
    }
    moveLeft(){
        if (this.speedX > -this.speed) {
            this.speedX--;
        }
    }
    moveRight(){
        if (this.speedX < this.speed) {
            this.speedX++;
        }
    }
    shoot() {
        var bullet = new RedLaser(this.x + 15 , this.y + 60);
        this.enemiesBulletArray.push(bullet);
    }
}