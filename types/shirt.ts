export type Shirt = {
  id: string;
  name: string;
  team: 'ABC' | 'OTHER';
  year: number;

  type: 'jogo' | 'treino' | 'torcedor';

  status: 'owned' | 'wishlist';

  priority?: 'low' | 'medium' | 'high' | 'very_high';

  supplier?: string;

  is_for_sale: boolean;
  price?: number | null;

  image_url: string;

  created_at?: string;
};