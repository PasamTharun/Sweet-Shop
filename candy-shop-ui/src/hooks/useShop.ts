import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import toast from 'react-hot-toast';

export interface ShopItem {
  id: number;
  item_name: string;
  item_type: string;
  unit_price: number;
  stock_count: number;
  available: boolean;
}

export const useShop = () => {
  const queryClient = useQueryClient();

  const items = useQuery<ShopItem[]>({
    queryKey: ['shopItems'],
    queryFn: () => api.get('/shop/items').then(res => res.data),
  });

  const buyItem = useMutation({
    mutationFn: (itemId: number) => api.post(`/shop/items/${itemId}/buy`, { quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopItems'] });
      toast.success('Yum! 🍭 Purchased successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Purchase failed!');
    },
  });

  return { 
    items, 
    buyItem: () => buyItem.mutate, 
    isLoading: items.isLoading || buyItem.isLoading 
  };
};
