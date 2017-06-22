// A Sky Full of Stars - https://codepen.io/jlnljn/pen/gRrOxM

var $ = require('jquery'),
    // use low star count for browsers besides Chrome because of performance issues
    stars = (navigator.userAgent.indexOf("Chrome") >= 0) ? 666 : 266,
    colors = [
        '#f5d76e',
        '#f7ca18',
        '#f4d03f',
        '#ececec',
        '#ecf0f1',
        '#ffffff'
    ],
    selectors = {
        stars: '#stars',
        star: '#stars span'
    };

for (var i = 0; i <= stars; i++) {
    var size = Math.random() * 3,
        color = colors[parseInt(Math.random() * 4)];

    $(selectors.stars).prepend($('<span></span>').css({
        'width': size + 'px',
        'height': size + 'px',
        'top': Math.random() * 100 + '%',
        'left': Math.random() * 100 + '%',
        'background': color,
        'box-shadow': '0 0 ' + Math.random() * 10 + 'px' + color
    }));
}

setTimeout(function(){ 
    $(selectors.star).each(function(){  
        $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
}, 1);

setInterval(function(){ 
    $(selectors.star).each(function(){    
        $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
}, 100000); 