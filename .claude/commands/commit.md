---
description: Crea un commit con mensaje convencional desde los cambios staged. Sin atribución de IA.
---

# /commit

1. Mira el estado y el diff staged:
   ```bash
   git status
   git diff --cached
   ```
2. Si no hay nada staged, propón qué agregar (sin incluir `.env`, secretos, ni lockfiles con paquetes nuevos sin revisar).
3. Redacta un mensaje **convencional**: `tipo(scope): resumen` (feat/fix/refactor/chore/docs/test). Cuerpo breve si hace falta el "por qué".
4. **Prohibido en el mensaje:** `Co-Authored-By`, `Generated with`, 🤖, "AI-assisted", "Claude". La IA es info interna.
5. Verifica que no se cuela ningún secreto antes de commitear.
6. `git commit -m "..."`. No pushees automáticamente salvo que se pida (ahí usa `/ship`).

> Si el repo tiene un hook que bloquea mensajes con esas frases, simplemente no las uses.
