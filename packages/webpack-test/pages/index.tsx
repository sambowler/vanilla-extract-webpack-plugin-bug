// Works
import { background } from "../index.css";
// Doesn't work
// import { background } from "../../shared/index.css";

const Home = () => {
  return <h1 className={background}>Hello world</h1>;
};

export default Home;
