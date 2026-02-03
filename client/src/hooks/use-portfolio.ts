import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { apiUrl } from "@/lib/api";

export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.get.path],
    queryFn: async () => {
      const res = await fetch(apiUrl(api.portfolio.get.path), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.get.responses[200].parse(await res.json());
    },
  });
}

export function useResetPortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(apiUrl(api.portfolio.reset.path), {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to reset portfolio");
      return api.portfolio.reset.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.portfolio.get.path] });
      queryClient.invalidateQueries({ queryKey: [api.trades.list.path] });
    },
  });
}
