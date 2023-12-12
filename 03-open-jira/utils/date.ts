export function getTimeAgo(timestamp: number) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const minutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes

  if (minutes < 1) {
    return "Hace un momento";
  } else if (minutes === 1) {
    return "Hace 1 minuto";
  } else if (minutes < 60) {
    return `Hace ${minutes} minutos`;
  } else {
    const hours = Math.floor(minutes / 60);
    if (hours === 1) {
      return "Hace 1 hora";
    } else if (hours < 24) {
      return `Hace ${hours} horas`;
    } else {
      const days = Math.floor(hours / 24);
      if (days === 1) {
        return "Hace 1 día";
      } else {
        return `Hace ${days} días`;
      }
    }
  }
}
