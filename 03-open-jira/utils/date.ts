export function getTimeAgo(timestamp: number) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const minutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes

  if (minutes < 1) {
    return "Just now";
  } else if (minutes === 1) {
    return "A minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else {
    const hours = Math.floor(minutes / 60);
    if (hours === 1) {
      return "An hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      if (days === 1) {
        return "A day ago";
      } else {
        return `${days} days ago`;
      }
    }
  }
}
