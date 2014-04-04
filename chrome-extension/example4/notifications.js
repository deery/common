var notification = webkitNotifications.createNotification(
  '16.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);

window.setTimeout(notification.show.bind(notification), 1000)
