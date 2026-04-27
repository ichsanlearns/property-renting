import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/client";

export default function useDashboardTenant() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard/tenant");
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil((data?.recentBookings?.length || 0) / itemsPerPage);

  const paginatedBookings = useMemo(() => {
    if (!data?.recentBookings) return [];

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return data.recentBookings.slice(start, end);
  }, [data, currentPage]);

  return {
    data,
    loading,

    currentPage,
    setCurrentPage,
    totalPages,
    paginatedBookings,
  };
}
