from classestocalendar import app
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the .env file
load_dotenv(find_dotenv())

if __name__ == '__main__':
    app.run()
