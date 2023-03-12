import "./Comment.css";
const Comment = ({ name, email, onclick }) => {
  return (
    <div className="comment" onClick={onclick}>
      <p>name : {name}</p>
      <p>mail : {email}</p>
    </div>
  );
};

export default Comment;
