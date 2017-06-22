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
        star: '#stars span',
        gradient: '.gradient',
        activeGradient: '.gradient.active',
        title: 'p',
        buttonLink: 'button[data-href]'
    };

// navigate to value of [data-href] on button click
$(selectors.buttonLink).on('click', function() {
    window.location.href = $(this).data('href');
});

// render stars
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

// animate stars
setTimeout(function() { 
    $(selectors.star).each(function() {  
        $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
}, 1);

// reset star position
setInterval(function() { 
    $(selectors.star).each(function(){     
        $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
}, 100000); 

// cycle through gradients
if (window.location.href.indexOf('?static') < 0) {
    setInterval(function() {
        // get the active gradient
        var $active = $(selectors.activeGradient),
            $next = $active.next(selectors.gradient);

        // if next div doesn't exist, get the first
        $next = ($next.length === 0) ? $(selectors.gradient).eq(0) : $next;

        $next.addClass('active');

        setTimeout(function() {
            $active.removeClass('active');
        }, 3000);
    }, 6000);
}

// setInterval(function() {
//     $('p').css('top', (Math.random() * (50 - 49) + 49) + '%');
//     $('p').css('left', (Math.random() * (2 + 2) - 2) + '%');
//     // $('p').css('right', (Math.random() * (2 + 2) - 2) + '%');
// }, 5500);