import { ADD_ANSWER_STATUS, ADD_QUESTION_STATUS, SET_LOGIN_REFERRER } from "../actions/status"

export default function (state = {}, action) {
  switch(action.type) {
    case ADD_ANSWER_STATUS:
      return {...state, addingAnswer: action.status}
    case ADD_QUESTION_STATUS:
      return {...state, addingQuestion: action.status}
    case SET_LOGIN_REFERRER:
      return {...state, loginReferrer: action.referrer}
    default:
      return state
  }
}