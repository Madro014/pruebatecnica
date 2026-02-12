# Usar la versión Slim de Debian para el backend
FROM python:3.12-slim

# Evitar archivos .pyc y asegurar logs instantáneos
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instalar libpq (runtime para postgres)
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar requerimientos e instalar (apuntando a la carpeta backend)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar solo el contenido de la carpeta backend al directorio de trabajo /app
COPY backend/ .

# Exponer el puerto
EXPOSE 5000

# Usar Gunicorn con configuraciones para bajos recursos (Plan Free Render)
# Ya que copiamos el CONTENIDO de backend/ a /app, main:app funcionará directamente
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "4", "main:app"]
