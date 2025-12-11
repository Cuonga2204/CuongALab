import axiosClient from "src/api/axiosClient";
import { DashboardEndpointsEnum } from "src/pages/admin/constants/dashboard.endpoints";
import type { RevenueStats } from "src/pages/admin/types/dashboard.types";

export const getDashboardOverview = async (
  from?: string,
  to?: string
): Promise<RevenueStats> => {
  const response = await axiosClient.get(DashboardEndpointsEnum.GET_OVERVIEW, {
    params: { from, to },
  });

  return response.data.data as RevenueStats;
};
