class Explode {
    constructor(x , y) {
        this.x = x;
        this.y = y;
        this.w = 150;
        this.h = 150;
        const img1 = document.createElement('img');
        // const img2 = document.createElement('img');
        // const img3 = document.createElement('img');
        // const img4 = document.createElement('img');
        this.img1 = img1;
        // this.img2 = img2;
        // this.img3 = img3;
        // this.img4 = img4;
        img1.src = "./images/explode/explode1.png"
        // img2.src = "./images/explode/explode2.png"
        // img3.src = "./images/explode/explode3.png"
        // img4.src = "./images/explode/explode4.png"
    }
    draw() {
        ctx.drawImage(this.img1, this.x , this.y , this.w , this.h);
        // ctx.drawImage(this.img2, this.x , this.y , this.w , this.h);
        // ctx.drawImage(this.img3, this.x , this.y , this.w , this.h);
        // ctx.drawImage(this.img4, this.x , this.y , this.w , this.h);
    }
}