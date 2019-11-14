class spaceShip {

    constructor() {
        this.x = canvas.width / 2 - 50;
        this.y = canvas.height - 100; 
        this.w = 100;
        this.h = 100;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 4;
        this.friction = 0.98;
        this.keys = [];
        this.playerBulletArray = [];
        const img = document.createElement('img');
        this.img = img;
        img.src = "./images/falcon.png"
        const healthimg = document.createElement('img');
        this.healthimg = healthimg;
        healthimg.src = "./images/health.png"
        const sound = document.createElement("audio");
        this.sound = sound;
        sound.src = "./sound/falcon.mp3"
        const fireSound = document.createElement("audio");
        this.fireSound = fireSound;
        fireSound.src = "./sound/falconguns.wav"
    }

    shoot() {
        var bullet = new weapon(vaisseauMere.x + 25 , vaisseauMere.y + 5);
        this.playerBulletArray.push(bullet);
        this.fireSound.play();
    }

    draw() {
        ctx.drawImage(this.img,this.x , this.y , this.w, this.h);
    } 
}