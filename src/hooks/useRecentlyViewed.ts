import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recently_viewed_scholarships";
const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addViewed = useCallback((id: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((x) => x !== id);
      return [id, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  return { recentIds, addViewed };
}
