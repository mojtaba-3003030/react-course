import { useEffect, useState } from "react";
import "./FullComment.css";
import { getAllComments } from "../services/getAllCommentsService";
import { deleteComment } from "../../container/deleteCommentService";
import { getOneComment } from "../services/getOneCommentsService";

const FullComment = ({ commentId, setComments,setCommentId }) => {
  const [comment, setComment] = useState(null);

  const styles = {
    color: "#444",
    backgroundColor: !commentId ? "#efefef" : "red",
    padding: "10px",
  };
  const deleteHandler = async (e) => {
     await deleteComment(commentId)
       const {data} =await getAllComments()
      
        setComments(data);
        setCommentId(null);
        setComment(null);
        commentDetail = <p style={styles}>please select a comment</p>;
      
  };

  useEffect(() => {
    if (commentId) {
      getOneComment(commentId)
        .then((res) => {
          setComment(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [commentId]);

  let commentDetail ;
  if(!comment  || true){ commentDetail=<p style={styles}>please select a comment</p>}

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
