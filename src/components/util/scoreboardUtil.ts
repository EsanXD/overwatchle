import { Character } from "./interfaces";

function isPartial(str1: string, str2: string): boolean | undefined {
  const arr1 = str1.split("/");
  const arr2 = str2.split("/");

  const intersection = arr1.filter((element) => arr2.includes(element));

  if (
    intersection.length === arr1.length &&
    intersection.length === arr2.length
  ) {
    return true; // Exact same elements
  } else if (intersection.length > 0) {
    return undefined; // Partially the same
  }
  return false; // No intersection
}

export const gradeGuess = (guess: Character, actual: Character) => {
  const isCorrect = guess.name.toUpperCase() === actual.name.toUpperCase();
  const role = guess.role === actual.role;
  const gender = guess.gender === actual.gender;
  const org = isPartial(guess.org, actual.org);
  const race = guess.race === actual.race;
  const projectileType = isPartial(guess.projectiletype, actual.projectiletype);
  const releaseYear = guess.releaseyear === actual.releaseyear;
  return [isCorrect, role, gender, org, race, projectileType, releaseYear];
};
