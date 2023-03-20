export function formatDate(date: Date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
}

export function removeLineBreakers(string = ''): string {
  try {
    return string.replace(/(\r\n|\n|\r)/gm, '');
  } catch (error) {
    console.log('removeLineBreakers LOG:  error', error);
    return string;
  }
}
