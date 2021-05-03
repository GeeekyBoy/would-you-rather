import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../utils/api"
import { addAnswerStatus, addQuestionStatus } from "./status"

export const RETRIEVE_QUESTIONS = "RETRIEVE_QUESTIONS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

const retrieveQuestions = (questionsList) => ({
  type: RETRIEVE_QUESTIONS,
  questions: questionsList
});

const addAnswer = ({ authedUser, qid, answer }) => ({
  type: ADD_ANSWER,
  answer: {
    authedUser,
    qid,
    answer
  }
});

const addQuestion = (formattedQuestion) => ({
  type: ADD_QUESTION,
  formattedQuestion
});

export const handleRetrieveQuestions = () => (dispatch) => (
  _getQuestions().then(res => dispatch(retrieveQuestions(res)))
)

export const handleAddAnswer = ({ authedUser, qid, answer }) => (dispatch) => {
  dispatch(addAnswerStatus("fetching"))
  return _saveQuestionAnswer({ authedUser, qid, answer })
    .then(() => {
      dispatch(addAnswer({ authedUser, qid, answer }))
      return dispatch(addAnswerStatus("OK"))
    }).catch((e) => dispatch(addAnswerStatus(e)))
}

export const handleAddQuestion = ({ optionOneText, optionTwoText, author }) => (dispatch) => {
  dispatch(addQuestionStatus("fetching"))
  return _saveQuestion({ optionOneText, optionTwoText, author })
    .then((res) => {
      dispatch(addQuestion(res))
      return dispatch(addQuestionStatus("OK"))
    }).catch((e) => dispatch(addQuestionStatus(e)))
}