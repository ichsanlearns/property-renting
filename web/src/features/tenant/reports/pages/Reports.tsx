import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { useReports } from "../hooks/useReports";

import SummaryCards from "../components/SummaryCards";
import RevenueChart from "../components/RevenueChart";
import BookingChart from "../components/BookingChart";
import PropertySalesTable from "../components/PropertySalesTable";

function Reports() {
  const { loading, data } = useReports();

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

      <PropertySalesTable data={data.propertySales} />
    </div>
  );
}

export default Reports;
