export const ADD_ANSWER_STATUS = "ADD_ANSWER_STATUS";
export const ADD_QUESTION_STATUS = "ADD_QUESTION_STATUS";
export const SET_LOGIN_REFERRER = "SET_LOGIN_REFERRER";

export const addAnswerStatus = (status) => ({
  type: ADD_ANSWER_STATUS,
  status
});

export const addQuestionStatus = (status) => ({
  type: ADD_QUESTION_STATUS,
  status
});

export const setLoginReferrer = (referrer) => ({
  type: SET_LOGIN_REFERRER,
  referrer
});