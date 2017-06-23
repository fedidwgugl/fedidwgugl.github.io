
var start_strings = [
    "Von der Sowjetunion\nlernen, heißt,\nSiegen lernen.",
    "Für ein Deutschland,\nin dem wir gut\nund gerne leben.",
    "Corporate Designs sind\nwie Passwörter.\nJe simpler, desto\nhackbarer.",
    "Am liebsten mag ich\nDeutschländer.\nDie sind lecker.",
    "Mehr Ordnung.\nWeniger Entropie.",
]
var width = 580;
var height = 326;

var bg_grey = '#e3e2de';
var schwarz = '#32302e';
var rot = '#ca080c';
var gold = '#ffd700';
var alpha = 95;

var fontSize = 48;
var size_between = (15.0/48.0)*fontSize;

var texts = null;
var bars = null;

var font_css = {
    font: "" + fontSize + "px 'Lato'",
    fill: "black",
    fontWeight: "bold",
    backgroundColor: "white",
};

var cols = ['schwarz', 'rot', 'gold' ];
var alphas = [1, 0.89, 0.89 ];


var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-game', { preload: preload, create: create, update: update });

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, function(){},this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Source Sans Pro','Lato']
    }

};

function preload() {

    //for (var i =0; i<bg_pictures.length; i++){
    //    game.load.image('pic_' + i, bg_pictures[i]);
    //}

    game.load.image('schwarz', 'assets/schwarz.png');
    game.load.image('rot', 'assets/rot.png');
    game.load.image('gold', 'assets/gold.png');
    //  Load the Google WebFont Loader script
    game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

function create() {
    game.stage.backgroundColor = bg_grey;
    
/*
    var bg = game.add.sprite(0,0, 'pic_0');
    bg.width = width;
    bg.height = height;
    bg.anchor.x = 0;
    bg.anchor.y = -0.5;
*/
    document.getElementById('fedidwgugl').value = start_strings[ Math.floor(Math.random()*start_strings.length)];
    createBars();
    game.time.events.add(Phaser.Timer.SECOND, createText,this);
}

function createBar(col,bar_width) {

    var bar = game.add.sprite(0,0, col);
    bar.anchor.setTo(0.5,0.5);
    bar.x = width/2;
    bar.y = height/2;
    bar.scale.setTo(
            2000,
            bar_width,
        );

    return bar;
}

function createBars() {
    if (bars != null) {
       for (let i=0; i<bars.length; i++) {
            let bar_width = Math.random() * 150 + 100
           //game.world.remove(bars[i]);
            let angle = Math.random()*180;
            let x = width/2 + ((Math.random()-0.5)*bar_width);
            let y = height/2 + ((Math.random()-0.5)*bar_width);
            game.add.tween(bars[i]).to( { angle: angle, x: x, y: y, height: bar_width }, 1000, Phaser.Easing.Cubic.Out, true );
       }
    }
    else {

        bars = Array();
        
        let bar_width = Math.random() * 150 + 100
        for (var i=0; i<cols.length; i++){
            var bar = createBar(cols[i], bar_width);
            let angle = Math.random()*180;
            bar.angle = angle;
            bar.alpha = alphas[i];
            bar.x = width/2 + ((Math.random()-0.5)*bar_width);
            bar.y = height/2 + ((Math.random()-0.5)*bar_width);
            bars.push(bar);
        }
    }
}

function updateBackground() {
    createBars();
    createText();
}

function createText(textstr) {

    if (texts != null) {
       for (let i=0; i<texts.length; i++) {
           game.world.remove(texts[i]);
       }
       texts.length = 0;
    }
    
    if (textstr == null) {
        textstr = document.getElementById('fedidwgugl').value;
    }
    
    let rows = textstr.split("\n")


    let new_rows = Array();

    for (let i=0; i<rows.length; i++) {
    if (rows[i].length >0 ) {
        new_rows.push(rows[i])
       }
    }

    rows = new_rows;
    
    /*
    let txt_split = textstr.split(" ");
    let num_words = txt_split.length;

    let rows = 2; 
    let words_per_row = num_words / rows > 3;
    if (num_words / rows < 3) {
        words_per_row = Math.round()
        
    }
    */


   let top = 100;
   let left = 100;
   
   texts = Array();
   let max_width = 0;
   for (let i=0; i<rows.length; i++) {
        let row = rows[i];

        var text = game.add.text(0, (fontSize+size_between)*i, " "+row+" " , font_css);
        text.anchor.setTo(0,0);
        text.height = fontSize + 11 
        texts.push(text);

        if (text.width>max_width) { max_width = text.width; }
   }

   let new_height = rows.length*(fontSize) + (rows.length-1)*size_between;
   let new_top = ((height-new_height)/2)*0.85;
   let new_left = ((width-max_width)/2)*0.66;

   for (let i=0; i<rows.length; i++) {
       texts[i].x += new_left;
       texts[i].y += new_top;
   }
    //var text = game.add.text(100, height-200, textstr , font_css);
    //text.padding.set(30, 30);
    //text.margin.set(30, 30);
    //text.inputEnabled = true;
    //text.input.enableDrag();
}

function update() { }

function updateFontSize(fs) {
    fontSize = parseInt(fs);
    size_between = (15.0/48.0)*fontSize;
    if (size_between < 15)
        size_between = 15;
    //size_between = 15.0;

    font_css.font = '' + fontSize +"px 'Lato'";
    createText(document.getElementById('fedidwgugl').value);

}
 var link;

function saveCanvas(filename) {
    console.log('Download attempt.');
    link=document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute("type", "hidden"); 
    link.href = game.canvas.toDataURL();
    link.download = filename;
    //window.open(game.canvas.toDataURL());
    link.click();
};
