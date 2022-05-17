import React, { useState } from 'react'
import InteractiveExports from './components/InteractiveExports'
import ICAL from 'ical.js'
import TEST_VAL from './testData'
import FilesDragAndDrop from './components/FilesDragAndDrop'

let getJCal = () => {
  var now = ICAL.Time.now() // TODO: make this variable
  var jcalData = ICAL.parse(TEST_VAL)
  var comp = new ICAL.Component(jcalData)
  var vevents = comp.getAllSubcomponents("vevent")
  var jcalEvents = vevents.map(vevent => new ICAL.Event(vevent))

  console.log(jcalEvents)
  var eventRows = jcalEvents.reduce((result, jcalEvent) => {
    if (!jcalEvent.isRecurring()) {
      if (jcalEvent.startDate.compare(now.startOfMonth()) >= 0 && jcalEvent.endDate.compare(now.endOfMonth() <= 0)) {
        let durationPerDay = { [jcalEvent.startDate.day]: jcalEvent.duration }
        result.push({ name: jcalEvent.summary, durationPerDay })
        console.log("not recurr", result);
      }
      return result
    }
    var durationPerDay = {}
    var expand = jcalEvent.iterator() // NOTE: iterator by default uses the event's dtstart so might cause an issue if dtstart way in the past
    var next
    while ((next = expand.next()) && next.compare(now.endOfMonth()) <= 0) {
      if (next.compare(now.startOfMonth()) >= 0) {
        durationPerDay[next.day] = jcalEvent.duration.toSeconds() / 60 / 60
      }
    }
    result.push({ name: jcalEvent.summary, durationPerDay })
    return result
  }, [])

  console.log(eventRows);
  return eventRows
}

function App() {
  const [showTable, setShowTable] = useState(false)
  const onUpload = (files) => {
    console.log(files);
    setShowTable(!showTable)
  }

  return (
    <div className="App">
      {!showTable &&
        <FilesDragAndDrop
          onUpload={onUpload}
          count={1}
          formats={['ics']}
        >
          <div className='FilesDragAndDrop__area'>
            Drop an ICS file here
            <span
              role='img'
              aria-label='emoji'
              className='area__icon'
            >
              &#128526;
            </span>
          </div>
        </FilesDragAndDrop>}
      {showTable && <InteractiveExports events={getJCal()} />}
    </div>
  );
}

export default App;
