import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return <EventList items={props.featuredEvents} />;
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: events,
    },
    revalidate: 30,
  };
}

export default HomePage;
