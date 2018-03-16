import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preloadPngSequences(game) {
	for (var i = 0; i < PiecSettings.spins.length; i++) {
		//Preload pngsequences, if any
		if (PiecSettings.spins[i].pngSequence != null) {
			var pngSequence = PiecSettings.spins[i].pngSequence;
			var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
			game.load.spritesheet(
				pngSequenceName, 
				PiecSettings.assetsDir + pngSequence.src,
				pngSequence.spriteWidth,
				pngSequence.spriteHeight,
				pngSequence.spriteNumber);
		}
		//TODO - Preload other custom png sequences
	}
	for (var i = 0; i < PiecSettings.bonus.length; i++) {
		//Preload pngsequences, if any
		if (PiecSettings.bonus[i].pngSequenceSpecific != null) {
			var pngSequence = PiecSettings.bonus[i].pngSequenceSpecific;
			console.log(pngSequence);
			var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
			game.load.spritesheet(
				pngSequenceName, 
				PiecSettings.assetsDir + pngSequence.src,
				pngSequence.spriteWidth,
				pngSequence.spriteHeight,
				pngSequence.spriteNumber);
		}
		//TODO - Preload other custom png sequences
	}
}

export function playPngSequence(game, pngSequence, layer) {
	var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
	var container = document.getElementById(pngSequence.htmlContainer);
	var containerWidth = container.offsetWidth * window.devicePixelRatio;
	var containerHeight = container.offsetHeight * window.devicePixelRatio;
	var containerX = container.getBoundingClientRect().left * window.devicePixelRatio + containerWidth/2;
	var containerY = container.getBoundingClientRect().top * window.devicePixelRatio + containerHeight/2;

	var sprite = game.add.sprite(containerX, containerY, pngSequenceName);
	layer.add(sprite);
	sprite.animations.add("animation");
	sprite.anchor.set(0.5);
	sprite.alpha = 0;
	AnimationsUtil.playAnimation(game, sprite, pngSequence.delay, pngSequence.fps);
	sprite.scale.x = containerWidth / sprite.width;
	sprite.scale.y = sprite.scale.x;
	sprite.persistent = false;

	if (pngSequence.loops != null) {
		sprite.numberOfLoops = pngSequence.loops;
		sprite.animations.currentAnim.onLoop.add(AnimationsUtil.onLoop, this);
	}

	if (pngSequence.effect != null) {
		if (pngSequence.effect.indexOf("fade-in") != -1) {
			sprite.alpha = 0;
			var tween = game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay);
			var originalScaleX = sprite.scale.x;
			var originalScaleY = sprite.scale.y;
			sprite.scale.x *= 1.3;
			sprite.scale.y *= 1.3;
			game.add.tween(sprite.scale).to({ x: [originalScaleX * 1.5, originalScaleX], y: [originalScaleY *1.5, originalScaleY]}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay)
		}
	}

	return sprite;
}

export function playPngSequenceSpecificPosition(game, pngSequence, layer, positionX, positionY, width, height) {

	var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
	// var container = document.getElementById(pngSequence.htmlContainer);
	var containerWidth = width;
	var containerHeight = height;
	var containerX = positionX;
	var containerY = positionY;

	var sprite = game.add.sprite(containerX, containerY, pngSequenceName);
	layer.add(sprite);
	sprite.animations.add("animation");
	sprite.anchor.set(0.5);
	sprite.alpha = 0;
	AnimationsUtil.playAnimation(game, sprite, pngSequence.delay, pngSequence.fps);
	sprite.scale.x = containerWidth / sprite.width;
	sprite.scale.y = sprite.scale.x;
	sprite.persistent = false;

	if (pngSequence.loops != null) {
		sprite.numberOfLoops = pngSequence.loops;
		sprite.animations.currentAnim.onLoop.add(AnimationsUtil.onLoop, this);
	}

	if (pngSequence.effect != null) {
		if (pngSequence.effect.indexOf("fade-in") != -1) {
			sprite.alpha = 0;
			var tween = game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay);
			var originalScaleX = sprite.scale.x;
			var originalScaleY = sprite.scale.y;
			sprite.scale.x *= 1.3;
			sprite.scale.y *= 1.3;
			game.add.tween(sprite.scale).to({ x: [originalScaleX * 1.5, originalScaleX], y: [originalScaleY *1.5, originalScaleY]}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay)
		}
	}

	return sprite;
}