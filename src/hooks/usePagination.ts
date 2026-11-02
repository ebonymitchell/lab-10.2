import { useState } from "react";

// Define the information and functions returned by the hook.
interface PaginationResult {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    itemsOnCurrentPage: number;
    setPage: (pageNumber: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    canNextPage: boolean;
    canPrevPage: boolean;
}

// Manage pagination for a collection of items.
export default function usePagination(
    totalItems: number,
    itemsPerPage: number = 10,
    initialPage: number = 1
): PaginationResult {
    // Prevent invalid item counts and page sizes.
    const safeTotalItems = Number.isFinite(totalItems)
        ? Math.max(0, Math.floor(totalItems))
        : 0;

    const safeItemsPerPage =
        Number.isFinite(itemsPerPage) && itemsPerPage > 0
            ? Math.max(1, Math.floor(itemsPerPage))
            : 10;

    // Calculate how many pages are needed.
    const totalPages = Math.max(
        1,
        Math.ceil(safeTotalItems / safeItemsPerPage)
    );

    // Keep page numbers between 1 and the last page.
    const clampPage = (page: number): number => {
        if (!Number.isFinite(page)) {
            return 1;
        }

        return Math.min(
            Math.max(1, Math.floor(page)),
            totalPages
        );
    };

    // Store the requested page in React state.
    const [requestedPage, setRequestedPage] = useState<number>(
        () => clampPage(initialPage)
    );

    // Keep the displayed page valid if totalItems changes.
    const currentPage = clampPage(requestedPage);

    // Calculate the indexes for the current page.
    const startIndex = (currentPage - 1) * safeItemsPerPage;

    // The ending index is inclusive.
    // An empty list has no valid ending index.
    const endIndex =
        safeTotalItems === 0
            ? -1
            : Math.min(
                startIndex + safeItemsPerPage - 1,
                safeTotalItems - 1
            );

    // Count how many items appear on the current page.
    const itemsOnCurrentPage =
        safeTotalItems === 0
            ? 0
            : endIndex - startIndex + 1;

    // Determine whether navigation is possible.
    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    // Jump to a specific valid page.
    const setPage = (pageNumber: number) => {
        setRequestedPage(clampPage(pageNumber));
    };

    // Advance one page without exceeding the last page.
    const nextPage = () => {
        setRequestedPage((previous) =>
            Math.min(clampPage(previous) + 1, totalPages)
        );
    };

    // Go back one page without going below page one.
    const prevPage = () => {
        setRequestedPage((previous) =>
            Math.max(clampPage(previous) - 1, 1)
        );
    };

    // Expose pagination values and navigation functions.
    return {
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
    };
}
