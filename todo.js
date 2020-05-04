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

    // Removing item
    remove: function (title) {
      if (!title) {
        throw 'A proper title should be provided';
      }

      const index = todoList.indexOf(title);

      if (index === -1) {
        throw 'Such item does not exist';
      }

      // Removing item from the list
      todoList.splice(index, 1);
      // Removing item from the DOM
      container.querySelectorAll('li')[index].remove();
      // We should also save updated list
      this.save();
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
        li.innerHTML = `
          <div class="row">
            <div class="col-md-11 col-sm-10">${todoList[i]}</div>
            <div class="col-md-1 col-sm-2">
              <button type="button" class="btn btn-warning delete-todo" data-title="${todoList[i]}">delete</button>
            </div>
          </div>

        `;
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
