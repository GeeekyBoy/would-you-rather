import styledComponents from "styled-components";
import { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Home from "./Home";
import NewPost from "./NewPost";
import Leaderboard from "./Leaderboard";
import Question from "./Question";
import Loading from "./Loading";
import { logOut } from "../actions/currentUser";
import { handleRetrieveQuestions } from "../actions/questions";
import { handleRetrieveUsers } from "../actions/users";
import { setLoginReferrer, addQuestionStatus } from "../actions/status"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, Route, Redirect, useRouteMatch, useHistory } from "react-router-dom";

const App = (props) => {
  const { currentUser, users, questions, status, dispatch } = props;
  const history = useHistory();
  const handleSignOut = () => {
    dispatch(logOut());
  };
  const isFABActive = useRouteMatch("/add");
  const toggleFAB = () => {
    history.push(isFABActive ? "/" : "/add");
  };
  useEffect(() => {
    if (currentUser) {
      if (status.referrer) {
        dispatch(setLoginReferrer(null))
      }
      if (status.addingQuestion === "OK") {
        if (isFABActive) {
          history.push("/")
        }
        dispatch(addQuestionStatus(null))
      }
      if (!users) {
        dispatch(handleRetrieveUsers())
      }
      if (!questions) {
        dispatch(handleRetrieveQuestions())
      }
    }
  }, [currentUser, status, dispatch, users, questions]);
  return (
    <>
      {currentUser ? <FAB
        onClick={!isFABActive ? toggleFAB : null}
        className={isFABActive ? "active" : null}
      >
        <span
          className={isFABActive ? "FABIcon active" : "FABIcon"}
          onClick={toggleFAB}
        >
          +
        </span>
        {isFABActive && <NewPost />}
      </FAB> :
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: "/add" }
        }}
      />}
      <Header>
        <nav>
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/leaderBoard">Leaderboard</NavLink>
        </nav>
        {currentUser && (
          <AccountControl>
            <img src={users[currentUser].avatarURL} alt={currentUser.name} />
            <div>
              <span>{users[currentUser].name}</span>
              <span>@{users[currentUser].id}</span>
            </div>
            <Link to="/login" onClick={handleSignOut}>
              <FontAwesomeIcon color="#FFFFFF" icon={faSignOutAlt} />
            </Link>
          </AccountControl>
        )}
      </Header>
      <Content>
        <Route exact path="/">
        {currentUser ? ((users && questions) ? <Home /> : <Loading />) :
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: "/" }
            }}
          />}
        </Route>
        <Route exact path="/leaderboard">
          {currentUser ? ((users && questions) ? <Leaderboard /> : <Loading />) :
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: "/leaderboard" }
            }}
          />}
        </Route>
        <Route exact path="/login" render={routeProps =>
          (!currentUser ?
            <Login location={routeProps.location} /> :
            <Redirect
              to={status.loginReferrer ? status.loginReferrer : "/"}
            />)
        }/>
        <Route exact path="/question/:question_id" render={routeProps =>
          (currentUser ? ((users && questions) ? <Question match={routeProps.match} /> : <Loading />) :
            <Redirect
              to={{
                pathname: "/login",
                state: { referrer: `/question/${routeProps.match.params.question_id}` }
              }}
            />)
        }/>
      </Content>
    </>
  );
};

const Header = styledComponents.div`
  width: 100%;
  background-image: url(https://source.unsplash.com/ZcGRJ67jkL4/);
  height: 200px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  position: relative;
  justify-content: space-around;
  top: 0px;
  & > nav {
    display: flex;
    flex-direction: row;
    gap: 10px;
    bottom: 0;
    left: calc(50% - 191.375px / 2);
    position: absolute;
    & > a {
      text-decoration: none;
      color: #FFFFFF;
      font-weight: bold;
      cursor: pointer;
      padding: 10px;
      border-bottom: 4px solid transparent;
      &:hover,
      &[aria-current="page"] {
        color: #FFFFFF;
        border-bottom: 4px solid #FF0266;
      }
    }
  }
`;

const AccountControl = styledComponents.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  left: 20px;
  top: calc(50% - 100px / 2);
  position: absolute;
  align-items: center;
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #FFFFFF;
    & > span:nth-child(1) {
      font-weight: bold;
    }
  }
  & > a {
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 100%;
    position: fixed;
    right: 20px;
    top: 20px;
    padding: 10px;
    &:hover {
      background-color: #FFFFFF33;
    }
  }
`;

const Content = styledComponents.div`
  background-color: #EEEEEE;
  width: 100%;
  min-height: calc(100vh - 230px);
  padding-top: 30px;
`;

const FAB = styledComponents.div`
  border-radius: 100%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background-color: #0336FF;
  color: #FFFFFF;
  cursor: pointer;
  z-index: 999;
  transition: all 0.2s linear;
  &.active {
    border-radius: 0;
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  & > span.FABIcon {
    position: fixed;
    right: 32.5px;
    bottom: 22px;
    font-size: 40px;
    cursor: pointer;
    transition: all 0.2s linear;
    &.active {
      transform: rotate(-45deg);
    }
  }
`;

export default connect((state) => ({
  currentUser: state.currentUser,
  status: state.status,
  users: state.users,
  questions: state.questions
}))(App);
