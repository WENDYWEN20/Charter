import "./style.css";
import { useMemo } from "react";

export default function CustomerRewards({ rewards }) {
  const threeMonthsTotal = useMemo(() => {
    return rewards.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
  }, [rewards]);

  console.log("rewards", rewards);
  return (
    <section className="rewards-container">
      <h2>Rewards Summary</h2>
      <h4>Three Months total: {threeMonthsTotal} pt</h4>
      {rewards.map((reward) => {
        const { period, total, transactions } = reward;
        return (
          <div key={period} className="reward-period">
            <header className="reward-period-header">
              <h3>{period}</h3>
              <div className="reward-period-total">Total: {total} pt</div>
            </header>

            <TransactionList transactions={transactions} />
          </div>
        );
      })}
      <h4>Reward Rules</h4>
      <p>
        2 points for every dollar spent over $100 in each transaction, plus 1
        point for every dollar spent over $50 in each transaction
      </p>
    </section>
  );
}

function TransactionList({ transactions }) {
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => {
        const { date, amount, reward, item } = transaction;
        return (
          <li key={date} className="transaction-row">
            <div>
              <div>{new Date(date).toLocaleDateString()}</div>
              <div>
                Item: {item} - ${amount}
              </div>
            </div>
            <div>{reward} pt</div>
          </li>
        );
      })}
    </ul>
  );
}
