import { AppConstants } from './initializeApp';
import fetchSpreadsheet from './fetchSpreadsheet';

function columnToLetter(column: number): string {
  let temp,
    letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

interface Recipe {
  name: string;
  price: number;
  energy: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  water: number;
}

export interface EatingPlan {
  recipes: Recipe[];
  plan: {
    [day: string]: {
      meals: {
        [mealOfDay: string]: {
          name: string;
          isExist: boolean;
        };
      };
    };
  };
}

export async function getEatingPlan(parameters: AppConstants): Promise<EatingPlan> {
  return new Promise(async (resolve, reject) => {
    const FIRST_COLUMN_OF_PLAN = 8;
    const c: string[] = [];
    for (let i = 0; i <= parameters.numOfMenus; i++) c.push(columnToLetter(FIRST_COLUMN_OF_PLAN + i));
    const query = `select ${c.join(', ')} where ${columnToLetter(FIRST_COLUMN_OF_PLAN)} is not null`;
    const plan = await fetchSpreadsheet(query, parameters.spreadsheetId, parameters.tableIds.planSheet, 0);

    // const recipes = await fetchSpreadsheet(query, parameters.spreadsheetId, parameters.tableIds.planSheet, 0);
    const result: EatingPlan = { recipes: [], plan: {} };
    const recipeNamesInPlan: string[] = [];
    // console.log(plan);

    const days = plan[0];
    for (let i = 1; i < days.length; i++) {
      const day = days[i];
      // result[day] = [];
      result.plan[day] = { meals: {} };
      for (let j = 1; j < plan.length; j++) {
        const dish = plan[j][i];
        const mealOfDay = plan[j][0];
        if (dish) {
          result.plan[day].meals[mealOfDay] = { name: dish, isExist: false };
          recipeNamesInPlan.push(dish);
        }
      }
    }

    const recipeDataQuery = `select B, Q, R, S, T, U, V where (${recipeNamesInPlan
      .map(recipeName => `B = "${recipeName}"`)
      .join(' or ')})`;
    const recipeData = await fetchSpreadsheet(
      recipeDataQuery,
      parameters.spreadsheetId,
      parameters.tableIds.recipesSheet,
      1,
    );
    result.recipes = recipeData.map(d => {
      return { name: d[0], price: +d[1], energy: +d[2], carbohydrate: +d[3], fat: +d[4], water: +d[5] } as Recipe;
    });
    Object.keys(result.plan).forEach(day => {
      Object.keys(result.plan[day].meals).forEach(mealOfDay => {
        result.plan[day].meals[mealOfDay].isExist = result.recipes
          .map(r => r.name)
          .includes(result.plan[day].meals[mealOfDay].name);
      });
    });
    console.log(recipeData);

    resolve(result);
  });
}
