function addContent(abc) {
  $('#content').html('<div>' + abc + '</div>');
}


var bgPage = chrome.extension.getBackgroundPage();
document.write(bgPage.i + ' : value of i');
