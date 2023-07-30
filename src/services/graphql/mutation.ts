import { gql } from "@apollo/client";

export const SIGNUP = gql`
mutation REGISTER(
  $email: String!
  $firstName: String!
  $lastName: String!
  $password: String!
  $role: String!
  $deviceInput: DeviceInput!
){
  register(
    email: $email
    firstName: $firstName
  	lastName: $lastName
    password: $password
    role:  $role
    deviceInput: $deviceInput
  ){
    accessToken
    refreshToken
    errors
  }
}
`;

export const LOGIN = gql`
mutation Login(
  $email: String!
	$password: String!
  $deviceInput: DeviceInput!
  $whereApp: String!
){
  login(
    email: $email
    password: $password
    deviceInput: $deviceInput
    whereApp: $whereApp
  ){
    accessToken
    refreshToken
    error
    success
  }
}
`;

export const RECOVER_PASSWORD = gql`
mutation RECOVER_PASSWORD($email: String!){
  forgotPassword(email: $email){
    status
  }
}
`;

export const CHANGE_PASSWORD = gql`
mutation CHANGE_PASSWORD(
  $oldPassword: String!
  $newPassword: String!
){
  changePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
  ){
    success
    errors
  }
}
`;

export const RESET_PASSWORD = gql`
mutation RESET_PASSWORD(
  $uid: String!
  $token: String!
  $password: String!
){
  resetPassword(
    uid: $uid
    token: $token
    password: $password
  ){
    status
    errorPassword
    errorUser
    errorToken
  }
}
`;