import * as Util from '../utils/util';
import Reel from '../prefabs/reel';
import Symbol from '../prefabs/symbol';
import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';

class ReelLayout extends Phaser.Group {
	constructor(game, reelsToCreate, reelLayoutToCreate, containerId) {
		super(game);

		this.offsetX = 0;
		this.offsetY = 0;
		this.reels = [];
	 	this.belowLayer = [];
		this.symbolPatternFeature = [];

		// this.background = new Phaser.Sprite(this.game, 0, 0, 'reel-background');
		// this.add(this.background);

		this.reelsToCreate = reelsToCreate;
		this.reelLayoutToCreate = reelLayoutToCreate;

		this.targetContainer =  document.getElementById(containerId);

		this.fitInContainer();
		this.createReelLayout();
		// this.slideUp();
	}

	slideUp() {
		var finalY = this.y;

		this.y += this.game.global.windowHeight;

		this.game.add.tween(this).to({
			y: finalY,
		}, 1000, Phaser.Easing.Quadratic.InOut, true, 0);
	}

	createReelLayout() {
		this.maxReelHeight = Math.max.apply(null, this.reelLayoutToCreate);

		if (this.reelsToCreate.belowLayer !== undefined) {
			for (var i = 0; i < this.reelLayoutToCreate.length; i++) {
				var verticalReelOffset = (this.maxReelHeight - this.reelLayoutToCreate[i])/2 * PiecSettings.reelWidth;
				var reel = new Reel(
					this.game,
					i * PiecSettings.reelWidth,
					0 + verticalReelOffset,
					this.reelsToCreate.belowLayer[i],
					this.reelLayoutToCreate[i],
					this.scale.x,
					this.x,
					this.y); //Scale only used by mask inside reel
				
				reel.goToBottomOfReel();
				this.belowLayer.push(reel);
				this.add(reel);

			}


				console.log(this.belowLayer);
		}

		for (var i = 0; i < this.reelLayoutToCreate.length; i++) {
			var verticalReelOffset = (this.maxReelHeight - this.reelLayoutToCreate[i])/2 * PiecSettings.reelWidth;
			var reel = new Reel(
				this.game,
				i * PiecSettings.reelWidth,
				0 + verticalReelOffset,
				this.reelsToCreate.reels[i],
				this.reelLayoutToCreate[i],
				this.scale.x,
				this.x,
				this.y); //Scale only used by mask inside reel
			
			reel.goToBottomOfReel();
			this.reels.push(reel);
			this.add(reel);
		}
	}

	spin() {
		//Spins
		if (this.game.global.spin < PiecSettings.spins.length) {
			var index = 0;
			this.reels.forEach(function(reel) {
				reel.spinToStopPosition(PiecSettings.spins[this.game.global.spin].stopPositions[index], 1800, PiecSettings.reelsAnimation.delayPerReel[index], true, false);
				index++;
			}, this);
			this.game.global.spin ++;
		}
	}

	spinBonus() {
		if(this.game.global.bonusSpin < PiecSettings.bonus.length) {
			var index = 0;
			this.reels.forEach(function(reel) {
				reel.spinToStopPosition(PiecSettings.bonus[this.game.global.bonusSpin].stopPositions[index], 1800, PiecSettings.reelsAnimation.delayPerBonusReel[index], true, false);
				index++;
			}, this);
			this.game.global.bonusSpin ++;
		}
	}

	fitInContainer() {

		// Scale to fit
		var containerWidth = this.targetContainer.offsetWidth;

		var scaleHorizontal = containerWidth / (PiecSettings.reelWidth * this.reelLayoutToCreate.length) * window.devicePixelRatio;

		this.scale.x = scaleHorizontal;
		this.scale.y = scaleHorizontal;

		// Reposition to fit
		this.x = this.targetContainer.getBoundingClientRect().left * window.devicePixelRatio;
		this.y = this.targetContainer.getBoundingClientRect().top * window.devicePixelRatio;
	}

