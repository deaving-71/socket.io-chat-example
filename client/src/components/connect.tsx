import React, { useRef } from "react";
import { useUserContext } from "../context/user-context";

export default function Connect() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerUser, connect } = useUserContext();

  function handleOnConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!inputRef || !inputRef.current || inputRef.current.value.length < 0)
      return;
    const username = inputRef.current.value;
    registerUser(username);
    connect();
    console.log("trying to conenct");
  }

  return (
    <div className="h-[100dvh] bg-[rgb(15,15,15)] text-zinc-200 p-4">
      <form
        className="w-[300px] mx-auto mt-52"
        onSubmit={(e) => handleOnConnect(e)}
      >
        <input
          type="text"
          name="chat-message"
          id="chat-message"
          className="px-4 h-10 py-2 w-[200px] rounded-l-md outline-none text-[rgb(30,30,30)] placeholder:text-zinc-500"
          ref={inputRef}
          placeholder="Enter you username"
          autoComplete="off"
        />
        <button className="px-4 h-10 py-1 rounded-r-md bg-blue-700 hover:bg-blue-600 text-zinc-200 disabled:bg-blue-400 transition-all">
          Connect
        </button>
      </form>
    </div>
  );
}
