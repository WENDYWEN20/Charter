import customersData from "../data/customer";
import { sleep } from "../util/sleep";

// GET customers
export const getCustomers = async () => {
  //await sleep(1000);
  return customersData;
};

// GET customers/:id
export const getCustomerById = async (id) => {
  await sleep(1000);
  return customersData.find((customer) => customer.id === id);
};