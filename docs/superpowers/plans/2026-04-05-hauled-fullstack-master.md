# HAULED Fullstack — Plan Maestro

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el backend Laravel 11 completo para HAULED ecommerce y conectarlo con el frontend Nuxt 4 existente, módulo por módulo, probando cada uno antes de avanzar.

**Architecture:** Laravel 11 API REST en `hauled-api.test` (Herd) con Sanctum auth, Filament admin, y MySQL local. Nuxt 4 en `hauled.test` consume la API via fetch con token Bearer.

**Tech Stack:** Laravel 11, Filament 3, Sanctum, MySQL 8 (Herd), Nuxt 4, Pinia, Vue 3

---

## Módulos (ejecutar en orden)

| # | Plan | Estado |
|---|------|--------|
| 1 | [Setup Laravel](./2026-04-05-m1-setup-laravel.md) | pendiente |
| 2 | [Migraciones + Modelos](./2026-04-05-m2-migrations-models.md) | pendiente |
| 3 | [Auth API](./2026-04-05-m3-auth-api.md) | pendiente |
| 4 | [Productos API](./2026-04-05-m4-productos-api.md) | pendiente |
| 5 | [Filament + Admin Productos](./2026-04-05-m5-filament-productos.md) | pendiente |
| 6 | [Categorías + Marcas](./2026-04-05-m6-categorias-marcas.md) | pendiente |
| 7 | [Auth en Nuxt](./2026-04-05-m7-auth-nuxt.md) | pendiente |
| 8 | [Pedidos + Checkout + Wompi](./2026-04-05-m8-pedidos-wompi.md) | pendiente |
| 9 | [Encargos + Tracking](./2026-04-05-m9-encargos.md) | pendiente |
| 10 | [Perfil de Usuario](./2026-04-05-m10-perfil.md) | pendiente |

**Regla:** Completar y verificar cada módulo antes de avanzar al siguiente.
