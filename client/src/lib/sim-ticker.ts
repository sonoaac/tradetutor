export const SIM_TICK_MS = 7000;

export type SimTickState = {
  tickId: number;
  simNowMs: number;
  startedAtRealMs: number;
};

let listeners = new Set<() => void>();
let timerId: number | undefined;

let state: SimTickState = {
  tickId: 0,
  simNowMs: Date.now(),
  startedAtRealMs: Date.now(),
};

function emit() {
  listeners.forEach(listener => listener());
}

function ensureStarted() {
  if (timerId != null) return;

  const start = Date.now();
  state = {
    tickId: 0,
    startedAtRealMs: start,
    simNowMs: start,
  };

  timerId = window.setInterval(() => {
    const nextTick = state.tickId + 1;
    state = {
      ...state,
      tickId: nextTick,
      simNowMs: state.startedAtRealMs + nextTick * SIM_TICK_MS,
    };
    emit();
  }, SIM_TICK_MS);

  emit();
}

function maybeStop() {
  if (listeners.size > 0) return;
  if (timerId == null) return;
  window.clearInterval(timerId);
  timerId = undefined;
}

export function getSimTickerSnapshot(): SimTickState {
  ensureStarted();
  return state;
}

export function subscribeSimTicker(listener: () => void): () => void {
  ensureStarted();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    maybeStop();
  };
}
