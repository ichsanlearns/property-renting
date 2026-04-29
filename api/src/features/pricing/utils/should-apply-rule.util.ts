import type { ScopeType } from "../../../generated/prisma/enums.js";

type PricingRule = {
  scopeType: ScopeType;
  priority: number;
  createdAt: Date;
};

function shouldApplyRule({
  newRule,
  currentRule,
}: {
  newRule: PricingRule;
  currentRule: PricingRule | null;
}) {
  if (!currentRule) return true;

  const scopePriority = {
    SYSTEM: 0,
    TENANT: 1,
    PROPERTY: 2,
    ROOM_TYPE: 3,
  };

  if (scopePriority[newRule.scopeType] > scopePriority[currentRule.scopeType]) {
    return true;
  }

  if (scopePriority[newRule.scopeType] < scopePriority[currentRule.scopeType]) {
    return false;
  }

  if (newRule.priority > currentRule.priority) return true;

  if (
    newRule.priority === currentRule.priority &&
    newRule.createdAt > currentRule.createdAt
  ) {
    return true;
  }

  return false;
}

export { shouldApplyRule };
