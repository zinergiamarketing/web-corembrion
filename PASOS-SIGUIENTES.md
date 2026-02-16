# Guía Paso a Paso - Próximos Pasos Corembrion

Esta guía detalla cada acción necesaria para dejar el sitio web listo para producción.

---

## Paso 1: Agregar el Logo de Corembrion

### 1.1 Especificaciones exactas del logo

| Especificación | Valor |
|----------------|-------|
| **Nombre del archivo** | `logo.png` |
| **Formato** | PNG (mejor compatibilidad que SVG en este caso) |
| **Tamaño** | 256 x 256 píxeles (mínimo 128 x 128) |
| **Fondo** | **Transparente** (obligatorio para que se vea bien sobre el header blanco y el footer oscuro) |

**¿Por qué PNG con fondo transparente?**
- El header cambia de transparente (sobre el hero) a blanco (al hacer scroll)
- El footer tiene fondo oscuro (#1a1a1a)
- Con fondo transparente, el logo se adapta a cualquier fondo
- PNG soporta transparencia; JPG no

**Alternativa:** Si tienes el logo en SVG, usa `logo.svg` — es más flexible y escalable, pero verifica que el SVG no tenga fondo definido.

### 1.2 Ubicación del archivo

1. Crea la carpeta `public/logos/` si no existe
2. Coloca el logo con el nombre exacto: **`logo.png`**
   - Ruta final: `public/logos/logo.png`

### 1.3 Actualizar el Header

1. Abre el archivo: `components/layout/Header.tsx`
2. Busca la sección del logo (líneas ~25-35):
```tsx
<Link href="/" className="flex items-center gap-2" aria-label="Corembrion - Inicio">
  <div className="w-12 h-12 rounded-lg bg-[#1a4792] flex items-center justify-center">
    <span className="text-white font-bold text-xl">C</span>
  </div>
  <span className={`font-bold text-xl ${useLightNav ? "text-white" : "text-[#1a1a1a]"}`}>
    Corembrion
  </span>
</Link>
```
3. Reemplaza por:
```tsx
<Link href="/" className="flex items-center gap-2" aria-label="Corembrion - Inicio">
  <Image
    src="/logos/logo.png"
    alt="Logo Corembrion"
    width={48}
    height={48}
    className="object-contain"
  />
  <span className={`font-bold text-xl ${useLightNav ? "text-white" : "text-[#1a1a1a]"}`}>
    Corembrion
  </span>
</Link>
```
4. Agrega el import de Image al inicio del archivo:
```tsx
import Image from "next/image";
```

### 1.4 Actualizar el Footer

1. Abre: `components/layout/Footer.tsx`
2. Busca la sección del logo (líneas ~25-35)
3. Reemplaza el bloque del logo por:
```tsx
<Link href="/" className="flex items-center gap-2 mb-4">
  <Image
    src="/logos/logo.png"
    alt="Logo Corembrion"
    width={40}
    height={40}
    className="object-contain"
  />
  <span className="font-bold text-xl">Corembrion</span>
</Link>
```
4. Agrega: `import Image from "next/image";`

---

## Paso 2: Reemplazar Imágenes Placeholder

### 2.1 Organizar las imágenes del cliente

Crea la siguiente estructura en `public/images/`:

```
public/images/
├── hero/           → Imagen principal del Hero (paisaje, comunidad, región)
├── nosotros/       → Foto de comunidades, campo, pescadores
├── proyectos/      → Fotos de cada proyecto (opcional: proyecto-1.jpg, proyecto-2.jpg...)
└── galeria/        → Fotos para la galería (proyectos, comunidades, capacitaciones, naturaleza)
```

### 2.2 Especificaciones técnicas

| Ubicación | Tamaño recomendado | Formato |
|-----------|---------------------|---------|
| Hero | 1920x1080 px mínimo | JPG/WebP |
| Nosotros | 1200x600 px | JPG/WebP |
| Proyectos | 600x400 px c/u | JPG/WebP |
| Galería | 800x800 px mínimo | JPG/WebP |

### 2.3 Ubicaciones a actualizar en el código

**Hero** (`components/sections/Hero.tsx`):
- Línea ~12: Cambiar la URL de `src` en el componente Image
- De: `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80`
- A: `/images/hero/hero-imagen.jpg`

**Nosotros** (`components/sections/AboutUs.tsx`):
- Línea ~45: Imagen de la sección "Quiénes Somos"
- De: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80`
- A: `/images/nosotros/comunidades.jpg`

**Proyectos** (`components/ProjectCard.tsx` y `app/proyectos/[id]/page.tsx`):
- Para usar imágenes por proyecto: editar `data/projects.json` y agregar el campo `imagen`:
```json
{
  "id": "1",
  "titulo": "Fomento actividad piscícola Ayapel",
  "imagen": "/images/proyectos/proyecto-1.jpg",
  ...
}
```
- Luego actualizar `ProjectCard.tsx` línea ~23: usar `proyecto.imagen || "/images/proyectos/default.jpg"`
- Y `app/proyectos/[id]/page.tsx` línea ~52: usar `proyecto.imagen || "..."`

**Galería** (`components/sections/Gallery.tsx`):
- Líneas ~15-20: Reemplazar el array `galleryItems` con las rutas locales:
```tsx
const galleryItems = [
  { id: 1, src: "/images/galeria/proyecto-1.jpg", category: "Proyectos", alt: "Descripción" },
  { id: 2, src: "/images/galeria/comunidad-1.jpg", category: "Comunidades", alt: "Descripción" },
  // ... más imágenes
];
```

---

## Paso 3: Configurar Formulario de Contacto (EmailJS)

### 3.1 Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate gratis (plan gratuito: 200 emails/mes)
3. Inicia sesión en el dashboard

### 3.2 Conectar cuenta de email

1. En el dashboard: **Email Services** → **Add New Service**
2. Elige **Gmail** (o el proveedor que uses)
3. Conecta tu cuenta: `corembrion@hotmail.com`
4. Guarda el **Service ID** (ej: `service_abc123`)

### 3.3 Crear plantilla de email

1. **Email Templates** → **Create New Template**
2. Configura:
   - **Name:** Corembrion Contacto
   - **To Email:** `corembrion@hotmail.com`
   - **Subject:** `{{asunto}}` (o "Contacto desde web Corembrion")
   - **Content:**
   ```
   Nuevo mensaje desde el sitio web:
   
   Nombre: {{nombre}}
   Email: {{email}}
   Teléfono: {{telefono}}
   Asunto: {{asunto}}
   
   Mensaje:
   {{mensaje}}
   ```
3. En **Settings** → **Variables**: asegúrate de que coincidan con los nombres del formulario
4. Guarda el **Template ID** (ej: `template_xyz789`)

### 3.4 Obtener Public Key

1. **Account** → **API Keys** (o **General**)
2. Copia el **Public Key**

### 3.5 Configurar variables de entorno

1. Crea el archivo `.env.local` en la raíz del proyecto (copia de `.env.example`)
2. Agrega:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 3.6 Instalar EmailJS e integrar en el código

1. Ejecuta: `npm install @emailjs/browser`
2. Abre: `components/sections/Contact.tsx`
3. Agrega al inicio del archivo:
```tsx
import emailjs from '@emailjs/browser';
```
4. En la función `onSubmit`, reemplaza el bloque `try` actual por:
```tsx
try {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      asunto: data.asunto,
      mensaje: data.mensaje,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
  setSubmitStatus("success");
  reset();
} catch {
  setSubmitStatus("error");
}
```

### 3.7 Verificar

1. Reinicia el servidor: `npm run dev`
2. Ve a la página de contacto
3. Envía un mensaje de prueba
4. Revisa la bandeja de `corembrion@hotmail.com`

---

## Paso 4: Actualizar Enlaces de Redes Sociales

### 4.1 Ubicación

Archivo: `components/layout/Footer.tsx`

### 4.2 Reemplazar URLs

Busca el array `socialLinks` (líneas ~15-20) y actualiza las URLs:

```tsx
const socialLinks = [
  { href: "https://www.facebook.com/corembrion", label: "Facebook", icon: "..." },
  { href: "https://www.instagram.com/corembrion", label: "Instagram", icon: "..." },
  { href: "https://www.youtube.com/@corembrion", label: "YouTube", icon: "..." },
];
```

### 4.3 Si no tienes alguna red

- Comenta o elimina la entrada del array
- O deja `href: "#"` temporalmente (no ideal para producción)

---

## Paso 5: Generar Favicon e Iconos PWA

### 5.1 Favicon

1. Usa una herramienta como [favicon.io](https://favicon.io/) o [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Sube el logo de Corembrion
3. Descarga el paquete
4. Coloca `favicon.ico` en `public/`
5. Opcional: coloca `apple-touch-icon.png` (180x180) en `public/`

### 5.2 Iconos PWA (para instalación en móvil)

1. Genera iconos en [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Necesitas: 192x192 y 512x512 px
3. Crea la carpeta: `public/icons/`
4. Coloca: `icon-192.png` y `icon-512.png`
5. Actualiza `app/manifest.ts`:
```ts
icons: [
  { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
  { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
],
```

---

## Paso 6: Desplegar en Vercel

### 6.1 Preparar el repositorio

1. Si no tienes Git: `git init` en la carpeta del proyecto
2. Crea un repositorio en GitHub (ej: `corembrion/web-corembrion`)
3. Sube el código:
```bash
git add .
git commit -m "Sitio web Corembrion"
git branch -M main
git remote add origin https://github.com/SU_USUARIO/web-corembrion.git
git push -u origin main
```

### 6.2 Conectar a Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. **Add New** → **Project**
3. Importa el repositorio de GitHub
4. Configuración:
   - **Framework Preset:** Next.js (detectado automáticamente)
   - **Root Directory:** `./` (dejar vacío o `.`)
   - **Build Command:** `npm run build` (por defecto)
   - **Output Directory:** `.next` (por defecto)

### 6.3 Variables de entorno en Vercel

1. En el proyecto: **Settings** → **Environment Variables**
2. Agrega cada variable de `.env.local`:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.corembrion.com`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### 6.4 Deploy

1. **Deploy** → espera a que termine
2. Obtendrás una URL temporal: `https://web-corembrion.vercel.app`

---

## Paso 7: Configurar DNS en Namecheap

### 7.1 Obtener datos de Vercel

1. En Vercel: **Project** → **Settings** → **Domains**
2. Agrega el dominio: `www.corembrion.com`
3. Vercel te mostrará los registros DNS necesarios

### 7.2 Configurar en Namecheap

1. Inicia sesión en [namecheap.com](https://www.namecheap.com)
2. **Domain List** → **Manage** en `corembrion.com`
3. **Advanced DNS** tab

### 7.3 Registros a agregar

**Opción A - Usando Vercel nameservers (recomendado):**

1. En Namecheap: **Nameservers** → **Custom DNS**
2. Agrega los nameservers que Vercel te indique (ej: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)

**Opción B - Manteniendo nameservers de Namecheap:**

Agrega estos registros en **Advanced DNS**:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

### 7.4 SSL/HTTPS

- Vercel activa SSL automáticamente
- La propagación DNS puede tardar 24-48 horas

### 7.5 Verificar

1. Espera 10-30 minutos (o hasta 48h)
2. Visita `https://www.corembrion.com`
3. Verifica que cargue correctamente

---

## Paso 8: Google Analytics (Opcional)

### 8.1 Crear propiedad

1. [analytics.google.com](https://analytics.google.com) → **Admin** → **Create Property**
2. Nombre: **Corembrion Web**
3. URL: `https://www.corembrion.com`
4. Crea y obtén el **Measurement ID** (ej: `G-XXXXXXXXXX`)

### 8.2 Agregar al sitio

1. Instala: `npm install @next/third-parties`
2. En `app/layout.tsx`, agrega:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```
3. Reemplaza `G-XXXXXXXXXX` con tu ID real

---

## Checklist Final

- [ ] Logo agregado en Header y Footer
- [ ] Imágenes reales en Hero, Nosotros, Proyectos y Galería
- [ ] Formulario de contacto enviando emails correctamente
- [ ] Enlaces de redes sociales actualizados
- [ ] Favicon e iconos PWA generados
- [ ] Sitio desplegado en Vercel
- [ ] Dominio www.corembrion.com apuntando correctamente
- [ ] SSL/HTTPS funcionando
- [ ] Google Analytics configurado (opcional)

---

## Soporte

Si encuentras problemas en algún paso, revisa:
- Los logs de la consola del navegador (F12)
- Los logs de Vercel en el deploy
- La documentación de [Next.js](https://nextjs.org/docs), [EmailJS](https://www.emailjs.com/docs/), [Vercel](https://vercel.com/docs)
