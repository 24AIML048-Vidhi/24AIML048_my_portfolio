import React from "react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        textAlign: "center",
        color: "#f8fafc",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#ef4444", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h2>

      <p style={{ marginBottom: "20px", fontSize: "16px" }}>
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#2563eb";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#3b82f6";
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;