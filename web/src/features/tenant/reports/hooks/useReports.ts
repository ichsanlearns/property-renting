import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/client";

export function useReports() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/dashboard");
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil((data?.propertySales?.length || 0) / itemsPerPage);

  const paginatedPropertySales = useMemo(() => {
    if (!data?.propertySales) return [];

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return data.propertySales.slice(start, end);
  }, [data, currentPage]);

  return {
    loading,
    data,

    currentPage,
    setCurrentPage,
    totalPages,
    paginatedPropertySales,
    itemsPerPage,
  };
}

export function useSalesReport() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    sort: "",
  });

  const handleFilterChange = (e: any) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchSales();
  };

  useEffect(() => {
    setLoading(true);
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/reports/sales", {
        params: filters,
      });

      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, filters, handleFilterChange, handleSearch };
}
