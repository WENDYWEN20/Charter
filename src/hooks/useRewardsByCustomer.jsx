import useQuery from "./useQuery";
import { getRewardsByCustomerId } from "../mock/api/reward.api";
import { useCallback } from "react";

export default function useRewardsByCustomer(customerId, config = {}) {
  const queryFn = useCallback(() => {
    return getRewardsByCustomerId(customerId, config);
  }, [customerId]);

  return useQuery({
    queryFn,
  });
}