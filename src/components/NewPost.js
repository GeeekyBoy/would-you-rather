import styledComponents from "styled-components";
import serialize from "form-serialize"
import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux";

const NewPost = (props) => {
  const { currentUser, users, status, dispatch } = props;
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = serialize(e.target, { hash: true })
    dispatch(handleAddQuestion({
      optionOneText: data.optionOne,
      optionTwoText: data.optionTwo,
      author: currentUser
    }))
  }
  return (
    <QuestionCard>
      <img src={users[currentUser].avatarURL} alt={users[currentUser].name} />
      <form onSubmit={handleSubmit}>
        <h2>New Vote</h2>
        <label htmlFor="optionOne">Option One</label><br /><br />
        <input type="text" placeholder="Enter your first option..." name="optionOne" disabled={status.addingQuestion === "fetching"} /><br /><br />
        <label htmlFor="optionTwo">Option Two</label><br /><br />
        <input type="text" placeholder="Enter your second option..." name="optionTwo" disabled={status.addingQuestion === "fetching"} />
        <input type="submit" value="Post" disabled={status.addingQuestion === "fetching"} />
      </form>
    </QuestionCard>
  );
};

const QuestionCard = styledComponents.div`
  width: 450px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  color: #FFFFFF;
  & > img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }
  form {
      font-weight: bold;
      & > input[type="text"] {
        outline: none;
        border: none;
        width: calc(100% - 20px);
        border: 2px solid #FFFFFF;
        padding: 10px;
        border-radius: 8px;
        background: none;
        color: #FFFFFF;
        &::placeholder {
          color: #eee;
        }
        &:focus {
          border: 2px solid #FF0266;
        }
      }
      & > input[type="submit"] {
        width: 100%;
        outline: none;
        border-radius: 8px;
        color: #FFFFFF;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
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
`;

export default connect((state) => ({
  currentUser: state.currentUser,
  status: state.status,
  users: state.users,
  questions: state.questions
}))(NewPost);
