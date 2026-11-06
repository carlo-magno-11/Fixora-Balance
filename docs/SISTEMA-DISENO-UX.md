# Fixora Balance — Sistema visual y dirección UX

**Versión:** 0.1  
**Fecha:** 6 de noviembre de 2026  
**Estado:** propuesta de diseño aplicada parcialmente al prototipo; requiere validación visual en iOS, Android y web antes de considerarse definitiva.

## 1. Dirección creativa

**Concepto:** calma activa — una herramienta cálida, contemporánea y confiable que devuelve control al usuario sin parecer una app clínica, infantil, un videojuego ni un panel corporativo.

La interfaz debe transmitir:
- Calma y espacio: superficies cálidas, jerarquía clara y poco ruido visual.
- Control amable: acciones visibles, lenguaje empático y opciones comprensibles.
- Progreso real: datos verificables, nunca métricas de relleno.
- Confianza: privacidad, permisos y límites explicados con transparencia.
- Personalidad: borgoña como firma de marca, verde bosque como color de acción y dorado como detalle de reconocimiento.

No copiar pantallas de otras aplicaciones. Reutilizar patrones técnicos de proyectos open source y construir una identidad propia.

## 2. Colorimetría propuesta v0.1

La paleta existente ya contenía borgoña, crema, dorado y verde, pero estaba declarada dentro de la pantalla. Se formaliza una jerarquía semántica:

| Token | HEX | Uso |
|---|---|---|
| Canvas | `#F6F3ED` | Fondo general cálido |
| Surface | `#FFFFFF` | Tarjetas y paneles |
| Surface subtle | `#F0ECE5` | Secciones secundarias |
| Text primary | `#25211F` | Texto principal |
| Text secondary | `#716B64` | Texto auxiliar |
| Brand burgundy | `#6E0D25` | Firma de marca, títulos cortos y detalles |
| Brand burgundy soft | `#F4E8EB` | Fondo de elementos de marca |
| Primary forest | `#315C4B` | Acción primaria, foco y estados positivos |
| Primary forest dark | `#24483A` | Estado presionado |
| Primary forest soft | `#E8F0EB` | Superficies de enfoque/progreso |
| Accent gold | `#C99B58` | Reconocimientos y detalles decorativos |
| Accent gold soft | `#F5EBDD` | Fondo de insignias |
| Border | `#E7E0D7` | Separadores y contornos |
| Danger | `#A33D43` | Errores y acciones destructivas |

### Reglas de uso
1. Verde bosque es el color de las acciones principales; borgoña identifica la marca. No competirán por el mismo rol.
2. Dorado #C99B58 no se utilizará como texto pequeño sobre fondos claros: su contraste es insuficiente. Reservarlo para iconos, ornamentos y superficies suaves.
3. Los estados no dependerán únicamente del color: acompañar con texto e iconografía.
4. Mantener una proporción visual aproximada 70/20/8/2: fondos neutros, superficies, color de acción, acentos.
5. No usar gradientes saturados, sombras fuertes, glassmorphism ni tarjetas excesivamente redondeadas en todas partes.
6. La paleta oscura se define como token futuro, pero no se declara implementado el modo oscuro hasta probar contraste y componentes.

## 3. Tipografía y jerarquía

Primera versión: tipografía de sistema nativa para rendimiento, legibilidad y coherencia con iOS/Android. No añadir fuentes externas hasta validar una necesidad real.

- Display / título principal: 30–34 pt, peso 700–800, interlineado compacto.
- Título de sección: 19–22 pt, peso 700.
- Título de tarjeta: 15–17 pt, peso 650–700.
- Cuerpo: 14–16 pt, interlineado 21–24.
- Texto auxiliar: 12–13 pt, interlineado 17–19.
- Etiquetas: 10–11 pt, peso 700; tracking moderado, no abusar de mayúsculas.
- Temporizador: 42–48 pt, números tabulares y alineación estable.

## 4. Espaciado, forma y profundidad

Escala base de espaciado: 4, 8, 12, 16, 20, 24, 32 y 40 pt.  
Radios: 12 para controles compactos, 16 para botones, 20 para tarjetas, 28 para paneles destacados.  
Controles táctiles: objetivo mínimo 44 × 44 pt; preferible 48 × 48 dp.  
Sombras: una sola elevación muy sutil para paneles destacados; preferir bordes y contraste de superficie para el resto.  
Ancho: contenido móvil adaptable; limitar columnas de lectura a aproximadamente 680 pt en pantallas amplias.

