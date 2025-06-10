import { useState } from "react";
import CustomerProfile from "./components/CustomerProfile";
import CustomerRewards from "./components/CustomerRewards";
import useCustomer from "./hooks/useCustomers";
import useRewardsByCustomer from "./hooks/useRewardsByCustomer";
import "./App.css";
import SearchCustomerForm from "./components/SearchCustomerForm";

// Assessment.
// A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
// A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
// (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
// Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

function App() {
  // just for demonstrate different users' views
  // in an actual app, we would get the user info after authentication
  const [currentCustomerId, setCurrentCustomerId] = useState("1");
  const {
    data: customer,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    error: customerError,
  } = useCustomer(currentCustomerId);
  const {
    data: rewards,
    isLoading: isRewardsLoading,
    isError: isRewardsError,
    error: rewardsError,
  } = useRewardsByCustomer(currentCustomerId, {
    // get past 3 months of rewards including the current month, that's why we set the `from` date to 2 months ago
    from: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    to: new Date(),
  });

  if (isCustomerLoading || isRewardsLoading) {
    return <div>Loading...</div>;
  }

  if (isCustomerError) {
    return <div>Error loading customer data: {customerError}</div>;
  }

  if (isRewardsError) {
    return <div>Error loading rewards data: {rewardsError}</div>;
  }

  return (
    <div>
      <SearchCustomerForm onSubmit={setCurrentCustomerId} />
      <CustomerProfile customer={customer} />
      <CustomerRewards rewards={rewards} />
    </div>
  );
}

export default App;
