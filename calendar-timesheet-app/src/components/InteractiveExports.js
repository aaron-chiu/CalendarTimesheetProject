import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { DataGrid } from '@mui/x-data-grid';
import PlanningTable from './PlanningTable'

function getHeaderDays(year, month) {
  let days = new Date(year, month + 1, 0).getDate();
  let headers = []
  for (let x = 1; x < days+1; x++) {
    headers.push(<th key={nanoid()}>{`${month}/${x}`}</th>)
  }
  return headers
}

function getDurationDays(year, month, durationPerDay) {
  let days = new Date(year, month + 1, 0).getDate();
  let durations = []
  for (let x = 1; x < days+1; x++) {
    durations.push(<td key={nanoid()}>{durationPerDay[x]}</td>)
  }
  return durations
}

export default function InteractiveExports(props) {
  const [date, setDate] = useState({year: new Date().getFullYear(), month: new Date().getMonth()}) // TODO: get from props instead
  const [events, setEvents] = useState(
      {
        columnName: "Ticket Title",
        eventsList: props.events
        // [
        //     { name: "Daily Standup", duration: 0.5, frequency: "WEEKLY", byDay: ["FR","MO","TH","TU","WE"], startDate: 0, endDate: null},
        //     { name: "Scheduled Meeting", duration: 1, frequency: null, byDay: null, startDate: 15, }
        // ]
      }
  )
  const [headers, setHeaders] = useState(
      [
        { name: "Name", default: "Aaron Chiu" },
        { name: "Country", default: "Canada" },
        { name: "Ticket Number" },
        { name: "Ticket Title", }
      ]
  )

  return (
    <table>
      <tbody>
      {/* Header row */}
        <tr>
          {headers.map(header => <th key={nanoid()}>{header.name}</th>)}
          {getHeaderDays(date.year, date.month)}
        </tr>
        {/* Event rows */}
        {events.eventsList.map(event => {
          var rowCells = []
          // print names
          headers.forEach(header => {
            rowCells.push(<td key={nanoid()}>{ header.name === events.columnName ? event.name : header.default }</td>) // matching by column name seems iffy
          });
          // print hours
          rowCells.push(getDurationDays(date.year, date.month, event.durationPerDay))
          return <tr key={nanoid()}>{rowCells}</tr>
        })}
      </tbody>
    </table>
  )
}