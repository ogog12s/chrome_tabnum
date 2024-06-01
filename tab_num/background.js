chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabIndex") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const index = tabs.findIndex(t => t.id === sender.tab.id);
      sendResponse({ index: index + 1 });
    });
    return true;
  }
});
