import { create } from 'zustand';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';

type ProductState = {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const products = await productService.getAll();
      set({ products, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },
  fetchProductById: async (id: number) => {
    set({ loading: true });
    try {
      const product = await productService.getById(id);
      set({ currentProduct: product, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch product', loading: false });
    }
  },
}));