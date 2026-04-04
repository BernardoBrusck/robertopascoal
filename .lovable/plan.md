

# Plano: Atualizações de imagens, serviços, galeria, links e contatos

## 1. Copiar imagem de infância enviada para o projeto
- Copiar `file_00000000eec0622f9132ad300581c9cb.png` (foto criança) para substituir a segunda foto no PanelInfancia (onde está `IMG_3580 (1).JPG`)
- Nota: a foto já existe em `/public/image/file_00000000eec0622f9132ad300581c9cb.png` (verifiquei no ls)

## 2. Copiar logo Omunga para o projeto
- Copiar `image-14.png` (logo Omunga) para `/public/image/omunga-logo.png`

## 3. HorizontalScrollSection — PanelInfancia
- Trocar `IMG_3580 (1).JPG` por `file_00000000eec0622f9132ad300581c9cb.png` na segunda polaroid (desktop e mobile)

## 4. HorizontalScrollSection — PanelOmunga
- Adicionar a logo da Omunga acima ou ao lado do título "Criar para transformar" (desktop e mobile)

## 5. FloatingPhotosSection — fotos da direita
- Trocar as 3 fotos da direita por outras imagens de `/public/image/` diferentes das atuais:
  - `roberto-pascoal-caminhada-brasil.png`
  - `roberto-pascoal-indigena-interacao.png`
  - `FOTO ROBERTO 08 (2).jpg`

## 6. ServicesSection — imagens nos serviços
Adicionar campo `images` a cada projeto com fotos contextuais:
- **Bibliotecas Comunitárias**: hover → `roberto-pascoal-comunidade-isolada.jpg`, galeria modal → fotos de comunidades
- **Doação de Livros**: hover → `roberto-pascoal-leitura-indigena.png`, galeria → fotos de leitura/livros
- **Palestras Transformadoras**: hover → `B0119027.JPG`, galeria → fotos de palco/eventos
- **Expedições Educacionais**: hover → `roberto-pascoal-caminhada-brasil.png`, galeria → fotos de viagens/África

Substituir os placeholders SVG no HoverModal e no DetailModal por `<img>` reais.

## 7. ImageGallery — adicionar imagem central
- Adicionar uma 16a imagem na coluna 1 (centro): `roberto-pascoal-indigena-interacao.png`

## 8. BookSection — link Hotmart
- Trocar `href="#"` por `https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D`
- Adicionar `target="_blank" rel="noopener noreferrer"`

## 9. ContactFooter — contatos reais
- E-mail: `roberto.pascoal@omunga.com`
- Remover bloco de Telefone, manter apenas WhatsApp: `+55 47 8905-4401`
- WhatsApp link: `https://wa.me/554789054401`
- Instagram Roberto: `https://www.instagram.com/roberto_pascoal/`
- Instagram Omunga: `https://www.instagram.com/omunga_oficial/`
- LinkedIn: `https://www.linkedin.com/company/omunga/`
- Remover link do site omunga.com.br dos socials (ou manter se fizer sentido)

## 10. SpeakingSection — WhatsApp real
- Trocar `5500000000000` por `554789054401` nos links de WhatsApp

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/components/HorizontalScrollSection.tsx` | Trocar foto infância + logo Omunga |
| `src/components/FloatingPhotosSection.tsx` | 3 fotos da direita |
| `src/components/ServicesSection.tsx` | Imagens reais no hover e modal |
| `src/components/ui/image-gallery.tsx` | +1 imagem central |
| `src/components/BookSection.tsx` | Link Hotmart |
| `src/components/ContactFooter.tsx` | Contatos reais, remover telefone |
| `src/components/SpeakingSection.tsx` | WhatsApp real |

