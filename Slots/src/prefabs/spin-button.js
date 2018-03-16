class SpinButton extends Phaser.Group {
	constructor(game) {
		super(game);

		//Sprite and a text label on top
		this.button = new Phaser.Sprite(game, 0, 0, 'spin', 0);
		this.add(this.button);
		this.label = false;

		this.fitInContainer();

		if (this.container.className.indexOf("label") != -1) {
			this.createLabel();
			this.createSpinsTitle();
			this.label = true;
		}

		this.button.inputEnabled = true;
		this.button.input.useHandCursor = true;
		this.button.anchor.set(0.5);
		this.button.events.onInputDown.add(function() {
			this.game.onSpin.dispatch();
			this.game.global.userInteractedWithIEC = true;
		}, this);
		this.alpha = 1;
	}

	fitInContainer() {
		this.container = document.getElementById("spin-button");
		this.containerWidth = this.container.offsetWidth * window.devicePixelRatio;
		this.containerHeight = this.container.offsetHeight * window.devicePixelRatio;
		var containerX = this.container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = this.container.getBoundingClientRect().top * window.devicePixelRatio;

		this.x = containerX + this.containerWidth/2;
		this.y = containerY + this.containerHeight/2;

		this.scale.x = this.containerWidth/this.button.width;
		this.scale.y = this.scale.x;
	}

	createLabel(){

		this.fontSize = this.button.height * .3;

		var style = {
			font: "bold " + this.fontSize + "px " + PiecSettings.fontFamily,
		};

		if(this.game.global.bonusLevel && PiecSettings.bonus.length > 0){
			this.spinsLeft = PiecSettings.bonus.length;
		}else{
			
			this.spinsLeft = PiecSettings.spins.length;
		}

		this.textField = new Phaser.Text(this.game, 0, (this.button.height/7), this.spinsLeft, style);
		this.textField.anchor.set(0.5);
		this.add(this.textField);
		this.textField.align = 'center';
		this.textField.padding.set(this.fontSize,this.fontSize);
		this.textField.x += this.fontSize/2;
		this.textField.y += this.fontSize/5;
		this.textField.stroke = PiecSettings.fontStroke;
		this.textField.strokeThickness = PiecSettings.fontStrokeThickness;
		this.textField.fill = PiecSettings.fontColor;
		this.textField.setShadow(2,3,'rgb(0,0,0)', 0);
	}

	updateSpinsLeft() {
		if(this.game.global.bonusLevel && PiecSettings.bonus.length > 0){
			if (this.label) {
				this.spinsLeft = PiecSettings.bonus.length - this.game.global.bonusSpin;
				this.textField.text = this.spinsLeft;
			}
		}else{
			if (this.label) {
				this.spinsLeft = PiecSettings.spins.length - this.game.global.spin;
				this.textField.text = this.spinsLeft;
			}	
		}
		
	}
	createSpinsTitle() {
		this.fontSize = this.button.height * .1;

		var style = {
			font: "bold " + this.fontSize + "px " + PiecSettings.fontFamily,
		};

		if(PiecSettings.bonus.length > 0){
			this.spinsLeft = PiecSettings.bonus.length;
		}else{
			
			this.spinsLeft = PiecSettings.spins.length;
		}

		this.titleField = new Phaser.Text(this.game, 0, 0, 'Spins', style);
		this.titleField.anchor.set(0.5);
		this.add(this.titleField);
		this.titleField.align = 'center';
		this.titleField.padding.set(this.fontSize,this.fontSize);
		this.titleField.x += this.fontSize/2;
		this.titleField.y -= this.fontSize;
		this.titleField.fill = PiecSettings.fontColor;
		this.titleField.setShadow(2,3,'rgb(0,0,0)', 0);
	}

	updateSpinsTitle() {
		this.titleField.text = 'Free Spins';
	}

	startIdleAnimation() {
		this.idleTween = this.game.add.tween(this).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		// this.scale.x = .98;
		// this.scale.y = .98;
	}

	stopIdleAnimation() {
		this.game.tweens.remove(this.idleTween);
	}

	hide() {
		this.game.add.tween(this.button).to({angle: 360}, 1000, Phaser.Easing.Linear.InOut, true, 0);
		this.game.add.tween(this).to({ alpha: 0.5}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);
		
	}

	show() {
		// this.game.add.tween(this).to({ alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		this.game.add.tween(this).to({ alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 0);
		// this.startIdleAnimation();
	}

}

export default SpinButton;