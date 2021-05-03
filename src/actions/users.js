import { _getUsers } from "../utils/api"

export const RETRIEVE_USERS = "RETRIEVE_USERS";

const retrieveUsers = (usersList) => ({
  type: RETRIEVE_USERS,
  users: usersList
});

export const handleRetrieveUsers = () => (dispatch) => (
  _getUsers().then(res => dispatch(retrieveUsers(res)))
)