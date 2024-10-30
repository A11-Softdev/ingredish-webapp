// Interfaces for the response structure
export interface Ingredient {
  name: string;
  quantity: string;
  preparation: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export interface MenuItem {
    Name?: string;
    Description?: string;
    EstimatedTimeCook?: string;
    error?: string;
    raw_response?: string;
  }
  
  export interface Recipe {
    Ingredients?: Ingredient[];
    Instructions?: Instruction[];
  }
  
  export interface Menu {
    MenuItem: MenuItem;
    Recipe?: Recipe;
    error?: string;
    raw_response?: string;
  }
  
  export interface RecipeResponse {
    Menu: Menu;
  }
