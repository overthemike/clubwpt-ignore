let ignoreList = [];

// Load and display the ignore list
function loadIgnoreList() {
    chrome.storage.sync.get(['ignoreList'], (result) => {
        ignoreList = result.ignoreList || [];
        displayIgnoreList();
    });
}

// Display the ignore list
function displayIgnoreList() {
    const listElement = document.getElementById('ignoreList');
    listElement.innerHTML = '';

    ignoreList.forEach(name => {
        const div = document.createElement('div');
        div.className = 'list-item';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = name;

        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✕';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeName(name);

        div.appendChild(nameSpan);
        div.appendChild(removeBtn);
        listElement.appendChild(div);
    });
}

// Add a name to the ignore list
function addName(name) {
    if (name && !ignoreList.includes(name)) {
        ignoreList.push(name);
        chrome.storage.sync.set({ ignoreList }, () => {
            displayIgnoreList();
            document.getElementById('nameInput').value = '';
        });
    }
}

// Remove a name from the ignore list
function removeName(name) {
    ignoreList = ignoreList.filter(n => n !== name);
    chrome.storage.sync.set({ ignoreList }, () => {
        displayIgnoreList();
    });
}

// Set up event listeners
document.getElementById('addBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    addName(name);
});

document.getElementById('nameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const name = e.target.value.trim();
        addName(name);
    }
});

// Initial load
loadIgnoreList();
