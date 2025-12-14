import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import toast from 'react-hot-toast';

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// ✅ Backend response for /sweets/purchase
export interface PurchaseResponse {
  message: string;
  price_per_unit: number;
  total_price: number;
  remaining_stock: number;
}

export const useSweets = () => {
  const queryClient = useQueryClient();

  // ✅ YOUR ENDPOINT: GET /api/v1/sweets
  const sweets = useQuery<Sweet[]>({
    queryKey: ['sweets'],
    queryFn: () => api.get('/sweets').then(res => res.data),
  });

  // ✅ YOUR ENDPOINT: POST /api/v1/sweets/purchase
  const purchaseSweet = useMutation({
    mutationFn: ({ sweetId, quantity = 1 }: { sweetId?: number; quantity?: number }) => 
      api.post<PurchaseResponse>('/sweets/purchase', { 
        sweet_id: sweetId, 
        quantity 
      }),
    onSuccess: (response: any) => {
      // ✅ response.data.message from your backend
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success(`${response.data.message} 🚀`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Purchase failed!');
    },
  });

  return { 
    sweets, 
    purchaseSweet,  // ✅ useMutation - use .mutate()
    isLoading: sweets.isLoading 
  };
};
