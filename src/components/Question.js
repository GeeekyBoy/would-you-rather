import styledComponents, { keyframes } from "styled-components"
import serialize from "form-serialize"
import { handleAddAnswer } from "../actions/questions";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux";
import NotFound from "./NotFound";
import { useState, useEffect } from "react";

const Question = (props) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const { currentUser, status, users, questions, dispatch, match } = props;
  const question = questions?.[match.params.question_id]
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = serialize(e.target, { hash: true })
    dispatch(handleAddAnswer({
      authedUser: currentUser,
      qid: question.id,
      answer: data.option
    }))
  }
  useEffect(() => {
    if (question) {
      setIsAnswered(Object.keys(users[currentUser].answers).includes(question.id))
    }
  }, [question, users, currentUser]);
  if (!question) {
    return (<NotFound />)
  }
  return (
    <QuestionCardContainer>
      <QuestionCard>
        <img src={users[question.author].avatarURL} alt={users[question.author].name} />
        <div>
          {!isAnswered && <form onSubmit={handleSubmit}>
            <span>{users[question.author].name} Asks</span>
            <h2>Would you rather ?</h2>
            <input type="radio" name="option" value="optionOne" disabled={status.addingAnswer === "fetching"} />
            <label htmlFor="optionOne">{question.optionOne.text}</label><br />
            <input type="radio" name="option" value="optionTwo" disabled={status.addingAnswer === "fetching"} />
            <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            <input type="submit" value="Submit Your Answer" disabled={status.addingAnswer === "fetching"} />
          </form>}
          {isAnswered && (() => {
            const optionOneVotes = question.optionOne.votes;
            const optionTwoVotes = question.optionTwo.votes;
            const optionOneCount = optionOneVotes.length;
            const optionTwoCount = optionTwoVotes.length;
            const optionTotalCount = optionOneCount + optionTwoCount;
            return (<div id="results">
              <span>{users[question.author].name} Asks</span>
              <span>Would you rather ?</span>
              <span>{question.optionOne.text}</span>
              <span>
                {optionOneVotes.includes(currentUser) ?
                `You and ${optionOneCount - 1} others` :
                `${optionOneCount} votes`}
              </span>
              <Progress
                id="firstProgress"
                value={optionOneCount}
                max={optionTotalCount}
              >
              <span>
              {optionTotalCount > 0 ? parseInt(optionOneCount / optionTotalCount * 100, 10) : 0}%
              </span>
              </Progress>
              <span>{question.optionTwo.text}</span>
              <span>
                {optionTwoVotes.includes(currentUser) ?
                `You and ${optionTwoCount} others` :
                `${optionTwoCount} votes`}
              </span>
              <Progress
                id="secondProgress"
                value={optionTwoCount}
                max={optionTotalCount}
              >
                <span>
                  {optionTotalCount > 0 ? parseInt(optionTwoCount / optionTotalCount * 100, 10) : 0}%
                </span>
              </Progress>
            </div>)
          })()}
        </div>
      </QuestionCard>
    </QuestionCardContainer>
  );
};

const QuestionCardContainer = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const QuestionCard = styledComponents.div`
  background-color: #FFDE03;
  width: 450px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  & > img {
    flex: 1;
    width: 150px;
    border-radius: 10px 0 0 10px;
  }
  & > div {
    flex: 2;
    & > h2 {
    margin-block-start: 19.920px;
    margin-block-end: 19.920px;
    }
    & > form {
      color: #000000;
      padding: 15px;
      font-weight: bold;
      & > input[type="submit"] {
        width: 100%;   
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        outline: none;
        border-radius: 8px;
        color: #FFFFFF;
        font-weight: bold;
        background-color: #FF0266;
        border: none;
        padding: 10px;
        margin-block-start: 19.920px;
        margin-block-end: 19.920px;
        cursor: pointer;
        &:disabled {
          color: #EEEEEE;
          background-color: #CC0052;
        }
      }
    }
    & > div#results {
      color: #000000;
      padding: 15px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      gap: 15px;
      & > div#firstProgress {
        background-color: #0336FF;
        color: #FFFFFF;
      }
      & > div#secondProgress {
        background-color: #FF0266;
        color: #FFFFFF;
      }
      & > span:nth-child(2) {
        font-size: 1.3em;
      }
      & > span:nth-child(4),
      & > span:nth-child(7) {
        margin-top: -10px;
        font-size: 0.8em;
        font-weight: bold;
      }
    }
  }
`;

const fillProgress = (finalWidth) => keyframes`
  from {
    min-width: 0;
  }

  to {
    min-width: ${finalWidth};
  }
`;

const Progress = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: ${props => fillProgress(`calc(100% * ${props.max > 0 ? props.value / props.max : 0})`)} 1s ease-in;
  animation-fill-mode: forwards;
  width: fit-content;
  border-radius: 0 10px 10px 0;
  height: 30px;
  & > * {
    margin: 5px;
  }
`

export default connect((state) => ({
  currentUser: state.currentUser,
  status: state.status,
  users: state.users,
  questions: state.questions
}))(Question);
