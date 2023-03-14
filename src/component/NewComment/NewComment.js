import { useState } from "react";
import "./NewComment.css";
import { getAllComments } from "../services/getAllCommentsService";
import { addNewComments } from "../services/addNewCommentsService";

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
      await addNewComments({ ...comment, postId: 10 });
      const { data } = await getAllComments();
      setComments(data);
    } catch (error) {}
  };

  return (
    <div className="newComment">
      <h2>Add new comment</h2>
      <div className="newComment_section">
        <label>name</label>
        <input name="name" type="text" onChange={changeHandler} />
      </div>
      <div className="newComment_section">
        <label>email</label>
        <input name="email" type="email" onChange={changeHandler} />
      </div>
      <div className="newComment_section">
        <label>content</label>
        <textarea name="content" type="textarea" onChange={changeHandler} />
      </div>
      <button className="btn primary" onClick={postCommentHandler}>
        Add new comment{" "}
      </button>
    </div>
  );
};

export default NewComment;
