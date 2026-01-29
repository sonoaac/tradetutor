import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type TradeInput } from "@shared/routes";

export function useTrades() {
  return useQuery({
    queryKey: [api.trades.list.path],
    queryFn: async () => {
      const res = await fetch(api.trades.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch trades");
      return api.trades.list.responses[200].parse(await res.json());
    },
  });
}

export function useTrade(id: number) {
  return useQuery({
    queryKey: [api.trades.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.trades.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch trade");
      return api.trades.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateTrade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TradeInput) => {
      const res = await fetch(api.trades.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create trade");
      }
      return api.trades.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.trades.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.portfolio.get.path] });
    },
  });
}

export function useCloseTrade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, exitPrice }: { id: number; exitPrice: number }) => {
      const url = buildUrl(api.trades.close.path, { id });
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exitPrice }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to close trade");
      return api.trades.close.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.trades.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.portfolio.get.path] });
    },
  });
}
