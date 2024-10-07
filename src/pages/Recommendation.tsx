import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, IconButton, Alert, List, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import apiClient from '../services/apiClient';
import inventoryService, { Inventory } from '../services/inventoryService'; // 引入库存服务

const Recommendation: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>(''); // 当前输入的食材
  const [ingredients, setIngredients] = useState<string[]>([]); // 保存所有添加的食材
  const [availableIngredients, setAvailableIngredients] = useState<Inventory[]>([]); // 库存中的食材
  const [maxTime, setMaxTime] = useState<number>(30);
  const [preferenceType, setPreferenceType] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);  // 保存推荐结果
  const [error, setError] = useState<string | null>(null);  // 错误处理
  const [loading, setLoading] = useState(true);  // 增加加载状态

  // 使用 useEffect 加载库存中的食材
  useEffect(() => {
    const loadInventories = async () => {
      try {
        const result = await inventoryService.getUserInventories();
        setAvailableIngredients(result);
      } catch (error) {
        console.error('Error loading inventories:', error);
        setError('Error loading inventories');
      } finally {
        setLoading(false); // 数据加载完毕
      }
    };

    loadInventories();
  }, []);

  const handleAddIngredient = (itemName: string) => {
    if (itemName && !ingredients.includes(itemName)) {
      setIngredients((prevIngredients) => [...prevIngredients, itemName]);
      setAvailableIngredients((prevAvailableIngredients) =>
        prevAvailableIngredients.filter((item) => item.itemName !== itemName)
      ); // 移除已选择的食材
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const removedItem = ingredients[index];
    setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
    setAvailableIngredients((prevAvailableIngredients) => [
      ...prevAvailableIngredients,
      { itemName: removedItem, quantity: '', unit: '' }, // 将移除的食材重新加入库存列表中
    ]);
  };

  const handleIncreaseTime = () => {
    setMaxTime((prev) => prev + 5);
  };

  const handleDecreaseTime = () => {
    setMaxTime((prev) => (prev > 5 ? prev - 5 : prev));
  };

  const handlePreferenceClick = (type: string) => {
    setPreferenceType(type);
  };

  const handleConfirmRecommendation = async () => {
    try {
      // 构建发送给后端的数据
      const requestData = {
        ingredients,
        maxTime,
        preferenceType,
      };

      // 使用 apiClient 调用后端 API
      const response = await apiClient.post('/recommendation', requestData);

      // 成功响应后设置推荐数据
      setRecommendations(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to fetch recommendations.');
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}> {/* 外层盒子调整宽度和居中对齐 */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Recommendation
      </Typography>

      <Grid container spacing={3}> {/* 使用 Grid 布局 */}
        {/* Ingredient Selection */}
        <Grid item xs={12}>
          <Typography variant="h6">Available Ingredients:</Typography>
          <List>
            {availableIngredients.map((inventoryItem, index) => (
              <ListItem key={index}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>{inventoryItem.itemName}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAddIngredient(inventoryItem.itemName)}
                  >
                    Add
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* 显示添加的食材 */}
        {ingredients.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Selected Ingredients:</Typography>
            <List>
              {ingredients.map((item, index) => (
                <ListItem key={index}>
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography>{item}</Typography>
                    <IconButton onClick={() => handleRemoveIngredient(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}

        {/* Max Time Selector */}
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <IconButton onClick={handleDecreaseTime}>
            <RemoveIcon />
          </IconButton>
          <Typography>{`${maxTime} min`}</Typography>
          <IconButton onClick={handleIncreaseTime}>
            <AddIcon />
          </IconButton>
        </Grid>

        {/* Preference Type Selection */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Preference Type
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant={preferenceType === 'High Rating' ? 'contained' : 'outlined'}
                onClick={() => handlePreferenceClick('High Rating')}
              >
                High Rating
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={preferenceType === 'Low Calories' ? 'contained' : 'outlined'}
                onClick={() => handlePreferenceClick('Low Calories')}
              >
                Low Calories
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={preferenceType === 'High Protein' ? 'contained' : 'outlined'}
                onClick={() => handlePreferenceClick('High Protein')}
              >
                High Protein
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Confirm Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 4 }}
            onClick={handleConfirmRecommendation}
          >
            Confirm Recommendation
          </Button>
        </Grid>

        {/* 错误提示 */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          </Grid>
        )}

        {/* 推荐结果展示 */}
        {recommendations.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginTop: 4 }}>Recommended Recipes:</Typography>
            <ul>
              {recommendations.map((recipe, index) => (
                <li key={index}>{recipe.title}</li>
              ))}
            </ul>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Recommendation;
