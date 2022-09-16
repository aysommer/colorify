import { makeAutoObservable } from "mobx"
import type { Color } from "./types";

interface IStore {
   image: HTMLImageElement | null;
   colors: Color[];

   setImage(image: HTMLImageElement | null): void;
   setColors(colors: Color[]): void;
   clear(): void;
}

class Store implements IStore {
   public image: HTMLImageElement | null = null;
   public colors: Color[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public setImage = (image: IStore['image']): void => {
      this.image = image;
   }

   public setColors = (colors: Color[]): void => {
      this.colors = colors;
   }

   public clear = (): void => {
      this.image = null;
      this.colors = [];
   }
}

const store = new Store();

export default store;
