
import { Article } from "./article.interface";

export interface Tour  {
  id: string;
  time: number;
  tourcode: number;
  article: Article []
};