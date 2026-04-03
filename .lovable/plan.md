

# Plano: Tipografia Apple (SF Pro) + Redesign do Layout do Hero

## Resumo

Duas mudanças principais: (1) trocar a tipografia global para a stack da Apple (SF Pro Display / system-ui) e (2) redesenhar o overlay do Hero para um layout mais premium e limpo, mantendo o efeito WebGL de transição glass intacto. Também reduzir o tempo entre slides.

## O que muda

### 1. Tipografia Apple em todo o site

Substituir Inter/Pretendard pela stack de fontes da Apple. Não precisa carregar fontes externas -- usa a system font stack que inclui SF Pro em dispositivos Apple e cai graciosamente para system-ui em outros.

**Arquivos afetados:**
- `tailwind.config.ts` -- atualizar `fontFamily.sans` e `fontFamily.heading`
- `src/index.css` -- remover imports de Google Fonts/Pretendard, atualizar todas as `font-family` hardcoded no slider CSS
- `src/components/TextRevealSection.tsx` -- herda automaticamente

**Font stack:**
```
"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif
```

### 2. Redesign do overlay do Hero

O layout atual tem título grande + descrição + barra de navegação na base. Vamos torná-lo mais editorial/premium:

- **Counter**: mover para canto inferior esquerdo, formato vertical com linha separadora
- **Título**: manter grande com tracking negativo, mas posicionar mais centralizado verticalmente (centro-baixo), não colado na base
- **Descrição**: tipografia menor, mais sutil, uppercase com letter-spacing largo (estilo editorial)
- **Navegação**: simplificar para apenas dots/indicadores minimalistas no canto direito, sem títulos de slide (mais limpo)
- **Gradiente**: suavizar -- menos opaco, mais elegante

**Arquivo afetado:** `src/components/ui/lumina-interactive-list.tsx` (JSX do return) e `src/index.css` (estilos)

### 3. Acelerar timer dos slides

Reduzir `autoSlideSpeed` de 5000ms para 3500ms e `transitionDuration` de 2.5s para 1.8s.

**Arquivo:** `src/components/ui/lumina-interactive-list.tsx` (SLIDER_CONFIG)

## Detalhes Técnicos

### Nova estrutura do overlay (JSX):
```text
+------------------------------------------+
|                                          |
|                                          |
|                                          |
|                                     ●    |
|    ESCRITOR. PALESTRANTE.           ●    |
|    Roberto                          ○    |
|    Pascoal                          ○    |
|                                     ○    |
|  01 ── 06                           ○    |
+------------------------------------------+
```

- Título no centro-baixo com peso bold e escala massiva
- Subtítulo acima do título em uppercase, font-size pequeno, letter-spacing amplo
- Counter discreto no canto inferior esquerdo com linha horizontal
- Dots de navegação no canto direito, verticais, minimalistas

### Arquivos modificados:
1. `tailwind.config.ts` -- font families
2. `src/index.css` -- remover font imports, atualizar todos os font-family do slider, novo layout do overlay
3. `src/components/ui/lumina-interactive-list.tsx` -- novo JSX do overlay, timing config, navegação simplificada

