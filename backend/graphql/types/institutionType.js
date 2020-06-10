export default `
  type Institution {
    uuid: String!
    name: String!
    address: String!
    phone: Int
    email: String!
    nostudents: Int
    createdAt: String
    updatedAt: String
  }

  input InstitutionInputData {
    uuid: String
    name: String!
    address: String!
    phone: Int
    email: String!
    nostudents: Int
  }    

  type Query { 
    institutions: [Institution]
    institution(uuid: String!): Institution
  }

  type Mutation {
    createInstitution(institutionInput: InstitutionInputData): Institution!
  }
`;