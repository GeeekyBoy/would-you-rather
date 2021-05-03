import styledComponents from "styled-components";
import { handleRetrieveQuestions } from "../actions/questions";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

const Home = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const { currentUser, users, questions, dispatch } = props;
  useEffect(() => {
    dispatch(handleRetrieveQuestions());
  }, []);
  return (
    <QuestionsContainer activeTab={activeTab}>
      <div id="tabs">
        <span onClick={() => setActiveTab(0)}>Unanswered Questions</span>
        <span onClick={() => setActiveTab(1)}>Answered Question</span>
      </div>
      <div id="posts">
        {questions &&
          Object.values(questions)
            .filter((x) => activeTab === 1 ? 
                           Object.keys(users[currentUser].answers).includes(x.id) :
                           !Object.keys(users[currentUser].answers).includes(x.id))
            .sort((a, b) => (b.timestamp - a.timestamp))
            .map((x) => (
              <QuestionCard key={x.id}>
                <img src={users[x.author].avatarURL} alt={users[x.author].name} />
                <div>
                  <span>{users[x.author].name} Asks</span>
                  <span>
                    Would you rather: {x.optionOne.text} or {x.optionTwo.text} ?
                  </span>
                  <Link to={`/question/${x.id}`}>View Post</Link>
                </div>
              </QuestionCard>
          ))}
      </div>
    </QuestionsContainer>
  );
};

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
    height: 100%;
    border-radius: 10px 0 0 10px;
  }
  & > div {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #000000;
    padding: 15px;
    & > span:nth-child(1) {
      font-weight: bold;
      font-size: 1.3em;
    }
    & > span:nth-child(2) {
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    & > a {
      width: 100%;
      outline: none;
      border-radius: 8px;
      color: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      background-color: #FF0266;
      border: none;
      padding: 10px 0;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

const QuestionsContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & > div#tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #0336FF;
    border-radius: 12px;
    width: 450px;
    & > span {
      padding: 15px;
      color: #000000;
      flex: 1;
      cursor: pointer;
      font-weight: bold;
      text-align: center;
    }
    & > span:nth-child(${(props) => props.activeTab + 1}) {
      color: #FFFFFF;
      background-color: #FF0266;
    }
    & > span:nth-child(1) {
      border-radius: 10px 0 0 10px;
    }
    & > span:nth-child(2) {
      border-radius: 0 10px 10px 0;
    }
  }
  & > div#posts {
    display: grid;
    grid-template-columns: 450px;
    margin-bottom: 20px;
    gap: 20px;
  }
  @media only screen and (min-width: 1000px) {
    & > div#posts {
      grid-template-columns: repeat(2, 450px);
    }
  }
`;

export default connect((state) => ({
  currentUser: state.currentUser,
  users: state.users,
  questions: state.questions
}))(Home);
