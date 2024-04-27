// Hilario B. Arriesgado II - GAME PROGRAMMING 1
// M1 Quiz 3

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 377,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialization
let game = new Phaser.Game(config);

// Variables
let player, cheese, hole, cursors, textScore, score;

// Load Game Assets Before The Game Starts
function preload()
{
    //Images
    this.load.image("player", "../assets/images/mouse.png");
    this.load.image("cheese", "../assets/images/cheese.png");
    this.load.image("background", "../assets/images/platform2.png");
    this.load.image("hole", "../assets/images/Hole.png");
    //Audio
    this.load.audio("cheeseSound", "../assets/audio/cheeseSound.mp3");
    this.load.audio("victory", "../assets/audio/victory.mp3");
}

// Create Game Objects and Initial State Set Up
function create()
{
    //Sprites
    this.add.image(0,0, "background").setOrigin(0,0);

    player = this.physics.add.sprite(0, 340, "player");
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    player.setScale(0.1);

    cheese = this.physics.add.sprite(380, 348, "cheese");
    cheese.setScale(0.01);

    hole = this.physics.add.sprite(735, 345, "hole");
    hole.setScale(0.05);

    score = 0;
    let style = {font: "30px Garamond", fill: "#FFFB03"};
    textScore = this.add.text(30,0, "Score: " + score.toString(), style);

    cursors = this.input.keyboard.createCursorKeys();
    
    //Sound Effects
    cheeseSound = this.sound.add("cheeseSound");
    victorySound = this.sound.add("victory");
}

function update()
{
    // Movement
    if(cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.flipX = true;
    }
    else if(cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.flipX = false;
    }
    else
    {
        player.setVelocityX(0);
    }

    // ============================================================ //
    this.physics.add.overlap(player, cheese, WinGame, null, this);
    this.physics.add.overlap(player, hole, Victory, null, this);
}

// Functions // Events
function WinGame()
{
    score += 100;
    textScore.setText("Score: " + score);
    cheese.disableBody(true, true);
    cheeseSound.play();
    alert("YOU HAVE SUCCESSFULLY GRABBED THE CHEESE!\nBRING IT BACK TO THE HOLE!");
}

function Victory() 
{
    score += 900;
    textScore.setText("Score: " + score);
    player.disableBody(true, true);
    victorySound.play();
    alert("VICTORY!\nYou brought the cheese back to the hole!");
}
