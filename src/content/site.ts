export type AxisContent = {
  slug: string;
  title: string;
  text: string;
  index: string;
  body?: unknown[];
  imageUrl?: string;
};

export type NewsContent = {
  slug: string;
  category: string;
  title: string;
  text: string;
  image: string;
  imageUrl?: string;
  publishedAt?: string;
  body?: unknown[];
};

export const axes: AxisContent[] = [
  { slug: "habitat-y-vivienda", title: "Hábitat y vivienda", text: "Tierra, vivienda e integración sociourbana como derechos.", index: "01" },
  { slug: "ambiente-y-rio", title: "Ambiente y río", text: "Defensa del Paraná, los humedales y los bienes comunes frente al saqueo.", index: "02" },
  { slug: "generos-y-diversidad", title: "Géneros y diversidad", text: "Políticas de igualdad, diversidad y reconocimiento del trabajo de cuidados.", index: "03" },
  { slug: "cultura-y-comunicacion", title: "Cultura y comunicación", text: "Espacios culturales, medios y producción colectiva de sentido.", index: "04" },
  { slug: "deporte-social", title: "Deporte social", text: "Clubes, playones y deporte comunitario como herramientas de inclusión y organización.", index: "05" },
  { slug: "trabajo-y-produccion", title: "Trabajo y producción", text: "Economía popular, cooperativas, pymes y empleo digno.", index: "06" }
];

export const pillars = [
  { title: "Organización", text: "Construimos poder desde los barrios, las escuelas, los clubes, los comedores y los espacios comunitarios." },
  { title: "Comunidad", text: "Creemos que nadie se salva solo. La solidaridad y el trabajo colectivo son una forma de hacer política todos los días." },
  { title: "Visión", text: "Pensamos una ciudad que pueda decidir su rumbo y construir respuestas comunes a sus problemas." },
  { title: "Transformación", text: "Impulsamos una Santa Fe más justa, con vivienda, trabajo, ambiente sano, cultura y deporte para todos." }
];

export const news: NewsContent[] = [
  {
    slug: "relevamientos-en-comedores-y-barrios",
    category: "Santa Fe Sin Hambre",
    title: "Relevamientos en comedores y barrios",
    text: "Construimos un mapa de la emergencia alimentaria junto a organizaciones comunitarias de toda la ciudad.",
    image: "https://drive.google.com/uc?export=view&id=1_BQBUajl1WP_mQhq3cBy5ZDRRTgFBlKZ"
  },
  {
    slug: "debate-por-una-ciudad-mas-justa",
    category: "Ciudad",
    title: "Participamos del debate por una ciudad más justa",
    text: "Llevamos propuestas sobre hábitat, integración sociourbana, ambiente y participación para ampliar derechos.",
    image: "https://drive.google.com/uc?export=view&id=1Yjil6-BYX4P3OvO8SkYRZmFyIt2Bp685"
  },
  {
    slug: "organizacion-y-participacion",
    category: "Organización",
    title: "La ciudad se transforma con organización y participación",
    text: "Nos encontramos en barrios, clubes, universidades y organizaciones para construir respuestas colectivas.",
    image: "https://drive.google.com/uc?export=view&id=1jH1vLhywB5ZmuO64gN2vy_RIG1CszX3p"
  }
];

export const aboutParagraphs = [
  "Fuerza Común es un espacio político nacido en 2022 y construido por personas que creemos que nuestra ciudad puede estar mejor y que transformarla es un derecho que se ejerce mediante la organización y el compromiso colectivo.",
  "Nacimos del encuentro de personas con recorridos distintos: trabajadores y trabajadoras, jóvenes, estudiantes, profesionales, referentes barriales, vecinales, deportivos, culturales, sindicales y de organizaciones sociales. Nos une una convicción: los grandes problemas de Santa Fe no se resuelven de manera individual o sectorial. Necesitamos construir, para nuestros problemas, respuestas comunes. Para nuestros sueños colectivos, un camino colectivo.",
  "Hacemos política desde la realidad cotidiana de nuestra ciudad. Desde los barrios, los lugares de trabajo, las universidades, los clubes, las organizaciones y cada espacio donde las y los santafesinos se organizan para mejorar su comunidad.",
  "Queremos una Santa Fe que genere trabajo y producción, que defienda desde su lugar la educación y la salud pública, que acompañe a quienes más lo necesitan, que recupere y aproveche sus recursos estratégicos y que brinde oportunidades para que nuestros jóvenes puedan construir su futuro acá.",
  "Creemos en una política que escuche, que esté presente y que vuelva a involucrar a la comunidad en las decisiones y acciones sobre el rumbo de la ciudad.",
  "No pensamos Fuerza Común como un espacio cerrado. Queremos encontrarnos con todos aquellos que, aun viniendo de experiencias y tradiciones diferentes, compartan la necesidad de construir una Santa Fe más justa, soberana, productiva y solidaria."
];

export const defaultSettings = {
  heroTitle: "Sentir en común para transformarlo todo.",
  heroText: "Somos un espacio político y social de Santa Fe que construye comunidad y organiza respuestas colectivas frente a la desigualdad.",
  heroImageUrl: "https://drive.google.com/uc?export=view&id=1zoIeaIxCxXCTBMnyxw2o23-dbuQKwOUf",
  instagram: "https://www.instagram.com/fuerzacomun_/",
  facebook: "https://www.facebook.com/fuerzacomunsf?locale=es_LA"
};
