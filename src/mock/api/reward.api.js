import customersData from "../data/customer";
import transactionsData from "../data/transaction";
import { calculateReward } from "../services/reward.service";
import { MONTHS } from "../util/date";
import { sleep } from "../util/sleep";

// GET rewards/customer/:customerId?from={startDate}&to={endDate}
export const getRewardsByCustomerId = async (
  customerId,
  config = {
    from: null,
    to: new Date(),
  }
) => {
  await sleep(1000);
  const customer = customersData.find((customer) => customer.id === customerId);
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }

  const transactions = transactionsData
    .filter((transaction) => {
      if (config.from) {
        const transactionDate = new Date(transaction.date);
        return (
          transaction.customerId === customerId &&
          transactionDate >= new Date(config.from) &&
          transactionDate <= new Date(config.to)
        );
      }
      return transaction.customerId === customerId;
    })
    .map((transaction) => {
      // Calculate reward points for each transaction
      const reward = calculateReward(transaction.amount);
      return {
        ...transaction,
        reward, // Add reward points to the transaction
      };
    });

  const rewardsByMonth = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthIndex = date.getMonth();
    const month = MONTHS[monthIndex];
    const year = date.getFullYear();
    // represent the period as "Month Year"
    const period = `${month} ${year}`;
    if (!acc[period]) {
      acc[period] = {
        period,
        total: 0,
        transactions: [],
      };
    }
    acc[period].total += calculateReward(transaction.amount);
    acc[period].transactions.push(transaction);
    return acc;
  }, {});

  return Object.values(rewardsByMonth).sort(
    (a, b) => new Date(b.period) - new Date(a.period)
  );
};


