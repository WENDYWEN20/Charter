import { useCallback } from "react";
import { getCustomerById, getCustomers } from "../mock/api/customer.api";
import useQuery from "./useQuery";

export default function useCustomer(id) {
  // not a real implementation of react-query
  // there's no query key, no cache
  // have to use this workaround to avoid infinite rendering
  const queryFn = useCallback(() => {
    return getCustomerById(id);
  }, [id]);

  return useQuery({
    queryFn,
  });
}

export function useCustomerIds() {
  const queryFn = useCallback(async () => {
    const customers = await getCustomers();
    return customers.map((customer) => customer.id);
  }, []);

  return useQuery({
    queryFn,
  });
}
