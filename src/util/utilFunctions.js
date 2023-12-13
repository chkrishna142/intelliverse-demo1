export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export function getCreditsRemaining(bal) {
  if (0 < bal.input_token_balance < 2500000 && 0 < bal.output_token_balance < 1900000) {
    return 5
  } else if (2500000 < bal.input_token_balance < 10000000 && 1900000 < bal.output_token_balance < 7500000) {
    return 20
  } else if (10000000 < bal.input_token_balance < 25000000 && 7500000 < bal.output_token_balance < 19000000) {
    return 50
  } else if (25000000 < bal.input_token_balance < 50000000 && 19000000 < bal.output_token_balance < 38000000) {
    return 100
  } else {
    return 0
  }
}

export function getQuestionsCredit(bal, setDisabled) {
  // if (0 < bal.question_balance < 10) {
  //   setDisabled(false)
  //   return 5
  // } else if (10 < bal.question_balance < 40) {
  //   setDisabled(false)
  //   return 20
  // } else if (40 < bal.question_balance < 80) {
  //   setDisabled(false)
  //   return 50
  // } else if (80 < bal.question_balance < 100) {
  //   setDisabled(false)
  //   return 100
  // } else {
  //   setDisabled(true)
  //   return 0
  // }
  return bal.question_balance
}