import type { Link } from "@/lib/types";

export type FavoritesAction = {
  type: string;
  newLink?: Link;
};

export const favoritesReducer = (
  state: Link[],
  { type, newLink }: FavoritesAction,
): Link[] => {
  switch (type) {
    case "add":
      if (
        newLink &&
        !state.find(
          ({ key, value }) => key === newLink.key && value === newLink.value,
        )
      ) {
        return [...state, newLink];
      }
      break;
    case "clear":
      return [];
  }

  return state;
};
