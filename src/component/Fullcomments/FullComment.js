import axios from "axios";
import { useEffect, useState } from "react";
import "./FullComment.css";

const FullComment = ({ commentId, setComments }) => {
  const [comment, setComment] = useState(null);

  const styles = {
    color: "#444",
    backgroundColor: !commentId ? "#efefef" : "red",
    padding: "10px",
  };
  const deleteHandler = (e) => {
    axios
      .delete(`http://localhost:3004/comments/${commentId}`)
      .then((res) => axios.get("http://localhost:3004/comments"))
      .then((res) => {
        setComments(res.data);
        setComment(false);
        commentDetail = <p style={styles}>please select a comment</p>;
      });
  };

  useEffect(() => {
    if (commentId) {
      axios
        .get(`http://localhost:3004/comments/${commentId}`)
        .then((res) => {
          setComment(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [commentId]);

  let commentDetail ;
  if( true || !comment){ commentDetail=<p style={styles}>please select a comment</p>}

  if (commentId) commentDetail = <p>Loading ...</p>;
  if (comment)
    return (
      <div className="fullComment">
        <p>name :{comment.name}</p>
        <p>mail :{comment.email}</p>
        <p>body :{comment.body}</p>
        <button className="btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    );

  return commentDetail;
};

export default FullComment;
