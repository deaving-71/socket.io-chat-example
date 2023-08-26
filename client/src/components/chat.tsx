import React, { useEffect, useRef, useState } from "react";
import { TMessage, TMessages } from "../types";
import Messages from "./messages";
import { ConnectionManager } from "./connect-manager";
import { socket } from "../socket";
import { useUserContext } from "../context/user-context";

const green = "rgb(34,97,94)";
const red = "rgb(239,68,68)";

const status = {
  on: {
    backgroundColor: green,
  },
  off: {
    backgroundColor: red,
  },
};

const randomId = () => Math.random().toString(16).split(".")[1];

export default function Chat() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isConnected, clearChat, disconnect, username } = useUserContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

  function sendMessage(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    if (
      !inputRef ||
      !inputRef.current ||
      !username ||
      inputRef.current.value.length === 0
    )
      return;
    const message: TMessage = {
      id: randomId(),
      content: inputRef.current.value,
      user: username,
    };
    socket.emit("send-message", message);
    inputRef.current.value = "";
    setIsLoading(false);
  }

  return (
    <div className="h-[100dvh] bg-[rgb(15,15,15)] text-zinc-200 p-4 grid grid-rows-[auto,1fr,auto]">
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center"
          style={{ color: isConnected ? green : red }}
        >
          <span
            style={status[isConnected ? "on" : "off"]}
            className="w-2 h-2 inline-block rounded-full mr-2"
          />
          {isConnected ? (
            <span>
              connected <span className="text-zinc-200">as {username}</span>
            </span>
          ) : (
            "disconnected"
          )}
        </div>
        <div>
          <button className="block" onClick={disconnect}>
            disconnect
          </button>
          <button className="block" onClick={clearChat}>
            clear chat
          </button>
        </div>
      </div>
      <Messages />
      <form className="flex items-center" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          name="chat-message"
          id="chat-message"
          className="px-4 h-10 py-2 w-full rounded-l-md outline-none text-[rgb(30,30,30)]"
          autoComplete="off"
          ref={inputRef}
        />
        <button
          className="px-4 h-10 py-1 rounded-r-md bg-blue-700 text-zinc-200 disabled:bg-blue-400"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
