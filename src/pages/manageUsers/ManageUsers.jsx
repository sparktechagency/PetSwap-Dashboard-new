import React, { useState } from "react";
import { useGlobalContext } from "../../utils/contextApi/GlobalContext";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
function ManageUsers() {
  const [userId, setUserId] = useState(null);
  const { activeScreen, setActiveScreen } = useGlobalContext();
  return <div>{activeScreen === 0 ? <Screen1 setUserId={setUserId} /> : <Screen2 userId={userId} />}</div>;
}

export default ManageUsers;
