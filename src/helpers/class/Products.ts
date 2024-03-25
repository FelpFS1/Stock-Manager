import { ProductsProps } from "../../interfaces/ProductsProps";
import dayjs from "dayjs";
import TokenAuthorization from "../../services/TokenAuthorization";

type newProduct = {
  name: string;
  quantity: string;
  price: string;
  description: string;
  category: string;
};
export default class Products {
  private products;
  constructor(products: ProductsProps[]) {
    this.products = products;
  }

  static async getAllProduct() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await TokenAuthorization(token);
      return data;
    }
  }

  getDiversityProduct(): number {
    const amountDiversity = this.products.reduce(
      (accumulator: { [key: string]: ProductsProps[] }, current) => {
        if (accumulator[current.category]) {
          accumulator[current.category].push(current);
        } else {
          accumulator[current.category] = [current];
        }
        return accumulator;
      },
      {}
    );

    return Object.keys(amountDiversity).length;
  }

  getRecentProducts() {
    const recentProducts = this.products.filter((product) => {
      const date =
        new Date().getDate() - new Date(product.createdAt).getDate() < 5;
      if (date) {
        return product;
      }
    });
    return recentProducts;
  }

  getProductsEnding(): ProductsProps[] {
    const productsEnding: ProductsProps[] = [];

    this.products.filter((product) => {
      if (product && product.quantity && product.quantity <= 10) {
        productsEnding.push(product);
      }
    });
    return productsEnding;
  }

  getProductDatail(id: string) {
    const productFiltered = this.products.filter(
      (product) => product.id === id
    );
    if(productFiltered.length > 0){
      console.log(productFiltered);
      
      const product = 
        {
          id: productFiltered[0].id,
          name: productFiltered[0].name,
          price: (productFiltered[0].price),
          quantity: productFiltered[0].quantity,
          description: productFiltered[0].description,
          category: productFiltered[0].category,
          createdAt: dayjs(productFiltered[0].createdAt).format(
            "DD/MM/YYYY hh:mm A"
          ),
          updatedAt: dayjs(productFiltered[0].updatedAt).format(
            "DD/MM/YYYY hh:mm A"
          ),
        }
      ;
      return product;
      
    }

      
    throw new Response("error",{status:404})
  }

  static async addProduct(
    id: string,
    { name, quantity, description, price, category }: newProduct
  ) {

    
    const response = await fetch(`http://144.22.184.79:3333/product/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: +quantity,
        description,
        price: price,
        category,
      }),
    });

    const data = await response.json();
    return data;
  }

  static async deleteProduct(id?: string) {
    const response = await fetch(`http://144.22.184.79:3333/product/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

  static async updateProduct(
    userId: string,
    ProductId: string,
    { name, quantity, description, price, category }: ProductsProps
  ) {
    const response = await fetch(
      `http://144.22.184.79:3333/user/${userId}/product/${ProductId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          quantity: +quantity,
          description,
          price: price,
          category,
          updatedAt:new Date()
        }),
      }
    );
    const data = await response.json();
    return data;
  }
}
