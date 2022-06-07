import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;

    try {
      notificationCtx.showNotification({
        title: 'Processing...',
        message: 'Subscribing to the newsletter...',
        status: 'pending',
      });
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.status === 201) {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Congratulations! You have subscribed to our newsletter.',
          status: 'success',
        });
        setTimeout(() => {
          notificationCtx.hideNotification();
        }, 2000);
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message,
        status: 'error',
      });
      setTimeout(() => {
        notificationCtx.hideNotification();
      }, 2000);
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
            required
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
