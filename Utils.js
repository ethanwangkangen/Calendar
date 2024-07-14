export const monthNameToNumber = (monthName) => {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
  
    return months[monthName] || null;
  };

  export const monthNumberToName = (monthNum) => {
    const months =  {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12 : "December"
    };
    return months[monthNum] || null;
  }

  export const getDayOfWeek = (year, month, day) => {
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }