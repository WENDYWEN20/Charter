import { useState } from "react";
import { useCustomerIds } from "../../hooks/useCustomers";

export default function SearchCustomerForm({ onSubmit }) {
  const [currCustomerId, setCurrCustomerId] = useState("");
  const { data: customerIds, isLoading, error, isError } = useCustomerIds();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currCustomerId);
  };

  if (isLoading) {
    return <div>Loading customer IDs...</div>;
  }
  if (isError) {
    return <div>Error loading customer IDs: {error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Customer ID:</span>
          <select
            value={currCustomerId}
            onChange={(e) => setCurrCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>
            {customerIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}