import { useUserContext } from "../context/user-context";
import Chat from "./chat";
import Connect from "./connect";

export default function Home() {
  const { isConnected } = useUserContext();

  return isConnected ? <Chat /> : <Connect />;
}
