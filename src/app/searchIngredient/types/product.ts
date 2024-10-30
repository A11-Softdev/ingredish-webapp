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

export interface ShopProps{
    _id:string;
    user_id:string;
    name:string;
    image_url?:string;
    amount:number;
    contact:string[];
    address:string;
    product:ProductProps[];
    createdAt:Date;
};

export interface AllShopProps{
    shops: ShopProps[]
}

export interface AllProductsProps{
    products: ProductProps[]
}