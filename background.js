// Define the default hours during which the website should be blocked.
let startHour = 16; // 10pm
let endHour = 6; // 6am

// Define the default maximum number of tabs that are allowed.
let maxTabs = 5;

// Define the default restricted domain.
let restrictedDomain = "stackoverflow.com";

// Retrieve the user-defined settings from Chrome's storage API.
// chrome.storage.sync.get(["startHour", "endHour", "maxTabs", "restrictedDomain"], function(items) {
//   if (items.startHour) {
//     startHour = items.startHour;
//     console.log("startHour: ", startHour)
//   }

//   if (items.endHour) {
//     endHour = items.endHour;
//     console.log("endHour: ", endHour)
//   }

//   if (items.maxTabs) {
//     maxTabs = items.maxTabs;
//     console.log("maxTabs: ", maxTabs)
//   }

//   if (items.restrictedDomain) {
//     restrictedDomain = items.restrictedDomain;
//     console.log("restrictedDomain: ", restrictedDomain)
//   }
// });

// Track the number of open tabs for the restricted domain.
let numRestrictedTabs = 0;

// Listen for tabs being created or updated.
chrome.tabs.onUpdated.addListener(handleTabUpdate);
chrome.tabs.onCreated.addListener(handleTabUpdate);

function handleTabUpdate(tabId, changeInfo, tab) {
  console.log("numRestrictedTabs:", numRestrictedTabs);

  // Retrieve the user-defined settings from Chrome's storage API.
  chrome.storage.sync.get(["startHour", "endHour", "maxTabs", "restrictedDomain"], function(items) {
    if (items.startHour) {
      startHour = items.startHour;
      console.log("startHour: ", startHour)
    }

    if (items.endHour) {
      endHour = items.endHour;
      console.log("endHour: ", endHour)
    }

    if (items.maxTabs) {
      maxTabs = items.maxTabs;
      console.log("maxTabs: ", maxTabs)
    }

    if (items.restrictedDomain) {
      restrictedDomain = items.restrictedDomain;
      console.log("restrictedDomain: ", restrictedDomain)
    }
  });

  // Check if the updated/created tab is for the restricted domain.
  const isRestrictedTab = tab && tab.url && tab.url.indexOf(restrictedDomain) > -1;

  // If the tab is for the restricted domain, increment/decrement the tab count.
  if (isRestrictedTab) {
    if (changeInfo.status === "loading") {
      numRestrictedTabs++;
    } // else if (changeInfo.status === "complete") {
    //   numRestrictedTabs--;
    // }
  }

  // If there are too many open tabs for the restricted domain and it's during restricted hours,
  // block the tab from loading and display a message.
  if (numRestrictedTabs > maxTabs && isRestrictedTime() && isRestrictedTab) {
    chrome.tabs.update(tabId, { url: "blocked.html" });
  }
}

function isRestrictedTime() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= startHour || hour < endHour;
}
