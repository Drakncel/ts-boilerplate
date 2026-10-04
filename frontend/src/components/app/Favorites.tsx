import { useContext } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FavoritesContext } from "@/lib/contexts";
import { Button } from "@/components/ui/button";

export const Favorites = () => {
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  return (
    <Card className="w-full max-w-md mt-6 lg:mt-6">
      <CardHeader>
        <CardTitle>Favorites</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {!favorites?.length && <span>No favorites</span>}
          {favorites?.map((l) => (
            <div key={l.key} className="flex gap-8 items-center justify-start">
              <div className="mb-2">
                <a target="_blank" href={l.value}>
                  {l.key} - {l.value}
                </a>
              </div>
            </div>
          ))}
        </div>
        {!!favorites?.length && (
          <Button
            variant="destructive"
            className="float-right cursor-pointer"
            onClick={() => clearFavorites && clearFavorites()}
          >
            Clear Favorites
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
