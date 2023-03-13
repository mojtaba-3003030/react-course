import axios from "axios";
import { useState } from "react";
import "./NewComment.css";
const NewComment = ({ setComments }) => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });
  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

 
  const postCommentHandler = async () => {
    try {
      await axios.post("http://localhost:3004/comments", {
        ...comment,
        postId: 10,
      });
      const {data}=await axios.get("http://localhost:3004/comments")
      setComments(data)
      } catch (error) {}
  };

  return (
    <div className="newComment">
      <h2>Add new comment</h2>
      <div>
        <label>name</label>
        <input name="name" type="text" onChange={changeHandler} />
      </div>
      <div>
        <label>email</label>
        <input name="email" type="email" onChange={changeHandler} />
      </div>
      <div>
        <label>content</label>
        <input name="content" type="textarea" onChange={changeHandler} />
      </div>
      <button className="btn primary" onClick={postCommentHandler}>
        Add new comment{" "}
      </button>
    </div>
  );
};

export default NewComment;
