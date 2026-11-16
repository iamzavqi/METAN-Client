import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", {
  state: () => ({
    url: "http://localhost:4000/api",
    socketUrl: "http://localhost:4000",
    socketPath: "/api/socket.io",
  }),
});

// http://localhost:4000/api
// https://uy.gazify.uz/api