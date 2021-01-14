from flask import jsonify
from .exceptions import ParseError, FileError
from . import app


@app.errorhandler(ParseError)
def handle_parse_error(error):
    """Serializes the parse errors in the error for a response"""
    error.message = f'Parse Error: {error.message}'
    response = jsonify(error.to_dict())
    response.status_code = 400
    return response


@app.errorhandler(FileError)
def handle_file_error(error):
    """Serializes the file errors for response"""
    error.message = f'File Error: {error.message}'
    response = jsonify(error.to_dict())
    response.status_code = 400
    return response
