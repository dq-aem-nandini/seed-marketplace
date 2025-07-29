import { Notification } from '@/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

// --- State Interface ---
interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  lastReadTimestamp: string | null;
}

// --- Initial State ---
const initialState: NotificationState = {
  notifications: [],
  loading: false,
  lastReadTimestamp: null,
};

// --- Slice ---
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      const exists = state.notifications.some(n => n.id === action.payload.id);
      if (!exists && !action.payload.isClear) {
        state.notifications = [action.payload, ...state.notifications];
      }
    },
    markAsRead(state, action: PayloadAction<number>) {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.isRead = true;
    },
    markAllAsRead(state) {
      state.notifications.forEach(n => (n.isRead = true));
      state.lastReadTimestamp = new Date().toISOString();
    },
    clearNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications(state) {
      state.notifications = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLastReadTimestamp(state, action: PayloadAction<string>) {
      state.lastReadTimestamp = action.payload;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotification,
  clearAllNotifications,
  setLoading,
  setLastReadTimestamp,
} = notificationSlice.actions;

export default notificationSlice.reducer;

// --- Selectors ---
export const selectAllNotifications = (state: RootState) =>
  state.notifications.notifications;

export const selectUnreadCount = (state: RootState) =>
  state.notifications.notifications.filter(n => !n.isRead).length;

export const selectUnclearedCount = (state: RootState) =>
  state.notifications.notifications.filter(n => !n.isClear).length;

export const selectLastReadTimestamp = (state: RootState) =>
  state.notifications.lastReadTimestamp;

export const selectNewNotificationsCount = (state: RootState) => {
  const lastRead = state.notifications.lastReadTimestamp;
  if (!lastRead) return state.notifications.notifications.length;

  return state.notifications.notifications.filter(n => {
    const notifTime = n.requestNotificationDto?.sendAt || n.createdAt;
    return notifTime && new Date(notifTime) > new Date(lastRead);
  }).length;
};
