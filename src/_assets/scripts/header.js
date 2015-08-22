(function() {
    /* Returns a random integer between min and max
     * @param {number} min
     * @param {number} max
     * @return {number} Random integer between min and max
     */
    var randomIntBetween = function randomIntBetween(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    /* Returns a random element from array
     * @param {Object[]} array
     * @return {Object} Random element from array
     */
    var randomArrayElement = function randomArrayElement(array) {
        return array[randomIntBetween(0, array.length-1)];
    };

    /* Returns if the browser is webkit-based
     * @return {boolean} Is webkit-based browser
     */
    var isWebKit = function isWebKit() {
        return 'WebkitAppearance' in document.documentElement.style;
    };

    /* Applies a class modifier to element
     * @param {Object} element
     * @param {string} baseClass
     * @param {string} modifier
     */
    var applyClassModifier = function applyClassModifier(element, baseClass, modifier) {
        element.className += ' ' + baseClass + '--' + modifier;
    };

    // The classname of the random background styles
    var baseClassName = 'random-bg';

    // List of class modifiers
    var modifiers = ['flowers', 'forest', 'mountain', 'valley'];

    // Query the DOM for the elements
    var header = document.querySelector('.header');
    var headerLogo = document.querySelector('.header__logo');
    var headerLogoSpan = document.querySelector('.header__logo span');

    // Calculate the random image to be loaded
    var randomModifier = randomArrayElement(modifiers);

    // Apply the random class modifier to load a background image
    applyClassModifier(header, baseClassName, randomModifier);
    if(isWebKit) {
        headerLogo.style.backgroundColor = '#fff';
        applyClassModifier(headerLogoSpan, baseClassName, randomModifier);
    }
})();
