import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/post";

const Todos = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchPosts,
    refetchInterval: 5000, // 5 seconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default Todos;
