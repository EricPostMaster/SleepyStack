// Retrieve the saved settings from the storage API and display them in the UI
chrome.storage.sync.get(["startHour", "endHour", "maxTabs", "restrictedDomain"], function (settings) {
    document.getElementById("startHour").value = settings.startHour || 18;
    document.getElementById("endHour").value = settings.endHour || 6;
    document.getElementById("maxTabs").value = settings.maxTabs || 5;
    document.getElementById("restrictedDomain").value = settings.restrictedDomain || "stackoverflow.com";
  });
  
  // Save the updated settings when the "Save" button is clicked
  document.getElementById("saveButton").addEventListener("click", function () {
    const startHour = parseInt(document.getElementById("startHour").value);
    const endHour = parseInt(document.getElementById("endHour").value);
    const maxTabs = parseInt(document.getElementById("maxTabs").value);
    const restrictedDomain = document.getElementById("restrictedDomain").value;
  
    // Validate the input values
    // if (isNaN(startHour) || isNaN(endHour) || isNaN(maxTabs)) {
    //   alert("Please enter valid numeric values for the start hour, end hour, and max tabs.");
    //   return;
    // }
  
    if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
      alert("Please enter valid values between 0 and 23 for the start hour and end hour.");
      return;
    }
  
    if (maxTabs < 1) {
      alert("Please enter a value greater than 0 for the maximum number of tabs.");
      return;
    }
  
    // Save the updated settings to the storage API
    chrome.storage.sync.set({ startHour, endHour, maxTabs, restrictedDomain }, function () {
      alert("Settings saved!");
    });
    console.log(startHour, endHour, maxTabs, restrictedDomain)
  });
  



// chrome.storage.sync.get(['startHour', 'endHour', 'maxTabs', 'restrictedDomain'], function(result) {
//     document.getElementById('start-time').value = result.startHour;
//     document.getElementById('end-time').value = result.endHour;
//     document.getElementById('max-tabs').value = result.maxTabs;
//     document.getElementById('restricted-domain').value = result.restrictedDomain;
// });

// document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const startHour = parseInt(document.getElementById('start-time').value);
//     const endHour = parseInt(document.getElementById('end-time').value);
//     const maxTabs = parseInt(document.getElementById('max-tabs').value);
//     const restrictedDomain = document.getElementById('restricted-domain').value;
//     chrome.storage.sync.set({ startHour, endHour, maxTabs, restrictedDomain });
// });