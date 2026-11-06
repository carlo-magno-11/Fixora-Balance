# Fixora Balance — Política de repositorio público y seguridad de desarrollo

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Repositorio:** carlo-magno-11/Fixora-Balance  
**Estado:** política recomendada; verificar ajustes de GitHub antes de declarar controles activos.

## 1. Decisión actual

Mantener el repositorio **público por ahora** es razonable porque el proyecto necesita comprobaciones frecuentes y GitHub ofrece uso gratuito de runners estándar para repositorios públicos. Los runners estándar de repositorios privados consumen el cómputo incluido en el plan y el uso adicional puede facturarse.

Esta decisión tiene una condición: el repositorio público debe contener únicamente código y documentación que aceptemos publicar. No debe contener secretos, datos personales, credenciales, configuraciones de producción ni documentos internos confidenciales.

La visibilidad pública no se considera una protección ni una garantía de seguridad. Tampoco se considera que cambiar a privado solucione una credencial ya filtrada.

## 2. Qué se puede publicar

- Código fuente que aceptamos que terceros puedan leer, copiar o estudiar bajo la licencia que se defina.
- Documentación técnica no sensible.
- Decisiones de producto que podamos hacer públicas.
- Pruebas y workflows diseñados para ejecución pública.
- Issues y discusiones sin datos personales o secretos.

## 3. Qué nunca debe entrar al repositorio

- Contraseñas, API keys, tokens, claves privadas, certificados o credenciales.
- Supabase service_role, secretos de Edge Functions o credenciales de administración.
- Claves privadas de Apple/Google, credenciales de pagos, webhook signing secrets.
- Archivos .env reales, backups de bases de datos, dumps, datos de usuarios.
- Información personal de menores, registros de navegación o telemetría identificable.
- Contratos, documentos fiscales, datos bancarios o secretos comerciales no destinados a publicación.
- Tokens de GitHub, claves de firma Android/iOS, provisioning profiles privados.

Usar .env.example con nombres de variables y valores vacíos o ficticios. Secretos reales en GitHub Actions Secrets/Environments o gestor externo, solo cuando sean necesarios.

## 4. Riesgos específicos de GitHub Actions

- Un workflow puede ejecutar código aportado por un pull request.
- Un workflow mal configurado puede exponer secretos o permisos del token.
- Acciones de terceros comprometidas pueden ejecutar código arbitrario.
- Artefactos, logs y cachés pueden filtrar información si se publican datos sensibles.
- Un workflow con pull_request_target requiere especial cuidado; no ejecutar código no confiable del PR con permisos privilegiados.

Controles mínimos:
1. permissions: contents: read por defecto.
2. Conceder permisos adicionales solo al job que los necesita.
3. Fijar Actions de terceros a SHA completo revisado, no solo tags flotantes.
4. No pasar secretos a workflows de pull requests externos.
5. Evitar pull_request_target salvo caso justificado y auditado.
6. No ejecutar scripts del PR con token de escritura.
7. Proteger environments de despliegue con aprobación y ramas permitidas.
8. No imprimir variables sensibles ni usar trazas de shell alrededor de secretos.
9. Limitar retención de artefactos y no subir builds que incluyan configuraciones privadas.
10. Revisar permisos de GitHub App, PAT y colaboradores.

## 5. Controles que se deben activar/verificar en GitHub

- Dependency Graph.
- Dependabot Alerts.
- Dependabot Security Updates cuando corresponda.
- Secret Scanning.
- Push Protection.
- Code scanning / CodeQL si la configuración y el lenguaje lo permiten.
- Protección de main: pull request requerido cuando el equipo crezca, checks requeridos, evitar force-push y borrado.
- Revisión de colaboradores, GitHub Apps, tokens y Actions permissions.
- Límites de Actions y alertas de gasto para evitar sorpresas.
- Revisión de forks y contribuciones externas.

La disponibilidad exacta de funciones depende del plan, visibilidad y configuración del repositorio. No asumir que una casilla está activa sin comprobarla en Settings.

## 6. Licencia e propiedad intelectual

Un repositorio público permite que cualquiera vea el contenido. La ausencia de una licencia explícita no significa que el código sea automáticamente open source ni que terceros tengan permiso general para reutilizarlo. Sin embargo, el contenido público puede ser copiado y estudiado; no debe usarse la visibilidad como mecanismo de confidencialidad.

Antes de publicar el código de la app, decidir una licencia. Si el objetivo es conservar derechos exclusivos sobre el producto, revisar con asesoría legal una licencia propietaria adecuada y si el modelo de repositorio público satisface ese objetivo. La documentación pública también revela estrategia comercial y arquitectura.

## 7. Estrategia recomendada por etapas

**Ahora — prototipo público no sensible**
- Mantener el repo público mientras solo contiene documentos no sensibles.
- Añadir política de seguridad y documentación del producto.
- No agregar secretos, datos ni credenciales.
- Revisar Settings y protección de ramas.

**Antes de beta o publicación**
- Decidir licencia.
- Revisar Actions permissions y workflows.
- Activar escaneo de secretos y dependencias.
- Configurar entornos separados para desarrollo, pruebas y producción.
- Usar datos sintéticos y servicios sandbox.

**Antes de integrar pagos o backend**
- Crear secretos solo en el entorno de servidor.
- No publicar credenciales Supabase, StoreKit, Google Play, Stripe, Mercado Pago o RevenueCat.
- Separar proyectos y claves por ambiente.
- Revisar logs, artefactos, backups y RLS.

**Si el producto necesita confidencialidad**
- Migrar a privado antes de subir código propietario o información sensible.
- Aceptar que las ejecuciones estándar privadas consumen cuota.
- Optimizar CI (caché, jobs condicionales, evitar matrices innecesarias, ejecutar checks costosos por cambios relevantes) o usar runners propios solo si el coste operativo es razonable.
- La decisión de privacidad debe basarse en el valor del código y el riesgo de exposición, no solo en minutos de CI.

## 8. Estado observado al 6 de noviembre de 2026

- GitHub muestra Fixora-Balance como público.
- La rama por defecto observada es main.
- Los cuatro documentos base existen y se pudieron leer.
- Se añadieron .gitignore y SECURITY.md con reglas de exclusión y reporte privado de vulnerabilidades.
- El workflow .github/workflows/quality.yml existe y se ejecuta en main. Sus permisos globales son contents: read, las acciones directas están fijadas por SHA completo y los checkouts usan persist-credentials: false.
- No se ha auditado Settings, secrets, historial completo, reglas de rama, Secret Scanning, Push Protection, Dependabot, CodeQL ni permisos de colaboradores. El workflow de CI está endurecido, pero no equivale a verificar los controles de cuenta/repo.
- No se ha confirmado si GitHub Private Vulnerability Reporting está habilitado; la política SECURITY.md condiciona el reporte a que la función esté disponible.
- Por tanto, no se declara activado ningún control de seguridad hasta verificarlo.

## 9. Referencias oficiales

- GitHub Actions billing: https://docs.github.com/en/actions/concepts/billing-and-usage
- GitHub Actions billing details: https://docs.github.com/en/billing/concepts/product-billing/github-actions
- GitHub security and analysis settings: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-security-and-analysis-settings-for-your-repository
- GitHub Push Protection: https://docs.github.com/en/code-security/concepts/secret-security/push-protection
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
