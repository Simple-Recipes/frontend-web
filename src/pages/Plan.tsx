import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar'; // 导入 Calendar 和 CalendarProps
import 'react-calendar/dist/Calendar.css';
import { Button, Grid, Container, Box, Typography } from '@mui/material';

const Plan: React.FC = () => {
  // 允许日期状态为 null
  const [date, setDate] = useState<Date | null>(new Date());
  const [meal, setMeal] = useState<string | null>(null); // 追踪选中的餐点

  // 处理日期变化的函数
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    // 确保 value 是单个 Date 或 null
    if (value instanceof Date) {
      setDate(value);
    }
  };

  const handleMealSelection = (selectedMeal: string) => {
    setMeal(selectedMeal);
    console.log(`Selected meal: ${selectedMeal} on ${date}`);
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Weekly Meal Plan
        </Typography>

        {/* 给日历添加自定义样式，居中显示 */}
        <Box 
          mt={3}
          mb={4} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 2, 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
          }}
        >
          <Calendar 
            onChange={handleDateChange} 
            value={date}
            // 你可以根据需要调整日历的最大宽度
            // style={{ maxWidth: '100%' }} 
          />
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Select recipe for
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant={meal === 'Breakfast' ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => handleMealSelection('Breakfast')}
              >
                Breakfast
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={meal === 'Lunch' ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => handleMealSelection('Lunch')}
              >
                Lunch
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={meal === 'Dinner' ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => handleMealSelection('Dinner')}
              >
                Dinner
              </Button>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log('Start Planning clicked')}
              fullWidth
              sx={{ padding: '12px 0' }} // 增加按钮的高度
            >
              Start Planning
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Plan;
