import React from 'react';

import { AppConstants, initializeApp, InitializeApp } from './initializeApp';
import { getEatingPlan, EatingPlan } from './getEatingPlan';

export const AppContext = React.createContext<AppContext | null>(null);

export interface UserPreferencies {
  numberOfGuests: number;
}

const defaultUserPreferencies: UserPreferencies = {
  numberOfGuests: 42,
};

interface AppContext {
  appConstants: AppConstants | null;
  userPreferencies: {
    getUserPreferencies: UserPreferencies;
    setUserPreferencies: React.Dispatch<React.SetStateAction<UserPreferencies>>;
  };
  initializeApp: (input: InitializeApp) => Promise<string>;
  getEatingPlan?: () => Promise<EatingPlan>;
  getRecipesForRecipeList?: () => void;
  getRecipeInformation?: (name: string) => void;
}

export const AppProvider: React.FC = props => {
  // const [recipeMap, setRecipeMap] = React.useState<Map<string, string>>(new Map<string, string>());
  // const recipes = new Map<string, AppRecipe>();
  // const ingredients = new Map<string, Map<string, AppIngredient>>();

  const [appConstants, setAppConstants] = React.useState<AppConstants | null>(null);
  const [userPreferncies, setUserPreferencies] = React.useState<UserPreferencies>(defaultUserPreferencies);

  const AppContextValue: AppContext = {
    appConstants: appConstants,
    userPreferencies: {
      getUserPreferencies: userPreferncies,
      setUserPreferencies: setUserPreferencies,
    },
    initializeApp: async (input: InitializeApp): Promise<string> => {
      return new Promise(async resolve => {
        const fetchedAppConstants = await initializeApp(input);
        setAppConstants(fetchedAppConstants);
        // console.log(`Initialized with constants: `, fetchedAppConstants);
        resolve(fetchedAppConstants.title);
      });
    },
    getEatingPlan: async (): Promise<EatingPlan> => {
      if (!appConstants) return { recipes: [], plan: {} };
      return await getEatingPlan(appConstants);
    },
  };

  return <AppContext.Provider value={AppContextValue}>{props.children}</AppContext.Provider>;
};
