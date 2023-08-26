import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { TMessage, TMessages } from "../types";

type UserContext = {
  username: string | null;
  isConnected: boolean;
  messages: TMessages;
  registerUser: (username: string) => void;
  connect: () => void;
  disconnect: () => void;
  clearChat: () => void;
};

const UserContext = createContext<UserContext | null>(null);

function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(`useUserContext must be used within UserContextProvider`);
  return context;
}

type Props = {
  children: React.ReactNode;
};
function UserContextProvider({ children }: Props) {
  const [username, setUsername] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [messages, setMessages] = useState<TMessages>([]);

  const registerUser = (username: string) => setUsername(username);

  const clearChat = () => setMessages([]);
  const appendMessage = (message: TMessage) =>
    setMessages((prev) => [...prev, message]);

  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  useEffect(() => {
    if (isConnected) {
      socket.on("receive-message", appendMessage);
    }

    return () => {
      socket.off("receive-message");
    };
  }, [isConnected]);

  // when user leaves chat >>> remove event listeners
  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setUsername(null);
      setIsConnected(false);
      clearChat();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    console.log("ready...");
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        isConnected,
        messages,
        registerUser,
        connect,
        disconnect,
        clearChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, useUserContext };
