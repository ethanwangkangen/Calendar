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
    if (month === 0) {
      return { prevMonth: 11, prevYear: year - 1 };
    }
    return { prevMonth: month - 1, prevYear: year };
  };
  
  export const getNextMonth = (month, year) => {
    if (month === 11) {
      return { nextMonth: 0, nextYear: year + 1 };
    }
    return { nextMonth: month + 1, nextYear: year };
  };

  export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  export function getErrorMessage (errorCode) {
    switch (errorCode) {
        case 'auth/weak-password':
            return 'Password is too weak.';
        case 'auth/email-already-in-use':
            return 'Email address is already in use.';
        case 'auth/invalid-email':
            return 'Invalid email.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/invalid-credential':
            return 'Wrong password or email';
        case 'auth/network-request-failed':
            return 'Network error.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed.';
        case 'auth/too-many-requests':
            return 'Too many requests. Please try again later.';
        case 'auth/expired-action-code':
            return 'The action code has expired.';
        case 'auth/invalid-action-code':
            return 'The action code is invalid.';
        case 'auth/account-exists-with-different-credential':
            return 'Wrong credentials.';
        case 'auth/cancelled-popup-request':
            return 'Popup was cancelled by the user.';
        case 'auth/credential-already-in-use':
            return 'The credential is already associated with a different user account.';
        case 'auth/custom-token-mismatch':
            return 'The custom token is invalid or has expired.';
        case 'auth/invalid-custom-token':
            return 'The custom token format is incorrect.';
        case 'auth/invalid-provider':
            return 'The provider is not valid or supported.';
        case 'auth/missing-android-pkg-name':
            return 'You need to specify the Android package name.';
        case 'auth/missing-continue-uri':
            return 'You need to specify the continue URL.';
        case 'auth/missing-ios-bundle-id':
            return 'You need to specify the iOS bundle ID.';
        case 'auth/unauthorized-continue-uri':
            return 'The continue URL is not authorized.';
        case 'auth/user-disabled':
            return 'This user has been disabled.';
        case 'auth/user-token-expired':
            return 'The user’s token has expired.';
        case 'auth/invalid-email-verified':
            return 'The email address is not verified.';
        case 'auth/no-email':
            return 'No email address was provided.';
        case 'auth/unsupported-email':
            return 'Email address format is not supported.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
};
  