try:
    from PIL import Image
except ImportError:
    import Image
 
def black_and_white_image(input_image_path, dithering=True):
    color_image = Image.open(input_image_path)
    if dithering:
        bw = color_image.convert('1')  
    else:
        bw = color_image.convert('1', dither=Image.NONE)
    return bw
 