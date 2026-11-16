import { ref, onBeforeUnmount } from "vue";
import { io, type Socket } from "socket.io-client";
import { useUrlStore } from "~/stores/url";

let socket: Socket | null = null;
const connected = ref(false);
const onlineUsers = ref<string[]>([]);

export const useSocket = () => {
  const urlStore = useUrlStore();
  const token = useCookie("financeToken");

  const connect = () => {
    if (socket) return socket;
    socket = io(urlStore.socketUrl, {
      path: urlStore.socketPath,
      auth: {
        token: token.value,
      },
    });

		socket.on("connect", () => {connected.value = true;});
		socket.on("disconnect", () => {connected.value = false;});
		socket.on("connect_error", async (err) => {
			console.error("Socket xatosi:", err.message);
			if (err.message === "User is not authorized") {
				disconnect();
				await navigateTo("/auth");
			}
		})
		socket.on("onlineUsers", (ids: string[])=> {
			onlineUsers.value = ids;
		})
		return socket;
  };

	const disconnect = () => {
		socket?.disconnect();
		socket = null;
		connected.value = false;
		onlineUsers.value = [];
	}

	// Hodisani tinglash uchun yordamchi funksiya
	const on = (event: string, handler: (...args: any[])=> void) => {
		if (import.meta.server) return;
		const s = connect();
		s.on(event, handler);
		onBeforeUnmount(() => s.off(event, handler));
	}

	const emit = (event: string, ...args: any[]) => {
		connect().emit(event, ...args);
	}

	return {connect, connected, on, emit, disconnect, onlineUsers}
};
