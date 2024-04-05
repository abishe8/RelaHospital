import cv2
import numpy as np


def extract_handwriting(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    edges = cv2.Canny(img, 100, 200)

    mask = np.zeros_like(edges)
    mask[edges != 0] = 255

    new_img = np.zeros((img.shape[0], img.shape[1], 4), dtype=np.uint8)
    new_img[:, :, :3] = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    new_img[:, :, 3] = mask

    return new_img


image_path = 'hw.png'
handwriting_strokes = extract_handwriting(image_path)

output_path = 'handwriting_strokes.png'
cv2.imwrite(output_path, handwriting_strokes)
print("Handwriting strokes extracted and saved to:", output_path)
