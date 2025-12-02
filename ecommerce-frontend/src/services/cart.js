import { API } from "./api";

export const addToCart = async (productId) => {
  try {
    return await API.post("/cart/add", { productId });
  } catch (error) {
    throw {
      response: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message || "Failed to add item to cart" }
      },
      message: error.response?.data?.message || error.message || "Failed to add item to cart"
    };
  }
};

export const getMyCart = async () => {
  try {
    return await API.get("/cart/cart");
  } catch (error) {
    throw {
      response: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message || "Failed to fetch cart" }
      },
      message: error.response?.data?.message || error.message || "Failed to fetch cart"
    };
  }
};

export const removeFromCart = async (productId) => {
  try {
    return await API.delete("/cart/remove", { data: { productId } });
  } catch (error) {
    throw {
      response: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message || "Failed to remove item from cart" }
      },
      message: error.response?.data?.message || error.message || "Failed to remove item from cart"
    };
  }
};
