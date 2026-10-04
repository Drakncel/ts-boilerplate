import './App.css'

import { useReducer } from "react";
import { Toaster } from "./components/ui/toast";
import Form from "./components/app/Form";
import { List } from "./components/app/List";
import { Favorites } from "./components/app/Favorites";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Link } from "@/lib/types";
import { FavoritesContext } from "@/lib/contexts";
import { type FavoritesAction, favoritesReducer } from "./lib/reducers";

const queryClient = new QueryClient();

function App() {
  const [favorites, dispatchFavorites] = useReducer<Link[], [FavoritesAction]>(
    favoritesReducer,
    [],
  );

  const addFavorite = (link: Link): void =>
    dispatchFavorites({ type: "add", newLink: link });

  const clearFavorites = (): void => dispatchFavorites({ type: "clear" })

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
