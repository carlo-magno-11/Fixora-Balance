export function createWriteQueue() {
  let tail: Promise<void> = Promise.resolve();

  return function enqueue<T>(operation: () => Promise<T>): Promise<T> {
    const result = tail.then(operation, operation);
    tail = result.then(() => undefined, () => undefined);
    return result;
  };
}


const enqueueLocalDatabaseWrite = createWriteQueue();

/**
 * Serializes mutations that share the local SQLite connection.
 * Keep this queue at the infrastructure boundary across repositories.
 */
export function enqueueLocalWrite<T>(operation: () => Promise<T>): Promise<T> {
  return enqueueLocalDatabaseWrite(operation);
}
