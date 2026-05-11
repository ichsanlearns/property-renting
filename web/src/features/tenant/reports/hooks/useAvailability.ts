import { useEffect, useState } from "react";
import api from "../../../../api/client";

export function useAvailability() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7),
  });

  const handleMonthChange = (e: any) => {
    setFilters({
      ...filters,
      month: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const res = await api.get("/reports/availability", {
        params: filters,
      });
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return { data, loading, filters, setFilters, handleMonthChange };
}
