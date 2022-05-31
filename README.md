# JSON to GraphQL
Method convertJsonToGQl, wich converts a JSON to a GraphQL mutation.

FileTypes:
    string,
    number,
    boolean,
    null,
    object,
    array are handled.

If more Filetypes or custom ones needed, you should add more cases.

```
function convertJsonToGQl(json: JSON) {
  return JSON.stringify(json).replace(/"([^"]+)":/g, "$1:");
}
```
Enum Datatype is also handled in 

convertJSONtoGqlEnum(json: JSON, enumValues: string[])


# Online converter
goto https://dreamlinerm.github.io/JSONtoGqlMutation/

# Conversion example

If you have a json like:
```
 {
  "name": "John",
  "age": 30,
  "dead": false,
  "friends": [
    "Sally",
    "Tom",
    "Harry"
  ]
}
```
  and you want a gql muatation like this:
  ```
  mutation {
    addPerson(
        name: "John"
        age: 30
        dead: false
        friends: ["Sally","Tom","Harry"]
    ){      id    }
}
```
You can use convertJsonToGQl
