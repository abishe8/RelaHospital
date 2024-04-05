from PIL import Image
import io


def image_to_blob(image_path):
    with open(image_path, 'rb') as f:
        img = Image.open(f)
        img_stream = io.BytesIO()
        img.save(img_stream, format=img.format)
        img_blob = img_stream.getvalue()
    return img_blob


def blob_to_image(blob, new_image_name):
    img_stream = io.BytesIO(blob)
    img = Image.open(img_stream)
    img.save(new_image_name)
    return img


image_path = 'png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png'
image_blob = image_to_blob(image_path)
print("Image blob size:", len(image_blob), "bytes")
print(image_blob)

new_image_name = input("Enter the new image name: ")

reversed_image = blob_to_image(image_blob, new_image_name)
reversed_image.show()
