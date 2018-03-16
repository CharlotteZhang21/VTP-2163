var PiecSettings = PiecSettings || {};

PiecSettings.version = "-";

PiecSettings.autospin = null;
    // {activateAfter: 3000,}


//////// DEFAULT SETTINGS FOR SLOT GAMES ////////


PiecSettings.winlinePalette = [0xfdf9c6, 0xf3d868, 0xc98e43, 0xff8247, 0xfaed60, 0xeba22c]; //Colours used by the winlines
PiecSettings.fontColor = "#fcd100"; //Remove empty if you want to use the default golden gradient
PiecSettings.fontStroke = "#291200";
PiecSettings.fontStrokeThickness = 6;
PiecSettings.titleStrokThickness = 2;
PiecSettings.fontFamily = "lithos"; //Make sure that this font is on the css and that there is a div that uses it. (preload-font div)

//////// SLOTS GAME SETTINGS ///////////////

PiecSettings.tooltip = { // If there is a "src" value, it will always pic the image.
    text: "SPIN TO\nWIN!",
    fontColor: "#ffffff", //Remove if you want to use the default golden gradient
    src: 'tooltip.png',
};

PiecSettings.reelLayout = [3,3,3,3,3]; // Heights of each of the reels in array form, where the first item is the height of the first reel, and so on.
PiecSettings.reels = {
    reels: [ // Tease on first spin, win on second, big win on third
        ["J","K","B","K","T","K","L","R","B","R","P","R","R","B","B","B","B","T","Q","T","N","Q","T","L","B","A","K","R","R","R","N","R","P","L","K","R","K"],
        ["T","K","T","L","B","J","J","J","B","T","J","N","T","R","B","B","P","R","N","B","J","N","J","Q","J","L","T","N","P","N","R","T","J","J","J","A","J","Q"],
        ["B","N","Q","R","R","N","P","R","N","K","N","K","R","T","T","T","P","T","T","Q","T","T","N","B","J","J","J","Q","R","R","R","P","J","J","J","R","T","T","P","A","J"],
        ["T","T","P","L","B","K","J","J","B","T","T","T","T","R","B","B","P","R","N","B","J","N","J","Q","J","N","N","N","P","N","R","B","J","J","J","N","J","Q"],
        ["L","B","T","L","B","Q","J","J","B","T","J","T","T","R","B","B","P","R","N","B","J","N","J","R","B","T","N","P","R","N","R","B","J","J","J","N","J","Q"],
    ]
};
PiecSettings.reelsAnimation = {
    delayPerReel: [0,300,600, 900, 1200],
    delayPerBonusReel: [0,0,0,0]
};

//////// Bonus Game //////////


PiecSettings.bonusReelLayout = [4, 4, 4, 4];
PiecSettings.bonusReels = {
    reels: [
    ["S","time2","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","attack","time2","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
    ["S","S","attack","time10","S","S","S","S","S","S","S","S","S","S","S","S","S","S","attack","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
    ["time10","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","time5","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
    ["time5","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","time2","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"]
    ],
    belowLayer: [
        ["blacktile", "blacktile", "blacktile", "blacktile"],
        ["blacktile", "blacktile", "blacktile", "blacktile"],
        ["blacktile", "blacktile", "blacktile", "blacktile","redtile", "redtile", "redtile", "redtile"],
        ["blacktile", "blacktile", "blacktile", "blacktile","redtile", "redtile", "redtile", "redtile"],

    ]
}




/////// Win Counter settings
PiecSettings.winCounterInitialValue = 0;
PiecSettings.winCounterCommaSeparation = true; //One thousand will appear as 1,000 if this is true; 1000 if this is false

/////// Control symbol vertical spacing here
PiecSettings.symbolHeight = 65;

/////// FINAL OVERLAY SCREEN SETTINGS ///////

PiecSettings.finalOverlay = {
    color: 0x000000,
    alpha: 0.5,
    delay: 3000,
};

/////// SLOTS SPINS SETTINGS ////////

PiecSettings.spins = [
    { // Spin 1
        stopPositions: [0,0,1,0,0], //Stop positions for Spin 1, for each of reels 1, 2 and so on
        // winlines: [
        //     [0,0,0],
        //     [1,1,1],
        //     [2,2,2],
        //     [0,1,2],
        //     [2,1,0],
        // ],
        respinFeature: {
            newStopPositions: [0,0,0,0,0],
        },
        // winCounter: 5000000,
        winAnimations: [
            'coin-area-burst-03',
        ],
        pngSequence: {
            src: 'cleopatra_anim.png',
            htmlContainer:'cleopatra-container',
            spriteWidth: 256,
            spriteHeight: 256,
            spriteNumber: 10,
            loops: 0, //write 0 if infinite loop
            delay: 3000,
            fps: 10,
            effect: 'fade-in',
        },
    },
];

PiecSettings.bonus = [
    {
        stopPositions: [18,18,18,18],
        symbolPatternFeature: {
            // src: 'cleopatra_anim.png',
            symbol: [['time2'],[], ['time5'], ['time2']],
            pattern: [[1],[],[2],[1]],
        },
        winAnimations: [
            'coin-area-burst-02',
        ],
        belowLayerStopPositions: [0, 0, 1, 2]
    },
    {
        stopPositions: [0,0,0,0],
        winAnimations: [
            'coin-area-burst-02',
        ],
        belowLayerStopPositions: [0, 0, 0, 0],
        
    },
]