const todo = TD('#todoList', [], { save: true });
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function (event) {
  event.preventDefault();

  const title = document.getElementById('title');
  if (!title) return;
  todo.add(title.value);
  title.value = '';
});

window.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();
  if (e.target.classList.contains('delete-todo')) {
    console.log(e.target.dataset.title);
    todo.remove(e.target.dataset.title);
  }
});
