import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import PostById from "./components/PostById";
import CreatePost from "./components/CreatePost/index.jsx";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  return (
    <>
      <button onClick={() => setIsMounted((prev) => !prev)}>Toggle</button>
      {isMounted && <Posts />}
      {/* <PostById id={100} /> */}
      <CreatePost />
    </>
  );
}

export default App;
