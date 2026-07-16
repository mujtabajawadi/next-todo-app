"use client";

import { useEffect, useState, useCallback } from "react";

export function useNotifications() {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    const response = await fetch("/api/notifications");
    const data = await response.json();
    if (data.success) setNotifications(data.data);
  }, []);


  const markAsRead = useCallback(async (notificationId) => {

    setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    try {
        await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId }),
        });
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
  }, []);


  useEffect(() => {
    fetch("/api/notifications", { method: "POST" }).then(fetchNotifications);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount: notifications.length,
    markAsRead
    // loading,
    // refetch: fetchNotifications,
  };
}