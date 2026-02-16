# Corembrion - Sitio Web Institucional

Sitio web de **Corembrion** (Corporación para el Desarrollo Integral), fundación con sede en Ayapel, Córdoba, Colombia.

**Dominio:** [www.corembrion.com](https://www.corembrion.com)

## Stack Tecnológico

- **Next.js 16** con App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** para animaciones
- **React Hook Form + Zod** para formularios

## Desarrollo

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Estructura del Proyecto

```
├── app/                    # Rutas y páginas
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── nosotros/
│   ├── areas-trabajo/
│   ├── proyectos/
│   │   └── [id]/          # Detalle de proyecto
│   └── contacto/
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Secciones de la página
│   ├── ui/                # Componentes reutilizables
│   └── StructuredData.tsx  # Schema.org JSON-LD
├── data/
│   └── projects.json      # Datos de proyectos
├── lib/
│   └── utils.ts
└── types/
```

## Agregar Nuevos Proyectos

Edita `data/projects.json` siguiendo la estructura documentada en `data/README.md`.

## Configuración

Copia `.env.example` a `.env.local` y configura las variables:

- `NEXT_PUBLIC_SITE_URL` - URL del sitio
- `NEXT_PUBLIC_EMAILJS_*` - Para formulario de contacto (EmailJS)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Opcional para mapas avanzados

## Imágenes

- Las imágenes actuales son placeholders de Unsplash
- Para usar imágenes propias: colócalas en `public/images/` y actualiza las referencias
- El logo de Corembrion: agregar en `public/logos/` y actualizar Header/Footer

## Deployment (Vercel)

1. Conectar el repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### DNS (Namecheap)

Para apuntar el dominio a Vercel:
- Tipo A: `@` → IP de Vercel
- CNAME: `www` → `cname.vercel-dns.com`

## Checklist de Producción

- [ ] Agregar logo de Corembrion
- [ ] Reemplazar imágenes placeholder con fotos reales
- [ ] Configurar EmailJS o Resend para formulario de contacto
- [ ] Agregar enlaces reales de redes sociales
- [ ] Generar favicon e iconos PWA (192x192, 512x512)
- [ ] Verificar Google Maps embed
- [ ] Configurar Google Analytics 4 (opcional)
