import styledComponents from "styled-components";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  const { users } = props;
  return (
    <AchievemensContainer>
      {Object.values(users).sort((a, b) => (
        (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
        )).map((x, i) => (
          <AchievementCard key={x.id}>
            <img src={x.avatarURL} alt={x.name} />
            <div>
              <span>{x.name} #{i + 1}</span>
                <div className="achievements">
                <Count
                  counted="Asked"
                  count={x.questions.length} />
                <Count
                  counted="Voted"
                  count={Object.keys(x.answers).length} />
                <Count
                  counted="Score"
                  count={x.questions.length + Object.keys(x.answers).length} />
              </div>
            </div>
          </AchievementCard>
        ))}
    </AchievemensContainer>
  );
};

const AchievemensContainer = styledComponents.div`
  display: grid;
  justify-content: center;
  display: grid;
  grid-template-columns: 450px;
  margin-bottom: 20px;
  gap: 20px;
  @media only screen and (min-width: 1000px) {
    grid-template-columns: repeat(2, 450px);
  }
`

const AchievementCard = styledComponents.div`
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
    & > div.achievements {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
    & > span:nth-child(1) {
      font-weight: bold;
      font-size: 1.3em;
      text-align: center;
    }
  }
`;

const Count = styledComponents.div`
  border: 2px solid #FF0266;
  width: 60px;
  height: 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  font-weight: bold;
  border-radius: 10px;
  &::after {
    content: "${props => props.counted + "\\A " + props.count}";
  }
`

export default connect((state) => ({
  users: state.users
}))(Leaderboard);
