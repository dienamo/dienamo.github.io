class weapon {
    constructor(x , y) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.speed = 4;
        const img = document.createElement('img');
        this.img = img;
        img.src = "./images/greenlaser.png"
    }
    draw() {
        ctx.drawImage(this.img, this.x , this.y , this.w, this.h); 
    }

    move() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    clean() {
        if (this.y < 0) {
            vaisseauMere.playerBulletArray.splice(0,1);
        }
    }
}

class RedLaser extends weapon{
    constructor(x , y){
        super(x , y)
        this.speed = 4;
        const img = document.createElement('img');
        this.img = img;
        img.src = "./images/redlaser.png"
    }
}