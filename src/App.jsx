import React from "react";
import Todo_list from "./Components/Todo_list";
import ParticleBg from "./Components/ParticleBg";
import Maintenance from "./Components/maintenance";

function App() {
  return (
    <>
      <ParticleBg />
      <Todo_list />
      <Maintenance /> {/* maintanance mode */}
    </>
  );
}

export default App;
