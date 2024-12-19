import React, { useState } from "react";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

export default function ProviderMessanger() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };
  return (
    <div>
      <ProviderNavbar />
      <div className="container mt-4">
        <Link
          to=""
          className="btn btn-secondary"
          style={{
            marginBottom: "10px", // Adds space between the link and the container below
            display: "inline-block",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          &larr; Go Back
        </Link>
        <div
          className="container p-0 border rounded"
          style={{ height: "500px", width: "100%" }}
        >
          <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto p-2 bg-light">
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <strong>{message.sender}:</strong> {message.text}
                </div>
              ))}
            </div>
            <div className="input-group p-2 border-top">
              <input
                type="text"
                className="form-control"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSend} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
