import { useAccount, useBalance } from "wagmi";

const MyAddress = ({ theme, current }) => {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "20px",
        borderRadius: "10px",
        border: `1px solid ${current.border}`,
        background: current.inputBg,
        color: current.text,
        transition: "all 0.3s ease",
        boxShadow:
          theme === "light"
            ? "0 4px 15px rgba(0,0,0,0.08)"
            : "0 4px 15px rgba(255,255,255,0.15)",
        wordBreak: "break-all",
      }}
    >
      <h3
        style={{
          marginBottom: "18px",
          fontSize: "1.15rem",
          fontWeight: "600",
          textAlign: "left",
        }}
      >
        Wallet Details
      </h3>

      {/* Not Connected */}
      {!isConnected ? (
        <p
          style={{
            color: current.text,
            opacity: 0.6,
            fontStyle: "italic",
          }}
        >
          Wallet not connected
        </p>
      ) : (
        <>
          {/* Address */}
          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label
              style={{
                fontSize: "0.9rem",
                opacity: 0.7,
              }}
            >
              Address
            </label>

            <p
              style={{
                marginTop: "6px",
                fontSize: "0.95rem",
                padding: "10px",
                borderRadius: "8px",
                border: `1px solid ${current.border}`,
                background: theme === "light" ? "#fafafa" : "#111",
                transition: "all 0.3s ease",
              }}
            >
              {address}
            </p>
          </div>

          {/* Balance */}
          <div>
            <label
              style={{
                fontSize: "0.9rem",
                opacity: 0.7,
              }}
            >
              Balance
            </label>

            <div
              style={{
                marginTop: "6px",
                padding: "10px",
                borderRadius: "8px",
                border: `1px solid ${current.border}`,
                background: theme === "light" ? "#fafafa" : "#111",
                transition: "all 0.3s ease",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <span style={{ opacity: 0.5 }}>Loading...</span>
              ) : (
                <>
                  <span style={{ fontSize: "0.95rem" }}>
                    {parseFloat(balance?.formatted).toFixed(4)}
                  </span>

                  <span
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.7,
                    }}
                  >
                    {balance?.symbol}
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAddress;
