let todoInput
let errorInfo
let addBtn
let ulList
let popup
let popupinfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupinfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closeToDo)
    popupAddBtn.addEventListener('click', changeToDoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
    if (todoInput.value !== '' ){
       newTodo = document.createElement('li')
       newTodo.textContent = todoInput.value
        createToolsArea(newTodo)

        ulList.append(newTodo)
       todoInput.value = ''
       errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'
    }
}

const createToolsArea = (newTodo) => {
    
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deletBtn = document.createElement('button')
    deletBtn.classList.add('delete')
    deletBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeBtn, editBtn, deletBtn)
}


const checkClick = e => {
    if(e.target.matches('.complete')){
        
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')){
        editToDo(e)
    } else if (e.target.matches('.delete')){
        deletToDo(e)
    }
}

const editToDo = (e) => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    
    popup.style.display = 'flex'
}

const closeToDo = () => {
    popup.style.display = 'none'
    popupinfo.textContent = ''
}

const changeToDoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value 
        popup.style.display = 'none'
        popupinfo.textContent = ''
    } else {
        popupinfo.textContent = 'Musisz podać treść!'
    }
}

const deletToDo = e => {
    e.target.closest('li').remove()

    const allToDos = ulList.querySelectorAll('li')
    if(allToDos.length === 0){
        errorInfo.textContent = 'brak zadań na liście'
    }
}

const enterKeyCheck = e => {
    if(e.key=== 'Enter') {
        addNewTodo();
    }
}




document.addEventListener('DOMContentLoaded', main)