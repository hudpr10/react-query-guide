import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) throw new Error("Error fetching data.");

  return response.json();
};

function PostById({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id], // Cada query key é completamente única
    queryFn: () => fetchPosts(id), // Passando um ID para a função
    staleTime: 10000, // 10000ms = 10 segundos
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occured: {error.message}</p>}

      {<p>{data?.title}</p>}
    </>
  );
}

export default PostById;
