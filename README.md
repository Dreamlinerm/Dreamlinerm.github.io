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

# Online converter
goto https://dreamlinerm.github.io/JSONtoGqlMutation/

# Conversion example

If you have a json like:
```
 {
  "id": "1",
  "name": "John",
  "age": 30,
  "city": "New York",
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
        id: "1"
        name: "John"
        age: 30
        city: "New York"
        dead: false
        friends: ["Sally","Tom","Harry"]
    ){
      id
    }
}
```
You can use convertJsonToGQl
