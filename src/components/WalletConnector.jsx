import { useConnect } from "wagmi";

const WalletConnector = () => {
  const { connectors, connect } = useConnect();

  console.log("Available connectors:", connectors);

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
};

export default WalletConnector;
