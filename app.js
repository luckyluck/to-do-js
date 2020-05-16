const todo = TD('#todoList', [], { save: true });
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function (event) {
  event.preventDefault();

  const title = document.getElementById('title');
  if (!title) return;
  todo.addItem(title.value);
  title.value = '';
});

window.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();

  if (e.target.classList.contains('delete-todo')) {
    console.log(e.target.dataset.title);
    todo.remove(e.target.dataset.title);
  }

  if (e.target.classList.contains('finish-todo')) {
    console.log(e.target.dataset.title);
    todo.deactivate(e.target.dataset.title);
  }
});
