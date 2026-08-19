from pathlib import Path

IMAGE_DIR = Path("/home/nav/Downloads/naamshakti-landing/client/public/images")

for file in IMAGE_DIR.rglob("*.png"):
    if file.is_file():
        print(f"DELETE: {file}")
        file.unlink()

print("All PNG files deleted.")