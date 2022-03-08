import { parse } from 'date-fns';

class UMNClass {
  name: string;
  dept: string;
  courseNum: string;
  section: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  daysOfWeek: Array<string> = [];

  constructor(
    name: string,
    dept: string,
    courseNum: string,
    section: string,
    location: string,
    startDateTimeStr: string,
    endDateTimeStr: string,
    daysOfWeek: Array<string> = []
  ) {
    this.name = name;
    this.dept = dept;
    this.courseNum = courseNum;
    this.section = section;
    this.location = location;

    this.startDateTime = parse(startDateTimeStr, '%Y-%m-%d %H:%M:%S', new Date());
    this.endDateTime = parse(endDateTimeStr, '%Y-%m-%d %H:%M:%S', new Date());
    this.daysOfWeek = [...daysOfWeek];
  }
}
