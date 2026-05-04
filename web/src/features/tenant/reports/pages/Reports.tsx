import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { useReports, useSalesReport } from "../hooks/useReports";
import SummaryCards from "../components/SummaryCards";
import RevenueChart from "../components/RevenueChart";
import BookingChart from "../components/BookingChart";
import PropertySalesTable from "../components/PropertySalesTable";
import { useAvailability } from "../hooks/useAvailability";
import AvailabilityCalendar from "../components/AvailabilityCalendar";

function Reports() {
  const { loading, data } = useReports();
  const { data: salesData, filters, handleFilterChange, handleSearch } = useSalesReport();
  const availability = useAvailability();

  if (loading) return <LoaderFetching />;

  return (
    <div className="p-4 lg:p-8 space-y-8 font-display">
      <div>
        <h1 className="text-3xl font-black">Sales Analytics</h1>
      </div>

      <SummaryCards summary={data.summary} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RevenueChart data={data.revenueData} />
        <BookingChart data={data.bookingData} />
      </div>

      <PropertySalesTable filters={filters} onChange={handleFilterChange} onSearch={handleSearch} data={salesData} />

      <AvailabilityCalendar
        data={availability.data}
        filters={availability.filters}
        onMonthChange={(month: string) =>
          availability.setFilters({
            ...availability.filters,
            month,
          })
        }
      />
    </div>
  );
}

export default Reports;
