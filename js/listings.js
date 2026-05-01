/* ==========================================================================
   LISTINGS — single source of truth for all properties on the site
   --------------------------------------------------------------------------
   Architecture:
   - One listing = one entry, keyed by slug (URL-safe id).
   - `cover` is the card image on home + listings grid.
   - `photos` is the gallery on imovel.html — each listing has its OWN photos,
     never mixed with other listings' covers.
   - `listed:true` = real, browsable property → gets "Ver Anúncio Completo"
     button + dedicated detail page (imovel.html?id=<slug>).
   - `listed:false` = template / dummy card on home (hides Ver Anúncio,
     keeps WhatsApp). Will be replaced with real listings via the future
     dashboard / Sanity CMS.

   When adding a new listing later (manual or via dashboard):
     1. Pick a slug (lowercase, hyphenated, unique).
     2. Drop photos into images/listings/<slug>/ if you want a per-listing
        folder structure (currently photos live flat in /images/).
     3. Add the entry below — order in LISTINGS_ORDER controls homepage grid.
     4. Set listed:true once detail page content is filled in.

   Sandbox-to-live model (Wix-style):
   - This file IS the source of truth. Editing here = editing every page that
     reads from it (index.html, imoveis.html, imovel.html). No duplication,
     no drift.
   ========================================================================== */

