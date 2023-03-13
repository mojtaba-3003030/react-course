import { useEffect, useState } from "react";
import Comment from "../../component/Comment/Comment";
import FullComment from "../../component/Fullcomments/FullComment";
import NewComment from "../../component/NewComment/NewComment";
import "./Discussion.css";
import axios from "axios";
import {toast } from 'react-toastify';

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [error, setError] = useState(false);
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
        // console.log(error);
        setError(true)
      }
    }
    getComments();
  }, []);

 
  const selectCommentHandler = (id) => {
    setCommentId(id);
  };

  const renderComments=()=>{
    let renderedValue=<p>Loading ... </p>
    if (error) {
      renderedValue=<p>Fetching data failed ! </p>
      toast.error("there is an error !")
  }
    if (comments && !error){ 
      renderedValue =comments.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          email={c.email}
          body={c.body}
          onclick={() => selectCommentHandler(c.id)}
        />
      ))
    }
  
    return renderedValue
  }

  return (
    <main>
      <section>
        {renderComments()}
      </section>
      <section>
        <FullComment commentId={commentId} setComments={setComments} />
      </section>
      <section>
        <NewComment setComments={setComments} />
      </section>
    </main>
  );
};

export default Discussion;
