import { useState, useEffect } from "react";
import { BASE_SOCKET_URL, MESSAGES_URL } from "../constraints/urls";
import ChatMessage from "./ChatMessage";
import ActionCable from "actioncable";
import ChatMessageForm from "./ChatMessageForm";
// import useWebSocket from "react-use-websocket";

export default function ChatMessageContainer() {
  const [chatMessages, setChatMessages] = useState(null);
  const [messagesChannel, setMessagesChannel] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch(MESSAGES_URL);
      const json = await res.json();
      setChatMessages(json);
    }

    fetchMessages();
  }, []);

  function handleAddMessage(message) {
    messagesChannel.send({
      action: "speak",
      ...message,
    });
  }

  function handleReceiveMessage(data) {
    if (data.name && data.content) {
      setChatMessages((prevState) => {
        return [...prevState, data];
      });
    }
  }

  function handleConnect() {
    console.log("connected");
  }

  useEffect(() => {
    const cable = ActionCable.createConsumer(BASE_SOCKET_URL);
    const channel = cable.subscriptions.create("MessageChannel", {
      connected: handleConnect,
      received: handleReceiveMessage,
    });

    setMessagesChannel(channel);
  }, []);

  useEffect(() => {}, [chatMessages]);

  if (!chatMessages) return <div>loading messages...</div>;

  if (!messagesChannel) return <div>Connecting to messages channel...</div>;

  return (
    <div>
      {chatMessages.map((message, idx) => (
        <ChatMessage key={`message-${idx}`} {...message} />
      ))}
      <ChatMessageForm sendMessage={handleAddMessage} />
    </div>
  );
}
