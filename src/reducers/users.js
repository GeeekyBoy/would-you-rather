import { RETRIEVE_USERS } from "../actions/users"
import { ADD_ANSWER, ADD_QUESTION } from "../actions/questions"

export default function (state = null, action) {
  switch(action.type) {
    case RETRIEVE_USERS:
      return {...action.users}
    case ADD_ANSWER:
      const { authedUser, qid, answer } = action.answer;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.formattedQuestion.author]: {
          ...state[action.formattedQuestion.author],
          questions: state[action.formattedQuestion.author].questions.concat([action.formattedQuestion.id])
        }
      }
    default:
      return state
  }
}