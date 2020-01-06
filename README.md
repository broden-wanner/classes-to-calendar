# Classes to Calendar

This is a web application designed to take an image of a UMN class schedule and extract the class data out of it. It uses [Google's Tesseract OCR](https://github.com/tesseract-ocr/tesseract) to parse the text from the image into a calendar event. The user can then add these classes to their Google Calendar on either a new calendar or an already existing one.

Website: [classes-to-calendar](https://classes-to-calendar.xyz)

## Tech Used
- React frontend
- Flask backend
- Pytesseract to interface with Tesseract OCR
- Nginx Server

## Future Work
- Add option to exort to .ics for importing into other calendars
- Make the tesseract and parsing more flexible
