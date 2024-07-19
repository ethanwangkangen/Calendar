import EventCreateBox from './components/EventCreateBox';

const chrono = require('chrono-node');

// for use within event creation inside dayModal
export function parseTimes(input) {
    // birthday 3pm -> [ '1500' ]
    // lesson 2 to 4pm -> [ '1400', '1600' ]
    // event -> []
    const results = chrono.parse(input);
  
    if (results.length === 0) return [];
  
    // Check for range
    const startTime = results[0].start.date();
    const formattedStartTime = `${startTime.getHours().toString().padStart(2, '0')}${startTime.getMinutes().toString().padStart(2, '0')}`;
  
    if (results[0].end) {
      const endTime = results[0].end.date();
      const formattedEndTime = `${endTime.getHours().toString().padStart(2, '0')}${endTime.getMinutes().toString().padStart(2, '0')}`;
      return [formattedStartTime, formattedEndTime];
    }
  
    return [formattedStartTime];
  }

  // for use within event creation inside dayModal.
  // converts 1.30pm lunch (input) to 1330 lunch (shown) for consistency
export function formatDetails(input) {
    const results = chrono.parse(input);
    if (results.length === 0) return input;
    const result = results[0];
    let eventDescription = input.replace(result.text, '').trim();
    const date = result.start.date();
    const formatTime = (date) => {
      return `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;
    };
  
    // Check if a time was explicitly mentioned
    const hasExplicitTime = result.start && result.start.isCertain('hour') && result.start.isCertain('minute');
    
    // Initialize start and end times
    let startTime = null;
    let endTime = null;
  
    // Only format times if they were explicitly mentioned
    if (hasExplicitTime) {
      startTime = formatTime(result.start.date());
      endTime = result.end ? formatTime(result.end.date()) : null;
      // Append times to event description if they exist
      if (endTime) {
        eventDescription = `to ${endTime} ` + eventDescription;
      }
      if (startTime) {
        eventDescription = `${startTime} ` + eventDescription;
      }
  }
    return eventDescription;    
}

// The output of chrono.parse(input) is an array of ParsedResult objects. Each ParsedResult object contains information about a detected date or time expression in the input string. Below is a detailed breakdown of what each ParsedResult includes:

// Structure of ParsedResult
// A ParsedResult object typically contains the following properties:

// index: The position in the input string where the date/time expression starts.
// text: The original text that was parsed as a date/time.
// start: A ParsedComponents object representing the start date/time.
// end: (Optional) A ParsedComponents object representing the end date/time if a range was detected.
// ref: The reference date used for relative dates (e.g., "tomorrow" will be relative to this date).

// Structure of ParsedComponents
// A ParsedComponents object contains detailed information about the parsed date/time, including the following:

// date(): A method that returns a JavaScript Date object representing the parsed date/time.
// get(unit): A method to retrieve the value of a specific unit (e.g., year, month, day, hour, minute).
// assign(unit, value): A method to manually set the value of a specific unit.
// isCertain(unit): A method to check if a specific unit was explicitly defined in the input.

export function parseSingleEvent(input) {
  // event that spans within a single day
  // lunch tomorrow 1pm -> ["lunch", <Date> (to be formatted), "1300", null]
  // practice tomorrow 3 to 5pm -> ["practice", <Date> (to be formatted), "1500", "1700"]
  // no date specified (time specified): assumed to be current day (today)
  // no time specified: okay.
  // no date or time specified: fail  


  const results = chrono.parse(input);
  if (results.length === 0) { // no date specified
    return [input, null, null, null]; // No dates/times parsed
  }

  const result = results[0];
  let eventDescription = input.replace(result.text, '').trim();
  const date = result.start.date();

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;
  };


  // Check if a time was explicitly mentioned
  const hasExplicitTime = result.start && result.start.isCertain('hour') && result.start.isCertain('minute');
  
  // Initialize start and end times
  let startTime = null;
  let endTime = null;

  // Only format times if they were explicitly mentioned
  if (hasExplicitTime) {
    startTime = formatTime(result.start.date());
    endTime = result.end ? formatTime(result.end.date()) : null;
    
    // Append times to event description if they exist
    
    if (endTime) {
      eventDescription = `to ${endTime} ` + eventDescription;
    }

    if (startTime) {
      eventDescription = `${startTime} ` + eventDescription;
    }
  }


  return [eventDescription, date, startTime, endTime];
}