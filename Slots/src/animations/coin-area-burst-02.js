import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('explode', PiecSettings.assetsDir + 'explode.png', 256, 256, 24);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [50, 95, 85, 60, 97, 55]; //expressed as relative percentages to coin effect area
	var yPositions = [25, 25, 40, 25, 30, 55]; //expressed as relative percentages to coin effect area
	var delays = [0, 100, 250, 300, 200, 50, 150];
	var loops = [2,2,2,2,2,2,2];
	var scales = [60,60,60,60,60,60,60];

	var animations = [];
	AnimationsUtil.playAnimations("explode", xPositions, yPositions, delays, loops, 0.5, 40, scales, false, container, game, layer);

}