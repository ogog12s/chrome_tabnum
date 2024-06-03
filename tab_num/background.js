function updateAllTabTitles() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      const pureTitle = tab.title.replace(/^\d+:/, '');
      const newTitle = `${tab.index + 1}: ${pureTitle}`;

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: updateTabTitle,
        args: [newTitle]
      });
    });
  });
}

function updateTabTitle(title) {
  document.title = title;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabIndex") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const index = tabs.findIndex(t => t.id === sender.tab.id);
      sendResponse({ index: index + 1 });
    });
    return true;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    updateAllTabTitles();
    sendResponse({ status: "ok" });
  }
});

chrome.tabs.onRemoved.addListener(() => {
  updateAllTabTitles();
});
