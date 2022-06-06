import Head from 'next/head';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEvents(props) {
  const router = useRouter();
  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }
  // if (filterData.length >= 3) {
  //   return <p className='center'>Page not found!</p>;
  // }

  const handleSubmit = () => {
    router.push('/events');
  };

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please adjust your filter values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button href='/events' onClick={handleSubmit}>
            Show All Events
          </Button>
        </div>
      </>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the choosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button href='/events' onClick={handleSubmit}>
            Show All Events
          </Button>
        </div>
      </>
    );
  }

  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${props.numMonth}/${props.numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  if (filterData.length >= 3) {
    return {
      notFound: true,
    };
  }

  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      numYear,
      numMonth,
    },
  };
}

export default FilteredEvents;
