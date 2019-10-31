// console.log inserts space with multiple params
// splice vs slice (splice to delete)

function addTodo(todo) {
	todos.push(todo);
	displayTodos();
}

function displayTodos() {
	console.log('My todos:', todos);
}

function changeTodo(position, newValue) {
	todos[position] = newValue;
	displayTodos();
}

function deleteTodo(position) {
	todos.splice(position, 1);
	displayTodos();
}
