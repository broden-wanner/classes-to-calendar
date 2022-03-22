export const getHours = (timeStr: string) => {
  const match = timeStr.match(/(\d{1,2}):\d{2}/g);
  if (!match) throw new Error('Could not parse time for class');
  else return parseInt(match[0]);
};

export const weekdayStringToNumber = (weekdayStr: string) => {
  return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].indexOf(
    weekdayStr
  );
};
