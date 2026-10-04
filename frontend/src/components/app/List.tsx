import { useState, useMemo, useContext } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useQuery } from "@tanstack/react-query";

import { get } from "@/lib/api";
import { getPagesToDisplay } from "@/lib/utils";
import { type Link } from "@/lib/types";
import { PAGES_AROUND } from "@/lib/constants";
import { FavoritesContext } from "@/lib/contexts";

import { Button } from "@/components/ui/button";

const fetchPages = () => get<{ pages: number }>("/links/pages");

const fetchLinks = (pageNumber: number) =>
  get<Link[]>("/links?page=" + String(pageNumber));

export const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { addFavorite } = useContext(FavoritesContext);

  const pagesQuery = useQuery({ queryKey: ["pages"], queryFn: fetchPages });
  const linksQuery = useQuery({
    queryKey: ["links", currentPage],
    queryFn: () => fetchLinks(currentPage),
  });

  const countPages = pagesQuery?.data?.response?.pages || 0;

  const pagesToDisplay = useMemo(
    () => getPagesToDisplay(currentPage, countPages),
    [currentPage, countPages],
  );

  const links = linksQuery?.data?.response || [];

  return (
    <Card className="w-full max-w-md mt-6 lg:mt-0">
      <CardHeader>
        <CardTitle>Links list</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {pagesToDisplay.length === 0 && links.length === 0 && (
            <span>No links to display</span>
          )}
          {links.map((l) => (
            <div key={l.key} className="flex gap-8 items-center justify-between">
              <div className="mb-2">
                <a target="_blank" href={l.value}>
                  {l.key} - {l.value}
                </a>
              </div>
              {addFavorite && (
                <Button className="justify-self-end cursor-pointer" onClick={() => addFavorite(l)}>Add to favorites</Button>
              )}
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            {pagesToDisplay.length > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {pagesToDisplay.map((i) => (
              <PaginationItem>
                <PaginationLink
                  isActive={i === currentPage}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pagesToDisplay.length > 1 &&
              currentPage + PAGES_AROUND < countPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            {pagesToDisplay.length > 1 && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};
