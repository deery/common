
chrome.alarms.create('Default alarms', {
  // when : Date.now(),
  delayInMinutes: 1
})

chrome.alarms.onAlarm.addListener(function(alarm){
  console.log(alarm)
})