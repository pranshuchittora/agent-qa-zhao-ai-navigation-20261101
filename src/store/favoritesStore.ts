import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorited: (toolId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (toolId: string) =>
        set((state) => ({
          favorites: state.favorites.includes(toolId)
            ? state.favorites.filter((id) => id !== toolId)
            : [...state.favorites, toolId],
        })),

      isFavorited: (toolId: string) =>
        get().favorites.includes(toolId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'ai-nav-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
