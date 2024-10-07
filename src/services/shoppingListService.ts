import apiClient from './apiClient';

export interface ShoppingItem {
    id?: number;
    itemName: string;
    quantity: string;
    unit: string;
}

export interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
}

const shoppingListService = {
    // 获取用户的所有购物清单项
    getShoppingList: async (): Promise<ShoppingItem[]> => {
        const response = await apiClient.get<ApiResponse<ShoppingItem[]>>('/list/getAllMyShoppingList');
        return response.data.data;
    },

    // 获取某个特定购物清单项的详情
    getItemDetails: async (id: number): Promise<ShoppingItem> => {
        // 这里需要使用反引号（``）来表示字符串模板
        const response = await apiClient.get<ApiResponse<ShoppingItem>>(`/list/edit/${id}`);
        return response.data.data;
    },

    // 添加新的购物清单项
    addItem: async (item: ShoppingItem): Promise<ShoppingItem> => {
        const response = await apiClient.post<ApiResponse<ShoppingItem>>('/list/add', item);
        return response.data.data;
    },

    // 更新现有的购物清单项
    updateItem: async (item: ShoppingItem): Promise<ShoppingItem> => {
        // 这里也使用反引号来拼接 URL
        const response = await apiClient.put<ApiResponse<ShoppingItem>>(`/list/edit`, item);
        return response.data.data;
    },

    // 删除某个购物清单项
    deleteItem: async (itemId: number): Promise<void> => {
        // 这里同样改为字符串模板，并确保传递的 URL 是字符串
        await apiClient.delete('/list/delete', {
            params: { shoppingListId: itemId },  // 参数名应与后端一致
        });
    },
};

export default shoppingListService;
