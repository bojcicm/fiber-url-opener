const urlMap = {
  google: "https://google.com/search?q=",
};

const searchForText = async (selectedText) => {
  // Try and retrieve their preferred search engine (if set)
  chrome.storage.sync.get(["url"], (result) => {
    let urlToOpen;
    // If the user has a preferred search engine
    if (result.url) {
      urlToOpen = `${result.url}${encodeURIComponent(selectedText)}`;
    } else {
      // Otherwise, fallback to Google
      urlToOpen = `${urlMap["google"]}${encodeURIComponent(selectedText)}`;
    }
    console.log(urlToOpen);

    // Create a new tab with the search URL and query based on their selected text
    chrome.tabs.create({
      url: urlToOpen,
    });
  });
};

chrome.runtime.onInstalled.addListener(async function () {
  // Create the context menu item on text selection only
  chrome.contextMenus.create({
    id: "search-text-selection",
    title: `Search for "%s"`,
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener(function (info) {
    const { menuItemId } = info;

    if (menuItemId === "search-text-selection" && info.selectionText) {
      console.log(info.selectionText);
      searchForText(info.selectionText);
    }
  });
});
