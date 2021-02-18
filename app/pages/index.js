import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:4000/");

import ReceivedBubble from "../components/received-bubble";
import SentBubble from "../components/sent-bubble";

export default function Home({ initialMessages }) {
  const [messages, setMessage] = useState([...initialMessages]);
  let box = useRef();
  let input = useRef();

  // Set a uniqueid and grab the user name
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("chat_id" in localStorage)) localStorage.setItem("chat_id", uuidv4());
    if (!("chat_name" in localStorage))
      localStorage.setItem(
        "chat_name",
        window.prompt(
          "Welcome to our chat.\nPlease type your name to start chatting"
        )
      );
  });

  useEffect(() => {
    socket.on("message", (message) => setMessage([...messages, message]));
    return () => {
      socket.removeAllListeners("message");
    };
  });

  // Scroll to bottom
  useEffect(() => {
    box.current.scrollTop = box.current.scrollHeight;
    input.current.focus();
  });

  const sendMessage = (message) => {
    const payload = {
      user: { id: localStorage.chat_id, name: localStorage.chat_name },
      message,
      date: new Date(),
    };
    socket.emit("message", payload);
    setMessage([...messages, payload]);
  };

  if (typeof window === "undefined") return <></>;

  let id = localStorage.chat_id;
  console.log(
    messages,
    messages.filter((m) => m.user.id.includes(id))
  );

  return (
    <div class="w-100 md:w-4/5 lg:w-1/2 mx-auto h-screen grid grid-rows-8 px-5">
      <div class="flex flex-col mt-5 row-span-6 overflow-y-auto" ref={box}>
        {messages.map((message) =>
          message.user.id.includes(id) ? (
            <SentBubble
              message={message}
              key={`chat-message-${new Date(message.date).getTime()}`}
            />
          ) : (
            <ReceivedBubble
              message={message}
              key={`chat-message-${new Date(message.date).getTime()}`}
            />
          )
        )}
      </div>
      <div class="py-5">
        <input
          ref={input}
          class="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="type your message here..."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://api:4000/api/messages");
  const messages = await res.json();

  return {
    props: {
      initialMessages: messages,
    },
  };
}
