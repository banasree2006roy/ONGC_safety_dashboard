import React, { useEffect, useRef, useState } from "react";
import { getNotifications, pushNotification, clearNotifications, subscribe } from "../../lib/notifications";

const severityColors = {
  High: "#ff6600",
  Info: "#3366ff",
  Critical: "#ff0000",
  Normal: "#009900",
};

const sampleMessages = [
  { title: "Helmet Violation", severity: "High" },
  { title: "Left Gate Open", severity: "Info" },
  { title: "Gas Leak Detected", severity: "Critical" },
  { title: "Routine Check", severity: "Normal" },
];

const nowTime = () => new Date().toLocaleTimeString();

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(getNotifications());
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const unsub = subscribe((list) => setNotifications(list));
    return () => {
      unsub();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const addRandom = () => {
    const pick = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    pushNotification({ id: Date.now(), title: pick.title, severity: pick.severity, time: nowTime() });
  };

  const startLive = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      addRandom();
    }, 4000 + Math.floor(Math.random() * 3000));
  };

  const stopLive = () => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const clearAll = () => clearNotifications();

  const unread = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative px-3 py-2 bg-white text-red-700 rounded-md flex items-center gap-2 hover:shadow-lg transition"
        aria-label="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="font-semibold hidden md:inline">Alerts</span>
        {unread > 0 && (
          <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-red-600 rounded-full px-2 py-0.5">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white text-slate-900 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <strong>Notifications</strong>
            <div className="flex items-center gap-2">
              <button onClick={addRandom} className="text-sm px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">Add</button>
              {!running ? (
                <button onClick={startLive} className="text-sm px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600">Start Live</button>
              ) : (
                <button onClick={stopLive} className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">Stop</button>
              )}
              <button onClick={clearAll} className="text-sm px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">Clear</button>
            </div>
          </div>

          <div className="max-h-80 overflow-auto">
            {notifications.length === 0 && (
              <div className="p-4 text-sm text-slate-500">No notifications</div>
            )}
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 border-b">
                <div style={{ width: 12, height: 12, borderRadius: 6, background: severityColors[n.severity] || '#666' }} />
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-slate-400">{n.time}</div>
                  </div>
                  <div className="text-sm text-slate-600">Severity: <span style={{ color: severityColors[n.severity] }}>{n.severity}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
