import apiService, { MOCK_CONFIG, createMockResponse } from "./apiService";
import { CATEGORY_ENDPOINTS } from "./apiDefinition";
import { Category } from "../models";
import { mockCategories } from "./mockData";

// Servicio para operaciones relacionadas con categorías
const categoryService = {
  // Obtener todas las categorías
  async getAllCategories() {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get All Categories");

      return createMockResponse(() => {
        return mockCategories.map((data) => new Category(data));
      }, 400);
    }

    try {
      const response = await apiService.get(CATEGORY_ENDPOINTS.list);
      const categories = response.data || response;
      return categories.map((data) => new Category(data));
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  },
};

export default categoryService;
    }

    try {
      const response = await apiService.get(CATEGORY_ENDPOINTS.list);

      // La API podría devolver los datos en diferentes estructuras
      const categories = response.data || response;

      return categories.map((data) => new Category(data));
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  },
};

export default categoryService;
