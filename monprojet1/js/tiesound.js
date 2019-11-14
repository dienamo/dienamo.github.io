class Tiesound {
    constructor() {
        const sound = document.createElement("audio");
        this.sound = sound;
        sound.src = "./sound/tiefighter.mp3"
    }
    fire() {
        this.sound.play();
    }
}