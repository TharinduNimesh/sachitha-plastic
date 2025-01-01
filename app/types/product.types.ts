import type { Database } from './database.types'

export interface ProductImage {
  url: string
  file?: File
  isPrimary?: boolean;
}

export interface ProductDraft {
  name: string
  description: string
  category: string
  images: ProductImage[]
  lastSaved?: Date
}

export type ProductStatus = 'active' | 'inactive' | 'draft'
export type ProductAvailability = 'in_stock' | 'out_of_stock' | 'discontinued'

export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductImageRecord = Database['public']['Tables']['product_images']['Row']
