export enum ErrorType {
  INVALID_SPREADSHEET_ID = 'Nem elérhető a táblázat. (Hibás a link, vagy nincs megosztva.)',
  INVALID_SHEET_ID = 'Nem megfelelő munkalapra mutat a link.',
  INVALID_FORMAT = 'A táblázat valószínűleg nem teljesíti a működéshez szükséges formai követelményeket. Ha ez tévedés, kérlek vedd fel a kapcsolatot.',
}

export class CustomError extends Error {
  // constructor(errorType: ErrorType) {
  //   super(errorType);
  // }
}
