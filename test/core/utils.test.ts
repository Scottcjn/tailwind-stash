import { afterEach, describe, expect, it, vi } from "vitest"

import { cn, debounce, escapeRegex } from "../../src/utils/utils"

describe("cn", () => {
  it("joins truthy class names and skips falsey values", () => {
    expect(cn("flex", false, null, undefined, "", "items-center", "gap-2")).toBe(
      "flex items-center gap-2",
    )
  })
})

describe("escapeRegex", () => {
  it("escapes regex metacharacters so the result matches literally", () => {
    const value = String.raw`btn:hover [data-state="open"] (1) + gap-2?`
    const regex = new RegExp(`^${escapeRegex(value)}$`)

    expect(regex.test(value)).toBe(true)
    expect(regex.test(`${value} extra`)).toBe(false)
  })
})

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("runs only the latest scheduled call after the wait time", () => {
    vi.useFakeTimers()
    const callback = vi.fn<(value: string) => void>()
    const debounced = debounce(callback, 100)

    debounced.fn("first")
    vi.advanceTimersByTime(99)
    expect(callback).not.toHaveBeenCalled()

    debounced.fn("second")
    vi.advanceTimersByTime(100)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith("second")
  })

  it("cancels a pending call", () => {
    vi.useFakeTimers()
    const callback = vi.fn<() => void>()
    const debounced = debounce(callback, 100)

    debounced.fn()
    debounced.cancel()
    vi.advanceTimersByTime(100)

    expect(callback).not.toHaveBeenCalled()
  })
})
