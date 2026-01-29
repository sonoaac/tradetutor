import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useLessons() {
  return useQuery({
    queryKey: [api.lessons.list.path],
    queryFn: async () => {
      const res = await fetch(api.lessons.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lessons");
      return api.lessons.list.responses[200].parse(await res.json());
    },
  });
}

export function useLesson(slug: string) {
  return useQuery({
    queryKey: [api.lessons.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.lessons.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch lesson");
      return api.lessons.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, score }: { id: number; score?: number }) => {
      const url = buildUrl(api.lessons.complete.path, { id });
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to complete lesson");
      return api.lessons.complete.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.lessons.get.path] });
    },
  });
}
