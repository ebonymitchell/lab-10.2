import PaginationDemo from "./components/PaginationDemo";
import DebounceSearchDemo from "./components/DebounceSearchDemo";
import "./App.css";

// Display both custom hook demonstrations.
export default function App() {
  return (
    <main>
      <h1>Custom Hooks Lab</h1>

      <PaginationDemo />

      <DebounceSearchDemo />
    </main>
  );
}
