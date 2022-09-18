let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  console.log(todo);
  if(todo.deleted) {
    item.remove();
    return
  }

  const isChecked = todo.checked ? 'done' : '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
  <div class=""><input id = "${todo.id}" type="checkbox"/></div>
  <label for="${todo.id}" class="tick js-tick"></label>
  <span class ="todo-name">${todo.text}</span>
  <!-- <button class="todo-deleter js-delete-todo"> -->
    <img class=" li-img todo-deleter js-delete-todo " src="images/icon-cross.svg" alt="">
  <!-- </button> -->
 `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }

}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  console.log(todoItems);
  renderTodo(todo);
}

function deleteTodo(key){
  const index = todoItems.findIndex(item => item.id === Number(key));

  const todo = {
      deleted : true,
      ...todoItems[index]
  };

  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemkey = event.target.parentElement.dataset.key;
    toggleDone(itemkey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemkey = event.target.parentElement.dataset.key;
    deleteTodo(itemkey);
  }
})
