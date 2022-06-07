import { useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const ctx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    try {
      ctx.showNotification({
        title: 'Adding...',
        message: 'Adding your comment',
        status: 'pending',
      });
      const response = await fetch(`/api/${eventId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      const data = await response.json();
      if (response.status === 201) {
        ctx.showNotification({
          title: 'Success',
          message: 'Your comment has been added!',
          status: 'success',
        });
        setTimeout(() => {
          ctx.hideNotification();
        }, 2000);
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      ctx.showNotification({
        title: 'Error',
        message: error.message,
        status: 'error',
      });
      setTimeout(() => {
        ctx.hideNotification();
      }, 2000);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId} />}
    </section>
  );
}

export default Comments;