window.LISTINGS = {
  /* ----------------------------------------------------------------------
     REAL LISTINGS (listed:true)
     ---------------------------------------------------------------------- */
  'urbanova-paratehy': {
    slug: 'urbanova-paratehy',
    title: 'Casa em Condomínio · Colinas do Paratehy Sul',
    location: 'São José dos Campos, SP',
    locationFull: 'Urbanova, São José dos Campos — SP',
    price: 'Sob consulta',
    priceNote: 'Entre em contato para informações · Mobiliada · Venda porteira fechada',
    area: '510',
    terrain: '600',
    q: '4', b: '6', v: '4',
    suites: '4',
    badge: 'Destaque · Mobiliada',
    cover: 'images/urb_cover.jpg',
    photos: [
      /* — FACHADA — */
      { src: 'images/urb_01_fachada.jpg',        caption: 'Fachada Principal' },
      { src: 'images/urb_00_fachada_2.jpg',       caption: 'Fachada · Ângulo 2' },

      /* — HALL DE ENTRADA — double-height entry hall + crystal chandelier */
      { src: 'images/urb_21_extra_03.jpg',        caption: 'Hall de Entrada · Pé Direito Duplo' },
      { src: 'images/urb_20_extra_02.jpg',        caption: 'Hall de Entrada · Lustre de Cristal' },

      /* — SALA DE JANTAR — */
      { src: 'images/urb_04_sala_jantar.jpg',     caption: 'Sala de Jantar' },

      /* — COZINHA + ÁREA GOURMET EXTERNA (all grouped) — */
      { src: 'images/urb_05_cozinha.jpg',         caption: 'Cozinha Gourmet' },
      { src: 'images/urb_25_cozinha_pia.jpg',     caption: 'Cozinha · Vista Ampla' },
      { src: 'images/urb_06_cozinha_2.jpg',       caption: 'Cozinha · Appliances' },
      { src: 'images/urb_26_cozinha_fornos.jpg',  caption: 'Cozinha · Fornos' },
      { src: 'images/urb_07_varanda.jpg',         caption: 'Área Gourmet · Pergolado' },
      { src: 'images/urb_08_varanda_jantar.jpg',  caption: 'Área Gourmet · Mesa de Jantar' },
      { src: 'images/urb_24_area_gourmet.jpg',    caption: 'Área Gourmet · Churrasqueira e Forno de Pizza' },

      /* — PISCINA (all pool shots together) — */
      { src: 'images/urb_09_piscina_noturna.jpg', caption: 'Piscina · Vista Noturna' },
      { src: 'images/urb_23_extra_05.jpg',        caption: 'Piscina · Vista Crepuscular' },

      /* — SUÍTE MASTER + BANHEIROS (all together: empty suite, bathrooms, then staged beds) — */
      { src: 'images/urb_02_sala.jpg',            caption: 'Suíte Master · Ambiente' },
      { src: 'images/urb_03_sala_2.jpg',          caption: 'Suíte Master · Painel TV' },
      { src: 'images/urb_24_banheiro_shower_spa.jpg', caption: 'Banheiro · Acesso e Shower Spa' },
      { src: 'images/urb_11_banheiro_master.jpg', caption: 'Suíte Master · Banheiro · Banheira' },
      { src: 'images/urb_10_banheiro_spa.jpg',    caption: 'Banheiro Spa · Banheira + Área Molhada' },
      { src: 'images/urb_22_extra_04.jpg',        caption: 'Lavabo em Ônix' },
      { src: 'images/urb_15_suite_master_1.jpg',  caption: 'Suíte Master · Cama · Ângulo 1' },
      { src: 'images/urb_16_suite_master_2.jpg',  caption: 'Suíte Master · Cama · Ângulo 2' },
      { src: 'images/urb_17_suite_master_3.jpg',  caption: 'Suíte Master · Cama · Ângulo 3' },

      /* — QUARTO KIDS — */
      { src: 'images/urb_18_quarto_kids.jpg',     caption: 'Quarto Kids' },

      /* — OUTROS AMBIENTES — */
      { src: 'images/urb_12_escritorio.jpg',      caption: 'Escritório' },
      { src: 'images/urb_13_closet.jpg',          caption: 'Closet · Armários' },
      { src: 'images/urb_14_cinema.jpg',          caption: 'Sala de Cinema' },
      { src: 'images/urb_19_extra_01.jpg',        caption: 'Detalhe · Claraboia' }
    ],
    desc: 'Casa de alto padrão em condomínio fechado nas Colinas do Paratehy Sul. 510 m² construídos · 600 m² de terreno · 4 suítes (master 88 m² com closet e banheira dupla) · sala cinema · lareira suspensa · cozinha gourmet · piscina · biometria · cisterna 8.000L. Mobiliada · venda porteira fechada.',
    descParas: [
      'Casa em condomínio localizada no Urbanova, em São José dos Campos — bairro estrategicamente próximo a comércios, escolas, shoppings e às principais vias de acesso da cidade.',
      'Projeto de alto padrão com 600m² de terreno, 510m² de área construída e 50m² de terraço. Quatro suítes com varandas, sendo a master de 88m² com closet e banheira dupla. Sala de estar com pé direito duplo de 7 metros, sala íntima, sala de jantar, sala de cinema, escritório e lareira suspensa.',
      'Cozinha gourmet equipada e área gourmet completa com churrasqueira, forno de pizza e som ambiente. Piscina, lavanderia planejada, garagem com 4 vagas e 2 hobby box. Venda porteira fechada — inclui móveis e eletrodomésticos.'
    ],
    features: [
      'Suíte master 88m² com closet e banheira dupla',
      '4 suítes com varandas',
      'Sala de estar com pé direito duplo (7m)',
      'Sala de cinema',
      'Sala íntima e escritório',
      'Lareira suspensa',
      'Piscina',
      'Cozinha gourmet equipada',
      'Área gourmet · churrasqueira · forno de pizza · som ambiente',
      'Lavabo em ônix importado',
      'Escada em Travertino Romano',
      'Iluminação em LED',
      '2 TVs de 86 polegadas',
      'Porta com biometria',
      'Sistema de câmeras completo',
      'Estrutura para aspiração central',
      'Cisterna de 8.000 litros',
      'Lavanderia planejada',
      'Garagem 4 vagas + 2 hobby box',
      'Venda porteira fechada'
    ],
    wa: 'Olá! Tenho interesse na Casa em Condomínio nas Colinas do Paratehy Sul (SJC). Podemos agendar uma visita?',
    listed: true
  },

  'eco-park-cacapava': {
    slug: 'eco-park-cacapava',
    title: 'Casa em Condomínio Eco Park',
    location: 'Caçapava, SP',
    locationFull: 'Condomínio Eco Park Bourbon, Caçapava — SP',
    price: 'R$ 3.000.000',
    area: '257',
    terrain: '540',
    q: '3', b: '4', v: '4',
    badge: 'Mobiliada · Pronta',
    cover: 'images/site_listing_card_06.jpg',
    photos: [
      { src: 'images/site_listing_card_06.jpg', caption: 'Fachada' }
    ],
    desc: 'Casa de alto padrão totalmente mobiliada no Condomínio Eco Park Bourbon. 257 m² construídos · 540 m² de terreno · 3 suítes (master com closet) · automação completa · piscina privativa · escritório · sala pé-direito duplo · cozinha moderna · área gourmet. Pronta para morar.',
    wa: 'Olá! Tenho interesse na Casa do Eco Park em Caçapava (R$ 3.000.000). Podemos agendar uma visita?',
    listed: true
  },

  /* ----------------------------------------------------------------------
     TEMPLATE / DUMMY (listed:false) — no detail page, WhatsApp only
     ---------------------------------------------------------------------- */
  'refugio-natural': {
    slug: 'refugio-natural',
    title: 'Casa em Condomínio · Reserva Guará',
    location: 'Guaratinguetá, SP',
    price: 'R$ 1.900.000',
    area: '320', terrain: '480', q: '3', b: '3', v: '2',
    badge: 'Oportunidade',
    cover: 'images/prop_refugio.jpg',
    photos: [],
    desc: 'Casa de alto padrão no Condomínio Reserva Guará. 320 m² construídos · 480 m² de terreno · 3 suítes · cozinha gourmet · varanda com churrasqueira · piscina privativa · paisagismo tropical. Acabamento premium e localização privilegiada em Guaratinguetá.',
    wa: 'Olá! Tenho interesse na casa do Condomínio Reserva Guará em Guaratinguetá (R$ 1.900.000). Podemos agendar uma visita?',
    listed: false
  },

  'mansao-horizonte': {
    slug: 'mansao-horizonte',
    title: 'Casa em Condomínio · Village Paineiras',
    location: 'Pindamonhangaba, SP',
    price: 'R$ 6.500.000',
    area: '850', terrain: '1200', q: '5', b: '6', v: '4',
    badge: 'Exclusivo',
    cover: 'images/prop_mansao.jpg',
    photos: [],
    desc: 'Residência de altíssimo padrão no Village Paineiras. 850 m² construídos · 1.200 m² de terreno · 5 suítes (master 120 m² com closet e hidromassagem) · sala com pé-direito duplo · home theater · piscina de borda infinita · quadra poliesportiva · vista para as montanhas do Vale do Paraíba.',
    wa: 'Olá! Tenho interesse na residência do Village Paineiras em Pindamonhangaba (R$ 6.500.000). Podemos agendar uma visita?',
    listed: false
  },

  'casa-do-vale': {
    slug: 'casa-do-vale',
    title: 'Casa em Condomínio · Morada Lorena',
    location: 'Lorena, SP',
    price: 'R$ 3.100.000',
    area: '420', terrain: '650', q: '4', b: '4', v: '3',
    badge: 'Novo',
    cover: 'images/prop_vale.jpg',
    photos: [],
    desc: 'Casa contemporânea no Condomínio Morada Lorena. 420 m² construídos · 650 m² de terreno · 4 suítes · fachada em pedra natural e madeira · cozinha gourmet integrada · varanda coberta · piscina · jardim arborizado · 3 vagas cobertas. Acabamento impecável, pronta para morar.',
    wa: 'Olá! Tenho interesse na casa do Condomínio Morada Lorena (R$ 3.100.000). Podemos agendar uma visita?',
    listed: false
  },

  'quinta-paraiba': {
    slug: 'quinta-paraiba',
    title: 'Casa em Condomínio · Mirante do Vale',
    location: 'Jacareí, SP',
    price: 'R$ 2.400.000',
    area: '390', terrain: '580', q: '4', b: '4', v: '2',
    badge: 'Oportunidade',
    cover: 'images/prop_quinta.jpg',
    photos: [],
    desc: 'Casa de alto padrão no Condomínio Mirante do Vale, com vista privilegiada para a Serra da Mantiqueira. 390 m² construídos · 580 m² de terreno · 4 suítes · sala de estar ampla com pé-direito duplo · varanda gourmet · piscina com deck · paisagismo completo.',
    wa: 'Olá! Tenho interesse na casa do Condomínio Mirante do Vale em Jacareí (R$ 2.400.000). Podemos agendar uma visita?',
    listed: false
  }
};

/* Order in homepage grid + listings page (left→right, top→bottom) */
window.LISTINGS_ORDER = [
  'urbanova-paratehy',
  'eco-park-cacapava',
  'refugio-natural',
  'mansao-horizonte',
  'casa-do-vale',
  'quinta-paraiba'
];

/* Helper: get listing by slug from URL ?id= or fallback to default */
window.getListingFromQuery = function(fallbackSlug) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('id');
  if (slug && window.LISTINGS[slug]) return window.LISTINGS[slug];
  return window.LISTINGS[fallbackSlug] || null;
};
