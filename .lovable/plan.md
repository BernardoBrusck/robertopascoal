

# Plano: Substituir todos os placeholders por fotos reais do Roberto

## Mapeamento de locais com fotos

Há **6 locais** no site usando placeholders ou imagens genéricas do Unsplash:

### 1. HorizontalScrollSection (Timeline de Jornada)
~20 placeholders cinza com labels como "Foto infância 1", "Foto Amazônia", etc. — tanto desktop quanto mobile.

**Mapeamento de imagens:**
- "Foto infância 1/2" → `foto_infancia_upscale_4x.jpg`, `IMG_3580 (1).JPG`
- "Foto formação 1/2" → `FOTO ROBERTO 04.jpg`, `FOTO ROBERTO 05.jpg`
- "Foto teatro / palco" → `FOTO ROBERTO 07.jpg`
- "Foto Amazônia" → `roberto-pascoal-comunidade-isolada.jpg`
- "Foto comunidade 1/2" → `roberto-pascoal-criancas-indigenas.png`, `roberto-pascoal-leitura-indigena.png`
- "Foto palestra" → `B0119027.JPG`
- "Foto ação social" → `200229_OMG_4225.jpg`
- "Foto comunidade (painel hoje)" → `roberto-pascoal-projetos-africa.jpg`
- "Foto livro" → `capa do livro.png`
- "Foto palco" → `FOTO ROBERTO 08 (2).jpg`
- "Foto atual" → `FOTO ROBERTO 09.jpg`

### 2. ZoomParallaxSection (7 imagens Unsplash)
Substituir pelas fotos reais do Roberto:
- `roberto-pascoal-hero-montanha.png`, `roberto-pascoal-explorador.jpg`, `01 - África 07 por Max Schwoelk.JPG`, `roberto-pascoal-caminhada-brasil.png`, `roberto-pascoal-indigena-interacao.png`, `200229_OMG_4225.jpg`, `roberto-pascoal-professor-africa.jpg`

### 3. FloatingPhotosSection (6 fotos laterais — apenas placeholders cinza)
Substituir os placeholders SVG por fotos reais recortadas:
- Left: `Foto de Roberto Pascoal.jpg`, `Foto de Roberto Pascoal (1).jpg`, `Foto de Roberto Pascoal (2).jpg`
- Right: `Foto de Roberto Pascoal (3).jpg`, `03- Post Documentário.jpg`, `roberto-pascoal-professor-africa.jpg`

### 4. BookSection (placeholder "Capa do Livro")
Substituir o `<div>` cinza pela imagem real: `capa do livro.png`

### 5. SpeakingSection (placeholder "Foto palestrando")
Substituir fundo cinza pela imagem: `B0119027.JPG`

### 6. ImageGallery (15 imagens Unsplash)
Substituir pelas fotos reais do Roberto, distribuídas nas 3 colunas com proporções variadas.

## Implementação técnica

- Todas as imagens ficam em `/public/image/` — referenciar como `/image/nome.jpg`
- Remover o componente `PhotoPlaceholder` do `HorizontalScrollSection` e usar `<img>` com `object-cover`
- No `FloatingPhotosSection`, substituir o bloco SVG/placeholder por `<img>`
- No `BookSection`, trocar o `<div>` por `<img src="/image/capa do livro.png">`
- No `SpeakingSection`, trocar o `<div>` por `<img>` absoluto
- No `ZoomParallaxSection`, trocar URLs Unsplash por paths locais
- No `ImageGallery`, trocar IDs Unsplash por paths locais

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/components/HorizontalScrollSection.tsx` | Substituir ~20 PhotoPlaceholders por `<img>` reais |
| `src/components/ZoomParallaxSection.tsx` | 7 URLs Unsplash → paths locais |
| `src/components/FloatingPhotosSection.tsx` | 6 placeholders SVG → `<img>` reais |
| `src/components/BookSection.tsx` | Placeholder → imagem da capa |
| `src/components/SpeakingSection.tsx` | Fundo placeholder → foto real |
| `src/components/ui/image-gallery.tsx` | 15 URLs Unsplash → fotos locais |