	drawWinlines(layer) {

		var winlines = PiecSettings.spins[this.game.global.spin - 1].winlines;

		this.winlineGraphics = [];

		var symbolWidth = PiecSettings.reelWidth;
		var symbolHeight = PiecSettings.symbolHeight;

		if (winlines != null) {
			for (var i = 0; i < winlines.length; i++) {

				//Instantiate winlines graphics
				this.winlineGraphics[i] = this.game.add.graphics(this.x, this.y);
				layer.add(this.winlineGraphics[i]);

				this.winlineGraphics[i].lineStyle(this.height/800, PiecSettings.winlinePalette[i % PiecSettings.winlinePalette.length], 1);
				var verticalOffset = this.getVerticalOffset(winlines, winlines[i], i);

				//Initial bit of the winline
				var verticalReelOffsetInit = (this.maxReelHeight - PiecSettings.reelLayout[0])/2 * PiecSettings.reelWidth;
				var verticalReelOffsetFinal = (this.maxReelHeight - PiecSettings.reelLayout[0])/2 * PiecSettings.reelWidth;
				this.winlineGraphics[i].moveTo(
					0, 
					this.scale.x * (symbolHeight * (winlines[i][0] + 1) - symbolHeight/2 + verticalOffset + verticalReelOffsetInit));
				this.winlineGraphics[i].lineTo(
					this.scale.x * (symbolWidth - symbolWidth/2), 
					this.scale.x * (symbolHeight * (winlines[i][0] + 1) - symbolHeight/2 + verticalOffset + verticalReelOffsetFinal));

				//Intermediate bits of the winline
				for (var j = 1; j < winlines[i].length; j++) {
					verticalReelOffsetInit = (this.maxReelHeight - PiecSettings.reelLayout[j-1])/2 * PiecSettings.reelWidth;
					verticalReelOffsetFinal = (this.maxReelHeight - PiecSettings.reelLayout[j])/2 * PiecSettings.reelWidth;
					this.winlineGraphics[i].moveTo(
						this.scale.x * (symbolWidth * j - symbolWidth/2), 
						this.scale.x * (symbolHeight * (winlines[i][j-1] + 1) - symbolHeight/2 + verticalOffset + verticalReelOffsetInit));
					this.winlineGraphics[i].lineTo(
						this.scale.x * (symbolWidth * (j + 1) - symbolWidth/2), 
						this.scale.x * ((symbolHeight * (winlines[i][j] + 1))-symbolHeight/2 + verticalOffset + verticalReelOffsetFinal));
				}

				//Final end of the winline
				var lastIndex = winlines[i].length - 1;
				verticalReelOffsetInit = (this.maxReelHeight - PiecSettings.reelLayout[lastIndex])/2 * PiecSettings.reelWidth;
				verticalReelOffsetFinal = (this.maxReelHeight - PiecSettings.reelLayout[lastIndex])/2 * PiecSettings.reelWidth;
				this.winlineGraphics[i].moveTo(
					this.scale.x * (symbolWidth * (lastIndex + 1) - symbolWidth/2),
					this.scale.x * (symbolHeight * (winlines[i][lastIndex] + 1) - symbolHeight/2 + verticalOffset + verticalReelOffsetInit))
				this.winlineGraphics[i].lineTo(
					this.scale.x * (symbolWidth * (lastIndex + 1)), 
					this.scale.x * (symbolHeight * (winlines[i][lastIndex] + 1) - symbolHeight/2 + verticalOffset + verticalReelOffsetFinal));
			}
		}

		// Winline loop animations are programmed all at once. We need to send the spinNumber to the "setAlpha"
		// function, in case the player interrupts the loop.
		var spinNumber = this.game.global.spin;

		this.game.time.events.add(1200, function() {
			this.hideAllWinlines();
			this.game.time.events.add(300, function() {
				this.playWinlineLoopAnimation(spinNumber);
			}, this);
		}, this);
	}

	hideAllWinlines() {
		for (var i = 0; i < this.winlineGraphics.length; i++) {
			this.winlineGraphics[i].alpha = 0;
		}
	}

	playWinlineLoopAnimation(spinNumber) {
		for (var i = 0; i < this.winlineGraphics.length; i++) {
			this.setAlpha(i, 1000, 100, spinNumber);
		}
	}

	setAlpha(index, duration, delay, spinNumber) {
		this.game.time.events.add(duration * index - delay, function() {
			if (spinNumber == this.game.global.spin) {
				this.winlineGraphics[index].alpha = 1;
			}
		}, this);

		this.game.time.events.add((duration * index - delay) + (duration-delay), function(){
			if (spinNumber == this.game.global.spin) {
				this.winlineGraphics[index].alpha = 0;
			}
		}, this);
	}

