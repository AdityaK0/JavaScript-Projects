

const showDateBtn = document.getElementById('reg');
const dateDisplay = document.getElementById('regid');
const colorToggleBtn = document.getElementById('color');
const body = document.getElementById('x');
const heading = document.getElementById('heading');
const message = document.getElementById('msg');
const newItemInput = document.getElementById('newItem');
const addItemBtn = document.getElementById('additem');
const deleteItemBtn = document.getElementById('deleteitem');
const itemList = document.getElementById('itemlist');
const itemCount = document.getElementById('itemcount');

let isDarkMode = false;
let items = [];

function applyInitialStyling() {
    body.style.padding = "20px";
    body.style.maxWidth = "800px";
    body.style.margin = "0 auto";
    body.style.transition = "background-color 0.3s, color 0.3s";
    
    document.querySelector('.bg-black').style.backgroundColor = "#f5f5f5";
    document.querySelector('.bg-black').style.padding = "15px";
    document.querySelector('.bg-black').style.borderRadius = "8px";
    document.querySelector('.bg-black').style.marginBottom = "20px";
    document.querySelector('.bg-black').style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    
    heading.style.fontSize = "24px";
    heading.style.margin = "0";
    
    dateDisplay.style.fontSize = "14px";
    dateDisplay.style.fontWeight = "normal";
    dateDisplay.style.padding = "12px";
    dateDisplay.style.marginTop = "10px";
    dateDisplay.style.borderRadius = "4px";
    dateDisplay.style.transition = "all 0.3s";
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.marginBottom = "20px";
    
    const buttonsParent = showDateBtn.parentNode;
    buttonsParent.insertBefore(buttonContainer, showDateBtn);
    buttonContainer.appendChild(showDateBtn);
    buttonContainer.appendChild(colorToggleBtn);
    
    const brElements = document.querySelectorAll('br');
    brElements.forEach(br => br.remove());
    
    const buttons = document.querySelectorAll('.delbtn');
    buttons.forEach(btn => {
        btn.style.transition = "all 0.2s";
        btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        btn.style.fontSize = "14px";
    });
    
    const inputContainer = document.createElement('div');
    inputContainer.style.display = "flex";
    inputContainer.style.gap = "10px";
    inputContainer.style.marginBottom = "30px";
    
    const inputParent = newItemInput.parentNode;
    inputParent.insertBefore(inputContainer, newItemInput);
    inputContainer.appendChild(newItemInput);
    inputContainer.appendChild(addItemBtn);
    inputContainer.appendChild(deleteItemBtn);
    
    newItemInput.style.flex = "1";
    newItemInput.style.padding = "10px 12px";
    newItemInput.style.fontSize = "16px";
    newItemInput.style.transition = "all 0.3s";
    newItemInput.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
    
    itemCount.style.fontWeight = "bold";
    itemCount.style.fontSize = "16px";
    
    const listHeading = document.querySelector('h1:not(#heading):not(#msg)');
    listHeading.style.fontSize = "20px";
    listHeading.style.marginTop = "10px";
    
    message.style.transition = "opacity 0.3s";
    message.style.opacity = "0";
    message.style.fontSize = "16px";
    message.style.color = "#4caf50";
    
    const hr = document.querySelector('hr');
    hr.style.border = "none";
    hr.style.height = "1px";
    hr.style.backgroundColor = "#e0e0e0";
    hr.style.margin = "20px 0";
}

applyInitialStyling();

window.addEventListener('DOMContentLoaded', () => {
    loadItemsFromLocalStorage();
    updateItemCount();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleDarkMode();
    }
});

showDateBtn.addEventListener('click', () => {
    const now = new Date();
    dateDisplay.textContent = `Current Date & Time: ${now.toLocaleString()}`;
    showMessage("Date updated!");
});

function showMessage(text) {
    message.textContent = text;
    message.style.opacity = "1";
    
    setTimeout(() => {
        message.style.opacity = "0";
    }, 2000);
}

colorToggleBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        body.style.backgroundColor = "#1a1a1a";
        body.style.color = "#ffffff";
        heading.style.color = "#ffffff";
        document.querySelector('.bg-black').style.backgroundColor = "#2a2a2a";
        colorToggleBtn.textContent = "Light Mode";
        
        newItemInput.style.backgroundColor = "#333";
        newItemInput.style.color = "#fff";
        newItemInput.style.borderColor = "#555";
        
        const buttons = document.querySelectorAll('.delbtn');
        buttons.forEach(btn => {
            btn.classList.remove('delbtn');
            btn.classList.add('revdelbtn');
            btn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        });
        
        document.querySelector('hr').style.backgroundColor = "#444";
        
        localStorage.setItem('theme', 'dark');
        showMessage("Dark mode activated!");
    } else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
        heading.style.color = "#000000";
        document.querySelector('.bg-black').style.backgroundColor = "#f5f5f5";
        colorToggleBtn.textContent = "Dark Mode";
        
        newItemInput.style.backgroundColor = "#ffffff";
        newItemInput.style.color = "#000000";
        newItemInput.style.borderColor = "#000000";
        
        const buttons = document.querySelectorAll('.revdelbtn');
        buttons.forEach(btn => {
            btn.classList.remove('revdelbtn');
            btn.classList.add('delbtn');
            btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        });
        
        document.querySelector('hr').style.backgroundColor = "#e0e0e0";
        
        localStorage.setItem('theme', 'light');
        showMessage("Light mode activated!");
    }
    
    renderItems();
}

addItemBtn.addEventListener('click', addItem);

function addItem() {
    const itemText = newItemInput.value.trim();
    
    if (itemText) {
        const newItem = {
            id: Date.now(),
            text: itemText,
            timestamp: new Date().toLocaleString()
        };
        
        renderItems();
        saveItemsToLocalStorage();
        
        newItemInput.value = '';
        showMessage("Item added successfully!");
        
        newItemInput.focus();
    } else {
        showMessage("Please enter an item!");
    }
}

newItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Delete the top item from the list
deleteItemBtn.addEventListener('click', () => {
    if (items.length > 0) {
        items.shift(); // Remove first item
        renderItems();
        saveItemsToLocalStorage();
        showMessage("Top item deleted!");
    } else {
        showMessage("No items to delete!");
    }
});

// Render all items in the list
function renderItems() {
    itemList.innerHTML = '';
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.style.listStyle = "none";
        li.style.padding = "15px";
        li.style.margin = "10px 0";
        li.style.borderRadius = "5px";
        li.style.transition = "all 0.3s";
        li.style.borderLeft = isDarkMode ? "3px solid #4f8af7" : "3px solid #ff7043";
        li.style.backgroundColor = isDarkMode ? "#333" : "#f9f9f9";
        li.style.boxShadow = isDarkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)";
        
        const itemContent = document.createElement('div');
        itemContent.style.display = "flex";
        itemContent.style.justifyContent = "space-between";
        itemContent.style.alignItems = "center";
        
        const textDiv = document.createElement('div');
        
        const itemTitle = document.createElement('div');
        itemTitle.textContent = item.text;
        itemTitle.style.fontSize = "16px";
        itemTitle.style.fontWeight = "bold";
        itemTitle.style.marginBottom = "5px";
        
        const itemTime = document.createElement('div');
        itemTime.textContent = `Added: ${item.timestamp}`;
        itemTime.style.fontSize = "12px";
        itemTime.style.opacity = "0.7";
        
        textDiv.appendChild(itemTitle);
        textDiv.appendChild(itemTime);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.className = isDarkMode ? "revdelbtn" : "delbtn";
        deleteBtn.style.padding = "6px 12px";
        deleteBtn.style.fontSize = "12px";
        deleteBtn.style.minWidth = "auto";
        
        deleteBtn.addEventListener('click', () => {
            deleteSpecificItem(item.id);
        });
        
        itemContent.appendChild(textDiv);
        itemContent.appendChild(deleteBtn);
        li.appendChild(itemContent);
        
        itemList.appendChild(li);
        
        // Add animation
        setTimeout(() => {
            li.style.opacity = "1";
            li.style.transform = "translateY(0)";
        }, 10);
        li.style.opacity = "0";
        li.style.transform = "translateY(-10px)";
    });
    
    updateItemCount();
}

// Delete a specific item by ID
function deleteSpecificItem(id) {
    items = items.filter(item => item.id !== id);
    renderItems();
    saveItemsToLocalStorage();
    showMessage("Item deleted!");
}

// Make this function available globally for event handlers
window.deleteSpecificItem = deleteSpecificItem;

// Update the item count display
function updateItemCount() {
    itemCount.textContent = `Total Items: ${items.length}`;
}

// Save items to local storage
function saveItemsToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Load items from local storage
function loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
        items = JSON.parse(storedItems);
        renderItems();
    }
}

