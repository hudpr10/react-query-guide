import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const createPost = async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState("");

  // Da acesso ao query client
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidando a query feita no outro componente para realizar uma nova requisição
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);

      // Mudando os dados da query de maneira manual
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueriesData(["posts"], (old) => [
        ...old,
        { id: Date.now(), ...newPost },
      ]);

      // Insere um post novo para o cliente, mas o servidor não recebe ele
      // Rápido feedback para o usuário caso a mudança ocorra com sucesso ou não
      return { previousPosts };
    },
    onError: (erro, newPost, context) => {
      // Voltando para o estado anterior caso o post não consiga ser enviado
      queryClient.setQueriesData(["posts"], context.previousPosts);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Executa a mutação, o mesmo vale para delete e update
    mutate({ title, body: "This is a new post!" });
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Post title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={handleSubmit}>Create</button>
      </form>
    </>
  );
};

export default CreatePost;