## 5. Arquitectura de pantallas propuesta

### Navegación principal
- **Hoy:** resumen amable, objetivo del día, acceso al enfoque y vista breve de hábitos.
- **Enfoque:** temporizador, presets, pausa, descanso y sesiones recientes.
- **Hábitos:** rutinas elegidas por el usuario y frecuencia flexible.
- **Progreso:** tendencias verificables, objetivos cumplidos y logros opcionales.
- **Perfil/Ajustes:** cuenta, privacidad, notificaciones, apariencia y ayuda.

La navegación final se validará con tareas de usuario. No implementar cinco pestañas vacías: incorporar cada destino cuando tenga una experiencia real.

### Inicio / Hoy
1. Encabezado discreto con marca y acceso a perfil.
2. Saludo contextual sin asumir nombre ni estado emocional.
3. Tarjeta principal de enfoque con temporizador y una acción dominante.
4. Resumen de objetivo/hábito del día, solo con datos existentes.
5. Progreso semanal cuando haya suficientes sesiones; antes, mostrar un estado vacío útil.
6. Acceso a descanso consciente y ajustes rápidos.

## 6. Componentes reutilizables

Construir progresivamente componentes propios en TypeScript + React Native:
- `ScreenContainer`: safe area, márgenes y ancho máximo.
- `BrandHeader`: marca, título y acciones de cabecera.
- `SectionHeading`: título, descripción y acción secundaria.
- `SurfaceCard`: tarjeta base con variantes.
- `PrimaryButton` / `SecondaryButton`: tamaños, estados y accesibilidad.
- `DurationSelector`: selector segmentado accesible.
- `FocusTimer`: visualización del tiempo separada de la lógica de dominio.
- `ProgressRing`: progreso con alternativa textual.
- `EmptyState`: explica qué aparecerá y cómo empezar.
- `BottomNavigation`: solo cuando existan destinos implementados.

Las pantallas no deben contener hexadecimales ni duplicar estilos de botones/tarjetas. Los tokens son la única fuente de color, espaciado y radios.

## 7. Interacción y accesibilidad

- Feedback de pulsación breve, sin rebotes ni animaciones constantes.
- Transiciones ordinarias de 150–220 ms; respetar Reduce Motion.
- El temporizador no debe depender de una animación para calcular el tiempo.
- Estados disabled/loading/pressed visibles y semánticos.
- Etiquetas accesibles y orden de lectura lógico.
- No usar color como única señal.
- Mensajes de error recuperables y con acción siguiente.
- Notificaciones escasas y configurables; el producto debe ayudar a salir de la app.
- Gamificación opcional, sin castigo por descanso ni pérdida total de rachas.

## 8. Investigación open source

Repositorios consultados el 6 de noviembre de 2026. Los conteos de estrellas son aproximados y pueden cambiar.

