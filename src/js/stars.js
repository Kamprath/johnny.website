// Inspired by A Sky Full of Stars - https://codepen.io/jlnljn/pen/gRrOxM

var $ = require('jquery');

/**
 * Star colors
 */
var colors = [
	// yellow & white
    [
        '#f5d76e',
        '#f7ca18',
        '#f4d03f',
        '#ececec',
        '#ecf0f1',
        '#ffffff'
    ], 
    // blue & white
    [
        '#f0f5eb',
        '#a0eff4',
        '#80e7ec'
    ]
];

/**
 * jQuery selectors
 */
var selectors = {
    stars: '#stars',
    star: '#stars span'
};

/**
 * Fetch a random array value
 * @return {mixed}	Returns a random array value
 */
Array.prototype.random = function() {
	return this[
		Math.floor(Math.random() * this.length)
	];
};

/**
 * Randomize styles of all star elements
 */
function animateStars() {
    var colorSet = colors.random();

    $(selectors.star).each(function(){     
        $(this).css({
            'top': (Math.random() * 100) + '%',
            'left': (Math.random() * 100) + '%',
            'color': colorSet.random()
        });
    });
}

/**
 * Generate star elements
 */
function generateStars(colorSet) {
	// use lower star count for browsers other than Chrome because of performance issues
	var count = (navigator.userAgent.indexOf('Chrome') >= 0) ? 666 : 266;

	for (var i = 0; i <= count; i++) {
    	var size = Math.random() * 3,
        	color = colorSet.random();

	    $(selectors.stars).prepend($('<span></span>').css({
	        'width': size + 'px',
	        'height': size + 'px',
	        'top': (Math.random() * 100) + '%',
	        'left': (Math.random() * 100) + '%',
	        'background': color,
	        'box-shadow': '0 0 ' + (Math.random() * 10) + 'px ' + color
	    }));
	}
}

/**
 * Initialize the module
 */
function initialize(interval) {
	generateStars(colors[1]);
	
	// start animation
	window.setTimeout(animateStars, 5);

	// animate stars by periodically randomizing their position and color
	window.setInterval(animateStars, interval);
}

module.exports = initialize;