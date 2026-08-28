// Metadados de uma demo. Partilhados pelas duas entradas: o caminho interno
// (`/nicho/negocio`, usado nas propostas) e a raiz do domínio do cliente.
import { emLocal } from './tema.js';

const virgula = (n) => String(n ?? '').replace('.', ',');

export function metadataDaDemo(demo) {
  if (!demo) return { title: 'Demonstração indisponível' };

  // Tudo o que aqui aparece é da própria lead: nome, ofício, concelho e nota reais.
  const { lead } = demo;
  const oficio = lead.oficio ? lead.oficio[0].toUpperCase() + lead.oficio.slice(1) : 'Serviços';
  const local = emLocal(lead.concelho);
  const titulo = `${lead.nome_negocio} — ${oficio}${local}`;
  const nota = lead.nota
    ? `${virgula(lead.nota)} ★ com ${lead.reviews} avaliações no Google.`
    : '';

  // Uma demo nunca compete com a ficha Google da lead (PLANO.md §8.2). Quando o
  // negócio compra, o site passa a ser dele: sai o noindex e entra o canonical
  // do domínio próprio.
  const cliente = demo.modo === 'cliente';
  const raiz = demo.cliente?.dominio?.replace(/\/$/, '');
  // `teste: true` no site.data.json de um site ejetado: serve para validar o
  // deploy sem pôr no Google um negócio que ainda não é cliente. Tudo o resto
  // fica igual, para o teste ser do caminho a sério.
  const indexavel = cliente && !demo.teste;

  return {
    title: titulo,
    description: `${oficio}${local}. ${nota}`.trim(),
    robots: indexavel ? { index: true, follow: true } : { index: false, follow: false },
    ...(cliente && raiz ? { metadataBase: new URL(raiz), alternates: { canonical: '/' } } : {}),
    openGraph: {
      title: titulo,
      description: nota,
      type: 'website',
      locale: 'pt_PT',
      // A imagem por convenção de ficheiro resolve para a origem do pedido, não
      // para o metadataBase — no site do cliente saía o endereço do motor. Numa
      // proposta a convenção acerta sozinha e não se toca.
      ...(cliente && raiz ? {
        url: raiz,
        images: [{ url: `${raiz}/opengraph-image`, width: 1200, height: 630, alt: titulo }],
      } : {}),
    },
    twitter: { card: 'summary_large_image', title: titulo, description: nota },
  };
}
