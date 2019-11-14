class HealthIcon {

    constructor(x , y) {
        this.x = x;
        this.y = y; 
        this.w = 50;
        this.h = 50;
        const img = document.createElement('img');
        this.img = img;
        img.src = "./images/health.png"
    }

    drawHealth(){
        ctx.drawImage(this.img, this.x , this.y , this.w, this.h);
    }
}

// ctx.drawImage(this.healthimg,1200 , 70 , 50, 50);
// ctx.drawImage(this.healthimg,1220 , 70 , 50, 50);
// ctx.drawImage(this.healthimg,1230 , 70 , 50, 50);