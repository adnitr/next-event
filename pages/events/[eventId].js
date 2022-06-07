import Head from 'next/head';
import { getFeaturedEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

function IndividualEvent(props) {
  const { event } = props;

  if (!event) {
    return (
      <>
        <Head>
          <title>No events found!</title>
          <meta
            name='description'
            content='Find a lot of great events that allows you to evolve...'
          />
        </Head>
        <ErrorAlert>No events found!</ErrorAlert>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const data = await getEventById(params.eventId);
  return {
    props: {
      event: data,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const data = await getFeaturedEvents();
  const paramsArr = data.map((item) => ({ params: { eventId: item.id } }));
  return {
    paths: paramsArr,
    fallback: 'blocking',
  };
}

export default IndividualEvent;
