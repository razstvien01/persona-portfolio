import { BrowserRouter } from "react-router-dom";
import {
  About,
  Experience,
  Feedbacks,
  Tech,
  Navbar,
  Contact,
  StarsCanvas,
  Works,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern">
          <Navbar/>
          <About/>
          <Experience/>
          <Tech/>
          <Works/>
          <Feedbacks/>
          <div className="relative z-0">
            <Contact/>
            <StarsCanvas/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
