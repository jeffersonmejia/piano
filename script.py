import os
import ffmpeg

input_folder = 'sounds'
output_folder = 'converted'

# Itera sobre todos los archivos en la carpeta de entrada
for filename in os.listdir(input_folder):
    if filename.endswith('.mp3'):
        # Define la ruta de entrada y salida para el archivo actual
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename.replace('.mp3', '.ogg'))
        
        # Aplica la conversión de MP3 a OGG utilizando ffmpeg
        (
            ffmpeg
            .input(input_path)
            .output(output_path)
            .run()
        )
