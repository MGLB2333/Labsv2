import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DateRangeControls: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box>
        <DatePicker
          views={['month', 'year']}
          value={dayjs('2025-01')}
          onChange={() => {}}
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 140 },
            },
          }}
          label="From"
        />
      </Box>
      <Box>
        <DatePicker
          views={['month', 'year']}
          value={dayjs('2025-12')}
          onChange={() => {}}
          slotProps={{
            textField: {
              size: 'small',
              sx: { width: 140 },
            },
          }}
          label="To"
        />
      </Box>
    </Box>
  );
};

export default DateRangeControls;
