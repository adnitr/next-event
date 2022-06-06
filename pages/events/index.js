import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

function AllEvents(props) {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All Events - NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allows you to evolve...'
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={props.allEvents} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 30,
  };
}

export default AllEvents;
