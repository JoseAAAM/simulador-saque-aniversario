export const withdrawalRules = [
  {
    minValue: 0,
    maxValue: 500,
    percentage: 0.5,
    fixedValue: 0,
  },
  {
    minValue: 500.01,
    maxValue: 1000,
    percentage: 0.4,
    fixedValue: 50,
  },
  {
    minValue: 1000.01,
    maxValue: 5000,
    percentage: 0.3,
    fixedValue: 150,
  },
  {
    minValue: 5000.01,
    maxValue: 10000,
    percentage: 0.2,
    fixedValue: 650,
  },
  {
    minValue: 10000.01,
    maxValue: 15000,
    percentage: 0.15,
    fixedValue: 1150,
  },
  {
    minValue: 15000.01,
    maxValue: 20000,
    percentage: 0.1,
    fixedValue: 1900,
  },
  {
    minValue: 20000.01,
    maxValue: Infinity,
    percentage: 0.05,
    fixedValue: 2900,
  },
]

export function calculateWithdrawal({
  balance
}: { balance: number }) {
  const rule = withdrawalRules.find(
    r => balance >= r.minValue && balance <= r.maxValue
  )

  if (!rule) {
    throw new Error("No rule found for this balance.")
  }

  const withdrawalAmount = balance * rule.percentage + rule.fixedValue

  return {
    withdrawalAmount,
  }
}