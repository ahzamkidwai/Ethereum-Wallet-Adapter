import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import MyAddress from "./MyAddress";

const SendEthereum = ({ theme, setTheme, current }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.1");

  const { data: hash, sendTransaction, isPending } = useSendTransaction();

  const handleSendEthereum = () => {
    if (!to || !amount) return alert("Please fill all fields");

    sendTransaction({
      to,
      value: parseEther(amount),
    });
  };

  return (
    <div
      className="w-screen"
      style={{ background: current.background, color: current.text }}
    >
      <MyAddress theme={theme} current={current} />

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-5 right-5 border px-4 py-2 rounded-md transition"
        style={{ borderColor: current.text, color: current.text }}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      {/* Main Center Container */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <div
          className="p-6 rounded-xl shadow-lg w-full max-w-md transition"
          style={{
            background: current.inputBg,
            border: `1px solid ${current.border}`,
          }}
        >
          <h2 className="text-center font-semibold text-xl mb-4">Send ETH</h2>

          {/* Address Input */}
          <input
            type="text"
            placeholder="Recipient Address..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 rounded-md border text-base outline-none transition mb-4"
            style={{
              borderColor: current.border,
              background: current.inputBg,
              color: current.inputText,
            }}
          />

          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount (ETH)..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-md border text-base outline-none transition mb-4"
            style={{
              borderColor: current.border,
              background: current.inputBg,
              color: current.inputText,
            }}
          />

          {/* Send Button */}
          <button
            onClick={handleSendEthereum}
            disabled={isPending}
            className="w-full py-3 rounded-md font-medium transition hover:opacity-80 disabled:opacity-50"
            style={{
              background: current.buttonBg,
              color: current.buttonText,
            }}
          >
            {isPending ? "Sending..." : `Send ${amount} ETH`}
          </button>

          {/* Transaction Hash */}
          {hash && (
            <p className="mt-4 text-sm break-all">
              <strong>Transaction Hash:</strong> {hash}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEthereum;
