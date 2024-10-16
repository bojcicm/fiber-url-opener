
(function(){
  const saveBaseUrl = document.getElementById("url-input-button");
  const clearBaseUrl = document.getElementById("url-clear-button");
  const baseUrlInput = document.getElementById("url-input");

  chrome.storage.sync.get(['url'], function(result) {
    if (result.url) {
      setUrlDisplay(result.url);
    }
  });

  const setUrlDisplay = (url) => {
    baseUrlInput.value = url;
    baseUrlInput.disabled = true;
    saveBaseUrl.disabled = true;
    clearBaseUrl.disabled = false;
  }

  const clearUrlDisplay = () => {
    baseUrlInput.value = null;
    baseUrlInput.disabled = false;
    saveBaseUrl.disabled = false;
    clearBaseUrl.disabled = true;
  }

  saveBaseUrl.addEventListener("click", function (event) {
    event.preventDefault();
    const url = baseUrlInput.value;
    if (url) {
      chrome.storage.sync.set({url: url}, function() {
        setUrlDisplay(url);
      });
    }
  });

  clearBaseUrl.addEventListener("click", function (event) {
    chrome.storage.sync.remove("url", function() {
      clearUrlDisplay();
    });
  });

})();