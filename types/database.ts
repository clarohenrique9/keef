export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string | null;
          email: string | null;
          phone: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          slug: string;
          name: string;
          brand: string;
          category: string;
          gender: string;
          price: number;
          old_price: number | null;
          sizes: string[];
          description: string | null;
          featured: boolean;
          stock: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          slug: string;
          name: string;
          brand: string;
          category: string;
          gender: string;
          price: number;
          old_price?: number | null;
          sizes: string[];
          description?: string | null;
          featured?: boolean;
          stock?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          slug?: string;
          name?: string;
          brand?: string;
          category?: string;
          gender?: string;
          price?: number;
          old_price?: number | null;
          sizes?: string[];
          description?: string | null;
          featured?: boolean;
          stock?: number;
        };
      };
      product_images: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          product_id: string;
          url: string;
          order: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          product_id: string;
          url: string;
          order?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          product_id?: string;
          url?: string;
          order?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_type: 'store' | 'home';
          address_cep: string | null;
          address_street: string | null;
          address_number: string | null;
          address_neighborhood: string | null;
          address_city: string | null;
          address_state: string | null;
          address_complement: string | null;
          payment_method: 'pix' | 'card' | 'boleto';
          payment_status: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          order_status: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          subtotal: number;
          shipping: number;
          total: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_type: 'store' | 'home';
          address_cep?: string | null;
          address_street?: string | null;
          address_number?: string | null;
          address_neighborhood?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_complement?: string | null;
          payment_method: 'pix' | 'card' | 'boleto';
          payment_status?: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          order_status?: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          subtotal: number;
          shipping: number;
          total: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          delivery_type?: 'store' | 'home';
          address_cep?: string | null;
          address_street?: string | null;
          address_number?: string | null;
          address_neighborhood?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_complement?: string | null;
          payment_method?: 'pix' | 'card' | 'boleto';
          payment_status?: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          order_status?: 'pending_payment' | 'paid' | 'cancelled' | 'failed';
          subtotal?: number;
          shipping?: number;
          total?: number;
        };
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_brand: string;
          product_price: number;
          size: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_brand: string;
          product_price: number;
          size: string;
          quantity: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_brand?: string;
          product_price?: number;
          size?: string;
          quantity?: number;
        };
      };
      favorites: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          product_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          product_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          product_id?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          product_id: string;
          size: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          product_id: string;
          size: string;
          quantity?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          product_id?: string;
          size?: string;
          quantity?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
