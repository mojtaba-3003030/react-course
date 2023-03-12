import { useEffect, useState } from "react";
import Comment from "../../component/Comment/Comment";
import FullComment from "../../component/Fullcomments/FullComment";
import NewComment from "../../component/NewComment/NewComment";
import "./Discussion.css";
import axios from "axios";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [commentId, setCommentId] = useState(null);
  // 2XX ==> ok
  // 3xx =>  301 ,302  redirect    => SEO
  // 4xx ==> 401=> unAuthorized  --> کاربر ناشناس هست
  //  403=> this user not access
  // 404 => not found -> دیتا ای که میخواستی پیدا نشد یا .. api شما نامعتبره

  // 5xx => server
  useEffect(() => {
    async function getComments() {
      try {
        const { data } = await axios.get("http://localhost:3004/comments");
        // console.log(data.slice(0, 4));
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, []);

  const postCommentHandler = (comment) => {
    axios
      .post("http://localhost:3004/comments", { ...comment, postId: 10 })
      .then(() => axios.get("http://localhost:3004/comments"))
      .then((res) => setComments(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const selectCommentHandler = (id) => {
    setCommentId(id);
  };

  return (
    <main>
      <section>
        {comments ? (
          comments.map((c) => (
            <Comment
              key={c.id}
              name={c.name}
              email={c.email}
              body={c.body}
              onclick={() => selectCommentHandler(c.id)}
            />
          ))
        ) : (
          <p> Loading ...</p>
        )}
      </section>
      <section>
        <FullComment commentId={commentId} />
      </section>
      <section>
        <NewComment onAddPost={postCommentHandler} />
      </section>
    </main>
  );
};

export default Discussion;
