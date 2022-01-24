import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Calendar from 'react-calendar';
import Navbar from "../components/Navbar"
// import moment from 'moment';

function Calendars() {

  const GET_EVENTS = gql`
    query GetEvent {
      getEvent {
        id,
        title,
        startDate,
        endDate
      }
    }
  `

  const CREATE_EVENT = gql`
    mutation createEvent($event: EventInput){
        createEvent( event: $event) {
            id
        }
    }
  `

  const { loading, error, data } = useQuery(GET_EVENTS)
  const [events, setEvents] = useState([])
//   useEffect(() => {
//       if(!loading) setEvents(data.getEvent)
//   }, [events, data])
//   console.log(events)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [title, setTitle] = useState('')
  var currentDate = startDate.toISOString().slice(0, 10)
  const endDateString = endDate.toISOString().slice(0,10)

  

  const onClickHandler = (e)=> {
      e.preventDefault()
      createEvent({
          variables: {event:{
              title,
              startDate,
              endDate
          }}
      })
  }

  const [createEvent, {data: eventData, loading: eventLoading, error: errorLoading}] = useMutation(CREATE_EVENT)
//   console.log(typeof currentDate)

  let showEvents = loading ? <h1> Loading... </h1> :
  events.map(event => {
      return(
        console.log(events.startDate)
    )
    // console.log(typeof event.startDate)
    // <h1> {event.title} </h1>

    // if (currentDate === event.startDate) {
    //   <p key={event.id}> {event.title} </p>
    //   console.log(event.title)
    //   console.log(currentDate)
    // }

    // console.log(value.toISOString().slice(0,10));
    // console.log(event.startDate);
  })
//   console.log(showEvents)
console.log(events)
  return (
    <>
        <Navbar />
        <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>

      
        <Calendar
        onChange={setStartDate}
        value={startDate}
        />
        <Calendar
        onChange={setEndDate}
        value={endDate}
        />
        <button onClick={onClickHandler}>Submit</button>
    </>

    
  );
};


export default Calendars;