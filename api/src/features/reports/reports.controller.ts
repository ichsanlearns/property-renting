import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as reportsService from "./reports.service.js";

export const getReportsDashboardController = catchAsync(async (req, res) => {
  const tenantId = req.user!.userId;

  const result = await reportsService.getReportsDashboard(tenantId);

  res.status(200).json({
    message: "Reports fetched successfully",
    data: result,
  });
});

export const getSalesReportController = catchAsync(async (req, res) => {
  const tenantId = req.user!.userId;

  const result = await reportsService.getSalesReport(
    tenantId,
    req.query, // 🔥 ini penting
  );

  res.status(200).json({
    message: "Sales report fetched",
    data: result,
  });
});
