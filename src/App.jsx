import { useState } from "react";
import { colors } from "./styles/colors";
import { http, createConfig, WagmiProvider } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SendEthereum from "./components/SendEthereum";
import WalletConnector from "./components/WalletConnector";
import MyAddress from "./components/MyAddress";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

const App = () => {
  const [theme, setTheme] = useState("light");

  const current = colors[theme];

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <SendEthereum theme={theme} setTheme={setTheme} current={current} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
