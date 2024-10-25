let ignoreList = [];

// Get the initial ignore list
chrome.storage.sync.get(['ignoreList'], (result) => {
    ignoreList = result.ignoreList || [];
});

// Listen for changes to the ignore list
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.ignoreList) {
        ignoreList = changes.ignoreList.newValue;
    }
});

// Create and observe chat area
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'SPAN' &&
                node.style.color === 'rgb(0, 0, 255)') {

                const text = node.innerHTML;
                const colonIndex = text.indexOf(':');

                if (colonIndex > -1) {
                    const name = text.substring(0, colonIndex);

                    if (ignoreList.includes(name)) {
                        node.remove();
                    }
                }
            }
        });
    });
});

// Start observing
const chatArea = document.getElementById('chatarea');
if (chatArea) {
    observer.observe(chatArea, {
        childList: true,
        subtree: true
    });
}
