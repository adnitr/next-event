import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList({ eventId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(`/api/${eventId}/comments`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        setComments(data);
      } catch (err) {
        alert(err.message);
      }
    }
    loadComments();
  }, []);
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment._id.toString()}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
