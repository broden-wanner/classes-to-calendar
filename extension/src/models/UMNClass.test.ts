import * as fs from 'fs';
import CalendarEvent from '../types/CalendarEvent';
import { calendarOutput } from '../resources/test/true-output/expectedOutput';
import UMNClass from '../models/UMNClass';

const getTestHTML = (file: string) => {
  const html = fs.readFileSync(`./src/resources/test/test-html/${file}`);
  return html.toString();
};

describe('UMNClass class', () => {
  it('should initialize correctly', () => {
    expect(true).toBe(true);
  });

  describe('HTML parser for MyU', () => {
    it('should parse correct classes', () => {
      const file = 'calendar.html';
      const html = getTestHTML(file);
      const [termStartDate, termEndDate] = [
        new Date(2022, 0, 18),
        new Date(2022, 4, 11),
      ];
      const courses = UMNClass.parseUMNClassesFromHTML(
        html,
        termStartDate,
        termEndDate
      );
      const expectedCourses = calendarOutput.get(file);
      if (!expectedCourses) fail('Expected calendar not found');
      for (let i = 0; i < courses.length; i++) {
        expect(courses[i].equals(expectedCourses[i])).toBe(true);
      }
    });
  });

  describe('toEventObject()', () => {
    it('should return correct event object', () => {
      const testCourses = calendarOutput.get('calendar.html');
      if (!testCourses) fail('Could not find calendar');

      const testCourse = testCourses[0];
      const calendarEvent: CalendarEvent = testCourse.toEvent();
      expect(calendarEvent).toStrictEqual({
        summary: 'Ear-Training II Lecture',
        location: 'Ferguson Hall 225',
        description: 'MUS 1512 (001)',
        start: {
          dateTime: '2022-01-24T08:00:00',
          timeZone: 'America/Chicago',
        },
        end: { dateTime: '2022-01-24T08:50:00', timeZone: 'America/Chicago' },
        recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20220512T085000'],
      });
    });
  });
});
