import { describe, expect, it } from "vitest";
import { createWriteQueue, enqueueLocalWrite } from "./write-queue";

describe("serialized write queue", () => {
  it("executes writes in invocation order", async () => {
    const enqueue = createWriteQueue();
    const order: string[] = [];

    const first = enqueue(async () => {
      order.push("first-start");
      await Promise.resolve();
      order.push("first-end");
    });
    const second = enqueue(async () => {
      order.push("second");
    });

    await Promise.all([first, second]);
    expect(order).toEqual(["first-start", "first-end", "second"]);
  });

  it("continues after a failed write without hiding the error", async () => {
    const enqueue = createWriteQueue();
    const failed = enqueue(async () => {
      throw new Error("write failed");
    });

    await expect(failed).rejects.toThrow("write failed");
    await expect(enqueue(async () => "saved")).resolves.toBe("saved");
  });
});


describe("shared local database write queue", () => {
  it("serializes mutations submitted by different repositories", async () => {
    const order: string[] = [];
    const first = enqueueLocalWrite(async () => {
      order.push("focus-start");
      await Promise.resolve();
      order.push("focus-end");
    });
    const second = enqueueLocalWrite(async () => {
      order.push("habit-write");
    });
    const third = enqueueLocalWrite(async () => {
      order.push("goal-write");
    });

    await Promise.all([first, second, third]);
    expect(order).toEqual(["focus-start", "focus-end", "habit-write", "goal-write"]);
  });

  it("continues after a failed shared mutation", async () => {
    const failed = enqueueLocalWrite(async () => {
      throw new Error("sqlite write failed");
    });

    await expect(failed).rejects.toThrow("sqlite write failed");
    await expect(enqueueLocalWrite(async () => "next write")).resolves.toBe("next write");
  });
});
