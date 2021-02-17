const data = []; // only table data
let map = new Map(); // from sortedData to Chart objects

const updateMap = () => { 
    map.clear(); 
    data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Сортировка по датам для корректного рендера графика
    data.forEach((item, index, array) => { 
        const filtered = array.filter(({tool}) => tool === item.tool); 

        const maps = filtered.map(({ date, price }) => ({ 
            x: date, 
            y: price, 
        })) 
 
        map.set(item.tool, maps) 
    }); 
} 
 
const onChangeCell = (id, cellName) => {  
    const cellText = document.getElementById(`${cellName}-cell-${id}`).innerText;  
    const index = data.findIndex(row => row.id === id);  
  
    if (index !== -1) {  
        data[index][cellName] = cellText;  
    }  
    updateMap(); 
    updateChart(); 
}; 

let cells = document.getElementById('cells') 

let renderItems = (arrayOfData) => {  
    cells.innerHTML = '';  
  
    arrayOfData.map(el => {  
        let row = document.createElement('div');  
        row.className = 'row';  
        row.innerHTML = `  
            <div class="row-info">${el.id}</div>  
                <div class="row-data">  
                    <div id="date-cell-${el.id}" class="cell" contenteditable="true" oninput="onChangeCell(${el.id}, 'date')">${el.date}</div>  
                    <div id="tool-cell-${el.id}" class="cell" contenteditable="true" oninput="onChangeCell(${el.id}, 'tool')">${el.tool}</div>  
                    <div id="price-cell-${el.id}" class="cell" contenteditable="true" oninput="onChangeCell(${el.id}, 'price')">${el.price}</div>  
                </div>  
        `;  
  
        cells.append(row);  
    })     
}  
 
let inputDate = document.getElementById('inputDate'); 
let inputTool = document.getElementById('inputTool'); 
let inputPrice = document.getElementById('inputPrice'); 
 
let newItem = (date, tool, price = '') => { // add new item to table
    data.push({ 
        id: data.length+1, 
        date: inputDate.value, 
        tool: inputTool.value, 
        price: inputPrice.value 
    }) 
    
    renderItems(data); 
    closeModal(); 
    updateMap(); 
    updateChart(); 
    inputDate.value = ''; 
    inputTool.value = ''; 
    inputPrice.value = ''; 
} 
 
/* chart */

let ctx = document.getElementById('myChart').getContext('2d'); 
ctx.canvas.width = 600; 
ctx.canvas.height = 300; 
 
let objects = []; 
let newDatas = map.forEach((value, key) => { 
    objects.push({ 
        label: [key], 
        data: value 
    }); 
}) 
 
let config = { 
    type: 'line', 
    data: { 
        datasets: [...objects], 
    }, 
    options: { 
        scales: { 
            xAxes: [{ 
                type: 'time', 
                time: { 
                    unit: 'year' 
                } 
            }] 
        } 
    } 
}; 

var chart = new Chart(ctx, config); 
 
let updateChart = () => { 
  objects = [] 
        newDatas = map.forEach((value, key) => { 
            objects.push({ 
                label: [key], 
                data: value, 
            }); 
        }) 
        chart.data.datasets = [...objects]; 
        chart.update(); 
} 
 
/* modal */

let modal = document.getElementById('modal'); 
let btn = document.getElementById('btn_modal_window'); 
let close = document.getElementById('close_modal_window'); 
 
let closeModal = () => { 
    modal.style.display = 'none'; 
} 
 
btn.onclick = function () { 
    modal.style.display = 'flex'; 
} 
 
close.onclick = function(){ 
    closeModal(); 
} 
 
window.onclick = function(e){ 
    if(e.target == modal){ 
        closeModal(); 
    } 
} 