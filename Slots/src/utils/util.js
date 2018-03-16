// get a random integer between range
export function rndInt(max, min) {

    if (!min) {
        min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sample(array) {

    return array[this.rndInt(array.length - 1, 0)];
}

// get a random color
export function rndRgba(alpha) {

    if (!alpha) {
        alpha = 1;
    }

    return 'rgba(' + this.rndInt(256) + ',' + this.rndInt(256) + ',' + this.rndInt(256) + ',' + alpha + ')';
}

// boolean screen orientation
export function isPortrait() {

    return window.innerHeight > window.innerWidth;
}


// boolean screen orientation
export function clone(obj) {

    return JSON.parse(JSON.stringify(obj));
}

export function remove(array, item) {

    var index = array.indexOf(item);

    if (index > -1) {
        array.splice(index, 1);
    }
}

// remove file extension from string
export function removeExtension(fileName) {

    // if no extension found just return the name
    if (fileName.lastIndexOf('.') === -1) {
        return fileName;
    }

    return fileName.substring(0, fileName.lastIndexOf('.'));
}

// vanilla js fade in functionality
export function fadeIn(el) {

    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

const g = 19.8;

export function calcQuadTime(h) {

    //todo: bugfixes
    //return PiecSettings.fallDuration;

    // based on free fall equation h = 0.5 * g * t^2 
    // (where h = height, g = gravoty on earth (9.8) and t = time)
    // equation re-arranged is t = (2h/g) ^ 0.5

    return Math.sqrt((2 * Math.abs(h)) / g) * 100;
}


export function uniq(a) {

    var prims = { "boolean": {}, "number": {}, "string": {} },
        objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}


export function extend( defaults, options ) {

    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function spriteToDom(elId, sprite) {

    var el = document.getElementById(elId);

    var rect = el.getBoundingClientRect();

    // first try to fit horizontally

    var w = sprite._frame.width;
    var h = sprite._frame.height;

    if (sprite.angle === 90 || sprite.angle === -90) {

        w = sprite._frame.height;
        h = sprite._frame.width;
    }

    var scale = (rect.width * window.devicePixelRatio) / w;

    sprite.scale.x = scale;
    sprite.scale.y = scale;

    //check if fits
    var fitsHorizontally = h * scale <= (rect.height * window.devicePixelRatio);

    if (fitsHorizontally === false) {

        //sprite would be too tall if fitted horizontally, try vertical

        scale = (rect.height * window.devicePixelRatio) / h;

        sprite.scale.x = scale;
        sprite.scale.y = scale;
    }
    // set anchor to middle
    sprite.anchor.set(0.5, 0.5);

    // now position the sprite
    sprite.x = (rect.left + (rect.width * 0.5)) * window.devicePixelRatio;
    sprite.y = (rect.top + (rect.height * 0.5)) * window.devicePixelRatio;
}