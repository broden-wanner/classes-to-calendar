class ParseError(Exception):
    """
    Class for error raised when parsing the text from the ocr reader
    """
    def __init__(self, message, text=None):
        self.message = str(message)
        self.text = text
    
    def __str__(self):
        if self.text:
            return f'{self.message} in `{self.text}`'
        else:
            return self.message

    def to_dict(self):
        return {'message': self.message}

class FileError(Exception):
    """
    Class for error raised when an uploaded file is invalid
    """
    def __init__(self, message):
        self.message = str(message)
    
    def __str__(self):
        return self.message

    def to_dict(self):
        return {'message': self.message}

