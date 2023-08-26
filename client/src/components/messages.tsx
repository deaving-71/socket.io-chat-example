import { useUserContext } from "../context/user-context";

const color = {
  default: {
    backgroundColor: "rgb(70,70,70)",
    color: "white",
  },
  myMessage: {
    backgroundColor: "rgb(59,130,246)",
    color: "white",
  },
};
export default function Messages() {
  const { messages, username } = useUserContext();
  return (
    <ul className="pb-4 max-h-[calc(100dvh-32px)] overflow-y-auto pr-4">
      {messages.map(({ id, content, user }, idx) => (
        <li key={id + idx}>
          <div className="text-sm">{user}</div>
          <div
            className="rounded-md px-3 py-1"
            style={username === user ? color.myMessage : color.default}
          >
            {content}
          </div>
        </li>
      ))}
    </ul>
  );
}
