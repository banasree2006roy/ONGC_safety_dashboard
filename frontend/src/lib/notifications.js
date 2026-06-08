// Simple in-memory notifications pub/sub for frontend demo
let _notifications = [];
const _listeners = new Set();

export function getNotifications() {
  return _notifications.slice();
}

export function pushNotification(n) {
  _notifications = [n, ..._notifications].slice(0, 200);
  _listeners.forEach((cb) => {
    try {
      cb(getNotifications());
    } catch (e) {
      // ignore
    }
  });
}

export function clearNotifications() {
  _notifications = [];
  _listeners.forEach((cb) => cb(getNotifications()));
}

export function subscribe(cb) {
  _listeners.add(cb);
  // send current
  cb(getNotifications());
  return () => _listeners.delete(cb);
}

export default {
  getNotifications,
  pushNotification,
  clearNotifications,
  subscribe,
};
