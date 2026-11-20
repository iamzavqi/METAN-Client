import { ref, onBeforeUnmount, getCurrentInstance } from "vue";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "~/stores/auth";

let socket: Socket | null = null;
let socketToken: string | null = null; // socket qaysi token bilan ochilgan
const connected = ref(false);
const onlineUsers = ref<string[]>([]);

export const useSocket = () => {
  const urlStore = useUrlStore();
  const token = useCookie("financeToken");

  const disconnect = () => {
    socket?.disconnect();
    socket = null;
    socketToken = null;
    connected.value = false;
    onlineUsers.value = [];
  };

  const connect = () => {
    // Token yo'q: hech kim login qilmagan
    if (!token.value) {
      disconnect();
      return null;
    }

    // Shu token bilan allaqachon ulangan
    if (socket && socketToken === token.value) return socket;

    // Boshqa user kirgan: eski ulanishni yopamiz
    disconnect();

    socketToken = token.value;
    socket = io(urlStore.socketUrl, {
      path: urlStore.socketPath,
      auth: { token: token.value },
    });

    socket.on("connect", () => {
      connected.value = true;
    });
    socket.on("disconnect", () => {
      connected.value = false;
    });
    socket.on("connect_error", async (err) => {
      console.error("Socket xatosi:", err.message);
      if (err.message === "User is not authorized") {
        await useAuthStore().logout();
      }
    });
    socket.on("onlineUsers", (ids: string[]) => {
      onlineUsers.value = ids;
    });

    return socket;
  };

  // Hodisani tinglash. Komponent ichida bo'lsa o'zi tozalanadi
  const on = (event: string, handler: (...args: any[]) => void) => {
    if (import.meta.server) return () => {};
    const s = connect();
    if (!s) return () => {};

    s.on(event, handler);
    const off = () => s.off(event, handler);
    if (getCurrentInstance()) onBeforeUnmount(off);
    return off;
  };

  const emit = (event: string, ...args: any[]) => {
    connect()?.emit(event, ...args);
  };

  return { connect, connected, on, emit, disconnect, onlineUsers };
};