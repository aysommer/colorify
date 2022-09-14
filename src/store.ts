import { createContext, } from "react";
import type { Action, State, Context } from "./types";

export const initialState: State = {
   image: null,
   colors: []
};

export const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'UPLOAD_IMAGE': {
         return {
            ...state,
            image: action.payload
         }
      }
      case 'CALCULATE_COLORS': {
         return {
            ...state,
            colors: action.payload
         }
      }
      case 'CLEAR_IMAGE': {
         return {
            ...initialState
         }
      }
      default: {
         return state;
      }
   }
};

export const AppContext = createContext<Context>({
   state: initialState,
   dispatch: () => null
});