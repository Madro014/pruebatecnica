# Usar la versión Slim de Debian para máxima compatibilidad con psycopg2-binary
FROM python:3.12-slim

# Evitar archivos .pyc y asegurar logs instantáneos
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instalar libpq (runtime para postgres) sin los pesados build-deps
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar requerimientos e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el contenido del backend
# Gracias al .dockerignore, esto NO incluirá el frontend ni el venv pesado
COPY . .

# Exponer el puerto
EXPOSE 5000

# Usar Gunicorn con configuraciones para bajos recursos
# --workers 1: Reduce el consumo de RAM drásticamente (ideal para 512MB)
# --threads 4: Permite manejar varias peticiones sin subir el uso de memoria base
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "4", "main:app"]
