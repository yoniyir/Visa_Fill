let currentState;
let data;
document.addEventListener('DOMContentLoaded', function () {
    fetch("data.json")
        .then(response => response.json())
        .then(json => data = json);
    var link = document.getElementById('myBtn');
    // onClick's logic below:
    link.addEventListener('click', function () {
        debugger;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data);
        });
    });
});



chrome.runtime.sendMessage({ type: "getState" }, function (active) {
    if (typeof active == "undefined") {
        // That's kind of bad
    } else {
        // Use active
        currentState = active;
    }

});