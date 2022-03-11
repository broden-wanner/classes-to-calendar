import { addDays, format, getDay, parse } from 'date-fns';
import CalendarEvent from './CalendarEvent';

const getHours = (timeStr: string) => {
  const match = timeStr.match(/(\d{1,2}):\d{2}/g);
  if (!match) throw new Error('Could not parse time for class');
  else return parseInt(match[0]);
};

const weekdayStringToNumber = (weekdayStr: string) => {
  return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].indexOf(
    weekdayStr
  );
};

export class UMNClass {
  public name: string;
  public dept: string;
  public courseNum: string;
  public section: string;
  public location: string;
  public startDate: Date;
  public endDate: Date;
  public startTimeStr: string;
  public endTimeStr: string;
  public daysOfWeek: Array<string> = [];

  constructor(
    name = '',
    dept = '',
    courseNum = '',
    section = '',
    location = '',
    startDateStr = '',
    endDateStr = '',
    startTimeStr = '',
    endTimeStr = '',
    daysOfWeek: Array<string> = []
  ) {
    this.name = name;
    this.dept = dept;
    this.courseNum = courseNum;
    this.section = section;
    this.location = location;

    this.startDate = parse(startDateStr, 'yyyy-MM-dd', new Date());
    this.endDate = parse(endDateStr, 'yyyy-MM-dd', new Date());
    this.startTimeStr = startTimeStr;
    this.endTimeStr = endTimeStr;
    this.daysOfWeek = [...daysOfWeek];
  }

  /**
   * Returns a human-readable string for debugging purposes.
   *
   * @returns human-readable string for debugging purposes.
   */
  public toString(): string {
    return `UMNClass(${this.name}, ${this.dept} ${this.courseNum} ${this.section}, ${
      this.location
    }, ${this.startTimeStr} to ${this.endTimeStr}, ${this.daysOfWeek.join(',')})`;
  }

  public toEvent(): CalendarEvent {
    const start = parse(
      `${format(this.startDate, 'yyyy-MM-dd')} ${this.startTimeStr}`,
      'yyyy-MM-dd h:mmaa',
      this.startDate
    );
    const end = parse(
      `${format(this.endDate, 'yyyy-MM-dd')} ${this.endTimeStr}`,
      'yyyy-MM-dd h:mmaa',
      this.endDate
    );

    // Setup recurrence
    const recurrenceDays = this.daysOfWeek.map((d) => d.slice(0, 2)).join(',');
    const recurrenceEnd = addDays(end, 1).toISOString().replace(/[:-]/g, '');
    const recurrence = `RRULE:FREQ=WEEKLY;BYDAY=${recurrenceDays};UNTIL=${recurrenceEnd}`;

    // Make the recurrence object
    return {
      summary: this.name,
      location: this.location,
      description: `${this.dept} ${this.courseNum} ${this.section}`,
      start: { dateTime: start.toISOString(), timeZone: 'America/Chicago' },
      end: { dateTime: end.toISOString(), timeZone: 'America/Chicago' },
      recurrence: [recurrence],
    };
  }

  /**
   * Returns a unique hashable code for the class.
   *
   * @returns hash code for the class.
   */
  public hashCode(): string {
    return `${this.name} | ${this.dept}${this.courseNum}${this.section} | ${this.location} | ${this.startTimeStr} to ${this.endTimeStr}`;
  }

  /**
   * Checks for equality with another UMNClass
   *
   * @param other Other UMNClass to compare against
   * @returns true if the classes are the same
   */
  public equals(other?: UMNClass): boolean {
    if (!other) return false;
    return this.toString() === other.toString();
  }

  /**
   * Sets the true course dates based on the input term start and end dates and the
   * days of the week the class is on.
   *
   * @param termStartDate
   * @param termEndDate
   */
  public setTrueCourseDates(termStartDate: Date, termEndDate: Date): void {
    // Get the day of week, 0 representing Sunday to 6 representing Saturday
    const startWeekdayOfTerm = getDay(termStartDate);
    let firstWeekdayOfCourse = weekdayStringToNumber(this.daysOfWeek[0]);

    for (const day of this.daysOfWeek) {
      const weekdayNumber = weekdayStringToNumber(day);
      // See if any of the other days of the week are on the first week
      if (weekdayNumber >= startWeekdayOfTerm) {
        firstWeekdayOfCourse = weekdayNumber;
        break;
      }
    }

    let offset;
    if (firstWeekdayOfCourse >= startWeekdayOfTerm) {
      offset = firstWeekdayOfCourse - startWeekdayOfTerm;
    } else {
      offset = firstWeekdayOfCourse - startWeekdayOfTerm + 7;
    }

    this.startDate = addDays(termStartDate, offset);
    // Set every class on this end date because calendars will handle the offset
    this.endDate = termEndDate;
  }

  /**
   * Parses MyU calendar HTMl into UMNClasses with all relevant information.
   *
   * @param htmlSnippet HTML string containing the MyU calendar.
   * @param termStartDate start date of the term/semester.
   * @param termEndDate end date of the term/semester.
   * @returns array of UMN classes parsed from the calendar.
   */
  public static parseUMNClassesFromHTML(
    htmlSnippet: string,
    termStartDate: Date,
    termEndDate: Date
  ): Array<UMNClass> {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlSnippet, 'text/html');
    const maybeCalendar = htmlDoc.getElementsByClassName('myu_calendar');
    if (maybeCalendar.length < 1) {
      throw new Error('Calendar could not be found');
    }
    const calendar = maybeCalendar[0];
    const days = calendar.getElementsByClassName('myu_calendar-day');
    const courseMap = new Map<string, UMNClass>();

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
        c.name += ` ${detailWords[0]}`;

        // Extract the times
        const amOrPm = detailWords[3];
        let startTime = detailWords[1];
        let endTime = detailWords[2];
        if (amOrPm.toUpperCase() === 'PM' && getHours(startTime) > getHours(endTime)) {
          // Set the start time to AM if the end time is PM and startTime is greater than endTime
          startTime += 'AM';
          endTime += 'PM';
        } else {
          // Otherwise, set both times to the same AM/PM value
          startTime += amOrPm;
          endTime += amOrPm;
        }
        c.location = detailWords.slice(4).join(' ');
        c.startTimeStr = startTime;
        c.endTimeStr = endTime;

        if (!courseMap.has(c.hashCode())) {
          // Add the course to the map if it isn't already there
          courseMap.set(c.hashCode(), c);
        } else {
          // Add the day of the week to the class if it is already in the set
          courseMap.get(c.hashCode())?.daysOfWeek.push(dayName);
        }
      }
    }

    // Set the true course start and end dates
    for (const [, course] of courseMap.entries()) {
      course.setTrueCourseDates(termStartDate, termEndDate);
    }

    // Turn the map into an array and return
    return [...courseMap.values()];
  }
}
