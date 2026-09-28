# Catálogo de componentes (para agentes IA y humanos)

Fuente de verdad visual: `index.html`. Fuente de verdad de valores:
`tokens.css` (+ espejo máquina en `tokens.json`).
Clases con prefijo `m-` son solo responsive (ver sección Responsive).

## Nav — `.navmenu` + `.menubtn` + `.menu`

Índice de secciones en dropdown (un botón, escala infinito): links
numerados `01–10`, cierra con clic afuera, Escape o al navegar.
`aria-expanded` sincronizado.

## Botones — `.btn` + modificador

| Clase               | Uso                                     |
| ------------------- | --------------------------------------- |
| `.btn-primary`      | Acción principal (una por vista)        |
| `.btn-accent`       | Acción de temporada/especial (cobre)    |
| `.btn-secondary`    | Acción secundaria con borde             |
| `.btn-ghost`        | Cancelar, volver, terciarias            |
| `.btn-light`        | Sobre foto (CTA de Inicio: pastilla blanca) |
| `.btn-danger`       | Destructivas (reiniciar, eliminar)      |
| `.btn-lg` / `.btn-sm` | Tamaños; base sin sufijo              |
| `.btn-block`        | Full-width (solo móvil)                 |
| `.btn-ring > svg`   | Flecha en isla circular (solo primarios con navegación) |

Estados: `:hover` (elevar/sombra), `:active` (scale 0.98), `disabled`
(45% opacidad). Texto siempre en una línea. Contraste AA verificado.

```html
<button class="btn btn-primary" type="button">Enviar reporte</button>
```

## Pills de estado — `.pill .pill-{ok,warn,ember,bad,info,neutral}`

Vocabulario fijo: Abierto/Disponible (ok), En espera (warn),
Cerrado/No disponible (bad), Programado (neutral).
11px bold, `border-radius: pill`, `white-space: nowrap`. No crear colores.
("En preparación" salió del vocabulario: vive solo en filas viejas de la
base, el backend la sigue renderizando pero ya no se ofrece.)
En oscuro los textos se aclaran (emerald/amber/red/sky-300) para AA.

## Tarjeta de captura — `.kitcard` + `.dbar` + `.ck`

Estructura única con display: **barra lateral** de 32px con el estado
escrito, cabecera con título grande (1.15rem) + icono del ítem, cuerpo
con `.ck` (chips de estado) y campos. La barra deja altura libre para
el nombre. Sin pills ni puntos duplicados: el estado vive en la barra
y en los chips.
(Migración: el Forms aún trae cinta superior + punto; adopta `dbar`
pendiente. El email ya usa su propia barra.) La cinta lleva blanco 11px bold
sobre el sólido (paridad con el Forms; excepción AA documentada, con el
punto + título como respaldo).

```html
<article class="kitcard">
  <div class="cinta cinta-ok">Abierto<small>Zona alta</small></div>
  <div class="kitcard-head">
    <span class="kitdot kitdot-ok"></span>
    <div class="kitcard-txt">
      <p class="kitcard-title">Tata</p>
      <p class="kitcard-sub">Silla cuádruple · 08:30–17:00</p>
    </div>
    <img src="..." alt="" width="24" height="24" />
  </div>
  <div class="kitcard-body">
    <div class="ck ck-ok">… (chips de estado) …</div>
  </div>
</article>
```

## Chips de estado — `.ck` + `button.is-{ok,warn,bad,info}[.is-on]`

Grid táctil (mín. 46px) con un activo por tarjeta (radio, no toggle).
El color va en el BOTÓN según su estado (como el `CHIP` del Forms):
activo = ✓ + tinte + texto de su familia; inactivo = punto · gris.
En la demo, activar un chip actualiza la `.dbar` de su tarjeta (palabra
y color) con ventana de 1200ms: si cambia de nuevo antes, se reinicia.
Regla de verdad: el chip responde optimista (control), la barra solo
pinta lo confirmado por el server (como el Forms).
Orden fijo por severidad: Abierto, En espera, Cerrado (igual que el Forms).

## Tarjeta display — `.dgrid` + `.dcard` + `.dbar .dbar-{ok,warn,bad,info}`

Variante solo-lectura para kiosco y pantallas (traída de Clientes):
grilla de 3 (1/3 cada una), barra de 32px con el estado escrito en
vertical (8px). Como la barra ya dice el estado, la tarjeta no lleva
pills ni chips. Solo el estado abierto lleva resplandor pulsante
(2.6s, como ampolleta). Hover revela la foto al 30% con gradiente que
protege el texto: entra en 600ms, sale en 1800ms (efecto rastro).

