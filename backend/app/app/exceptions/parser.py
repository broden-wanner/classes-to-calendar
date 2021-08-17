from typing import Dict, Optional


class ParseException(Exception):
    """
    Class for error raised when parsing the text from the ocr reader
    """

    def __init__(self, message: str, text: Optional[str] = None) -> None:
        self.message = str(message)
        self.text = text

    def __str__(self) -> str:
        if self.text:
            return f"{self.message} in `{self.text}`"
        else:
            return self.message

    def to_dict(self) -> Dict[str, str]:
        return {"message": self.message}
