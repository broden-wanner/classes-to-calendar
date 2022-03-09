import { parse } from 'date-fns';

const getHours = (timeStr: string) => {
  let hours = '';
  for (const char of timeStr) {
    if (char === ':') {
      return parseInt(hours);
    }
    hours += char;
  }
  return hours;
};

export class UMNClass {
  name: string;
  dept: string;
  courseNum: string;
  section: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  startTimeStr: string;
  endTimeStr: string;
  daysOfWeek: Array<string> = [];

  constructor(
    name = '',
    dept = '',
    courseNum = '',
    section = '',
    location = '',
    startDateTimeStr = '',
    endDateTimeStr = '',
    startTimeStr = '',
    endTimeStr = '',
    daysOfWeek: Array<string> = []
  ) {
    this.name = name;
    this.dept = dept;
    this.courseNum = courseNum;
    this.section = section;
    this.location = location;

    this.startDateTime = parse(startDateTimeStr, '%Y-%m-%d %H:%M:%S', new Date());
    this.endDateTime = parse(endDateTimeStr, '%Y-%m-%d %H:%M:%S', new Date());
    this.startTimeStr = startTimeStr;
    this.endTimeStr = endTimeStr;
    this.daysOfWeek = [...daysOfWeek];
  }

  public toString(): string {
    return `UMNClass(${this.name}, ${this.dept} ${this.courseNum} ${this.section}, ${this.location})`;
  }

  public static parseUMNClassesFromHTML(
    htmlSnippet: string,
    startDate: Date,
    endDate: Date
  ): Map<string, UMNClass> {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlSnippet, 'text/html');
    const maybeCalendar = htmlDoc.getElementsByClassName('myu_calendar');
    if (maybeCalendar.length < 1) {
      throw new Error('Calendar could not be found');
    }
    const calendar = maybeCalendar[0];
    const days = calendar.getElementsByClassName('myu_calendar-day');

    for (const day of days) {
      const dayName = day.getAttribute('data-day')?.toUpperCase();
      if (!dayName) continue;
      const courseElements = day.getElementsByClassName('myu_calendar-class');

      // Iterate through all classes in the day
      for (const courseElement of courseElements) {
        const c = new UMNClass();
        c.daysOfWeek.push(dayName);

        // Get the course info from the title
        const courseTitle =
          courseElement.getElementsByClassName('myu_calendar-class-name')[0].textContent;
        if (!courseTitle) continue;
        const courseNameAndSection = courseTitle.split(' ');
        c.dept = courseNameAndSection[0];
        c.courseNum = courseNameAndSection[1];
        c.section = courseNameAndSection[2];
        c.name = courseNameAndSection.slice(3).join(' ');

        const details = courseElement.getElementsByClassName('myu_calendar-class-details')[0]
          .textContent;
        if (!details) continue;
        const detailWords = details
          .split('\n')
          .flatMap((line) => line.split(' '))
          .filter((word) => word !== '' && word !== '-');

        // Append the type of time slot to the name
        c.name += detailWords[0];

        // Extract the times
        const amOrPm = detailWords[3];
        const startTime = detailWords[1];
        const endTime = detailWords[2];
        c.location = detailWords.slice(4).join(' ');
        console.log(c.toString());
      }
    }

    return new Map<string, UMNClass>();
  }
}
