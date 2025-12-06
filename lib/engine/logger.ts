export interface LogEntry {
  stage: string;
  message: string;
  contact_id?: string;
  run_id?: string;
  meta?: Record<string, any>;
  timestamp?: string;
}

export function log(entry: LogEntry) {
  const payload: LogEntry = {
    ...entry,
    timestamp: entry.timestamp ?? new Date().toISOString(),
  };
  console.log(JSON.stringify(payload));
}

export function logError(stage: string, message: string, meta?: Record<string, any>) {
  log({ stage, message, meta });
}
