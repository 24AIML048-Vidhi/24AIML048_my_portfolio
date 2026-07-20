import React, { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") {
      alert("Please write a message first.");
      return;
    }

    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(message);

    window.location.href = `mailto:vidhipatel1796@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
        }

        .contact-btn{
          transition: all .3s ease;
        }

        .contact-btn:hover{
          background:#8b5cf6;
          transform: translateY(-2px);
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: "#0b0f19",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 8%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "950px",
          }}
        >
          {/* CONTACT */}

          {/* Heading */}
          <h1
            style={{
              textAlign: "center",
              fontSize: "52px",
              margin: 0,
              fontWeight: "800",
            }}
          >
            <span className="gradient-text">Get In Touch</span>
          </h1>

          {/* Description */}
          <p
            style={{
              color: "#9ca3af",
              fontSize: "17px",
              lineHeight: "1.8",
              textAlign: "center",
              maxWidth: "780px",
              margin: "25px auto 40px",
            }}
          >
            I'm always open to internships, collaborations, hackathons,
            and exciting AI & Machine Learning opportunities. Feel free
            to send me a message or connect with me through the links
            below.
          </p>

          {/* Message */}
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <label
              style={{
                display: "block",
                color: "#c4b5fd",
                fontWeight: "600",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              Message
            </label>

            <textarea
              value={message}
              maxLength={100}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              style={{
                width: "100%",
                height: "110px",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#1e293b",
                color: "white",
                fontSize: "16px",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <p
              style={{
                color: "#9ca3af",
                fontSize: "14px",
                textAlign: "right",
                marginTop: "8px",
              }}
            >
              {message.length} / 100 characters
            </p>

            {/* Send Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "15px",
              }}
            >
              <button
                className="contact-btn"
                onClick={sendMessage}
                style={{
                  border: "2px solid #8b5cf6",
                  color: "#fff",
                  padding: "11px 26px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  fontSize: "15px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "18px",
              flexWrap: "wrap",
              marginTop: "55px",
            }}
          >
            <a
              href="mailto:vidhipatel1796@gmail.com"
              className="contact-btn"
              style={linkStyle}
            >
              📧 Email
            </a>

            <a
              href="https://github.com/24AIML048-Vidhi"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              style={linkStyle}
            >
              💻 GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/vidhi-patel-b38ba4317/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              style={linkStyle}
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const linkStyle = {
  textDecoration: "none",
  border: "2px solid #8b5cf6",
  color: "#fff",
  padding: "11px 25px",
  borderRadius: "30px",
  fontWeight: "600",
  fontSize: "14px",
  background: "transparent",
};

export default Contact;