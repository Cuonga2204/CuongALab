import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "src/pages/admin/api/dashboard.api";
import type { RevenueStats } from "src/pages/admin/types/dashboard.types";

export const useDashboardStats = (from?: string, to?: string) =>
  useQuery<RevenueStats>({
    queryKey: ["dashboard-stats", from, to],
    queryFn: () => getDashboardOverview(from, to),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
