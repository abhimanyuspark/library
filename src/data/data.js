const ThemeContext = [
  { id: 1, name: "Light", theme: "light", color: "#FFFFFF" },
  { id: 2, name: "Dark", theme: "dark", color: "#000000" },
  { id: 3, name: "Green", theme: "green", color: "#008000" },
  { id: 4, name: "Blue", theme: "blue", color: "#0000FF" },
  { id: 5, name: "Orange", theme: "orange", color: "#FFA500" },
];

const NavContext = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
];

const categoriesData = [
  { id: 1, name: "Popular", category: "popular" },
  { id: 2, name: "Classic", category: "classics" },
  { id: 3, name: "Kids", category: "childrens" },
  { id: 4, name: "Thrillers", category: "thrillers" },
  { id: 5, name: "Young adult", category: "young_adults" },
  { id: 6, name: "Romance", category: "romance" },
];

export { ThemeContext, NavContext, categoriesData };
