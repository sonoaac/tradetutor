import { useEffect, useState } from 'react';
import { getSimTickerSnapshot, subscribeSimTicker, type SimTickState } from '@/lib/sim-ticker';

export function useSimTicker(): SimTickState {
  const [tick, setTick] = useState(() => getSimTickerSnapshot());

  useEffect(() => {
    return subscribeSimTicker(() => {
      setTick(getSimTickerSnapshot());
    });
  }, []);

  return tick;
}