| Proyecto | Estrellas observadas | Licencia verificada | Qué reutilizar como referencia | Decisión |
|---|---:|---|---|---|
| [react-native-reusables](https://github.com/founded-labs/react-native-reusables) | 8.7k | MIT | Componentes modulares, variantes y enfoque copy/paste | Referencia de patrones; no instalar NativeWind/Uniwind ahora |
| [gluestack-ui](https://github.com/gluestack/gluestack-ui) | 5.3k | MIT | Componentes accesibles, composición y patrones Expo | Consultar componentes puntuales; no migrar el styling stack |
| [Shopify Restyle](https://github.com/Shopify/restyle) | 3.4k | MIT | Sistema de tokens tipado, tema central y reducción de valores ad hoc | Adoptar el principio de tokens; no añadir dependencia en v0.1 |
| [Wix React Native UI Lib](https://github.com/wix/react-native-ui-lib) | 7.1k | MIT | Composición de controles, layouts y componentes de producción | Referencia para patrones; no incorporar toda la librería |

### Evaluación
- React Native Reusables y gluestack v5 están orientados a NativeWind v5/Uniwind y Tailwind CSS v4. Introducirlos exige configurar un motor de estilos adicional y revisar compatibilidad con la app actual.
- Shopify Restyle confirma el valor de un tema central tipado; podemos adoptar esa arquitectura sin dependencia externa.
- Wix UI Lib ofrece una biblioteca amplia, pero incorporarla completa aumentaría el peso y las convenciones del proyecto antes de que el MVP las necesite.
- La mejor decisión actual es **tokens propios + componentes pequeños en React Native StyleSheet**, con inspiración selectiva de estos proyectos. Revaluar librerías cuando haya varias pantallas y una matriz de componentes real.

## 9. Reglas de implementación

1. No copiar componentes completos sin revisar licencia, dependencias, accesibilidad y compatibilidad.
2. No añadir dependencias de UI solo por popularidad o estrellas.
3. Mantener lógica de dominio fuera de componentes visuales.
4. Separar tokens, componentes compartidos y componentes de cada funcionalidad.
5. Probar iOS, Android y web; una exportación JavaScript no sustituye prueba nativa.
6. Validar contraste WCAG 2.2 AA para texto y estados relevantes antes de declarar la paleta cerrada.
7. Validar navegación con pruebas de usabilidad antes de crear pantallas de relleno.

## 10. Siguientes entregables

- [x] Definir dirección creativa y paleta semántica inicial.
- [x] Investigar bibliotecas open source con más de 1,000 estrellas.
- [x] Añadir tokens de tema sin dependencia externa.
- [ ] Separar componentes visuales reutilizables de la pantalla inicial.
- [ ] Rediseñar Inicio/Hoy con jerarquía y navegación real.
- [ ] Crear prototipo de Hábitos y Progreso con estados vacíos honestos.
- [ ] Verificar contraste, tamaño táctil y Reduce Motion.
- [ ] Pruebas visuales en iOS, Android y web.


### Inspección de código fuente (no solo README)
- [React Native Reusables — Button](https://github.com/founded-labs/react-native-reusables/blob/385834c2196f8a303cbc9057d1ac768f3bde0a3b/packages/registry/src/nativewind/components/ui/button.tsx): separar variantes visuales de la interacción y componer sobre `Pressable`. Adaptaremos el patrón con StyleSheet, sin importar su dependencia NativeWind.
- [Shopify Restyle — Defining your theme](https://github.com/Shopify/restyle/blob/master/documentation/docs/fundamentals/defining-your-theme.md): definir colores y espaciado una sola vez y derivar el tipo del tema. Es el patrón adoptado en `src/theme/tokens.ts`.
- [gluestack-ui — Button accessibility](https://github.com/gluestack/gluestack-ui/blob/main/src/components/ui/button/docs/index.mdx): documentar variantes, semántica y accesibilidad del control; aplicar labels, estados y pruebas multiplataforma a nuestros botones.
- [gluestack-ui — Button composition](https://github.com/gluestack/gluestack-ui/blob/main/apps/website/app/ui/docs/components/button/index.mdx): composición de botón, texto e icono como piezas separadas; usarlo como referencia al extraer `PrimaryButton` y `SecondaryButton`.

Esta revisión confirma que el mayor beneficio para Fixora Balance no es copiar el estilo de esos proyectos, sino reproducir sus buenas decisiones estructurales: tema central, variantes explícitas, componentes pequeños y accesibilidad documentada.


## 11. Auditoría inicial de contraste — 6 de noviembre de 2026

Se midieron los colores v0.1 con la fórmula WCAG de luminancia relativa sRGB. Los resultados sirven para detectar riesgos; todavía falta automatizar estas reglas en tests y validar cada combinación realmente usada por pantalla.

| Color de texto | Fondo | Contraste | Evaluación |
|---|---|---:|---|
| #C99B58 dorado | #F6F3ED crema | 2.28:1 | No usar como texto |
| #8B632D dorado oscuro candidato | #F6F3ED crema | 4.84:1 | AA para texto normal |
| #8B632D dorado oscuro candidato | #FFFFFF blanco | 5.36:1 | AA para texto normal |
| #716B64 secundario actual | #F0ECE5 superficie sutil | 4.47:1 | No alcanza AA por poco |
| #6E685F secundario candidato | #F0ECE5 superficie sutil | 4.68:1 | AA para texto normal |
| #315C4B verde primario | #F6F3ED crema | 6.86:1 | AA |
| #6E0D25 borgoña | #F6F3ED crema | 10.85:1 | AA |

**Acción pendiente:** incorporar accentGoldText #8B632D y ajustar textSecondary a un tono que cumpla AA en todas las superficies claras usadas. app/index.tsx todavía aplica el dorado decorativo al texto pequeño sectionEyebrow; corregirlo antes de marcar la paleta como validada. Añadir pruebas Vitest de contraste para los pares semánticos.
