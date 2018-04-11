const syncStatus = (type, tabId) => {
  chrome.storage.sync.get([type], result => {
    chrome.tabs.executeScript(tabId, {
      code: 'removeCSS("'+ type +'")',
    });

    if (result[type] === 'SHOW') {
      chrome.tabs.executeScript(tabId, {
        code: 'insertCSS("'+ type +'")',
      });
    }
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.youtube.com' },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});

chrome.tabs.onCreated.addListener(tab => {
  const tabUrl = tab.url;
  const tabId = tab.id;

  if (tabUrl.indexOf("www.youtube.com") !== -1) {
    syncStatus('video', tabId);
    syncStatus('thumbnail', tabId);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const tabUrl = tab.url;
  const status = changeInfo.status;

  if (tabUrl.indexOf("www.youtube.com") !== -1 && status === 'loading') {
    syncStatus('video', tabId);
    syncStatus('thumbnail', tabId);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  const tabId = activeInfo.tabId;

  syncStatus('video', tabId);
  syncStatus('thumbnail', tabId);
});
