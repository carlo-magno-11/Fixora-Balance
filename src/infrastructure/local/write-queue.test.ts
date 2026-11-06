import { describe, expect, it } from "vitest";
import { createWriteQueue } from "./write-queue";

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
