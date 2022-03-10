import fs from 'fs';
import { calendarOutput } from './resources/true-output/expectedOutput';
import { UMNClass } from './UMNClass';

const getTestHTML = (file: string) => {
  const html = fs.readFileSync(`./src/resources/test-html/${file}`);
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
      const [termStartDate, termEndDate] = [new Date(2022, 0, 18), new Date(2022, 4, 11)];
      const courses = UMNClass.parseUMNClassesFromHTML(html, termStartDate, termEndDate);
      const expectedCourses = calendarOutput.get(file);
      if (!expectedCourses) fail('Expected calendar not found');
      for (let i = 0; i < courses.length; i++) {
        expect(courses[i].equals(expectedCourses[i])).toBe(true);
      }
    });
  });
});
