import apiClient from './apiClient';

export interface Inventory {
    id?: number;
    itemName: string;
    quantity: number | string;
    unit: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
}

const inventoryService = {
    getUserInventories: async (): Promise<Inventory[]> => {
        const response = await apiClient.get<ApiResponse<Inventory[]>>('/inventory/getAllMyInventory');
        return response.data.data;
    },
    getInventoryDetails: async (id: number): Promise<Inventory> => {
        const response = await apiClient.get<ApiResponse<Inventory>>(`/inventory/${id}`);
        return response.data.data;
    },
    addInventory: async (inventory: Inventory): Promise<Inventory> => {
        const response = await apiClient.post<ApiResponse<Inventory>>('/inventory/add', inventory);
        return response.data.data;
    },
    updateInventory: async (inventory: Inventory): Promise<Inventory> => {
        const response = await apiClient.put<ApiResponse<Inventory>>(`/inventory/edit`, inventory);
        return response.data.data;
    },
    deleteInventory: async (inventoryId: number): Promise<void> => {
        await apiClient.delete(`/inventory/delete`, {
            params: { inventoryId },
        });
    },
};

export default inventoryService;
