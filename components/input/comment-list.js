import { useState, useEffect, useContext } from 'react';
import classes from './comment-list.module.css';
import NotificationContext from '../../store/notification-context';

function CommentList({ eventId }) {
  const [comments, setComments] = useState([]);
  const ctx = useContext(NotificationContext);
  useEffect(() => {
    async function loadComments() {
      try {
        ctx.showNotification({
          title: 'Loading...',
          message: 'Loading the comments',
          status: 'pending',
        });
        const response = await fetch(`/api/${eventId}/comments`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setComments(data);
        ctx.hideNotification();
      } catch (err) {
        ctx.showNotification({
          title: 'Error',
          message: err.message,
          status: 'error',
        });
        setTimeout(() => {
          ctx.hideNotification();
        }, 2000);
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
