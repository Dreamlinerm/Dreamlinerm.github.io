function convertJsonToGQl(json: JSON) {
  return JSON.stringify(json).replace(/"([^"]+)":/g, "$1:");
}
export { convertJsonToGQl };
