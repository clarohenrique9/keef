import { products as localProducts } from '@/data/products';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  price: number;
  oldPrice: number | null;
  images: string[];
  sizes: string[];
  description: string | null;
  featured: boolean;
  stock: number;
}

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

async function getSupabaseProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const { createClient } = await import('@/lib/supabase/client');
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        url,
        order
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    brand: item.brand,
    category: item.category,
    gender: item.gender,
    price: item.price,
    oldPrice: item.old_price,
    images: (item.product_images || [])
      .sort((a: any, b: any) => a.order - b.order)
      .map((img: any) => img.url),
    sizes: item.sizes,
    description: item.description,
    featured: item.featured,
    stock: item.stock || 0
  }));
}

function mapLocalProductToUnified(local: typeof localProducts[0]): Product {
  return {
    id: local.id,
    slug: local.slug,
    name: local.name,
    brand: local.brand,
    category: local.category,
    gender: local.gender,
    price: local.price,
    oldPrice: local.oldPrice,
    images: local.images,
    sizes: local.sizes,
    description: local.description,
    featured: local.featured,
    stock: Math.floor(Math.random() * 50) + 10
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await getSupabaseProducts();
  } catch (error) {
    console.log('Using local products (Supabase failed or not configured)');
    return localProducts.map(mapLocalProductToUnified);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find(p => p.slug === slug) || null;
  } catch (error) {
    console.log('Using local product by slug (Supabase failed or not configured)');
    const local = localProducts.find(p => p.slug === slug);
    return local ? mapLocalProductToUnified(local) : null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(p => p.category === category);
  } catch (error) {
    console.log('Using local products by category (Supabase failed or not configured)');
    return localProducts
      .filter(p => p.category === category)
      .map(mapLocalProductToUnified);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(p => p.featured);
  } catch (error) {
    console.log('Using local featured products (Supabase failed or not configured)');
    return localProducts
      .filter(p => p.featured)
      .map(mapLocalProductToUnified);
  }
}
