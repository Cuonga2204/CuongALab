export interface RevenueStats {
  revenue: number;
  courseSold: number;
  totalTransactions: number;
  newUsers: number;
  revenueGrowth: number;

  chartData: {
    month: string;
    revenue: number;
  }[];

  courseRevenue: {
    courseTitle: string;
    revenue: number;
  }[];
}
