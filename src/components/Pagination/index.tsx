import React from "react";
import { Button } from "react-bootstrap";

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
      <Button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        style={{ marginRight: "10px" }}
      >
        Prev
      </Button>
      <Button
        disabled={page === totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
