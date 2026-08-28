import dados from '../site.data.json';

export const dynamic = 'force-static';

export default function sitemap() {
  const raiz = dados.cliente.dominio.replace(/\/$/, '');
  const agora = new Date();
  // Com trailingSlash o site serve /privacidade/ — o sitemap tem de anunciar
  // exatamente o endereço que existe, senão aponta para um redireccionamento.
  return ['/', '/privacidade/', '/termos/'].map((p) => ({
    url: `${raiz}${p}`,
    lastModified: agora,
    changeFrequency: p === '/' ? 'monthly' : 'yearly',
    priority: p === '/' ? 1 : 0.3,
  }));
}
