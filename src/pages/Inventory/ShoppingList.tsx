import React, { useEffect, useState } from "react";
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Paper, 
    IconButton, 
    CircularProgress,
    Alert 
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import shoppingListService from "../../services/shoppingListService";


interface ShoppingItem {
    id?: number;
    itemName: string;
    quantity: string;  // 确保 quantity 是 string 类型
    unit: string;
}

const ShoppingList: React.FC = () => {
    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
    const [newItem, setNewItem] = useState<ShoppingItem>({ itemName: '', quantity: '', unit: '' });
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadShoppingList();
    }, []);

    const loadShoppingList = async () => {
        try {
            const result = await shoppingListService.getShoppingList();
            const formattedResult = result.map(item => ({
                ...item,
                quantity: String(item.quantity)  // 确保 quantity 是 string 类型
            }));
            setShoppingList(formattedResult);
        } catch (error) {
            console.error("Error loading shopping list:", error);
            setError("Error loading shopping list");
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async () => {
        try {
            await shoppingListService.addItem(newItem);
            setNewItem({ itemName: '', quantity: '', unit: '' });
            loadShoppingList();
        } catch (error) {
            console.error("Error adding shopping list item:", error);
            setError("Error adding shopping list item");
        }
    };

    const handleUpdateItem = async () => {
        if (editingItem) {
            try {
                await shoppingListService.updateItem(editingItem);
                setEditingItem(null);
                loadShoppingList();
            } catch (error) {
                console.error("Error updating shopping list item:", error);
                setError("Error updating shopping list item");
            }
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            await shoppingListService.deleteItem(id);
            loadShoppingList();
        } catch (error) {
            console.error("Error deleting shopping list item:", error);
            setError("Error deleting shopping list item");
        }
    };

    if (loading) return <CircularProgress />;

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Shopping List Management
            </Typography>
            <Paper>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Item Name"
                                fullWidth
                                value={newItem.itemName}
                                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                fullWidth
                                type="number"
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Unit"
                                fullWidth
                                value={newItem.unit}
                                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleAddItem}>
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Shopping List
                </Typography>
                <Grid container spacing={2}>
                    {shoppingList.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <Paper>
                                <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography>
                                        {item.itemName} - {item.quantity} {item.unit}
                                    </Typography>
                                    <Box>
                                        <IconButton color="primary" onClick={() => setEditingItem(item)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDeleteItem(item.id!)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {editingItem && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Edit Item
                    </Typography>
                    <Paper>
                        <Box p={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Item Name"
                                        fullWidth
                                        value={editingItem.itemName}
                                        onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Quantity"
                                        fullWidth
                                        type="number"
                                        value={editingItem.quantity}
                                        onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })} // 确保 value 为字符串
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Unit"
                                        fullWidth
                                        value={editingItem.unit}
                                        onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateItem}>
                                        Update Item
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Container>
    );
};

export default ShoppingList;
