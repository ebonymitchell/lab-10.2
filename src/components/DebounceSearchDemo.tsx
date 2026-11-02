import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

// Demonstrate how the useDebounce custom hook works.
export default function DebounceSearchDemo() {
    // Track the user's input immediately.
    const [search, setSearch] = useState<string>("");

    // Delay updating the search value by 500 milliseconds.
    const debouncedSearch = useDebounce(search, 500);

    // Simulate performing a search after the debounce delay.
    useEffect(() => {
        if (debouncedSearch.trim()) {
            console.log("Searching for:", debouncedSearch);
        }
    }, [debouncedSearch]);

    return (
        <section>
            <h2>Debounce Search Demo</h2>

            {/* Input updates immediately as the user types. */}
            <div>
                <label htmlFor="search">Search: </label>

                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Start typing..."
                />
            </div>

            {/* Display both values to demonstrate the delay. */}
            <div>
                <p>
                    <strong>Current Input:</strong>{" "}
                    {search || "(empty)"}
                </p>

                <p>
                    <strong>Debounced Value:</strong>{" "}
                    {debouncedSearch || "(empty)"}
                </p>
            </div>
        </section>
    );
}
