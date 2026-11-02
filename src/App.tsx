import usePagination from "./hooks/usePagination";
import "./App.css";

// Create sample data to demonstrate pagination.
const items = Array.from(
  { length: 23 },
  (_, index) => `Item ${index + 1}`
);

export default function App() {
  // Display five items per page.
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination(items.length, 5);

  // Extract only the items belonging to the current page.
  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <main>
      <h1>Custom Hooks Lab</h1>

      <section>
        <h2>Pagination Demo</h2>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <p>Items on this page: {itemsOnCurrentPage}</p>

        <ul>
          {visibleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div>
          <button
            type="button"
            onClick={prevPage}
            disabled={!canPrevPage}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>

        <div>
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setPage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
