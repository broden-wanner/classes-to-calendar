from . import settings

def allowed_file(filename: str) -> bool:
    """ 
    Checks the allowed file extensions
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in settings.ALLOWED_EXTENSIONS
