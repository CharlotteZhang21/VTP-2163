import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('stackEffect', PiecSettings.assetsDir + 'coin_stack_effect.png', 128, 128, 32);
}

export function play(game, layer) {

	var container = document.getElementById("coin-stack-area");
	var xPositions = [0, 60, 90, 20, 55, 100]; //expressed as relative percentages to coin effect area
	var yPositions = [0, 0, 2, 40, 45, 40]; //expressed as relative percentages to coin effect area
	var delays = [500, 700, 900, 0, 200, 350];
	var loops = [1,1,1,1,1,1];
	var scales = [55,55,55,60,60,60];

	var animations = AnimationsUtil.playAnimations("stackEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, true, container, game, layer);
}