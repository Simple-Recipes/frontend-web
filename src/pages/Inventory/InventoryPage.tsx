import React, { useEffect, useState } from "react";
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Paper, 
    CircularProgress,
    Alert,
    IconButton
} from "@mui/material";
import { Delete, Edit, ShoppingCart } from "@mui/icons-material"; // 引入购物车图标
import { useHistory } from "react-router-dom"; // 使用 useHistory
import inventoryService, { Inventory } from "../../services/inventoryService";

const InventoryPage: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [newInventory, setNewInventory] = useState<Inventory>({ itemName: '', quantity: '', unit: '' });
    const [editingInventory, setEditingInventory] = useState<Inventory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const history = useHistory(); // 使用 useHistory 而不是 useNavigate

    useEffect(() => {
        loadInventories();
    }, []);

    const loadInventories = async () => {
        try {
            const result = await inventoryService.getUserInventories();
            setInventories(result);
        } catch (error) {
            console.error("Error loading inventories:", error);
            setError("Error loading inventories");
        } finally {
            setLoading(false);
        }
    };

    const handleGoToShoppingList = () => {
        history.push("/shoppingList"); // 使用 history.push 进行页面跳转
    };

    const handleAddInventory = async () => {
        try {
            await inventoryService.addInventory(newInventory);
            setNewInventory({ itemName: '', quantity: '', unit: '' });
            loadInventories();
        } catch (error) {
            console.error("Error adding inventory:", error);
            setError("Error adding inventory");
        }
    };

    const handleUpdateInventory = async () => {
        if (editingInventory) {
            try {
                await inventoryService.updateInventory(editingInventory);
                setEditingInventory(null);
                loadInventories();
            } catch (error) {
                console.error("Error updating inventory:", error);
                setError("Error updating inventory");
            }
        }
    };

    const handleDeleteInventory = async (id: number) => {
        try {
            await inventoryService.deleteInventory(id);
            loadInventories();
        } catch (error) {
            console.error("Error deleting inventory:", error);
            setError("Error deleting inventory");
        }
    };

    if (loading) return <CircularProgress />;

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Inventory Management
                </Typography>
                <IconButton color="primary" onClick={handleGoToShoppingList}>
                    <ShoppingCart /> {/* 购物车图标 */}
                </IconButton>
            </Box>
            <Paper>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Item Name"
                                fullWidth
                                value={newInventory.itemName}
                                onChange={(e) => setNewInventory({ ...newInventory, itemName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                fullWidth
                                type="number"
                                value={newInventory.quantity}
                                onChange={(e) => setNewInventory({ ...newInventory, quantity: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Unit"
                                fullWidth
                                value={newInventory.unit}
                                onChange={(e) => setNewInventory({ ...newInventory, unit: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleAddInventory}>
                                Add Inventory
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Inventory List
                </Typography>
                <Grid container spacing={2}>
                    {inventories.map((inventory) => (
                        <Grid item xs={12} key={inventory.id}>
                            <Paper>
                                <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography>
                                        {inventory.itemName} - {inventory.quantity} {inventory.unit}
                                    </Typography>
                                    <Box>
                                        <Button color="primary" onClick={() => setEditingInventory(inventory)}>
                                            <Edit />
                                        </Button>
                                        <Button color="secondary" onClick={() => handleDeleteInventory(inventory.id!)}>
                                            <Delete />
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {editingInventory && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Edit Inventory
                    </Typography>
                    <Paper>
                        <Box p={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Item Name"
                                        fullWidth
                                        value={editingInventory.itemName}
                                        onChange={(e) => setEditingInventory({ ...editingInventory, itemName: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Quantity"
                                        fullWidth
                                        type="number"
                                        value={editingInventory.quantity}
                                        onChange={(e) => setEditingInventory({ ...editingInventory, quantity: +e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Unit"
                                        fullWidth
                                        value={editingInventory.unit}
                                        onChange={(e) => setEditingInventory({ ...editingInventory, unit: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateInventory}>
                                        Update Inventory
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

export default InventoryPage;
