/** @type {import('next').NextConfig} */
export default {
  // HTML pré-renderizado, sem servidor. É isto que faz o site ser indexável sem
  // depender de o crawler executar JavaScript.
  output: 'export',
  // O optimizador de imagens precisa de servidor; as imagens já vêm
  // dimensionadas pelo srcset do template.
  images: { unoptimized: true },
  // Gera out/privacidade/index.html — servido tal e qual por qualquer nginx,
  // sem precisar de regras de reescrita.
  trailingSlash: true,
};
