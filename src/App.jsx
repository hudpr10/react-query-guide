import "./App.css";

import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) throw new Error("Error fetching data.");

  return response.json();
};

function App() {
  // Não substitui o AXIOS ou a FETCH_API, ele cuida do pós
  // Pós = Loading state, error state, sincroniza os dados, caching
  const { data } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  return (
    <>
      {data?.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
    </>
  );
}

export default App;
