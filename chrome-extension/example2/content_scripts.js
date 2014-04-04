var i = 0;

setInterval(function() {
  chrome.browserAction.setBadgeText({text: ++i + ''});
  // chrome.browserAction.setBadgeBackgroundColor({color: '#00f'});
  var popupView = chrome.extension.getViews({type: 'popup'})[0];

  if(popupView) {
    popupView.addContent('This is what i is : ' + i);
  }
}, 1000);