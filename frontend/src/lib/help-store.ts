import { create } from 'zustand';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  relatedArticles?: string[];
}

interface HelpStore {
  isHelpOpen: boolean;
  isShortcutsOpen: boolean;
  selectedArticleId: string | null;
  openHelp: (articleId?: string) => void;
  closeHelp: () => void;
  openShortcuts: () => void;
  closeShortcuts: () => void;
  setSelectedArticle: (id: string | null) => void;
}

export const useHelpStore = create<HelpStore>((set) => ({
  isHelpOpen: false,
  isShortcutsOpen: false,
  selectedArticleId: null,
  openHelp: (articleId) => set({ isHelpOpen: true, selectedArticleId: articleId || null }),
  closeHelp: () => set({ isHelpOpen: false, selectedArticleId: null }),
  openShortcuts: () => set({ isShortcutsOpen: true }),
  closeShortcuts: () => set({ isShortcutsOpen: false }),
  setSelectedArticle: (id) => set({ selectedArticleId: id }),
}));
