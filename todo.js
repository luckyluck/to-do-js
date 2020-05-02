;(function(global) {
  // 'new' an object
  const TD = function () {
    return new TD.init();
  };

  // prototype holds methods (to save memory space)
  TD.prototype = {};

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  TD.init = function () {};

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  TD.init.prototype = TD.prototype;

  // attach our TD to the global object, and provide a shortand '$G' for ease our poor fingers
  global.TD = TD;
}(window))
