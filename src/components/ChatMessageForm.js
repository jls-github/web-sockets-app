import { useState } from "react";

export default function ChatMessageForm({ sendMessage }) {
  const [formData, setFormData] = useState(initialFormState);

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(formData);
  }

  function handleChange(e) {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label>Message: </label>
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Send Message</button>
    </form>
  );
}

const initialFormState = {
  name: "",
  content: "",
};
