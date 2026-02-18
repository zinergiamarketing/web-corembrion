# Guía para Agregar Imágenes a la Página Web Corembrion

## Estructura de carpetas

Todas las imágenes deben guardarse dentro de la carpeta `public/images/` con la siguiente estructura:

```
public/images/
├── hero/           → Imagen principal del banner de inicio
├── nosotros/       → Fotos de la sección "Quiénes Somos"
├── proyectos/     → Fotos de cada proyecto
├── galeria/       → Fotos para la galería (varias categorías)
└── areas/         → Fotos opcionales para Áreas de Trabajo
```

---

## Especificaciones por sección

### 1. Hero (Banner principal)

| Especificación | Valor |
|----------------|-------|
| **Carpeta** | `public/images/hero/` |
| **Nombre** | `hero-1.jpeg`, `hero-2.jpeg`, etc. |
| **Tamaño** | 1920 x 1080 px (mínimo) |
| **Formato** | JPG o JPEG (mejor compresión) |
| **Peso máximo** | 500 KB (optimizar antes de subir) |
| **Uso** | Imagen de fondo del banner de inicio |

**Dónde actualizar en el código:** `components/sections/Hero.tsx` línea ~12

---

### 2. Nosotros (Quiénes Somos)

| Especificación | Valor |
|----------------|-------|
| **Carpeta** | `public/images/nosotros/` |
| **Nombre** | `nosotros-1.jpeg`, `nosotros-2.jpeg`, etc. |
| **Tamaño** | 1200 x 675 px (relación 16:9) |
| **Formato** | JPG o JPEG |
| **Peso máximo** | 300 KB |
| **Uso** | Imagen debajo de Misión, Visión y Objeto Social |

**Dónde actualizar:** `components/sections/AboutUs.tsx` línea ~70

---

### 3. Proyectos

| Especificación | Valor |
|----------------|-------|
| **Carpeta** | `public/images/proyectos/` |
| **Nombre** | `proyecto-1.jpeg`, `proyecto-2.jpeg`, ... `proyecto-12.jpeg` |
| **Tamaño** | 800 x 450 px (relación 16:9) |
| **Formato** | JPG o JPEG |
| **Peso máximo** | 200 KB por imagen |
| **Uso** | Tarjetas de proyectos y página de detalle |

**Cómo vincular a un proyecto específico:** Editar `data/projects.json` y agregar el campo `imagen`:

```json
{
  "id": "1",
  "titulo": "Fomento actividad piscícola Ayapel",
  "imagen": "/images/proyectos/proyecto-1.jpeg",
  ...
}
```

**Imagen por defecto:** Si un proyecto no tiene `imagen`, se usa `proyecto-1.jpeg`

---

### 4. Galería

| Especificación | Valor |
|----------------|-------|
| **Carpeta** | `public/images/galeria/` |
| **Nombre** | `galeria-1.jpeg`, `galeria-2.jpeg`, etc. (o por categoría: `proyectos-1.jpeg`, `comunidades-1.jpeg`) |
| **Tamaño** | 800 x 800 px (cuadradas) o 800 x 600 px |
| **Formato** | JPG o JPEG |
| **Peso máximo** | 250 KB por imagen |
| **Categorías** | Proyectos, Comunidades, Capacitaciones, Naturaleza |

**Dónde actualizar:** `components/sections/Gallery.tsx` — agregar al array `galleryItems` (líneas ~9-13):

```tsx
const galleryItems = [
  { id: 1, src: "/images/galeria/proyectos-1.jpeg", category: "Proyectos", alt: "Descripción de la imagen" },
  { id: 2, src: "/images/galeria/comunidades-1.jpeg", category: "Comunidades", alt: "Descripción" },
  // ... más imágenes
];
```

---

## Resumen de nombres y tamaños

| Carpeta | Nombre sugerido | Tamaño (px) |
|---------|-----------------|-------------|
| hero/ | hero-1.jpeg | 1920 x 1080 |
| nosotros/ | nosotros-1.jpeg | 1200 x 675 |
| proyectos/ | proyecto-1.jpeg a proyecto-N.jpeg | 800 x 450 |
| galeria/ | galeria-1.jpeg o [categoria]-N.jpeg | 800 x 800 |

---

## Herramientas para optimizar imágenes

Antes de subir, optimiza las imágenes para web:

- **TinyPNG** (tinypng.com) — Comprime JPG/PNG sin perder calidad visible
- **Squoosh** (squoosh.app) — Herramienta de Google para redimensionar y comprimir

---

## Checklist al agregar una imagen

1. [ ] Redimensionar al tamaño indicado
2. [ ] Comprimir (objetivo: peso indicado)
3. [ ] Guardar en la carpeta correcta
4. [ ] Usar el nombre indicado
5. [ ] Actualizar el código si es necesario (Galería, projects.json)
6. [ ] Probar que se ve correctamente en móvil y desktop
