var $ = require('jquery'),
    stars = require('./stars'),
    gradients = require('./gradients');

// generate stars and start animation
stars();

// start gradient animation
gradients();

// navigate to value of [data-href] on button click
$('button[data-href]').on('click', function() {
    window.location.href = $(this).data('href');
});