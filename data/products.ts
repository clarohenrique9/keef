export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  price: number;
  oldPrice: number;
  images: string[];
  sizes: string[];
  description: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "camiseta-starter-classic",
    name: "Camiseta Starter Classic",
    brand: "Starter",
    category: "masculino",
    gender: "masculino",
    price: 149.9,
    oldPrice: 189.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Peça essencial com estética streetwear premium.",
    featured: true
  },
  {
    id: "2",
    slug: "camiseta-huntington-classica",
    name: "Camiseta Huntington Clássica",
    brand: "Huntington",
    category: "masculino",
    gender: "masculino",
    price: 129.9,
    oldPrice: 159.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Camiseta de alta qualidade com logo minimalista.",
    featured: true
  },
  {
    id: "3",
    slug: "tenis-mizuno-wave",
    name: "Tênis Mizuno Wave",
    brand: "Mizuno",
    category: "tenis",
    gender: "masculino",
    price: 499.9,
    oldPrice: 599.9,
    images: ["/Logo-Dark.png"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Tênis de corrida com amortecimento avançado.",
    featured: true
  },
  {
    id: "4",
    slug: "tenis-olympikus-speed",
    name: "Tênis Olympikus Speed",
    brand: "Olympikus",
    category: "tenis",
    gender: "masculino",
    price: 349.9,
    oldPrice: 399.9,
    images: ["/Logo-Dark.png"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Tênis versátil para treino e dia a dia.",
    featured: true
  },
  {
    id: "5",
    slug: "blusa-onbongo-feminina",
    name: "Blusa Onbongo Feminina",
    brand: "Onbongo",
    category: "feminino",
    gender: "feminino",
    price: 179.9,
    oldPrice: 219.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G"],
    description: "Blusa confortável com design moderno.",
    featured: true
  },
  {
    id: "6",
    slug: "camiseta-aleatory-unissex",
    name: "Camiseta Aleatory Unissex",
    brand: "Aleatory",
    category: "masculino",
    gender: "unissex",
    price: 99.9,
    oldPrice: 129.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Camiseta unissex com estilo único.",
    featured: false
  },
  {
    id: "7",
    slug: "bone-new-era-9forty",
    name: "Boné New Era 9Forty",
    brand: "New Era",
    category: "acessorios",
    gender: "unissex",
    price: 199.9,
    oldPrice: 249.9,
    images: ["/Logo-Dark.png"],
    sizes: ["Único"],
    description: "Boné icônico New Era com ajuste regulável.",
    featured: true
  },
  {
    id: "8",
    slug: "bone-nba-classic",
    name: "Boné NBA Classic",
    brand: "NBA",
    category: "acessorios",
    gender: "unissex",
    price: 179.9,
    oldPrice: 219.9,
    images: ["/Logo-Dark.png"],
    sizes: ["Único"],
    description: "Boné oficial da NBA com logo da liga.",
    featured: false
  },
  {
    id: "9",
    slug: "tenis-asics-gel",
    name: "Tênis Asics Gel",
    brand: "Asics",
    category: "tenis",
    gender: "masculino",
    price: 549.9,
    oldPrice: 649.9,
    images: ["/Logo-Dark.png"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Tênis de corrida com tecnologia Gel.",
    featured: false
  },
  {
    id: "10",
    slug: "sapato-moleca-classico",
    name: "Sapato Moleca Clássico",
    brand: "Moleca",
    category: "feminino",
    gender: "feminino",
    price: 299.9,
    oldPrice: 349.9,
    images: ["/Logo-Dark.png"],
    sizes: ["35", "36", "37", "38", "39"],
    description: "Sapato confortável e elegante da Moleca.",
    featured: false
  },
  {
    id: "11",
    slug: "camiseta-starter-logo",
    name: "Camiseta Starter Logo",
    brand: "Starter",
    category: "masculino",
    gender: "masculino",
    price: 139.9,
    oldPrice: 169.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Camiseta com logo grande da Starter.",
    featured: false
  },
  {
    id: "12",
    slug: "jaqueta-huntington",
    name: "Jaqueta Huntington",
    brand: "Huntington",
    category: "masculino",
    gender: "masculino",
    price: 399.9,
    oldPrice: 499.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Jaqueta resistente com estilo urbano.",
    featured: false
  },
  {
    id: "13",
    slug: "saia-onbongo-feminina",
    name: "Saia Onbongo Feminina",
    brand: "Onbongo",
    category: "feminino",
    gender: "feminino",
    price: 159.9,
    oldPrice: 199.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G"],
    description: "Saia versátil para diversas ocasiões.",
    featured: false
  },
  {
    id: "14",
    slug: "tenis-olympikus-feminino",
    name: "Tênis Olympikus Feminino",
    brand: "Olympikus",
    category: "tenis",
    gender: "feminino",
    price: 329.9,
    oldPrice: 379.9,
    images: ["/Logo-Dark.png"],
    sizes: ["35", "36", "37", "38", "39"],
    description: "Tênis feminino confortável e estiloso.",
    featured: false
  },
  {
    id: "15",
    slug: "moletom-starter-classic",
    name: "Moletom Starter Classic",
    brand: "Starter",
    category: "masculino",
    gender: "masculino",
    price: 299.9,
    oldPrice: 349.9,
    images: ["/Logo-Dark.png"],
    sizes: ["P", "M", "G", "GG"],
    description: "Moletom quente e confortável da Starter.",
    featured: false
  },
  {
    id: "16",
    slug: "pulsera-new-era",
    name: "Pulsera New Era",
    brand: "New Era",
    category: "acessorios",
    gender: "unissex",
    price: 49.9,
    oldPrice: 69.9,
    images: ["/Logo-Dark.png"],
    sizes: ["Único"],
    description: "Pulsera casual da New Era.",
    featured: false
  }
];
