import apiService from "./apiService";
import { CATEGORY_ENDPOINTS } from "./apiDefinition";
import { Category } from "../models";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = false;

// Datos mock para usar durante el desarrollo
const mockCategories = [
  { id: "1", name: "Documentos", iconName: "document-text", color: "#4b7bec" },
  { id: "2", name: "Vivienda", iconName: "home", color: "#2ecc71" },
  { id: "3", name: "Vehículos", iconName: "car", color: "#e74c3c" },
  { id: "4", name: "Educación", iconName: "school", color: "#f39c12" },
  { id: "5", name: "Empresas", iconName: "business", color: "#9b59b6" },
  { id: "6", name: "Salud", iconName: "medkit", color: "#3498db" },
  { id: "7", name: "Identidad", iconName: "people", color: "#e67e22" },
  { id: "8", name: "Impuestos", iconName: "card", color: "#16a085" },
];

// Servicio para operaciones relacionadas con categorías
const categoryService = {
  // Obtener todas las categorías
  async getAllCategories() {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCategories.map((data) => new Category(data)));
        }, 300);
      });
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
