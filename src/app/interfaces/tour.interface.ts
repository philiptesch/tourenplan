
import { Article } from "./article.interface";
import { customer } from "./customer.interface";

export interface Tour  {
  firestoreId:string,
  id: string;
  time: number;
  tourcode: number;
  article: Article []
  customer: customer[]
};