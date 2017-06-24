
var start_strings = [
    //"Von der Sowjetunion\nlernen heißt\nsiegen lernen.",
    "Für ein Deutschland,\nin dem wir gut\nund gerne lachen.",
    "Für Sicherheit\nund Ortung.",
    //"Für mehr Respekt \nvor Familien.\nAlso. Heterosexuellen.",
    //"Für eine starke\nWirtschaft \nmit einem\ntrinkfesten Wirt.",
    "Corporate Designs sind\nwie Passwörter.\nJe simpler, desto\nhackbarer.",
    //"Am liebsten mag ich\nDeutschländer.\nDie sind lecker.",
    "Mehr Ordnung.\nWeniger\nEntropie.",
    "Ja, Sakrament.\nDa brat mir doch\neiner nen Horst.",
    "Keine Inhalte.\nAber hey, guck mal.\nSchwarz, Rot, Gold!",
]

let string_sizes = [
    //48,
    48,
    66,
    //48,
    //44,
    40,
    //48,
    52,
    48,
    48,
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
var graphics = null;

var font_css = {
    font: "" + fontSize + "px 'Lato'",
    fill: "black",
    fontWeight: "bold",
    backgroundColor: "white",
};

var cols = ['schwarz', 'rot', 'gold' ];
var alphas = [1, 1, 1 ];


var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-game', { preload: preload, create: create });

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
    game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
    let start_id =  Math.floor(Math.random()*start_strings.length);
    document.getElementById('fedidwgugl').value = start_strings[ start_id ];
    document.getElementById('fontSizeSlider').value = string_sizes[ start_id ];
    createBars();
    game.time.events.add(Phaser.Timer.SECOND, createText,this);
    updateFontSize(string_sizes[ start_id ]);

    /*
    poly = new Phaser.Polygon();

    //  And then populate it via setTo, using any combination of values as above
    poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);



    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

    game.add.tween(graphics).to({alpha:0},1000, Phaser.Easing.Cubic.Out, true);
    */
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

function getOverlapPolygon(sprite1, sprite2) {
    
}

function createBars() {
    if (bars !== null) {
        let bar_width = Math.random() * 100 + 150
           if (graphics!== null) 
           {
                game.add.tween(graphics).to({alpha:0},
                                            250,
                                            Phaser.Easing.Cubic.In,true)
                    .onComplete.add(
                        function () { 
                           game.world.remove(graphics);
                           for (let i=0; i<bars.length; i++) {
                               //game.world.remove(bars[i]);
                                let angle = Math.random()*180;
                                let x = width/2 + ((Math.random()-0.5)*bar_width);
                                let y = height/2 + ((Math.random()-0.5)*bar_width);
                                game.add.tween(bars[i]).to( { 
                                                              angle: angle, 
                                                              x: x, 
                                                              y: y, 
                                                              height: bar_width 
                                                            }, 
                                                            1000, 
                                                            Phaser.Easing.Cubic.Out, 
                                                            true ).onComplete.add( drawOverlap );

                           }
                        }
                    );
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

        drawOverlap();

    }
}

function drawOverlap() {
   if (graphics!== null) 
   {
       game.world.remove(graphics);
   }
    
    graphics = game.add.graphics(0,0);
    graphics.alpha = 0;

    let polys = Array();
    polys.push(
                intersectionCalculator.getOverlapPolygon(bars[0],bars[1]),
                intersectionCalculator.getOverlapPolygon(bars[1],bars[2]),
                intersectionCalculator.getOverlapPolygon(bars[0],bars[2])
              );
    let count = 0;
    polys.forEach( function (p) {
        let poly = new Phaser.Polygon(p);
            let color;
            if (count==0) {
                color = 0xB5081C;
            } else {
                color = 0xF3A402;
            }
            graphics.beginFill(color);
            graphics.drawPolygon(poly);
            graphics.endFill();
            count += 1;
    });
    createText();
    game.add.tween(graphics).to({alpha:1}, 1000, Phaser.Easing.Cubic.Out, true);
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
        //text.alpha = 0;
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
