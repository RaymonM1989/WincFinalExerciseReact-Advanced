import React                                      from 'react';
import ReactDOM                                   from 'react-dom/client';
import { createBrowserRouter, RouterProvider }    from 'react-router-dom';
import { EventsList, loader as eventsListLoader } from './pages/EventsList';
import { EventPage, loader as eventLoader }       from './pages/EventPage';
import { loader as newEventLoader }               from './components/EventForm';
import { NewEventPage }                           from './pages/NewEventPage';
import { ChakraProvider }                         from '@chakra-ui/react';


const router = createBrowserRouter (
[
  {
    path: '/',
    element: <EventsList />,
    loader: eventsListLoader,
  },
  {
    path: '/event/:eventId',
    element: <EventPage />,
    loader: eventLoader,
  },
  {
    path: 'event/new',
    element: <NewEventPage />,
    loader: newEventLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