```html
<article class="dcard">
  <div class="dbar dbar-ok"><span>Abierto</span></div>
  <div class="dcard-body">
    <div class="kitcard-txt">
      <p class="kitcard-title">Tata</p>
      <p class="kitcard-sub">Silla cuádruple · 08:30–17:00</p>
    </div>
    <img src="..." alt="" width="24" height="24" />
  </div>
</article>
```

## Sistema

- `.seg[data-radio] > button[.is-on]` — control segmentado (una opción
  activa por grupo; el JS alterna `is-on` dentro del grupo). Variante con
  activo navy (como `chip-preset`) para switchers de sección: así son los
  tabs del Día Actual (ya convergen, con flechas y 44px).
- `.rango` — presets `.chip.chip-preset` (activo navy) + `.rango-fila`
  con dos `.field[type=date]` y botón Consultar + `.rango-nota`.
- `.empty` — vacío con icono, título, ayuda y acción (borde dashed).
- `.skel-row > .skel` — esqueletos de carga (pulso suave, respeta
  `prefers-reduced-motion`).
- `.errbar` — error con icono y Reintentar a la derecha.
- `.overlay[hidden] > .dialog[role=dialog]` — modal fijo con
  `.dialog-title` + `.dialog-desc`; la variante destructiva exige
  checkbox (sin tildar, el botón sigue `disabled`).
- `.token-pane` se reutiliza como panel genérico de demo en cualquier
  sección, no solo en tokens.
- `.toast[.toast-ok | .toast-err]` — avisos flotantes (`toast(msg, tipo)`
  en `app.js`).

## Navegación

- `.sidenav` — sidebar desktop (máx. 300px): `.sidenav-brand`,
  `.sidenav-grupo` (etiqueta), `.sidenav-item[.is-on]` (icono 22px +
  nombre + micro, mín. 56px; activo = pastilla navy) y `.sidenav-foot`
  con `.avatar` + salida. Items de dominio con PNG (24px); PNG sobre
  navy o en oscuro → pastilla blanca (patrón de la cinta con pill).
- `.topbar` — espejo del `AppBarTop` del Forms: `.topbar-brand` (logo +
  Reportes de Montaña / INGRESO DE DATOS), `.topbar-clock` (tile 36px con
  `calendar_today` + fecha/hora tabular), `.topbar-user` (avatar `shield`
  admin / `person` operador + usuario + rol) y `.topbar-btn` (32px
  bordeados, glifos 20px). En móvil se ocultan reloj y textos.
- `.bottombar` — 5 destinos en móvil (etiqueta 10px, mín. 52px;
  activo = pastilla navy). Destinos de dominio con PNG (lift/dif/act),
  genéricos e clima con símbolos.
- `.tabs[data-radio]` — tabs de sección con flechas `[data-prev]` /
  `[data-next]` (mismo patrón del Día Actual: `airline_seat_recline_extra`
  + downhill + hiking + ac_unit); las flechas ciclan el
  activo sin pelear con el radio; en móvil la fila scrollea.

## Contador y tabla

- `.counter-row > .counter` — pill `8/10 ABIERTOS` con `.kitdot.pulse`
  y números tabulares.
- `.table-note` — conteo + contexto bajo la tabla.

## Foco y accesibilidad

`:focus-visible` con anillo `info-solid` en todo (inputs conservan su
anillo propio). `:focus:not(:focus-visible)` sin outline para no dejar
focos pegados con mouse.

## Specs de construcción

`.spec` — anotación visible en mono 10px con el token y los valores de
construcción (radius, padding, pesos). Vive junto al componente, no en
otra página: tipografía, radios, sombras, botones, pills, cinta+chips y
dcard la llevan.

## Cards — `.shell > .shell-core` + contenido

Toda card importante usa doble-marco: bandeja (`padding: 10px`,
radio 2rem) + núcleo (radio restado, sombra-2). Variantes de contenido:
`.bento-hero` (foto + cuerpo), `.stat` (`.stat-num` tabular + `.stat-lbl`),
`.quote` (fondo navy, texto blanco).

## Formularios

El formulario real es la tarjeta de captura (`kitcard`): cinta de estado,
chips de estado, campos con etiqueta arriba y categorías de aviso.

- `.field` + `span` (etiqueta arriba, `<em>` para "(opcional)") +
  `input[type=text]` / `input[type=time]` / `select`.
- `.campo-row` para pares (ej. hora apertura/cierre).
- `.chiprow > .chip[.is-on]` con clase de categoría
  (`chip-a` aviso, `chip-i` importante, `chip-u` urgente, `chip-r`
  recordatorio, `chip-n` nota) para observaciones.
- `.check > input[type=checkbox]` para flags.
- `.acciones` para fila de botones alineada a la derecha.
- Placeholders descriptivos, nunca como etiqueta.
- Focus: borde navy + anillo `rgba(0,51,78,.12)`.

