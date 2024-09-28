export interface ProductProps{
    _id:string;
    shopId:string;
    amount:number;
    name:string;
    price:number;
    image_url:string;
    createdAt:Date;
    updateAt:Date;
};

export interface AllProductsProps{
    products: ProductProps[]
}