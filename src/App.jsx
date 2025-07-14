import { useState } from "react";
import Navbar from "./components/Navbar";
import RoutersApp from "./routers/RoutersApp";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState("bright");
  return (
<div className={`${theme} h-full w-full transition-colors duration-700 ease-in-out`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <RoutersApp/>
      <Footer/>
    </div>
  );
}
export default App;
