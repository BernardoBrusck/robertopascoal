

# Plano: Corrigir imagens quebradas (nomes de arquivo com caracteres especiais)

## Problema raiz

As imagens existem e estão válidas, mas muitos nomes de arquivo contêm **espaços, acentos e parênteses** que quebram quando servidos via URL em produção:

- `Foto de Roberto Pascoal (1).webp`
- `01 - África 07 por Max Schwoelk.webp`
- `Cópia de INSTA 3.webp`
- `03- Post Documentário.webp`
- `FOTO ROBERTO 08 (2).webp`
- `IMG_3580 (1).webp`
- `file_00000000eec0622f9132ad300581c9cb.webp`

## Solução

Renomear **todos** os arquivos de imagem para nomes URL-safe (kebab-case, sem espaços, acentos ou parênteses) e atualizar todas as referências no código.

### Mapeamento de renomeação

| Arquivo atual | Novo nome |
|---|---|
| `01 - África 07 por Max Schwoelk.webp` | `africa-max-schwoelk.webp` |
| `03- Post Documentário.webp` | `post-documentario.webp` |
| `200229_OMG_4225.webp` | `omg-4225.webp` |
| `B0119027.webp` | `palestra-roberto.webp` |
| `Cópia de INSTA 3.webp` | `insta-3.webp` |
| `FOTO ROBERTO 04.webp` | `foto-roberto-04.webp` |
| `FOTO ROBERTO 05.webp` | `foto-roberto-05.webp` |
| `FOTO ROBERTO 07.webp` | `foto-roberto-07.webp` |
| `FOTO ROBERTO 08 (2).webp` | `foto-roberto-08.webp` |
| `FOTO ROBERTO 09.webp` | `foto-roberto-09.webp` |
| `Foto de Roberto Pascoal.webp` | `roberto-pascoal-retrato.webp` |
| `Foto de Roberto Pascoal (1).webp` | `roberto-pascoal-retrato-1.webp` |
| `Foto de Roberto Pascoal (2).webp` | `roberto-pascoal-retrato-2.webp` |
| `Foto de Roberto Pascoal (3).webp` | `roberto-pascoal-retrato-3.webp` |
| `IMG_3580 (1).webp` | `img-3580.webp` |
| `Gemini_Generated_Image_*.webp` | `gemini-1.webp` ... `gemini-5.webp` |
| `capa do livro.webp` | `capa-do-livro.webp` |
| `file_00000000eec0622f9132ad300581c9cb.webp` | `roberto-crianca.webp` |
| `foto_infancia_upscale_4x.webp` | `infancia-upscale.webp` |
| `Cópia de INSTA 3.webp` | `insta-3.webp` |

Arquivos já com nomes limpos (kebab-case) permanecem como estão.

### Arquivos a atualizar referências

- `src/components/HorizontalScrollSection.tsx` (~20 referências)
- `src/components/ZoomParallaxSection.tsx` (7 referências)
- `src/components/FloatingPhotosSection.tsx` (6 referências)
- `src/components/ServicesSection.tsx` (~12 referências)
- `src/components/BookSection.tsx` (1 referência)
- `src/components/SpeakingSection.tsx` (1 referência)
- `src/components/ui/image-gallery.tsx` (16 referências)

### Passos

1. Renomear todos os arquivos em `/public/image/` via script bash
2. Atualizar todas as referências nos componentes com sed
3. Verificar que nenhuma referência antiga permaneceu

## Resultado esperado

Todas as imagens carregam corretamente tanto no preview quanto em produção, sem depender de encoding de URL.

