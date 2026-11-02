import usePagination from "../hooks/usePagination";

// Sample data for demonstrating the pagination hook.
const items = Array.from(
    { length: 23 },
    (_, index) => `Item ${index + 1}`
);

export default function PaginationDemo() {
    // Use our custom hook to manage five items per page.
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

    // Extract the items that belong to the active page.
    const visibleItems = items.slice(startIndex, endIndex + 1);

    return (
        <section>
            <h2>Pagination Demo</h2>

            {/* Display pagination information. */}
            <p>
                Page {currentPage} of {totalPages}
            </p>

            <p>Items on this page: {itemsOnCurrentPage}</p>

            {/* Display only the current page's items. */}
            <ul>
                {visibleItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            {/* Navigate between pages. */}
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

            {/* Jump directly to a specific page. */}
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
    );
}
