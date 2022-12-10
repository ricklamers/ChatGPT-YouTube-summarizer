var captions = "";
var transcriptEl = document.querySelectorAll("ytd-transcript-segment-renderer > div > yt-formatted-string");

if(transcriptEl.length > 0) {
    [].slice.call(document.querySelectorAll("ytd-transcript-segment-renderer > div > yt-formatted-string")).forEach(caption => captions += caption.textContent + " \n");
    chrome.runtime.sendMessage(filterText(captions));
} else {
    // Check if the page has youtube.com in the url
    if(window.location.href.indexOf("youtube.com") == 0) {
        alert("Make sure you are on YouTube.");
    }
    
    alert("Open transcript before summarizing.");
}
    
function filterText(str) {
    return str.replace(/[\t ]+/g, ' ').replace(/\n\n\n+/g, "\n\n").replace(/\d+:\d+/g, "");
}
