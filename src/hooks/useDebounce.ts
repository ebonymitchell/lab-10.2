import { useEffect, useState } from "react";

// Create a reusable hook that delays updating a value.
// The generic type T allows strings, numbers, and other data types.
export default function useDebounce<T>(
    value: T,
    delay: number = 500
): T {
    // Store the most recently settled value.
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Use a safe delay if an invalid value is provided.
        const safeDelay =
            Number.isFinite(delay) && delay >= 0 ? delay : 500;

        // Wait before updating the debounced value.
        const timer = window.setTimeout(() => {
            setDebouncedValue(value);
        }, safeDelay);

        // Cancel the previous timer if value or delay changes.
        // Also clean up when the component unmounts.
        return () => {
            window.clearTimeout(timer);
        };
    }, [value, delay]);

    // Return the value after the debounce delay.
    return debouncedValue;
}
