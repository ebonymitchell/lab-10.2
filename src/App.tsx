import { useState } from "react";
import PaginationDemo from "./components/PaginationDemo";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

// Display both custom hooks in the application.
export default function App() {
  // Track the text entered by the user.
  const [search, setSearch] = useState<string>("");

  // Wait 500 milliseconds after typing stops.
  const debouncedSearch = useDebounce(search, 500);

  return (
    <main>
      <h1>Custom Hooks Lab</h1>

      {/* Demonstrate the pagination hook. */}
      <PaginationDemo />

      {/* Demonstrate the debounce hook. */}
      <section>
        <h2>Debounce Search Demo</h2>

        <label htmlFor="search">Search: </label>

        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Start typing..."
        />

        <p>
          <strong>Current Input:</strong> {search || "(empty)"}
        </p>

        <p>
          <strong>Debounced Value:</strong>{" "}
          {debouncedSearch || "(empty)"}
        </p>
      </section>
    </main>
  );
}
