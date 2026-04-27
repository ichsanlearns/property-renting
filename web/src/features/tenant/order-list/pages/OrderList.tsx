import LoaderFetching from "../../../../shared/ui/LoaderFetching.tsx";

import useOrderList from "../hooks/useOrderList";

import OrderHeader from "../components/OrderHeader";
import OrderFilters from "../components/OrderFilters";
import OrderTable from "../components/OrderTable";
import OrderPagination from "../components/OrderPagination";
import OrderStats from "../components/OrderStats";

function OrderList() {
  const {
    loading,
    paginatedOrders,
    filterStatus,
    setFilterStatus,
    filterProperty,
    setFilterProperty,
    uniqueProperties,
    totalRevenue,
    totalConfirmed,
    totalPending,
    totalCancelled,

    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredOrders,
  } = useOrderList();

  if (loading) {
    return <LoaderFetching />;
  }

  return (
    <div className="p-8">
      <OrderHeader />

      <OrderFilters filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterProperty={filterProperty} setFilterProperty={setFilterProperty} uniqueProperties={uniqueProperties} />

      <OrderTable orders={paginatedOrders} />

      <OrderPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} totalData={filteredOrders.length} itemsPerPage={itemsPerPage} />

      <OrderStats totalRevenue={totalRevenue} totalConfirmed={totalConfirmed} totalPending={totalPending} totalCancelled={totalCancelled} />
    </div>
  );
}

export default OrderList;
