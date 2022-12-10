"use strict";

// Make sure the user is logged in
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({ url: "https://chat.openai.com/auth/login" });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);

    chrome.tabs.create({ url: "https://chat.openai.com/chat" }, function(tab) {
        // After the tab has been created, execute a script in the tab based on the file chatgpt.js
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                files: ["chatgpt.js"]
            },
            function() {
                setTimeout(() => {
                    // When the script has finished executing, send a message to the content script
                    chrome.tabs.sendMessage(tab.id, "Summarize this transcript (but don't mention it's based on a transcript): \n" + message, function(response) {
                        console.log(response);
                    }); 
                }, 500);
            }  
        );
    });

  });