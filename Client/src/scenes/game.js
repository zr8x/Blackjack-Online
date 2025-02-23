import Card from "../helpers/cards.js";
import Zone from "../helpers/zones.js";
import io from "socket.io-client";
import assets from "../assets/preload/assets.json"

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        // this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        
        for( const card of assets ) {
            this.load.image("P_" + card.name, card.path);
        }
    }

    create() {
        this.socket = io("http://localhost:3000");
        this.socket.on("connect", () => {
            console.log("Connected");
        })

        this.socket.on("isPlayerA", () => {

        })
        /*
        this.dealText = this.add.text(820, 540, ['DEAL CARDS']).setFontSize(50).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        let self = this;

        this.dealCards = () => {
            for(let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(600 + (i * 170), 720, 'card_back');
            }
        }

        this.dealText.on("pointerdown", function () {
            self.dealCards();
        })

        this.dealText.on("pointerover", function () {
            self.dealText.setColor("#ff69b4");
        })

        this.dealText.on("pointerout", function () {
            self.dealText.setColor("#00ffff");
        })
        */

        this.readyText = this.add.text(960, 540, "Ready?").setFontSize(70).setFontFamily("Trebuchet MS").setColor("#ffffff").setAlign("center");

        let self = this;

        this.dealCards = () => {
            for(let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(600 + (i * 170), 720, 'card_back');
            }
        }

        this.testCards = () => {
            for( const card of assets ) {
                let i = assets.indexOf(card);
                let playerCard = new Card(this);
                playerCard.render(50 + (i * 25), 720, "P_" + card.name);
            }
        }

        this.testCards();

        this.isPlayerA = false;
        this.opponents = [];
    }

    update() {

    }
}