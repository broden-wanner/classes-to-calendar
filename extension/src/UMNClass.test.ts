import fs from 'fs';
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
    it('should do stuff', () => {
      const html = getTestHTML('calendar.html');
      UMNClass.parseUMNClassesFromHTML(html, new Date(), new Date());
    });
  });
});
