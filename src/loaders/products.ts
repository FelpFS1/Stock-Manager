import Products from "../helpers/class/Products";

export default async function LoadProduct({ params }: { params: any }) {
  const response = await Products.getAllProduct();
  const products = response[0].products;
  const product = new Products(products).getProductDatail(params.id);
  return product;
}
