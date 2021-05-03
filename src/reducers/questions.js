import { RETRIEVE_QUESTIONS, ADD_ANSWER, ADD_QUESTION } from "../actions/questions"

export default function (state = null, action) {
  switch(action.type) {
    case RETRIEVE_QUESTIONS:
      return {...action.questions}
    case ADD_ANSWER:
      const { authedUser, qid, answer } = action.answer;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.formattedQuestion.id]: action.formattedQuestion
      }
    default:
      return state
  }
}