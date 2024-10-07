import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Box, Chip, Button } from '@mui/material';
import recipeService, { Recipe, PageResult } from "../../services/recipeService";
import CustomPagination from "../../components/Pagination";
import ViewDetailsButton from "../../components/ViewDetailsButton";

const AllRecipes: React.FC = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 保存选择的标签
  const pageSize = 10; // 每页显示的记录数

  // 定义已知的4个标签
  const knownTags = [
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" },
    { id: 4, name: "Snacks" }
  ];

  // 根据选择的标签获取菜谱
  useEffect(() => {
    const fetchRecipesByTag = async (page: number) => {
      try {
        setLoading(true);
        let data: PageResult;
        if (selectedTag) {
          // 如果用户选择了标签，按标签查询
          data = await recipeService.findPopularRecipesByTag(selectedTag, page, pageSize);
        } else {
          // 否则，获取所有菜谱
          data = await recipeService.fetchAllRecipes(page, pageSize);
        }
        setRecipes(data.records || []);
        setTotal(data.total || 0);
      } catch (err: any) {
        setError("获取菜谱时出错：" + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByTag(currentPage);
  }, [currentPage, selectedTag]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (recipeId: number) => {
    history.push(`/recipes/${recipeId}`);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag); // 设置选择的标签
    setCurrentPage(1); // 重置到第一页
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center" mt={5}>
          loading...
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box mt={5}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {selectedTag ? ` ${selectedTag}` : "all recipes"}
      </Typography>

      {/* 显示已知的4个标签 */}
      <Box mb={3}>
        {knownTags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            onClick={() => handleTagClick(tag.name)}
            style={{ margin: 4, cursor: "pointer" }}
            color={selectedTag === tag.name ? "primary" : "default"} // 高亮选择的标签
          />
        ))}
        {selectedTag && (
          <Button onClick={() => setSelectedTag(null)} style={{ marginLeft: 8 }}>
            show all recipe
          </Button>
        )}
      </Box>

      <List>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <ListItem key={recipe.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                }
                secondary={
                  <>
                    {recipe.link ? (
                      <img src={recipe.link} alt="Recipe" style={{ width: '200px', height: '200px' }} />
                    ) : (
                      <img src={require("./../../assets/Image/1.png")} alt="Fallback Image" style={{ width: '100%', height: 'auto' }} />
                    )}
                    <Box mt={2}>
                      {recipe.tags?.map((tag) => (
                        <Chip key={tag.id} label={tag.name} style={{ marginRight: 4 }} />
                      ))}
                    </Box>
                  </>
                }
              />
              <ViewDetailsButton recipeId={recipe.id} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" align="center" mt={5}>
            not found
          </Typography>
        )}
      </List>
      <Box display="flex" justifyContent="center" mt={4}>
        <CustomPagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default AllRecipes;
