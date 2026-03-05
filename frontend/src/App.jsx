import Aside from "./components/asise";
import Navbar from "./components/Navbar"
import "./styles/main.scss";
import MainContainer from "./components/MainContainer";
import Player from "./components/Player";
import { useContext, useEffect } from "react";
import { context } from "./Context";
import axios from 'axios';

const App = () => {

  const { expression, setSong, setLoading } = useContext(context);

  useEffect(() => {
    setLoading(true);
    axios.get(import.meta.env['VITE_BACKEND_ENDPOINT'] + '/api/song/?mood=' + expression, { withCredentials: true })
      .then((res) => {
        setSong(res.data.song);
        console.log(res);
      });
    setLoading(false);
  }, [expression]);

  return (
    <main>
      <Navbar />
      <div className="flex">
        <Aside />
        <MainContainer />
      </div>
      <Player />
    </main>
  )
}

export default App