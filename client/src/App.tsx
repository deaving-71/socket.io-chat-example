import { UserContextProvider } from "./context/user-context";
import Home from "./components/home";

export default function App() {
  /*
  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  */
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  );
}
