import React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

interface CustomPaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ total, currentPage, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(total / pageSize);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
      />
    </Box>
  );
};

export default CustomPagination;
