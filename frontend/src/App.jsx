import Aside from "./components/asise";
import Navbar from "./components/Navbar"
import "./styles/main.scss";
import MainContainer from "./components/MainContainer";

const App = () => {

  return (
    <main>
      <Navbar />
      <div className="flex">
        <Aside />
        <MainContainer />
      </div>
    </main>
  )
}

export default App