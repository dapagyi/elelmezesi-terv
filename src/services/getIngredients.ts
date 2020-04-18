const units = [
  'g',
  'dkg',
  'kg',
  'ml',
  'dl',
  'l',
  'teáskanál',
  'evőkanál',
  'kávéskanál',
  'mokkáskanál',
  'db',
  'szem',
  'fej',
  'konzerv',
  'csomag',
];

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface GetIngredients {
  ingredients: Ingredient[];
  incorrectIngredients: string[];
}

const rowRegExp = new RegExp(`^(\\d+\\.?\\d*) (${units.join('|')}) (.+)$`);

export function getIngredients(ingredientsCellValue: string): GetIngredients {
  const ingredientsList = ingredientsCellValue.split('\n');
  const result: GetIngredients = { ingredients: [], incorrectIngredients: [] };
  ingredientsList.forEach(row => {
    const matches = row.match(rowRegExp);
    if (matches && matches.length === 4)
      result.ingredients.push({
        amount: +matches[1],
        unit: matches[2],
        name: matches[3],
      } as Ingredient);
    else result.incorrectIngredients.push(row);
  });
  return result;
  // return ingredients;
}

// FIXME: Az alábbiakra nem vagyok büszke.

const precision = 3;

function simplifyWeight(amount: number, unit: string): string {
  if (unit === 'g') {
    if (10 <= amount) return simplifyWeight(amount / 10, 'dkg');
  } else if (unit === 'dkg') {
    if (amount < 1) return simplifyWeight(amount * 10, 'g');
    else if (100 <= amount) return simplifyWeight(amount / 100, 'kg');
  } else if (unit === 'kg') {
    if (amount < 1) return simplifyWeight(amount * 100, 'dkg');
  }
  return `${parseFloat(amount.toFixed(precision))} ${unit}`;
}

function simplifyVolume(amount: number, unit: string): string {
  if (unit === 'ml') {
    if (10 <= amount) return simplifyWeight(amount / 100, 'dl');
  } else if (unit === 'dl') {
    if (amount < 1) return simplifyWeight(amount * 100, 'ml');
    else if (10 <= amount) return simplifyWeight(amount / 10, 'l');
  } else if (unit === 'l') {
    if (amount < 1) return simplifyWeight(amount * 10, 'dl');
  }
  return `${parseFloat(amount.toFixed(precision))} ${unit}`;
}

export function simplifyUnit(amount: number, unit: string): string {
  if (unit === 'g' || unit === 'dkg' || unit === 'kg') return simplifyWeight(amount, unit);
  else if (unit === 'ml' || unit === 'dl' || unit === 'l') return simplifyVolume(amount, unit);
  else return `${parseFloat(amount.toFixed(precision))} ${unit}`;
}
