import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const getBalance = async (address) => {
  console.log("Fetching balance...");
  const balance = await client.getBalance({ address });
  console.log(`Balance of ${address}:`, balance);
  return balance;
};

const FetchBalance = () => {
  const query = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance("0xbd9FAF5BCd6E0c46A61628039271c094238F31a9"),
    refetchInterval: 3000, // 3 seconds
  });

  console.log("Query data:", query.data);

  return (
    <div style={{ padding: "20px" }}>
      {query.isLoading && <div>Loading balance...</div>}
      {query.error && <div>Error: {query.error.message}</div>}
      {query.data && <div>Balance: {query.data.toString()}</div>}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchBalance />
    </QueryClientProvider>
  );
};

export default App;
