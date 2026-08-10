# Formulario de inscripción - Dimensión Extensión

Formulario público para el Taller de Factores Críticos - Dimensión Extensión: static HTML/CSS/JavaScript, un endpoint serverless de Vercel y persistencia en Supabase.

## Setup

1. Copy `.env.example` to `.env.local` in Vercel/local development.
2. Replace the placeholder `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` values with the real Supabase project values when you are ready to submit records. Keep the service-role key server-only in Vercel/local env; never put it in browser code.
3. Set `ALLOWED_ORIGIN` to the deployed site origin.
4. Run `sql/004_enrollment_submissions_extension.sql` in the Supabase SQL editor to create the new table for Extensión.
5. Confirm the production images exist at `assets/splash-unsj-horizontal.png` and `assets/hero-banner.jpg`.

## Event details

El formulario corresponde al encuentro participativo “Taller de Factores Críticos - Dimensión Extensión”.

- Fecha: 25 de agosto de 2026
- Horario: 15:00 hs.
- Lugar: Escuela Universitaria de Ciencias de la Salud
- Descripción: En este encuentro vamos a compartir miradas, identificar desafíos y construir escenarios para la UNSJ del 2050.

## Registration period

The opening and closing dates are centralized in `form-config.js`:

```js
startsAt: "2026-08-11T00:00:00-03:00",
expiresAt: "2026-08-20T23:59:59-03:00",
```

The form is available from August 11, 2026 at 00:00 through August 20, 2026 at 23:59:59, Argentina time. Before opening and after closing, both the browser and the server endpoint reject submissions.

## Stored data

All visible fields are required:

- Nombre(s)
- Apellido(s)
- DNI
- Género
- Email
- Teléfono
- Unidad académica / Institución / Organización / Empresa
- Departamento de residencia

Submissions are stored in `public.enrollment_submissions_extension`. DNI is normalized to the single `dni` column, must have 7 or 8 digits, and is protected by a unique constraint inside the Extensión table.

The allowed gender values are exactly `Femenino`, `Masculino`, `No binario`, and `Otro`. The allowed residence departments are the 19 departments of San Juan: `Albardón`, `Angaco`, `Calingasta`, `Capital`, `Caucete`, `Chimbas`, `Iglesia`, `Jáchal`, `9 de Julio`, `Pocito`, `Rawson`, `Rivadavia`, `San Martín`, `Santa Lucía`, `Sarmiento`, `Ullum`, `Valle Fértil`, `25 de Mayo`, and `Zonda`.

## Local run

You can open `index.html` directly in the browser for a static UI preview. The page uses relative asset paths, so CSS, JavaScript, and images load from the project folder under `file://`. If an image is missing, the rest of the form still loads for preview.

Direct `file://` preview cannot call `POST /api/submit`; there is no local server or Vercel function runtime behind that URL. In that mode, the browser shows a clear message instead of attempting a broken submission.

Use Vercel's local runtime for real endpoint checks:

```bash
vercel dev
```

## Deployment notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or `NEXT_PUBLIC_`/client-prefixed variables.
- All writes go through `POST /api/submit`.
- Run `sql/004_enrollment_submissions_extension.sql` before deploying the updated endpoint.
- Existing IyC tables are not reused by this form; Extensión writes to `enrollment_submissions_extension`.
- The honeypot and in-memory rate limit are first-slice abuse protections, not a durable anti-abuse system.

## Manual test checklist

- Splash auto-advances after about 2.4 seconds.
- Missing image assets still allow the form to appear.
- Opening `index.html` through `file://` loads local assets and blocks submit with the local-preview message.
- Running through `vercel dev` keeps `POST /api/submit` available for endpoint checks.
- Required fields show field-level attention.
- Allowed gender values are exactly `Femenino`, `Masculino`, `No binario`, and `Otro`.
- Departamento de residencia rejects values outside the 19-department controlled list.
- A valid submission opens the success popup.
- A repeated DNI returns the duplicate message.
- Browser assets do not contain Supabase service-role credentials.
- Before August 11, 2026 and after August 20, 2026 in `form-config.js`, the form is hidden and `POST /api/submit` returns `410`.

## Lightweight local verification

These checks do not require real Supabase credentials:

```bash
node --check main.js && node --check api/submit.js && node scripts/verify-local.js
```
