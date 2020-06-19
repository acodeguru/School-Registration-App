export default `
  type AuthData {
    token: String!
    userUUID: String!
    role: String!
  }

  type User {
    fname: String
    lname: String
    email: String
    password: String
    address:String
    dob:String
    role: Role
    status: Int
  }

  input UserInputData {
    fname: String!
    lname: String!
    email: String!
    password: String!
  }    

  type Query { 
    login(email: String!, password: String!): AuthData!

    users: [User]
    user(uuid: String!): User
  }

  type Mutation {
    createUser(userInput: UserInputData): User!
  }
`;