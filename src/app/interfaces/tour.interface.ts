
import { Article } from "./article.interface";

export interface Tour  {
  firestoreId:string,
  id: string;
  time: number;
  tourcode: number;
  article: Article []
};