	getVerticalOffset(winlines, winline, index) {
		var coincidencesWithBiggerIndex = 0;
		for (var i = 0; i < winlines.length; i++) {
			if (winline[0] == winlines[i][0] || winline[winline.length - 1] == winlines[i][winlines[i].length - 1]) {
				if (index > i)
					coincidencesWithBiggerIndex++;
			}
		}
		return coincidencesWithBiggerIndex * 17;
	}

	respinFeature(currentReelArray, currentSpin) {
		if (currentReelArray[currentSpin].respinFeature != null) {
			for (var i = 0; i < currentReelArray[currentSpin].respinFeature.newStopPositions.length; i++) {
				var newStopPosition = currentReelArray[currentSpin].respinFeature.newStopPositions[i];
				if (this.reels[i].currentStopPosition != newStopPosition){
					this.reels[i].spinToStopPosition(newStopPosition, 1800, 300, false, true);
				}
			}
		}
	}

	symbolPatternReelFeature(currentReelArray, currentSpin) {
		
		var totalIndex = 0;
		if (currentReelArray[currentSpin].symbolPatternFeature != null) {
			for (var i = 0; i < currentReelArray[currentSpin].symbolPatternFeature.pattern.length; i++) {
				for (var j = 0; j < currentReelArray[currentSpin].symbolPatternFeature.pattern[i].length; j++) {
					var index = currentReelArray[currentSpin].symbolPatternFeature.pattern[i][j];
					var symbol = new Symbol(
						this.game,
						0,
						0,
						'symbols',
						currentReelArray[currentSpin].symbolPatternFeature.symbol[i][j]);

					symbol.x = i * PiecSettings.reelWidth + PiecSettings.reelWidth/2;
					symbol.y = index * PiecSettings.symbolHeight + PiecSettings.symbolHeight/2;
					symbol.alpha = 0;

					this.add(symbol);
					this.symbolPatternFeature.push(symbol);

					var tween = this.game.add.tween(symbol).to({alpha:1}, 500, Phaser.Easing.Quadratic.In, true, 150 * totalIndex);
					totalIndex++;
				}
			}
		}
	}

	clearSymbolPatternReelFeature() {
		var duration = 500;
		//Fade out
		this.symbolPatternFeature.forEach(function(symbolOnPattern) {
			var tween = this.game.add.tween(symbolOnPattern).to({alpha:0}, duration, Phaser.Easing.Quadratic.Out, true, 0);
		}, this);
		//Then, remove any previously added overlay symbols through symbol pattern in-reel feature
		this.game.time.events.add(duration, function() {
			this.symbolPatternFeature.forEach(function(symbolOnPattern) {
				symbolOnPattern.destroy();
			}, this);
		}, this);
	}

	attacked(currentReelArray, currentSpin, pngSequencesLayer) {

		var currentLayout = currentReelArray[currentSpin];
		// var positionXArray = currentLayout.pngSequenceSpecific.x;
		// var positionYArray = currentLayout.pngSequenceSpecific.y;

		// for(var i = 0; i < positionXArray.length; i ++ ){
		// 	var positionX = (this.maxReelHeight - positionXArray[i] )/2 * PiecSettings.reelWidth;;
		// 	var positionY = this.y + positionYArray[i] * PiecSettings.symbolHeight;
		// 	var animationSpecific = CustomPngSequencesRenderer.playPngSequenceSpecificPosition(this.game, currentReelArray[currentSpin].pngSequenceSpecific, pngSequencesLayer, positionX, positionY, PiecSettings.symbolHeight, PiecSettings.symbolHeight);
        
		// }
		        
		var stopPositions = currentLayout.belowLayerStopPositions;
		if(stopPositions != null) {
			var index = 0;
			this.belowLayer.forEach(function(reel) {
				reel.spinDirectlyToStopPosition(stopPositions[index], false);
				index++;
			}, this);
		}

	}


	hide() {
		var tween = this.game.add.tween(this).to({alpha:0}, 1000, Phaser.Easing.Quadratic.Out, true, 0);
	}

	show() {

		var tween = this.game.add.tween(this).to({ alpha: 1}, 1000, Phaser.Easing.Quadratic.Out, true, 0);
	}

}

export default ReelLayout;