# Sistema Nevados · Playground de diseño

Mesa de trabajo visual para estandarizar los proyectos de la empresa
(Forms, Dashboard, Clientes, emails) **sin experimentar en producción**.

Abrir `index.html` en el navegador. Sin build, sin dependencias
(solo CDNs de fuentes; funciona offline salvo las webfonts).

## Qué hay

| Archivo            | Rol                                                        |
| ------------------ | ---------------------------------------------------------- |
| `tokens.css`       | Único punto de verdad: color, tipo, espaciado, sombras…     |
| `tokens.json`      | Espejo máquina de los tokens (para agentes IA).            |
| `COMPONENTS.md`    | Catálogo de clases, variantes y reglas (para agentes IA).  |
| `components.css`   | Botones, pills, cards, forms, tablas, alertas, layout.      |
| `app.js`           | Tema claro/oscuro, copiar hex, reveals, demos. Sin librerías. |
| `assets/`          | Fotos, logos, iconos y Montserrat self-hosted (símbolos vía CDN). |
| `index.html`       | Catálogo visual por secciones.                              |

## Reglas del juego

1. **Los tokens mandan.** Nada de hex sueltos fuera de `tokens.css`.
2. **Un acento**: cobre. Los semáforos (verde/ámbar/rojo/cielo) son del
   sistema operativo y no se reinventan por pantalla.
3. **Montserrat siempre** (marca); mono solo para código/tokens.
4. Probar **ambos temas** antes de llevar algo a un proyecto.
5. Lo que se aprueba acá se copia tal cual; lo que no, no sale de acá.
6. Los CSS/JS llevan `?v=fecha`: si el navegador muestra algo viejo,
   recarga fuerte (Ctrl+Shift+R).

## Llevar a un proyecto

1. Copiar las variables necesarias de `tokens.css`.
2. Copiar el bloque del componente desde `components.css`.
3. Ajustar solo espaciados de contexto, nunca colores ni radios.
