export interface Recipe {
  addDate: string; // egyelőre nem indokolt, hogy máshogy legyen
  name: string;
  imageLink: string;
}

export interface RecipePage {
  addDate: string;
  name: string;
  time: string;
  ingredients: {
    ingredients: Ingredient[];
    incorrectIngredients: string[];
  };
  portions: number;
  instructions: string;
  imageLink: string;
  tools: string;
  addedBy: string;
  source: string;
  otherParams: string;
  price: number;
  properties: {
    energy: number;
    protein: number;
    carbohydrate: number;
    fat: number;
    water: number;
  };
}

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
