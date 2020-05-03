;(function (global) {
  const todoList = [];
  let config = {
    save: false
  };
  let container;

  // 'new' an object
  const TD = function (containerSelector = '#list', titles = [], options = {}) {
    return new TD.init(containerSelector, titles, options);
  };

  // prototype holds methods (to save memory space)
  TD.prototype = {
    // Adding items on init if something was stored in localStorage
    mount: function () {
      const savedItems = JSON.parse(localStorage.getItem('myTodo') || '[]');
      if (savedItems.length > 0) {
        this.add(...savedItems);
      }
    },

    // Adding items/items
    add: function (...titles) {
      this.validate(titles);

      todoList.push(...titles);
      this.save();
      this.draw();
    },

    // If was configured, saving to localStorage
    save: function () {
      if (config.save) {
        localStorage.setItem('myTodo', JSON.stringify(todoList));
      }
    },

    // Adding items to the DOM
    draw: function () {
      const existingItems = document.querySelectorAll('.list-group-item');
      const fragment = document.createDocumentFragment();

      for (let i = existingItems.length; i < todoList.length; i++) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = todoList[i];
        fragment.appendChild(li);
      }

      container.appendChild(fragment);
    },

    // Checking if at least one item was provided
    validate: function (titles) {
      if (titles.length === 0) {
        throw 'Cannot add empty item';
      }
    }
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  TD.init = function (containerSelector, titles, options) {
    container = document.querySelector(containerSelector);
    if (!container) {
      throw 'TODO items container should be provided';
    }

    this.mount();

    config = {
      ...config,
      ...options
    };

    // If we have provided items on init
    // we should add them to the list
    if (titles.length > 0) {
      this.add(...titles);
    }
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  TD.init.prototype = TD.prototype;

  // attach our TD to the global object, and provide a shortand '$G' for ease our poor fingers
  global.TD = TD;
}(window));
