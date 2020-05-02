const todo = TD();
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function (event) {
  event.preventDefault();
  const title = document.getElementById('title');
  console.log(title.value);
});
