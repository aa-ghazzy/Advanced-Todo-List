
const todoList = document.querySelector('#list')
const form = document.querySelector('#new-todo-form')
const input = document.querySelector('#todo-input')
const template = document.querySelector('#list-item-template')
const localStoragePrefixKey = `Adv-todo`
const listItem = document.querySelector('.list-item')
let todos = loadTodos() // its either an empty array or an array the data object from local storage
todos.forEach(renderTodo)
// console.log(todos);
// const deleteTodo = document.querySelector('[data-button-delete]')

form.addEventListener('submit', e => {
    e.preventDefault()
    const todoName = {
        name: input.value,
        complete: false,
        id: new Date().valueOf().toString()
    } // todo's formula then PUSHED and passed to be rendered
    if (todoName.name === "") return
    todos.push(todoName)
    renderTodo(todoName)
    saveTodo()
    input.value = ''

})

function renderTodo(todo) {
    templateClone = template.content.cloneNode(true)
    // the todo updates its info here and then APPENDED as a template to the page
    const textElement = templateClone.querySelector('[data-list-item-text]')
    textElement.innerHTML = todo.name
    const todoLi = templateClone.querySelector('.list-item')
    todoLi.dataset.todoId = todo.id
    const checkbox = templateClone.querySelector('[data-list-item-checkbox]')
    checkbox.checked = todo.complete
    todoList.appendChild(templateClone)

}

function loadTodos() {
    const todoString = localStorage.getItem(localStoragePrefixKey)
    return JSON.parse(todoString) || []
}
function saveTodo() {
    localStorage.setItem(localStoragePrefixKey, JSON.stringify(todos))
}

todoList.addEventListener('change', e => {
    const target = e.target
    if (!target.matches('[data-list-item-checkbox]')) return
    const parentLi = target.closest('.list-item')
    const todoId = parentLi.dataset.todoId
    const todo = todos.find(t => t.id === todoId)
    todo.complete = target.checked
    saveTodo()

})

todoList.addEventListener('click', (e => {
    if (!e.target.matches('[data-button-delete]')) return
    const parentLi = e.target.closest('.list-item')
    const todoId = parentLi.dataset.todoId
    parentLi.remove()
    console.log(todos)
    todos = todos.filter(t => t.id !== todoId) // gathers other todos except the clicked element 
    saveTodo() //overwrites the todos in local storage

}))