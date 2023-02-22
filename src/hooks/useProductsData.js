import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchProducts = () => {
  return axios.get("https://api-mona-official.onrender.com/products");
};

const addProduct = (product) => {
  return axios.post(`https://api-mona-official.onrender.com/products`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`https://api-mona-official.onrender.com/products/${id}`);
};

// export const updateProductById = async (data) => {
//   const url = `/products/${data.id}`;
//   return await axiosClient.patch(url, data);
// };

export const updateProduct = (data) => {
  return axios.patch(
    `https://api-mona-official.onrender.com/products/${data.id}`,
    data
  );
};

export const useProductsData = () => {
  return useQuery("products", fetchProducts);
};

export const useAddProductData = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("products");
      const previousProductData = queryClient.getQueriesData("products");
      queryClient.setQueryData("products", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              ...newProduct.data,
              key: newProduct.data?.id,
            },
          ],
        };
      });
      return {
        previousProductData
      };
    },
    onError: (_error, _newProduct, context) => {
      queryClient.setQueryData("products", context.previousProductData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
    optimisticUpdater: (newProduct, optimisticResult) => {
      queryClient.setQueryData("products", (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            {
              ...newProduct,
              key: optimisticResult.id,
            },
          ],
        };
      });
    },
  });
};

export const useDeleteProductData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("products");
      const listProduct = queryClient.getQueryData("products");

      const newData = listProduct.data.filter((item) => item.id !== id);

      queryClient.setQueryData("products", {
        ...listProduct,
        data: newData,
      });

      return {
        newData,
      };
    },
    onError: (error, _product, context) => {
      queryClient.setQueryData("products", {
        ...context.newData,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries("products");
    },

    optimisticUpdater: (id) => {
      const listProduct = queryClient.getQueryData("products");

      const newData = listProduct.data.filter((item) => item.id !== id);

      queryClient.setQueryData("products", {
        ...listProduct,
        data: newData,
      });
    },
  });
};

export const useUpdateProductData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onMutate: async (newDataProduct) => {
      await queryClient.cancelQueries("products");
      const listProduct = queryClient.getQueryData("products");

      const newData = listProduct.data.map((product) =>
        product.id === newDataProduct.id ? newDataProduct : product
      );

      queryClient.setQueryData("products", {
        ...listProduct,
        data: newData,
      });

      return {
        newData,
      };
    },
    onError: (error, _newDataProduct, context) => {
      queryClient.setQueryData("products", {
        ...context.newData,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries("products");
    },

    optimisticUpdater: (newDataProduct) => {
      const listProduct = queryClient.getQueryData("products");

      const newData = listProduct.data.map((product) =>
        product.id === newDataProduct.id ? newDataProduct : product
      );

      queryClient.setQueryData("products", {
        ...listProduct,
        data: newData,
      });
    },
  });
};
