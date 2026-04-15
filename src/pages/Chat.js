
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat(prev => [...prev, data.message]);
     
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/messages")
      .then(res => {
        // extract only message text
        const msgs = res.data.map(item => item.message);
        setChat(msgs);
    
      });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/");
  };
  
  
  return (
    <div className="chat-container">
  
      {/* HEADER */}
      <div className="chat-header">
        <h3>Chat App</h3>
        <button onClick={logout}>Logout</button>
      </div>
  
      {/* CHAT */}
       <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className="msg right">
            {msg}
          </div>
        ))}

      </div> 


  
      {/* INPUT */}
      <div className="input-box">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
  
    </div>
  );
}

export default Chat;