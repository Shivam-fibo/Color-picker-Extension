let color = 'red';

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.syn.set({color})
})