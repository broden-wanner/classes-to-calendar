import pickle
import datetime
import sys
from bs4 import BeautifulSoup
try:
    from .models import UMNClass
except ModuleNotFoundError:
    from models import UMNClass

def generate_umn_classes_from_html(html_string, start_date, end_date):
    soup = BeautifulSoup(html_string, 'html.parser')

    calendar = soup.find('div', {'class': 'myu_calendar'})
    days = calendar.find_all('div', {'class': 'myu_calendar-day'})

    class_set = set()

    try:
        for day in days:
            day_name = day['data-day'].upper()
            classes = day.find_all('a', {'class': 'myu_calendar-class'})

            for class_ in classes:
                c = UMNClass()
                c.days_of_week.append(day_name)

                name_and_section = class_.find('span', {'class', 'myu_calendar-class-name'}, recursive=False)
                name_and_section_list = name_and_section.contents[1].split()
                c.section = name_and_section_list.pop(0)
                c.name = ' '.join(name_and_section_list)
                
                dept_and_num = class_.find('span', {'class': 'myu_calendar-class-name-color-referencer'})
                dept_and_num_list = dept_and_num.text.split()
                c.dept = dept_and_num_list[0]
                c.course_num = dept_and_num_list[1]
                
                details = class_.find('span', {'class': 'myu_calendar-class-details'})
                c.name += ' ' + details.contents[0]

                times = details.contents[2].split()
                c.start_time = times[0]
                c.end_time = times[2] + times[3]

                c.location = details.contents[4].strip()
                
                if not c in class_set:
                    c.set_times()
                    class_set.add(c)
                else:
                    for existing_class in class_set:
                        if c == existing_class:
                            existing_class.days_of_week.append(day_name)
                            break
    except Exception:
        return {
            'classes': list(class_set),
            'extracted_all': False,
            'message': 'Could not get all classes'
        }

    # Assign dates to the classes                    
    # Must be done after all the class days have been assigned
    for c in class_set:
        c.set_class_dates(start_date=start_date, end_date=end_date)

    return {
        'classes': list(class_set),
        'extracted_all': True,
        'message': 'Successfully extracted classes'
    }

if __name__ == '__main__':
    filename = 'no-class-day'

    with open(f'test-html/{filename}.html', 'r+') as f:
        html_string = f.read()
    start_date=datetime.date(year=2020, month=1, day=21)
    end_date=datetime.date(year=2020, month=5, day=4)

    result = generate_umn_classes_from_html(html_string=html_string, start_date=start_date, end_date=end_date)
    classes = result['classes']

    if len(sys.argv) > 1 and sys.argv[1] == '--pickle':
        pickle.dump(classes, open(f'true-classes-html-output/{filename}.p', 'wb'))

    for c in classes:
        print(c)
