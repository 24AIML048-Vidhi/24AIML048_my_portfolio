import React from "react";

function Spinner() {
  return (
    <>
      <style>
        {`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 60vh;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #d1d5db;
            border-top: 5px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .loading-text {
            margin-top: 15px;
            font-size: 18px;
            color: #f8fafc;
            font-weight: 500;
          }
        `}
      </style>

      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </>
  );
}

export default Spinner;