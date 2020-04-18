import fetchSpreadsheet from './fetchSpreadsheet';
import { CustomError, ErrorType } from './CustomError';

export interface InitializeAppService {
  spreadsheetId: string;
  gid: number | string;
}

interface TableIds {
  helperSheet: number;
  ingredientsSheet: number;
  recipesSheet: number;
  planSheet: number;
}

export interface AppConstants {
  title: string;
  spreadsheetId: string;
  tableIds: TableIds;
  newRecipeFormUrl: string;
  numOfMenus: number;
}

const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

const MAX_TRIES = 3;
const SLEEP_MS = 1000;

async function tryToFetchAndProcess(properties: InitializeAppService, n = MAX_TRIES): Promise<AppConstants> {
  return new Promise(async (resolve, reject) => {
    if (n === 0) return reject(new CustomError(ErrorType.INVALID_FORMAT));
    // console.log(`Try (${MAX_TRIES - n + 1}/${MAX_TRIES})...`);
    const table = await fetchSpreadsheet(
      'select A, B, D, F where A is not null limit 3',
      properties.spreadsheetId,
      properties.gid,
      1,
    );
    try {
      const tableIds: TableIds = {
        helperSheet: +table[0][0],
        ingredientsSheet: +table[1][0],
        recipesSheet: +table[2][0],
        planSheet: +properties.gid,
      };
      const menuTitle = table[0][2];
      const newRecipeFormUrl: string = table[0][1];
      const numOfMenus: number = +table[0][3];
      const AppConstants: AppConstants = {
        title: menuTitle,
        spreadsheetId: properties.spreadsheetId,
        tableIds: tableIds,
        newRecipeFormUrl: newRecipeFormUrl,
        numOfMenus: numOfMenus,
      };
      resolve(AppConstants);
    } catch (e) {
      if (n !== 0) {
        if (n !== 1) await sleep(SLEEP_MS);
        tryToFetchAndProcess(properties, n - 1)
          .then(a => {
            resolve(a);
          })
          .catch(e => {
            reject(e);
          });
      } else reject(e);
    }
  });
}

export async function initializeAppService(properties: InitializeAppService): Promise<AppConstants> {
  // console.log(`Initializing...`);
  return new Promise(async (resolve, reject) => {
    try {
      const appConstants = await tryToFetchAndProcess(properties).catch(e => {
        throw e;
      });
      resolve(appConstants);
    } catch (e) {
      // console.warn(e);
      reject(e);
    }
  });
}

export interface InitializeApp extends InitializeAppService {
  onError: (errorMessage: string) => void;
}

export const initializeApp = async (properties: InitializeApp): Promise<AppConstants> => {
  return new Promise(async resolve => {
    try {
      const appConstants = await initializeAppService(properties);
      resolve(appConstants);
    } catch (e) {
      if (e instanceof CustomError) {
        console.warn(e);
        properties.onError(e.message);
      } else {
        console.error(e);
        properties.onError('Ismeretlen hiba történt. Kérlek vedd fel a kapcsolatot.');
      }
    }
  });
};
