var $ = require('jquery'),
    selectors = {
        gradient: '.gradient',
        activeGradient: '.gradient.active',
    };

/**
 * Cycle through gradients
 * @param  {integer} interval   Milliseconds between transitions
 */
module.exports = function(interval) {
    if (window.location.href.indexOf('?static') >= 0) {
        return;
    }

    setInterval(function() {
        // get the active gradient
        var $active = $(selectors.activeGradient),
            $next = $active.next(selectors.gradient);

        // if next div doesn't exist, get the first
        $next = ($next.length === 0) ? $(selectors.gradient).eq(0) : $next;

        $next.addClass('active');

        // hide previous gradient once new one has had time to fade in
        setTimeout(function() {
            $active.removeClass('active');
        }, interval / 2);
    }, interval);
};