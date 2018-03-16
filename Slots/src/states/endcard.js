import Logo from '../prefabs/logo';
import ReelLayout from '../prefabs/reel-layout';
import WinCounter from '../prefabs/win-counter';
import Reel from '../prefabs/reel';
import SpinOverlay from '../prefabs/spin-overlay';
import DarkOverlay from '../prefabs/dark-overlay';
import Tooltip from '../prefabs/tooltip';
import CtaButton from '../prefabs/cta-button';
import * as FxRenderer from '../utils/fx-renderer.js';
import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';
import * as WinMessages from '../utils/win-messages-util.js';
import * as Utils from '../utils/util.js';

 class Endcard extends Phaser.State {

     constructor() {
         super();
     }

     create() {

        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale((1 / window.devicePixelRatio), (1 / window.devicePixelRatio), 0, 0);

        this.game.global.windowHeight = document.body.clientHeight;
        this.game.global.windowWidth = document.body.clientWidth;

        // console.log(this.game.global.windowHeight + "clientWidth: " + this.game.global.windowWidth);

        this.reelLayout = new ReelLayout(this.game, PiecSettings.reels, PiecSettings.reelLayout, "reel-layout");
        this.game.add.existing(this.reelLayout);

        this.game.global.bonusLevel = false;

        
        this.game.onSpin.add(this.onSpin, this);
        this.game.onReelSpinComplete.add(this.onReelSpinComplete, this);
        this.game.onSpinComplete.add(this.onSpinComplete, this);
       

        this.winlinesLayer = this.game.add.group();

        this.winMessagesLayer = this.game.add.group();

        this.darkOverlay = new DarkOverlay(this.game);
        this.game.add.existing(this.darkOverlay);

        // this.winCounter = new WinCounter(this.game);
        // this.game.add.existing(this.winCounter);


        this.reelBonusBackground = new Phaser.Sprite(this.game, 0, 0, 'frameBonus', 0);
        this.game.add.existing(this.reelBonusBackground);
        Utils.spriteToDom('reel-layout-background-bonus', this.reelBonusBackground);
        
        this.reelLayoutBonus = new ReelLayout(this.game, PiecSettings.bonusReels, PiecSettings.bonusReelLayout, "reel-layout-bonus");
        this.game.add.existing(this.reelLayoutBonus);
        this.reelLayoutBonus.alpha = 0;


        this.spinOverlay = new SpinOverlay(this.game);
        this.game.add.existing(this.spinOverlay);
        // this.spinOverlay.alpha = 0;


        this.tooltip = new Tooltip(this.game, this.darkOverlay, this.spinOverlay.spinButton);
        this.game.add.existing(this.tooltip);

         this.pngSequencesLayer = this.game.add.group();

        this.fxEffectsLayer = this.game.add.group();

        this.logo = new Logo(this.game);
        this.game.add.existing(this.logo);

        this.cta = new CtaButton(this.game);
        this.game.add.existing(this.cta);

        this.createBonusIntroAni();

        if (PiecSettings.autospin != null) {
            if (PiecSettings.autospin.activateAfter != null) {
                this.game.time.events.add(PiecSettings.autospin.activateAfter, function() {
                    if (!this.game.global.userInteractedWithIEC) {
                        console.log("firing this");
                        this.game.onSpin.dispatch();
                    }
                }, this);
            } else {
                this.game.onSpin.dispatch();
            }
        }


        // if (PiecSettings.autospin != null) {
        //     if (PiecSettings.autospin.activateAfter != null) {
        //         this.game.time.events.add(PiecSettings.autospin.activateAfter, function() {
        //             if (!this.game.global.userInteractedWithIEC) {
        //                 console.log("firing this");
        //                 this.game.onSpin.dispatch();
        //             }
        //         }, this);
        //     } else {
        //         this.setupInputListeners();
        //     }
        // }

        // this.setupInputListeners();

     }

     createBonusIntroAni() {
        this.BAniGrp = this.game.add.group();


        this.blackCrew = new Phaser.Sprite(this.game, 0, 0, 'blackCrew', 0);
        Utils.spriteToDom('blackCrew', this.blackCrew);
        this.BAniGrp.add(this.blackCrew);


        this.redCrew = new Phaser.Sprite(this.game, 0, 0, 'redCrew', 0);
        Utils.spriteToDom('redCrew', this.redCrew);
        this.BAniGrp.add(this.redCrew);

        this.blackShip = new Phaser.Sprite(this.game, 0, 0, 'blackShip', 0);
        Utils.spriteToDom('blackShip', this.blackShip);


        this.BAniGrp.add(this.blackShip);

        this.redShip = new Phaser.Sprite(this.game, 0, 0, 'redShip', 0);
        Utils.spriteToDom('redShip', this.redShip); 
        this.BAniGrp.add(this.redShip);

        this.BAniGrp.alpha = 0;


        var adjustScale = 0.75;

        this.blackShip.scale.x *= adjustScale;
        this.blackShip.scale.y = this.blackShip.scale.x; 
        this.redShip.scale.x *= adjustScale;
        this.redShip.scale.y = this.redShip.scale.x; 
        
     }

     playBonusAni() {
        this.BAniGrp.alpha = 1;

        var blackX = this.game.global.windowWidth * window.devicePixelRatio / 4,
        redX = this.game.global.windowWidth * window.devicePixelRatio * 3 / 4,
        B_originalX = this.blackShip.x,
        R_originalX = this.redShip.x;

        var targetY = this.reelLayout.y;

        var bonusBgTween = this.game.add.tween(this.reelBonusBackground).to({y: targetY+100}, 3000, Phaser.Easing.Quadratic.Out, true, 0);
        // this.game.add.tween(this.reelLayoutBonus).to({y: targetY+100}, 4000, Phaser.Easing.Quadratic.Out, true, 0);

        bonusBgTween.onComplete.add(function(){
            this.reelLayoutBonus.show();
            this.spinOverlay.show();
            this.spinOverlay.spinButton.updateSpinsTitle();
            this.spinOverlay.spinButton.updateSpinsLeft();


            // this.game.add.tween(this.spinOverlay).to({alpha: 1}, 500, Phaser.Easing.Quadratic.In, true, 0)
        // this.spinOverlay.alpha = 1;
        },this);        

        // console.log(this.reelLayoutBonus);

        this.game.add.tween(this.reelBonusBackground).to({angle: [2, 0, -2, 0]}, 300, Phaser.Easing.Exponential.In, true, 0, 8);
        var blackCrewTween = this.game.add.tween(this.blackCrew).to({x: [blackX,  blackX + 10, blackX]}, 1000, Phaser.Easing.Quadratic.Out, true, 200);
        var redCrewTween = this.game.add.tween(this.redCrew).to({x: [redX, redX - 10, redX]}, 1000, Phaser.Easing.Quadratic.Out, true, 200);
        
        //SHIPS ARE COMING
        this.game.add.tween(this.blackShip).to({x: [blackX * 0.8]}, 1000, Phaser.Easing.Quadratic.Out, true, 400);
        this.game.add.tween(this.redShip).to({x: [redX * 1.1]}, 1000, Phaser.Easing.Quadratic.Out, true, 400);


        // CTA
        this.game.add.tween(this.cta).to({y: this.cta.y+100}, 500, Phaser.Easing.Quadratic.In, true, 0);
        this.game.add.tween(this.cta.scale).to({x: 0.95, y: 0.95}, 500, Phaser.Easing.Quadratic.In, true, 0);


        blackCrewTween.onComplete.add(function(){
             FxRenderer.playFx(this.game, this.fxEffectsLayer, PiecSettings.bonus, 0);
            this.game.add.tween(this.blackCrew).to({x: B_originalX}, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
        }, this);

        redCrewTween.onComplete.add(function(){
            this.game.add.tween(this.redCrew).to({x: R_originalX }, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
        }, this);

     }

     setupInputListeners() {

        if(this.game.global.spin <= PiecSettings.spins.length - 1){
            this.game.input.onUp.add(function(pointer) {
              this.game.onSpin.dispatch();
    
            }, this);
        }
     }

     resize() {        
         // resize code here
         // location.reload();
     }

     render() {
        // render code here
     }

     onSpin() {
        var vungleCloseBtn = document.getElementById('vungle-close');
        if(vungleCloseBtn.className != 'show')
            vungleCloseBtn.className = 'show';

        if (this.game.global.spin <= PiecSettings.spins.length - 1) {

            //Clear winlines
            if (this.reelLayout.winlineGraphics != null && this.reelLayout.winlineGraphics.length > 0){
                for (var i = 0; i < this.reelLayout.winlineGraphics.length; i++) {
                    this.reelLayout.winlineGraphics[i].clear();
                }
            }

            
            //Clear in-reel feature symbols
            this.reelLayout.clearSymbolPatternReelFeature();
            //Spin!
            this.reelLayout.spin();
            //Decrease spins left
            this.spinOverlay.spinButton.updateSpinsLeft();
            //Hide Spin button
            this.spinOverlay.hide();
            //Hide dark overlay (if it is being shown)
            this.tooltip.hide();

        }else {

            if(this.game.global.bonusSpin <= PiecSettings.bonus.length - 1) {
                //Clear winlines
                if (this.reelLayoutBonus.winlineGraphics != null && this.reelLayoutBonus.winlineGraphics.length > 0){
                    for (var i = 0; i < this.reelLayoutBonus.winlineGraphics.length; i++) {
                        this.reelLayoutBonus.winlineGraphics[i].clear();
                    }
                }
                
                //Clear in-reel feature symbols
                // this.reelLayoutBonus.clearSymbolPatternReelFeature();
                //Spin!
                this.reelLayoutBonus.spinBonus();
                //Decrease spins left
                this.spinOverlay.spinButton.updateSpinsLeft();
                //Hide Spin button
                this.spinOverlay.hide();
                //Hide dark overlay (if it is being shown)
                this.tooltip.hide();    
            }
        }
     }

     /** Dispatches onSpinComplete signal when all reels have stopped spinning */
     onReelSpinComplete() {
        this.game.global.reelsSpinCompleted++;
        var currentLayout = PiecSettings.reelLayout;
        if(this.game.global.bonusLevel){
            currentLayout = PiecSettings.bonusReelLayout;
        }
        if (this.game.global.reelsSpinCompleted == currentLayout.length) {
            this.game.onSpinComplete.dispatch();
            this.game.global.reelsSpinCompleted = 0;
        }
     }

     onSpinComplete() {

        var currentSpin = this.game.global.spin-1;
        var currentReel = this.reelLayout;
        var currentReelArray = PiecSettings.spins;

        if(this.game.global.bonusLevel ) {
            currentSpin = this.game.global.bonusSpin - 1;
            currentReel = this.reelLayoutBonus;
            currentReelArray = PiecSettings.bonus;
        }
        //Features
        currentReel.symbolPatternReelFeature(currentReelArray, currentSpin);
        currentReel.respinFeature(currentReelArray, currentSpin);

        var animation;
        if (currentReelArray[currentSpin].pngSequence != null) {
            animation = CustomPngSequencesRenderer.playPngSequence(this.game, currentReelArray[currentSpin].pngSequence, this.pngSequencesLayer);
        }

        //Work out the delay, depending on whether we have custom png sequences and in-reel features
        var winDisplayDelay = 0;
        var finalCtaDelay = 0;
        if (currentReelArray[currentSpin].symbolPatternFeature != null) {
            winDisplayDelay = 500;
        }
        if (currentReelArray[currentSpin].pngSequence != null) {
            // winDisplayDelay += PiecSettings.spins[this.game.global.spin - 1].pngSequence.delay/2;
        }
        if (currentReelArray[currentSpin].respinFeature != null) {
            winDisplayDelay += 2000;
        }

        if (!this.game.global.bonusLevel){
            console.log('playFx');
            this.game.time.events.add(winDisplayDelay + 300, function() {
                // if (this.game.global.spin-1 == currentSpin) {
                FxRenderer.playFx(this.game, this.fxEffectsLayer, currentReelArray, currentSpin);
                // }
          }, this);
        }
        //Fx effects

       
        //Winlines and win counter
        this.game.time.events.add(winDisplayDelay, function() {
            if (this.game.global.spin-1 == currentSpin) {
                this.reelLayout.drawWinlines(this.winlinesLayer);
                if (PiecSettings.spins[this.game.global.spin - 1].winCounter != null)
                    this.winCounter.changeWinCounterTo(PiecSettings.spins[this.game.global.spin - 1].winCounter, 1000 * this.game.global.spin);
            }
        }, this);

        //Win Messages
        if (currentReelArray[currentSpin].winMessage != null) {
            finalCtaDelay = PiecSettings.spins[this.game.global.spin-1].winMessage.delay;
            this.game.time.events.add(finalCtaDelay, function() {
                WinMessages.playWinMessage(this.game, PiecSettings.spins[this.game.global.spin-1].winMessage, this.winMessagesLayer);
            }, this);
        }

        if(this.game.global.bonusLevel){
            if(this.attackPic == null){
                this.attackPic = new Phaser.Sprite(this.game, 0, 0, 'attackBlackCrew', 0);
                this.attackPic.scale.x *= 2;
                this.attackPic.scale.y = this.attackPic.scale.x;
                this.game.add.existing(this.attackPic);
            }
            var attackTween = this.game.add.tween(this.attackPic).to({x: 0, y: this.game.global.windowHeight * window.devicePixelRatio/3}, 800, Phaser.Easing.Quadratic.In, true, 0);
            attackTween.onComplete.add(function(){
                this.game.time.events.add(1000, function() {
                        // if (this.game.global.spin-1 == currentSpin) {
                        FxRenderer.playFx(this.game, this.fxEffectsLayer, currentReelArray, currentSpin);
                        // }
                  }, this);
                var attackGoneTween = this.game.add.tween(this.attackPic).to({x: 0, y: -1000}, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
                currentReel.attacked(currentReelArray, currentSpin, this.pngSequencesLayer);
                attackGoneTween.onComplete.add(function(){
                    this.spinOverlay.show();
                }, this);
            }, this);


            if(PiecSettings.bonus.length == this.game.global.bonusSpin) {

                    if (PiecSettings.finalOverlay != null && PiecSettings.finalOverlay.delay != null) {
                        finalCtaDelay += PiecSettings.finalOverlay.delay;
                    }
                    finalCtaDelay += winDisplayDelay;

                    //Final CTA dark overlay
                    if (PiecSettings.spins.length == this.game.global.spin) {
                        this.game.time.events.add(finalCtaDelay, function() {
                            this.darkOverlay.show();
                            this.logo.animate();
                            // this.winCounter.animate();
                            this.cta.animate();
                        }, this);
                    }
                
            }

        }else{

            if(PiecSettings.spins.length == this.game.global.spin) {
                this.game.time.events.add(3000, function(){
                    this.reelLayout.hide();
                    document.getElementById('reel-layout-background').classList += ' hide';
                    this.game.global.bonusLevel = true;
                }, this);
                
                if(animation!=null) {
                    this.game.time.events.add(5000, function(){
                        var tween = this.game.add.tween(animation).to({alpha: 0}, 1000, Phaser.Easing.Linear.none, true, 0);
                        this.playBonusAni();
                        tween.onComplete.add(function(){
                            animation.destroy();
                        },this);
                    },this);    
                }
                
            }

        }

    

     }

     onLoop() {
        console.log("looping");
     }
 }

 export default Endcard;
