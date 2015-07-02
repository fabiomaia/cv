(function() {
    // Return a random integer between min and max
    var randomIntBetween = function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    // Return a random element from an array
    var randomArrayElement = function(array) {
        return array[randomIntBetween(0, array.length-1)];
    };

    // List of header images
    var images = ['header2.jpg', 'header3.jpeg', 'header5.jpg', 'header6.jpg'];

    // Query the DOM for the elements
    var header = document.querySelector('.header');
    var logo = document.querySelector('.header__logo span');

    // Calculate the random image to be loaded
    var randomImageFilename = randomArrayElement(images);

    // Set an initial random image
    header.style.backgroundImage = "url('../assets/images/" + randomImageFilename + "')";
    logo.style.backgroundImage = "url('../assets/images/" + randomImageFilename + "')";
})();
