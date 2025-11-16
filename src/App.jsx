import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const response = await data.json();
  return response;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
};

export default App;

function Todos() {
  // Queries
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getter,
    refetchInterval: 5 * 1000,
  });
  console.log("Query Query : ", query);

  const { data, isLoading, isError } = query;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return data.map((item) => {
    return <div key={item.id}>{item.title}</div>;
  });
}
