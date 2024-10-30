export interface LongCardDataProps {
    _id:string;
    user:string;
    name:string;
    role:string;
    image_url?:string;
    serve:number;
    ingredient:string[];
    kitchentools:string[];
    recipe:string[];
    review:string[];
    createdAt:Date;
    rating:number;
    IsGenerated?:boolean;
    source:string;
}

export interface BlogsProps{
  data: LongCardDataProps[];
  total:number;
  page:number;
  limit:number;
}
