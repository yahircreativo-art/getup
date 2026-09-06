export const siteConfig = {
  /* ─────────────────────────────────────────────
     INFORMACIÓN BÁSICA DEL SITIO
  ───────────────────────────────────────────── */
  title: 'GetUp',
  url: 'https://ugetup.com', // URL pública sin barra final
  description:
    'Take your business to the next level with GetUp. We build professional websites for fitness and wellness businesses.',
  keywords: [
    'web design',
    'website development',
    'local seo',
    'fitness website',
    'wellness business',
    'small business website',
  ],
  author: 'GetUp',
  locale: 'en_US', // formato BCP-47 para og:locale (en_US, es_MX...)
  language: 'en-US', // atributo lang del <html>
  themeColor: '#7d73ff', // color de la barra del navegador en móvil
  favicon: '/getup-icon.svg',

  /* ─────────────────────────────────────────────
     IMAGEN PARA COMPARTIR (Open Graph / Twitter)
  ───────────────────────────────────────────── */
  ogImage: '/banner.webp', // se resuelve como {url}{ogImage}
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website', // website | article
  twitterCard: 'summary_large_image', // summary | summary_large_image
  twitterSite: '', // handle sin @, ej: 'getup'

  /* ─────────────────────────────────────────────
     REDES SOCIALES → generan el campo sameAs
     del schema JSON-LD automáticamente
  ───────────────────────────────────────────── */
  social: {
    github: 'https://github.com/yahircreativo-art/getup',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
  },

  /* ─────────────────────────────────────────────
     VERIFICACIÓN EN BUSCADORES
     Pega el código que te da cada herramienta
  ───────────────────────────────────────────── */
  verification: {
    google: '', // Google Search Console
    bing: '', // Bing Webmaster Tools
  },

  /* ─────────────────────────────────────────────
     DATOS DEL NEGOCIO → generan el schema
     JSON-LD (LocalBusiness). Deja vacío lo que
     no aplique y no se incluirá en el schema.
  ───────────────────────────────────────────── */
  business: {
    type: 'LocalBusiness', // LocalBusiness | Organization | ProfessionalService...
    name: 'GetUp',
    legalName: '', // nombre legal si es diferente
    description:
      'Take your business to the next level with GetUp. We build professional websites for fitness and wellness businesses.',
    phone: '', // con código de país, ej: '+1 555 123 4567'
    email: 'fernando.ygh@gmail.com',
    priceRange: '$$', // $, $$, $$$ — cuánto cobra
    currency: 'USD', // USD, MXN...
    foundingDate: '', // ej: '2024-01-15' o solo '2024'
    image: '/banner.webp',
    areaServed: '', // zona donde operas, ej: 'Austin, TX'
    address: {
      streetAddress: '', // ej: '123 Main St'
      addressLocality: '', // ciudad
      addressRegion: '', // estado
      postalCode: '',
      addressCountry: 'US',
    },
    geo: {
      latitude: '', // ej: '30.2672'
      longitude: '', // ej: '-97.7431'
    },
    openingHours: [
      // Formato Schema.org. Copia y pega tantas como necesites:
      // {
      //   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      //   opens: '09:00',
      //   closes: '18:00',
      // },
    ],
    contactType: 'customer service', // customer service | sales | support...
    languages: ['English', 'Spanish'],
  },
};