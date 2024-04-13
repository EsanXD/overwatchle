export interface Styles {
  [key: string]: React.CSSProperties;
}
export interface DailyWord {
  hero: string;
  ability: string;
  img: string;
}

export interface Character {
  name: string;
  gender: "male" | "female";
  role: "tank" | "dps" | "support";
  race: string;
  org: string;
  projectileType: string;
  releaseYear: number;
  img: string;
}
