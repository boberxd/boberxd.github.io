class ColorItem { 
    constructor(color){
        this.color = color;
    }
}

let yellow = '#ffc972';
let orange = '#ff9b73';
let purple = '#b692fe';
let blue = '#30dcff';
let green = '#e4ee90';

let colorList = [
    new ColorItem(yellow),
    new ColorItem(orange),
    new ColorItem(purple),
    new ColorItem(blue),
    new ColorItem(green)
]

let menuColors = document.querySelector('.todo__menu-colors')
let showColors = false;

let addTodo = document.querySelector('.todo__menu-add');
let notes = document.querySelector('.notes')


let todoList = []

var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
let d = new Date();

const displayColors = () => {
    const colorItem = document.querySelector('.colors__item');

    let colorHTML = `
        <div class="colors__item"></div>
    `
    colorList.forEach(function(item){
        menuColors.innerHTML += colorHTML;
    })
}

displayColors();
const colorItems = document.getElementsByClassName('colors__item'); // Get array of colorItems

colorList.forEach(function(color, index){
    colorItems[index].style.backgroundColor = color.color;
    colorItems[index].addEventListener('click', function(){
        let newTodo = {
            color: color.color,
            editable: false,
            text: 'Default text',
            date: `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()<10?'0':'' + d.getMinutes()}`
        }
        todoList.push(newTodo);
        displayMessages();

        localStorage.setItem('todo', JSON.stringify(todoList))
    })
})

addTodo.addEventListener('click', function(){
    showColors ? menuColors.style.display = 'none' : menuColors.style.display = 'flex';
    showColors = !showColors;
})  

const displayMessages = () => { // add Todo to TodoList
    let displayMessage = ''

    todoList.forEach(function(item, index){
        displayMessage += `
        <div class="notes__item" id="${index}" style="background-color: ${item.color}">
            <div class="item__text" contentEditable="${item.editable}">${item.text}</div>
                <div class="item-footer">
                    <div class="item__date">${item.date}</div>
                    <div class="item__edit">
                    ${item.editable ? `
                    <svg class="item__edit-pencil">
                            <use xlink:href="#save"></use>
                        </svg>
                    ` : `
                    <svg class="item__edit-pencil">
                            <use xlink:href="#pencil"></use>
                        </svg>
                    `}

                    </div>
                </div>
            </div>
        </div>
        `
        notes.innerHTML = displayMessage;
    })
    // Add eventListener to the edit button (Turn on/off editing text)
    let itemsEdit = document.getElementsByClassName('item__edit');
    let editables = document.getElementsByClassName('item__text');

    todoList.forEach(function(item, index){
        itemsEdit[index].addEventListener('click', editTodo)
    })

}

// Function of turn off/on editing text
const editTodo = (e) => {
    editables = document.getElementsByClassName('item__text');
    let itemEditId = +e.currentTarget.parentNode.parentNode.id;
    let todoItem = e.currentTarget.parentNode.parentNode;

    todoList.forEach(function(item, index){
        if(itemEditId === index){
            item.text = editables[index].innerHTML;

            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages();
        }
    })

    todoList.forEach(function(item, index){
        
        if(itemEditId === index){
            item.editable = !item.editable;

            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages();
        }
    })
}

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

