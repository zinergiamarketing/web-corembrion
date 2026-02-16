# Guía Detallada: Despliegue en Vercel + Configuración DNS Namecheap

Esta guía te lleva paso a paso desde el código local hasta tener **www.corembrion.com** funcionando en producción.

---

## Parte A: Preparación (GitHub + GitHub Desktop)

### A.1 Crear el repositorio en GitHub (primero, en la web)

1. Ve a [github.com](https://github.com) e **inicia sesión**
2. Clic en el botón **"+"** (arriba derecha) → **New repository**
3. Configuración:
   - **Repository name:** `web-corembrion` (o el nombre que prefieras)
   - **Description:** Sitio web Corembrion (opcional)
   - **Visibility:** **Private** o **Public**
   - **Importante:** **NO** marques "Add a README file"
   - **NO** agregues .gitignore ni licencia (el proyecto ya los tiene)
4. Clic en **Create repository**
5. **Deja esta pestaña abierta** — verás una página con instrucciones (no las uses aún)

---

### A.2 Instalar GitHub Desktop (si no lo tienes)

1. Descarga desde [desktop.github.com](https://desktop.github.com/)
2. Instala y abre GitHub Desktop
3. **File** → **Options** → **Accounts** → **Sign in to GitHub.com** (inicia sesión con tu cuenta)

---

### A.3 Agregar el proyecto local a GitHub Desktop

**Opción A — El proyecto ya existe en tu PC (tu caso):**

1. En GitHub Desktop: **File** → **Add local repository...**
2. Haz clic en **Choose...** y navega hasta:
   ```
   c:\Users\joser\Documents\Jose\Trabajos\Corembrion\web-corembrion
   ```
3. Clic en **Add repository**

**Si aparece "This directory does not appear to be a Git repository":**

1. Clic en **create a repository**
2. O en la terminal/PowerShell ejecuta primero:
   ```bash
   cd c:\Users\joser\Documents\Jose\Trabajos\Corembrion\web-corembrion
   git init
   ```
3. Luego vuelve a **Add local repository** en GitHub Desktop

---

### A.4 Hacer el primer commit

1. En GitHub Desktop verás todos los archivos del proyecto en el panel izquierdo
2. En la esquina inferior izquierda, en **Summary**, escribe: `Sitio web Corembrion - listo para deploy`
3. (Opcional) En **Description** puedes agregar más detalles
4. Clic en el botón azul **Commit to main**

---

### A.5 Publicar / Conectar con el repositorio de GitHub

1. Después del commit, verás el botón **Publish repository** (o **Publish branch** si ya publicaste antes)
2. Clic en **Publish repository**
3. Se abrirá un panel con opciones:
   - **Name:** `web-corembrion` (debe coincidir con el repo que creaste)
   - **Description:** (opcional)
   - **Keep this code private:** márcalo si quieres repo privado
   - **Organization:** déjalo en "None" si es tu cuenta personal
4. **Importante:** Desmarca **"Add a README"** si aparece (ya tienes archivos)
5. Clic en **Publish Repository**

**Si el repositorio ya existe en GitHub** (lo creaste en el paso A.1):

1. En lugar de "Publish repository", puede aparecer **"Push origin"** o un mensaje de conexión
2. Si GitHub Desktop no detecta el repo remoto:
   - **Repository** → **Repository settings...**
   - En **Primary remote repository**, pega la URL: `https://github.com/TU_USUARIO/web-corembrion.git`
   - O: **Repository** → **Open in Command Prompt** y ejecuta:
     ```bash
     git remote add origin https://github.com/TU_USUARIO/web-corembrion.git
     git push -u origin main
     ```

---

### A.6 Verificar la conexión

1. Ve a [github.com](https://github.com) → tu perfil → **Repositories**
2. Deberías ver **web-corembrion** con todos los archivos
3. En GitHub Desktop, en la barra superior debe decir algo como: `Current repository: web-corembrion`

---

### A.7 Subir cambios en el futuro (con GitHub Desktop)

1. Haz los cambios en tu código
2. Abre GitHub Desktop
3. Verás los archivos modificados en el panel
4. Escribe el mensaje del commit (ej: "Actualizar imágenes")
5. Clic en **Commit to main**
6. Clic en **Push origin** (arriba) para subir a GitHub

---

### Alternativa: Usar solo la terminal (sin GitHub Desktop)

Si prefieres usar comandos, en PowerShell dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Sitio web Corembrion - listo para deploy"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/web-corembrion.git
git push -u origin main
```

(Reemplaza `TU_USUARIO` con tu usuario de GitHub. Si pide contraseña, usa un Personal Access Token.)

---

## Parte B: Despliegue en Vercel

### B.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Clic en **Sign Up**
3. Elige **Continue with GitHub** (recomendado para conexión automática)
4. Autoriza a Vercel a acceder a tus repositorios de GitHub

### B.2 Importar el proyecto

1. En el dashboard de Vercel, clic en **Add New...** → **Project**
2. Verás la lista de repositorios de GitHub
3. Busca **web-corembrion** y clic en **Import**

### B.3 Configurar el proyecto (pantalla de importación)

| Campo | Valor | Notas |
|-------|-------|-------|
| **Project Name** | `web-corembrion` | O `corembrion` si prefieres |
| **Framework Preset** | Next.js | Debe detectarse automáticamente |
| **Root Directory** | `./` | Dejar vacío o `.` |
| **Build Command** | `npm run build` | Por defecto |
| **Output Directory** | (vacío) | Next.js lo maneja |
| **Install Command** | `npm install` | Por defecto |

**NO hagas clic en Deploy todavía.**

### B.4 Agregar variables de entorno (opcional pero recomendado)

1. En la misma pantalla, expande **Environment Variables**
2. Agrega (para que el sitio tenga la URL correcta):
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://www.corembrion.com`
   - **Environment:** Production (y Preview si quieres)

3. Si más adelante configuras EmailJS, agrega aquí las variables correspondientes.

### B.5 Ejecutar el primer deploy

1. Clic en **Deploy**
2. Espera 1-3 minutos
3. Verás el progreso: Building → Deploying
4. Al terminar: **Congratulations!** con una URL tipo `https://web-corembrion.vercel.app`

### B.6 Verificar que el sitio funciona

1. Clic en **Visit** o abre la URL generada
2. Comprueba que el sitio carga correctamente
3. Navega por las páginas (Inicio, Nosotros, Proyectos, Contacto)

---

## Parte C: Conectar el dominio de Namecheap

### C.1 Agregar el dominio en Vercel

1. En el proyecto de Vercel, ve a la pestaña **Settings**
2. En el menú lateral: **Domains**
3. En el campo "Enter domain", escribe: `www.corembrion.com`
4. Clic en **Add**

5. Vercel mostrará un mensaje indicando que el dominio no está configurado
6. Te dará **dos opciones** de configuración. Elige una:

---

### C.2 OPCIÓN 1: Usar nameservers de Vercel (más simple)

**En Vercel:**
- Verás los nameservers que debes usar, por ejemplo:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

**En Namecheap:**
1. Inicia sesión en [namecheap.com](https://www.namecheap.com)
2. **Domain List** → busca `corembrion.com` → **Manage**
3. En la sección **Nameservers**, clic en el dropdown
4. Selecciona **Custom DNS**
5. En el primer campo: `ns1.vercel-dns.com`
6. En el segundo campo: `ns2.vercel-dns.com`
7. Clic en el **checkmark verde** para guardar

**Ventaja:** Vercel gestiona todo el DNS. No necesitas agregar registros manualmente.

**Desventaja:** Los nameservers de Namecheap dejan de usarse para este dominio.

---

### C.3 OPCIÓN 2: Mantener nameservers de Namecheap (más control)

**En Namecheap:**
1. **Domain List** → **Manage** en `corembrion.com`
2. Pestaña **Advanced DNS**
3. Elimina o edita los registros existentes si es necesario
4. Agrega estos registros **uno por uno**:

| Tipo | Host | Valor | TTL |
|------|------|-------|-----|
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |

**Cómo agregar cada registro:**
- Clic en **Add New Record**
- Para el A Record: Tipo = A, Host = @, Value = 76.76.21.21
- Para el CNAME: Tipo = CNAME, Host = www, Value = cname.vercel-dns.com
- TTL = Automatic (o 300 si prefieres)

**Nota:** La IP `76.76.21.21` es la de Vercel. Si Vercel te indica otra en la pantalla de Domains, usa esa.

5. Guarda los cambios (Namecheap suele guardar automáticamente)

---

### C.4 Agregar también el dominio raíz (sin www) en Vercel

1. En Vercel → **Settings** → **Domains**
2. Agrega también: `corembrion.com` (sin www)
3. Vercel te pedirá configurar un redirect o un registro A
4. Si usaste Opción 2, el registro A con `@` ya apunta el dominio raíz
5. Recomendación: Configura en Vercel que `corembrion.com` redirija a `www.corembrion.com`

---

## Parte D: Verificación y SSL

### D.1 Esperar la propagación DNS

- **Tiempo típico:** 10 minutos a 2 horas
- **Máximo:** hasta 48 horas (raro)
- Puedes verificar el estado en: [dnschecker.org](https://dnschecker.org) — busca `www.corembrion.com`

### D.2 Verificar en Vercel

1. En **Settings** → **Domains**
2. El dominio debe mostrar un **checkmark verde** cuando esté configurado
3. Si muestra error, revisa que los registros DNS en Namecheap sean correctos

### D.3 Probar el sitio

1. Abre una ventana de incógnito (para evitar caché)
2. Visita: `https://www.corembrion.com`
3. Verifica que:
   - El sitio carga
   - El candado (SSL) aparece en la barra de direcciones
   - Las imágenes y el logo se ven correctamente

### D.4 SSL/HTTPS

- Vercel emite el certificado SSL automáticamente
- No necesitas hacer nada adicional
- Si ves "No seguro", espera unos minutos más a que se active el certificado

---

## Resolución de problemas

### El sitio no carga en www.corembrion.com

1. **Verifica los registros DNS:** [dnschecker.org](https://dnschecker.org) → introduce `www.corembrion.com` → verifica que apunte a Vercel
2. **Limpia la caché DNS** en tu PC:
   - PowerShell (como admin): `ipconfig /flushdns`
3. **Prueba en otro navegador o dispositivo**

### Error "Domain not configured" en Vercel

- Los registros DNS aún no han propagado. Espera 30-60 minutos más.
- Verifica que escribiste correctamente: `cname.vercel-dns.com` (sin espacios, sin http://)

### El deploy falla en Vercel

1. Ve a **Deployments** → clic en el deploy fallido → **View Build Logs**
2. Revisa el error. Común: falta una dependencia → ejecuta `npm run build` localmente para reproducir
3. Corrige el error, haz commit y push. Vercel hará un nuevo deploy automático.

### Cambios que no se ven

- Vercel hace deploy automático con cada `git push`
- Si no ves cambios: verifica que hiciste push a la rama correcta (main)
- Puede haber caché: prueba en incógnito o espera unos minutos

---

## Resumen del flujo completo

```
[Código local] 
    → git push 
[GitHub] 
    → Vercel detecta cambios y hace deploy automático
[Vercel] 
    → Sirve el sitio en web-corembrion.vercel.app
[DNS Namecheap] 
    → www.corembrion.com apunta a Vercel
[Usuario] 
    → Visita www.corembrion.com → ve el sitio en Vercel
```

---

## Checklist final

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Primer deploy exitoso (URL .vercel.app funciona)
- [ ] Dominio www.corembrion.com agregado en Vercel
- [ ] DNS configurado en Namecheap (Opción 1 o 2)
- [ ] Propagación DNS completada (checkmark verde en Vercel)
- [ ] Sitio accesible en https://www.corembrion.com
- [ ] SSL/HTTPS activo (candado en el navegador)
