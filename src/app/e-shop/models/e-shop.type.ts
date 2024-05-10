export interface ProductModel {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: RatingModel;
}

export interface RatingModel {
  rate: number,
  count: number,
}

export interface CartItemsModel {
  product: ProductModel;
  quantity: number;
}
