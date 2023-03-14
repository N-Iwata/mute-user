chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (
    info.status === "complete" &&
    (tab.url.indexOf("https://zenn.dev/") !== -1 ||
      tab.url.indexOf("https://qiita.com/") !== -1)
  ) {
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["scripts/content.js"],
      });
    }, 100);
  }
});
