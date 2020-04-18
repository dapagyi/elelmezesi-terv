import { CustomError, ErrorType } from './CustomError';

export default async function fetchSpreadsheet(
  query: string,
  spreadsheetId: string,
  gid: number | string,
  headers: number,
): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const encodedQuery = window.encodeURIComponent(query);
    const urlToFetch = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tq=${encodedQuery}&gid=${gid}&headers=${headers}`;
    const requestOptions: RequestInit = {
      method: 'GET',
    };
    // TODO: FIXME: try max 3 times
    // fetch(urlToFetch, requestOptions)
    fetch(urlToFetch, requestOptions)
      .then(response => response.text())
      .then(result => {
        const regExp = /^\/\*O_o\*\/\ngoogle.visualization.Query.setResponse\(({.*})\);$/;
        const r = result.match(regExp);
        if (!r || r.length < 2) throw new CustomError(ErrorType.INVALID_SPREADSHEET_ID);
        const json: ResponeJSON = JSON.parse(r[1]);
        if (json.table) {
          const table = json.table.rows.map(row =>
            row.c.map(column => {
              return column ? column.v : '';
            }),
          );
          resolve(table);
          return table;
        } else if (json.errors) {
          // throw new Error(json.errors.map(e => e.detailed_message).join('\n'));
          throw new CustomError(ErrorType.INVALID_SHEET_ID);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

interface ResponeJSON {
  version: string;
  reqId: string;
  status: string;
  sig: string;
  table?: {
    rows: {
      c: ({
        v: string;
      } | null)[];
    }[];
  };
  errors?: {
    reason: string;
    message: string;
    detailed_message: string;
  }[];
}
