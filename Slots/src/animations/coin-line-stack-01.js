import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('stackEffect', PiecSettings.assetsDir + 'coin_stack_effect.png', 200, 115, 32);
}

export function play(game, layer) {

	var container = document.getElementById("coin-stack-area");
	var xPositions = [0, 55, 100]; //expressed as relative percentages to coin effect area
	var yPositions = [40, 45, 40]; //expressed as relative percentages to coin effect area
	var delays = [0, 200, 350];
	var loops = [1,1,1];
	var scales = [60,60,60];

	var animations = AnimationsUtil.playAnimations("stackEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, true, container, game, layer);
}