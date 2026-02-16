# Gestión de Proyectos - Corembrion

## Cómo agregar nuevos proyectos

Edita el archivo `projects.json` y agrega un nuevo objeto con la siguiente estructura:

```json
{
  "id": "13",
  "titulo": "Nombre del proyecto",
  "categoria": "piscicultura",
  "descripcion": "Descripción detallada del proyecto...",
  "valor": 1000000000,
  "fecha": "2025",
  "contrato": "CONTRATO-XXX-2025",
  "municipio": "Nombre del municipio",
  "imagen": "url-opcional-de-imagen",
  "logros": ["Logro 1", "Logro 2", "Logro 3"]
}
```

### Categorías válidas
- `piscicultura`
- `agricultura`
- `formacion`
- `turismo`

### Imágenes
- Si no se especifica `imagen`, se usará una imagen placeholder por defecto
- Para usar imágenes propias, colócalas en `/public/images/proyectos/` y referencia con `/images/proyectos/nombre-archivo.jpg`
