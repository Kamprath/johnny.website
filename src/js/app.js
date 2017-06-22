var $ = require('jquery'),
    stars = require('./stars'),
    gradients = require('./gradients');

// generate stars and start animation
stars(80000);

// start gradient animation
gradients(6000);

// navigate to value of [data-href] on button click
$('button[data-href]').on('click', function() {
    window.location.href = $(this).data('href');
});