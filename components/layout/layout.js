import { useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const ctx = useContext(NotificationContext);
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {ctx.notification && <Notification {...ctx.notification} />}
    </>
  );
}

export default Layout;
