# Usar Alpine para el menor tamaño posible
FROM python:3.12-alpine

# Evitar archivos temporales de Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instalar dependencias mínimas para PostgreSQL en Alpine
# build-base es necesario para compilar algunas librerías si fuera necesario
RUN apk add --no-cache postgresql-dev gcc musl-dev libffi-dev

WORKDIR /app

# Instalar requerimientos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend solamente
COPY . .

# Exponer puerto
EXPOSE 5000

# Usar Gunicorn para producción (consume menos recursos que el modo debug de Flask)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "main:app"]
