chrome.runtime.sendMessage({ action: "getTabIndex" }, (response) => {
  if (response && response.index) {
    document.title = response.index + ': ' + document.title;
  }
});
