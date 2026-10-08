import { useReducer } from "react";
import { Toaster } from "@/components/ui/toast";
import Form from "@/components/app/Form";
import { List } from "@/components/app/List";
import { Favorites } from "@/components/app/Favorites";
import { type Link } from "@/lib/types";
import { FavoritesContext } from "@/lib/contexts";
import { type FavoritesAction, favoritesReducer } from "@/lib/reducers";

export const Shortener = () => {
  const [favorites, dispatchFavorites] = useReducer<Link[], [FavoritesAction]>(
    favoritesReducer,
    [],
  );

  const addFavorite = (link: Link): void =>
    dispatchFavorites({ type: "add", newLink: link });

  const clearFavorites = (): void => dispatchFavorites({ type: "clear" });

  return (
    <FavoritesContext value={{ favorites, addFavorite, clearFavorites }}>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 place-items-center items-start">
            <Form />
            <List />
            <Favorites />
          </div>
        </main>
        <Toaster />
      </div>
    </FavoritesContext>
  );
};
