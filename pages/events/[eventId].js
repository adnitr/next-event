import { getFeaturedEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function IndividualEvent(props) {
  const { event } = props;

  if (!event) {
    return <ErrorAlert>No events found!</ErrorAlert>;
  }
  return (
    <>
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
  let paramsArr = [];
  for (const key in data) {
    paramsArr.push({ params: { eventId: key } });
  }
  return {
    paths: paramsArr,
    fallback: 'blocking',
  };
}

export default IndividualEvent;
