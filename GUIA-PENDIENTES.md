# Guía Paso a Paso — Pendientes para Página Óptima

Lista de tareas pendientes para dejar la página de Corembrion lista para producción.

---

## 1. Configurar el correo info@corembrion.com

### 1.1 Crear el correo

1. En tu proveedor de dominio (Namecheap u otro):
   - **Email** → **Create** o **Forwarding**
   - Crear: `info@corembrion.com`
   - Opciones: reenvío a otro correo o buzón propio

### 1.2 Verificar en el sitio

El correo ya está actualizado en el código a `info@corembrion.com`. Solo falta que el buzón exista y funcione.

### 1.3 Ubicaciones donde aparece el correo

- Header/Footer (enlaces de contacto)
- Página de Contacto
- Schema.org (SEO)

---

## 2. Formulario de contacto (EmailJS o Resend)

### 2.1 Opción A: EmailJS

1. Cuenta en [emailjs.com](https://www.emailjs.com/)
2. **Email Services** → Conectar Gmail o el correo que uses
3. **Email Templates** → Crear plantilla con variables: `{{nombre}}`, `{{email}}`, `{{mensaje}}`, etc.
   - **To Email:** `info@corembrion.com` (destino de los mensajes del formulario)
4. Crear `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```
5. Instalar: `npm install @emailjs/browser`
6. Integrar en `components/sections/Contact.tsx` (ver `PASOS-SIGUIENTES.md` Paso 3)

### 2.2 Opción B: Resend

1. Cuenta en [resend.com](https://resend.com/)
2. Verificar dominio corembrion.com
3. Crear API Key
4. Configurar en el formulario (requiere API Route en Next.js)

---

## 3. Redes sociales

### 3.1 Actualizar enlaces

Archivo: `components/layout/Footer.tsx`

Reemplazar los `href="#"` por las URLs reales:

```tsx
const socialLinks = [
  { href: "https://www.facebook.com/corembrion", ... },
  { href: "https://www.instagram.com/corembrion", ... },
  { href: "https://www.youtube.com/@corembrion", ... },
];
```

### 3.2 Si no hay red social

Eliminar la entrada del array o dejar `href="#"` (no ideal para producción).

---

## 4. Favicon e iconos PWA

### 4.1 Generar iconos

1. Usar [realfavicongenerator.net](https://realfavicongenerator.net/) o [favicon.io](https://favicon.io/)
2. Subir el logo de Corembrion
3. Descargar el paquete

### 4.2 Colocar archivos

- `favicon.ico` → `public/`
- `icon-192.png` y `icon-512.png` → `public/icons/`

### 4.3 Actualizar manifest

Archivo: `app/manifest.ts` — agregar los iconos PNG si usas esa ruta.

---

## 5. Google Analytics (opcional)

1. Crear propiedad en [analytics.google.com](https://analytics.google.com)
2. Obtener Measurement ID (ej: `G-XXXXXXXXXX`)
3. Instalar: `npm install @next/third-parties`
4. En `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// Dentro del body:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## 6. Botón de WhatsApp

**Estado:** Implementado.

El botón flotante verde aparece en la esquina inferior derecha de todas las páginas. Usa el número +57 300 282 4880. Al hacer clic, abre WhatsApp con un mensaje predeterminado.

**Para cambiar el mensaje:** Editar `components/WhatsAppButton.tsx` — variable `MESSAGE`.

---

## 7. Revisión final antes de publicar

- [ ] Todas las imágenes optimizadas (ver `GUIA-IMAGENES.md`)
- [ ] Correo info@corembrion.com configurado
- [ ] Formulario de contacto enviando emails
- [ ] Enlaces de redes sociales actualizados
- [ ] Favicon e iconos PWA generados
- [ ] Sitio desplegado en Vercel
- [ ] Dominio www.corembrion.com apuntando correctamente
- [ ] Probar en móvil y desktop
- [ ] Revisar que el botón de WhatsApp funcione

---

## Orden sugerido

1. **Inmediato:** Correo, WhatsApp (ya implementado)
2. **Corto plazo:** Formulario de contacto, redes sociales
3. **Antes de publicar:** Favicon, iconos PWA
4. **Después de publicar:** Google Analytics
