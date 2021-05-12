import React from "react";

export default function Pagination({ pagination, onPageChange }: any) {
  const { page, limit, total } = pagination;

  const totalPage = Math.ceil(total / limit);
  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>
      <button
        disabled={page === totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
