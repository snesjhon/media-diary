import { DefaultTheme } from "styled-components";

const BP = {
  tablet: 768,
  laptop: 1024,
  laptopL: 1366,
  desktop: 1920,
  tv: 2560
};

export interface Style {
  fontWeights: string[];
  breakpoints: string[];
  fontSizes: string[];
  space: string[];
  colors: {
    primary: string;
    secondary: string;
    orange: string;
    blue: string;
    "bg-primary": string;
    "bg-secondary": string;
    "border-primary": string;
    "border-secondary": string;
    "text-primary": string;
  };
  stroke: {
    primary: string;
    secondary: string;
    orange: string;
    blue: string;
    "bg-primary": string;
    "bg-secondary": string;
    "border-primary": string;
    "border-secondary": string;
    "text-primary": string;
  };
}

const myTheme: DefaultTheme & Style = {
  fontSizes: [
    "var(--font-size-xs)",
    "var(--font-size-sm)",
    "var(--font-size-base)",
    "var(--font-size-md)",
    "var(--font-size-lg)",
    "var(--font-size-h4)",
    "var(--font-size-h3)",
    "var(--font-size-h2)",
    "var(--font-size-h1)"
  ],
  fontWeights: [
    "var(--font-weight-light)",
    "var(--font-weight-normal)",
    "var(--font-weight-semibold)",
    "var(--font-weight-bold)"
  ],
  breakpoints: Object.values(BP).map(e => e + "px"),
  space: [
    "0",
    "calc(.25rem * var(--rem-base))",
    "calc(.5rem * var(--rem-base))",
    "calc(1rem * var(--rem-base))",
    "calc(1.5rem * var(--rem-base))",
    "calc(2rem * var(--rem-base))",
    "calc(2.5rem * var(--rem-base))",
    "calc(3rem * var(--rem-base))"
  ],
  colors: {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    orange: "var(--orange)",
    blue: "var(--blue)",
    "bg-primary": "var(--bg-primary)",
    "bg-secondary": "var(--bg-secondary)",
    "border-primary": "var(--border-primary)",
    "border-secondary": "var(--border-secondary)",
    "text-primary": "var(--text-primary)"
  },
  stroke: {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    orange: "var(--orange)",
    blue: "var(--blue)",
    "bg-primary": "var(--bg-primary)",
    "bg-secondary": "var(--bg-secondary)",
    "border-primary": "var(--border-primary)",
    "border-secondary": "var(--border-secondary)",
    "text-primary": "var(--text-primary)"
  }
};

export { myTheme };
