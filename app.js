const todo = TD('#todoList', [], { save: true });
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function (event) {
  event.preventDefault();

  const title = document.getElementById('title');
  if (!title) return;
  todo.add(title.value);
  title.value = '';
});
