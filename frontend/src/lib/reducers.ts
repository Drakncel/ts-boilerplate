import type { Link } from "@/lib/types";
import { post } from "./api";

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

export type MagicState = { addedMagic: number }

export const magicReducer = async (
  state: MagicState,
  { type }: { type: string }
): Promise<MagicState> => {
  switch (type) {
    case "add":
      try {
        const result = await post('/magic', {})
        if (!result.success) {
          return state
        }
        return { addedMagic: state.addedMagic + 1 }
      } catch {
        return state
      }
  }

  return state
}
