import { createContext } from "react";

import { type Link } from "@/lib/types";

export const FavoritesContext = createContext<{
  favorites?: Link[];
  addFavorite?: (link: Link) => void;
  clearFavorites?: () => void;
}>({});