## Tablas — `table.ops` (+ `.tablewrap.shell` opcional)

`th` micro-caps; `td` con `.num` (tabular, nowrap) para horarios/datos.
Hover de fila a `--bg-sunken`. Sin bordes por fila: aire, no líneas.

## Alertas — `.alert .alert-{aviso,importante,urgente}`

Caja teñida con borde del color sólido: aviso (ámbar), importante
(naranja ember), urgente (rojo). Formato: `<strong>Icono Etiqueta:</strong>
texto`.

## Responsive

Breakpoint único 768px (`@media (max-width: 767px)`): grillas a 1 columna,
nav simplificada. Densidad doble: 44px en captura y nav móvil (chips,
tabs, segmentado, bottom-bar); 32px mínimo en acciones compactas
(iconos, botones sm, menú). `.save-row` (spinner `progress_activity` 16px +
micro-texto; en móvil solo icono con `aria-label`): la captura es
autoguardado con debounce — texto 1.5s, hora 1.2s — sin botón enviar.
El Forms lo ubica bajo el nombre (misma línea visual del título);
la fila `.save-row` queda como variante bajo los chips.
`.save-cycle` (fases `.save-doing` / `.save-done` apiladas) demuestra el
ciclo en loop de 5s con fundido cruzado: círculo+texto → check+Guardado
→ salida (en vivo: spinner mínimo 600ms + confirmación con morph).
Reglas: `100dvh`
(nunca `h-screen`), iconos ≥16px, hero con CTA visible sin scroll.
Ver sección Responsive de `index.html` (frames 1280 vs 390).

> Nota: las clases `m-*` (`.m-icon`, `.m-statuscol`, `.m-micro`,
> `.m-roadt`) pertenecen al sistema de **email** (backend
> `sincronizacion/informes.py` + `brevo-template.html`), no a este
> playground. No mezclar.

## Temas

`document.documentElement[data-theme]` (`light`/`dark`). Todo color
viene de variables: para soportar un producto, copiar el bloque
`:root` + `[data-theme="dark"]` de `tokens.css`, no valores sueltos.
En oscuro, los textos semánticos se aclaran (no los fondos).

## Capas (z-index)

Nav flotante 40 · menú y overlay 50 · toast 60. Nada más usa z-index
(el resto es flujo + `position` local sin apilar).

## Símbolos vs PNG

PNG (`assets/icons/`) = dominio: ítems, estados visuales, clima.
Material Symbols = chrome: nav, tabs, toggles, avisos, spinners.
Una familia de símbolos por proyecto (hoy, Material en las 3 apps).

## Iconografía (`assets/icons/` — espejo del Forms)

- `lift/` negros + `lift/blancos/` — 5 tipos (doble/triple/cuádruple/
  arrastre/magic). Negros al lado del nombre sobre claro; blancos sobre
  oscuro o color (ver regla de temas).
- `dificultad/` — 4 con color propio (20px, ambos temas sin variante).
- `dif/` — 8 combos `DIFICULTAD_TIPO` del bike park, con clásico en su
  defecto.
- `act/` — 8 de actividad a 24px; sin mapeo → `montana.png` (igual que
  email y PDF).
- `clima/` — 7 negros de NivologiaForm (despejado → cadenas). La identidad
  de la sección Clima son símbolos (sol/nieve por temporada), no PNG.
- `.icon-row > .icon-cell(img + span)` — grilla de specimen; `.icon-dark`
  (pastilla navy) para mostrar blancos.
- Tamaños fijos: 16 mínima funcional · 20 dif · 22 header Forms ·
  24 lift/act · 28 display. Nunca deformar (width auto).
- Por tema: negros solo sobre claro; toda imagen con variante clara lleva
  `data-dark-src` y `app.js` la intercambia (misma convención del Forms).
  En el Forms: lifts conmutan a `blancos/` por `isDark`; actividades,
  clima y cadenas (sin variante) llevan `.icono-negro` que se invierte
  en dark.

## Verano (`#verano` — toggle funcional)

`.seg[data-temporada] > button[data-t=inv|ver]` + `[data-temporada-scope]`
con elementos `data-swap[data-inv][data-ver]` (IMG cambia `src`, INPUT
cambia `placeholder` y vacía/restaura el valor, resto cambia texto) y
filas `data-only-inv` (se ocultan en verano). Reglas que demuestra:
cover/slice por temporada, Infonieve/Infobike, tabs bike/sol, combos
dif+tipo, uso manual, clima solo viento, lifts triple+cuádruple,
`?vigentes=1`, invierno por defecto.

```html
<img src="assets/icons/lift/andarivel-doble.png" data-dark-src="assets/icons/lift/blancos/andarivel-doble.png" alt="" width="24" height="24" />
```
