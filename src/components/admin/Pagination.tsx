import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Showing {startItem}-{endItem} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
          aria-label="First page"
        >
          <ChevronsLeft className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
        </button>
        {pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="px-2" style={{ color: 'hsl(var(--muted-foreground))' }}>...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page ? 'text-white' : 'hover:bg-muted'
                }`}
                style={currentPage === page ? { background: 'var(--gradient-primary)' } : { color: 'hsl(var(--foreground))' }}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
          aria-label="Last page"
        >
          <ChevronsRight className="w-4 h-4" style={{ color: 'hsl(var(--foreground))' }} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
