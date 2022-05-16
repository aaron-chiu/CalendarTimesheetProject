import InteractiveExports from './components/InteractiveExports'
import ICAL from 'ical.js'
import TEST_VAL from './testData'

let getJCal = () => {
  var now = ICAL.Time.now() // TODO: make this variable
  var jcalData = ICAL.parse(TEST_VAL)
  var comp = new ICAL.Component(jcalData)
  var vevents = comp.getAllSubcomponents("vevent")
  var jcalEvents = vevents.map(vevent => new ICAL.Event(vevent))
  // var event = new ICAL.Event(vevent)
  // var summary = vevent.getFirstPropertyValue("summary")
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
        durationPerDay[next.day] = jcalEvent.duration.toSeconds()/60/60
      }
    }
    result.push({ name: jcalEvent.summary, durationPerDay })
    return result
  }, [])

  console.log(eventRows);
  return eventRows

  // var expand = jcalEvents[1].iterator(now.startOfMonth())
  // var next
  // console.log(events[1].toString());
  // console.log(expand.next().day)
  // console.log(expand.next().day)
  // console.log(expand.next().day)
  // console.log(expand.next().day)
  // console.log(expand.next().day)
  // console.log(expand.next().day)
  // while ((next = expand.next()) && next.compare(now.startOfMonth()) >= 0 && next.compare(now.endOfMonth()) <= 0) {
  //   console.log(next.day);
  // }

}

function App() {
  return (
    <div className="App">
      <InteractiveExports events={getJCal()}/>
    </div>
  );
}

export default App;
