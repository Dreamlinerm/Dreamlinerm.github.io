// Convert JSON to a gql query input json
function convertJsonToGQl(json: JSON) {
  return JSON.stringify(json).replace(/"([^"]+)":/g, "$1:");
}
// Convert JSON string to a gql query input json
function convertJsonStringToGQl(json: string) {
  return json.replace(/"([^"]+)":/g, "$1:");
}

// Convert JSON string to a gql query. input json and enumvalues is string[] of enum values
// enumValues = ["Star", "Textarea", "Radio", "Dropdown", "Location"];
function convertJsonStringToGqlEnum(json: string, enumValues: string[]) {
  let gql = convertJsonStringToGQl(json);
  enumValues.forEach((enumValue) => {
    const re = new RegExp(`"` + enumValue + `"`, "g");
    gql = gql.replace(re, `${enumValue}`);
  });
  return gql;
}

// Convert JSON to a gql query. input json and enumvalues is string[] of enum values
// enumValues = ["Star", "Textarea", "Radio", "Dropdown", "Location"];
function convertJSONtoGqlEnum(json: JSON, enumValues: string[]) {
  let gql = JSON.stringify(json).replace(/"([^"]+)":/g, "$1:");
  enumValues.forEach((enumValue) => {
    const re = new RegExp(`"` + enumValue + `"`, "g");
    gql = gql.replace(re, `${enumValue}`);
  });
  return gql;
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// doesn't use regex

// Convert an JSON array to gql with every element in an array
function convertArrayToGQl(json: any) {
  let k = ",";
  let gql = "[";
  for (let i = 0; i < json.length; i++) {
    if (i === json.length - 1) k = "";
    if (json[i] != null) {
      if (json[i] != null && Array.isArray(json[i])) {
        gql += convertArrayToGQl(json[i]) + k;
      } else if (typeof json[i] === "string") {
        gql += `"` + json[i] + `"` + k;
      } else if (!isNaN(json[i])) {
        gql += json[i] + k;
      } else {
        gql += convertJsonToGQlwithDatatypes(json[i]) + k;
      }
    }
  }
  gql += "]";
  return gql;
}
// Convert JSON to a gql query input json
// if more datatypes are needed add more cases and handle separately
function convertJsonToGQlwithDatatypes(json: any) {
  if (json != null && Array.isArray(json)) {
    return convertArrayToGQl(json) + "\n";
  } else if (typeof json === "string") {
    return `"` + json + `"\n`;
  } else if (!isNaN(json)) {
    return json + `\n`;
    // tests if json is a json object
  } else if (typeof json === "object") {
    let gql = "{\n";
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
        gql += key + `: ` + convertJsonToGQlwithDatatypes(json[key]) + `\n`;
      }
    }
    gql += "}";
    return gql;
  }
  return json + `\n`;
}
export {
  convertJsonToGQl,
  convertJsonStringToGQl,
  convertJSONtoGqlEnum,
  convertJsonStringToGqlEnum,
  convertJsonToGQlwithDatatypes,
};
