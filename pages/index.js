import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allows you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </>
  );
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
