export const monthNameToNumber = (monthName) => {
    const months = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
  
    return months[monthName] || null;
  };

  export const monthNumberToName = (monthNum) => {
    // months are 0 indexed
    const months =  {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11 : "December"
    };
    return months[monthNum] || null;
  }

  export const getDayOfWeek = (year, month, day) => {
    const date = new Date(year, month, day); // month is 0-indexed in Date constructor
    const dayOfWeek = date.getDay();
    const days = {
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
      0: "SUN"
    };
    return days[dayOfWeek];
  }

  export const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  export const getPreviousMonth = (month, year) => {
    if (month === 1) {
      return { prevMonth: 12, prevYear: year - 1 };
    }
    return { prevMonth: month - 1, prevYear: year };
  };
  
  export const getNextMonth = (month, year) => {
    if (month === 12) {
      return { nextMonth: 1, nextYear: year + 1 };
    }
    return { nextMonth: month + 1, nextYear: year };
  };

  export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }