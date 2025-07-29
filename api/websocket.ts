// services/websocket.ts
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Constants from "expo-constants";
import { logger } from "@/utils/logger";

let stompClient: Client | null = null;

const WS_URL = `http://192.168.1.42:8081/ws`;
export const connectWebSocket = (onReady: () => void) => {
  if (stompClient?.active) {
    logger.debug("WebSocket already active, skipping reconnect");
    return;
  }

  const socket = new SockJS(WS_URL);
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => logger.debug("WebSocket Debug", str),
    reconnectDelay: 5000,
    heartbeatIncoming: 10000, // expect to receive a heartbeat every 10s
    heartbeatOutgoing: 10000, // send a heartbeat every 10s
    onConnect: () => {
      logger.wsConnect(WS_URL);
      onReady(); // subscriptions go here
    },
    onDisconnect: () => {
      logger.wsDisconnect(WS_URL);
    },
    onStompError: (frame) => {
      logger.wsError(frame);
    },
    onWebSocketError: (error) => {
      logger.wsError(error);
    },
  });

  stompClient.activate();
};

/**
 * Subscribe to incoming messages for a user (chat messages)
 */
export const subscribeToMessages = (
  userId: string,
  onMessage: (msg: IMessage) => void
) => {
  if (!stompClient?.connected) return;
  const topic = `/topic/messages/${userId}`;
  logger.info("Subscribing to messages topic", { topic, userId });
  stompClient.subscribe(topic, (msg: IMessage) => {
    onMessage(msg);
  });
};

/**
 * Subscribe to seller topic
 */
export const subscribeToSeller = (
  sellerId: string,
  onMessage: (msg: IMessage) => void
) => {
  if (!stompClient?.connected) return;
  const topic = `/topic/requests/${sellerId}`;
  logger.info("Subscribing to seller topic", { topic, sellerId });
  stompClient.subscribe(topic, onMessage);
};

/**
 * Subscribe to buyer topic
 */
export const subscribeToBuyer = (
  buyerId: string,
  onMessage: (msg: IMessage) => void
) => {
  if (!stompClient?.connected) return;
  const topic = `/topic/request-status/${buyerId}`;
  logger.info("Subscribing to buyer topic", { topic, buyerId });
  stompClient.subscribe(topic, onMessage);
};

/**
 * Disconnect WebSocket client
 */
export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    logger.wsDisconnect(WS_URL);
    stompClient.deactivate();
  }
};

/**
 * Send chat message to destination via STOMP
 */
export const sendChatMessage = (chatMessage: {
  senderId: string;
  receiverId: string;
  content: string;
}) => {
  if (!stompClient?.connected) {
    logger.error("Cannot send message: WebSocket not connected");
    return;
  }

  const destination = "/app/chat.send";

  stompClient.publish({
    destination,
    body: JSON.stringify(chatMessage),
  });

  logger.info("Chat message sent", { destination, chatMessage });
};
