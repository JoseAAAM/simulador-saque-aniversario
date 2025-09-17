import { calculateWithdrawal } from '@/utils/calculate-withdrawal';

describe('calculateWithdrawal', () => {
  it('should calculate correct withdrawal for balances in the range of 0 to R$500', () => {
    const min = 0
    const max = 500
    const percentage = 0.5
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$500,01 to R$1000', () => {
    const min = 500.01
    const max = 1000
    const percentage = 0.4
    const fixedValue = 50
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$1000,01 to R$5000', () => {
    const min = 1000.01
    const max = 5000
    const percentage = 0.3
    const fixedValue = 150
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;
    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$5000,01 to R$10000', () => {
    const min = 5000.01
    const max = 10000
    const percentage = 0.2
    const fixedValue = 650
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$10000,01 to R$15000', () => {
    const min = 10000.01
    const max = 15000
    const percentage = 0.15
    const fixedValue = 1150
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$15000,01 to R$20000', () => {
    const min = 15000.01
    const max = 20000
    const percentage = 0.1
    const fixedValue = 1900
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });

  it('should calculate correct withdrawal for balances in the range of R$20000,01 to Infinity', () => {
    const min = 20000.01
    const max = 50000
    const percentage = 0.05
    const fixedValue = 2900
    const balance = Math.random() * (max - min) + min

    const result = calculateWithdrawal({ balance });

    const expectedAmount = Math.round((balance * percentage + fixedValue) * 100) / 100;

    expect(result.withdrawalAmount).toBe(expectedAmount);
  });


  it('should throw an error for negative balance', () => {
    const max = 500
    const min = 0
    const negativeBalance = -(Math.random() * (max - min) + min)

    try {
      calculateWithdrawal({ balance: negativeBalance })
    } catch (e) {
      expect((e as TypeError).message).toBe('No rule found for this balance.')
    }
  });
});
