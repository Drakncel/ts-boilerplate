import { PAGES_AROUND } from "./constants";

export const getPagesToDisplay = (selectedPage: number, max: number): number[] => {
    const pages = [];
    const start = selectedPage - PAGES_AROUND;
    for (let i = 0; i < PAGES_AROUND * 2 + 1; i++) {
      const c = start + i;
      if (c <= 0) {
        continue;
      }
  
      if (c <= max) {
        pages.push(c);
      }
    }
  
    return pages;
  };