const SheetData = {
  name: "John",
  age: 30,
  city: "New York",
  dead: false,
  friends: ["Sally", "Tom", "Harry"],
};
console.log(JSON.stringify(SheetData).replace(/"([^"]+)":/g, "$1:"));
