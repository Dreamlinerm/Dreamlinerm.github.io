// Convert an JSON array to gql with every element in an array
function convertArrayToGQl(json) {
  let gql = "[";
  for (let i = 0; i < json.length; i++) {
    if (json[i] != null) {
      if (json[i] != null && Array.isArray(json[i])) {
        gql += convertArrayToGQl(json[i]) + ",";
      } else if (typeof json[i] === "string") {
        gql += `"` + json[i] + `",`;
      } else if (!isNaN(json[i])) {
        gql += json[i] + `,`;
      } else {
        gql += convertJsonToGQl(json[i]) + `,`;
      }
    }
  }
  gql += "]";
  return gql;
}
// Convert JSON to a gql query input json
// if more datatypes are needed add more ifs and handle seperatly
function convertJsonToGQl(json) {
  if (json != null && Array.isArray(json)) {
    return convertArrayToGQl(json) + "\n";
  } else if (typeof json === "string") {
    return `"` + json + `"\n`;
  } else if (!isNaN(json)) {
    return json + `\n`;
    // tests if json is a json object
  } else if (
    JSON.stringify(json).startsWith("{") &&
    JSON.stringify(json).endsWith("}")
  ) {
    let gql = "{";
    let index = 0;
    for (let key in json) {
      index++;
      if (index === 0) gql += "\n";
      if (json[key] != null && Array.isArray(json[key])) {
        gql += key + ": " + convertArrayToGQl(json[key]) + "\n";
      } else if (typeof json[key] === "string") {
        gql += key + `: "` + json[key] + `"\n`;
      } else if (!isNaN(json[key])) {
        gql += key + `: ` + json[key] + `\n`;
      } else {
        gql += key + `: ` + convertJsonToGQl(json[key]) + `\n`;
      }
    }
    gql += "}";
    return gql;
  }
  return json + `\n`;
}
