
var counter = 0;

setInterval(function(){
  chrome.browserAction.setBadgeText({text: ++counter + ""})

  var views = chrome.extension.getViews({type: 'popup'})[0];

  if(views)  views.addContent( counter )

}, 60000)