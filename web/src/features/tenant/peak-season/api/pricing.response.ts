export type GetByTenantIdResponse = {
  id: string;
  name: string;
  createdBy: string;

  scopeType: string;

  startDate: string;
  endDate: string;

  adjustmentType: string;
  adjustmentDirection: string;
  adjustmentValue: number;

  priority: number;
  isActive: boolean;
};
