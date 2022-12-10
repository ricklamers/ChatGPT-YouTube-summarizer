var textArea = document.querySelectorAll("textarea")[0];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    textArea.value = message;
    document.querySelector("form button").click();
});