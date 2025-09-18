import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) throw new Error("Error fetching data.");

  return response.json();
};

function Posts() {
  // Não substitui o AXIOS ou a FETCH_API, ele cuida do pós
  // Pós = Loading state, error state, sincroniza os dados, caching
  // Melhor do que useEffect para fetching

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000, // 10000ms = 10 segundos
  });
  // StaleTime = Ele utiliza os dados armazenados no cache, caso uma nova requisão for feita dentro do tempo setado
  // Faz cache automatico da resposta o que evita conexões desnecessárias

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occured: {error.message}</p>}

      {data?.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
    </>
  );
}

export default Posts;
