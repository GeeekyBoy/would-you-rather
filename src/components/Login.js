import styledComponents from "styled-components"
import { useEffect, useState } from "react"
import { handleRetrieveUsers } from "../actions/users"
import { setLoginReferrer } from "../actions/status"
import { logIn } from "../actions/currentUser"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'

const Login = (props) => {
  const { users, dispatch, location } = props;
  useEffect(() => {
    if (location?.state) {
      dispatch(setLoginReferrer(location.state.referrer))
    }
    dispatch(handleRetrieveUsers())
  }, [])
  const [ selectedUser, setSelectedUser ] = useState(null)
  const handleSelectChange = (e) => setSelectedUser(e.target.value)
  const handleSignIn = () => {
    if (selectedUser !== "_dump") {
      dispatch(logIn(selectedUser))
    }
  }
  return (
    <LoginContainer>
      <LoginForm>
        <div id="header">
          <span>Welcome to the Would You Rather App!</span>
          <span>Please signin to continue</span>
        </div>
        <FontAwesomeIcon size="8x" color="#FF0266" icon={faUserLock} />
        <select onChange={handleSelectChange} defaultValue="_dump">
          {!users && <option value="_dump">Fetching</option>}
          {users && <option value="_dump">Please select a user</option>}
          {users && Object.values(users).map(x => (
            <option key={x.id} value={x.id}>{x.name}</option>
          ))}
        </select>
        <button onClick={handleSignIn}>Sign In</button>
      </LoginForm>
    </LoginContainer>
  );
}

const LoginContainer = styledComponents.div`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #FFDE03;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const LoginForm = styledComponents.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  gap: 20px;
  background-color: #FFFFFF;
  border: 2px solid #0336FF;
  border-radius: 10px;
  & > div#header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #0336FF;
    padding: 10px 0;
    width: 100%;
    & > span {
      color: #FFFFFF;
    }
    & > span:nth-child(1) {
      font-weight: bold;
    }
  }
  & > select {
    padding: 10px;
    border-color: #FF0266;
    width: calc(100% - 40px);
    border-radius: 8px;
    outline: none;
    cursor: pointer;
  }
  & > button {
    width: calc(100% - 40px);
    outline: none;
    border-radius: 8px;
    color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-color: #FF0266;
    border: none;
    padding: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`

export default connect((state) => ({
  users: state.users
}))(Login)