import { useState } from "react";

// Define all values and functions returned by the hook.
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

// Manage pagination for a list of items.
export default function usePagination(
    totalItems: number,
    itemsPerPage: number = 10,
    initialPage: number = 1
): PaginationResult {
    // Prevent negative or invalid item counts.
    const safeTotalItems = Number.isFinite(totalItems)
        ? Math.max(0, Math.floor(totalItems))
        : 0;

    // Ensure each page can contain at least one item.
    const safeItemsPerPage =
        Number.isFinite(itemsPerPage) && itemsPerPage > 0
            ? Math.max(1, Math.floor(itemsPerPage))
            : 10;

    // Calculate the total number of pages.
    const totalPages = Math.max(
        1,
        Math.ceil(safeTotalItems / safeItemsPerPage)
    );

    // Keep page numbers within the valid range.
    const clampPage = (page: number): number => {
        if (!Number.isFinite(page)) {
            return 1;
        }

        return Math.min(
            Math.max(1, Math.floor(page)),
            totalPages
        );
    };

    // Store the selected page.
    const [requestedPage, setRequestedPage] = useState<number>(
        () => clampPage(initialPage)
    );

    // Ensure the current page remains valid.
    const currentPage = clampPage(requestedPage);

    // Calculate the first item's index.
    const startIndex = (currentPage - 1) * safeItemsPerPage;

    // Calculate the last item's index (inclusive).
    const endIndex =
        safeTotalItems === 0
            ? -1
            : Math.min(
                startIndex + safeItemsPerPage - 1,
                safeTotalItems - 1
            );

    // Count the items displayed on the current page.
    const itemsOnCurrentPage =
        safeTotalItems === 0
            ? 0
            : endIndex - startIndex + 1;

    // Determine whether navigation is available.
    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    // Navigate directly to a specific page.
    const setPage = (pageNumber: number) => {
        setRequestedPage(clampPage(pageNumber));
    };

    // Navigate forward without exceeding the last page.
    const nextPage = () => {
        setRequestedPage((previous) =>
            Math.min(clampPage(previous) + 1, totalPages)
        );
    };

    // Navigate backward without going below page one.
    const prevPage = () => {
        setRequestedPage((previous) =>
            Math.max(clampPage(previous) - 1, 1)
        );
    };

    // Return the complete pagination API.
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
