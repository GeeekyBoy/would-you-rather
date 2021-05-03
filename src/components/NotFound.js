import styledComponents from "styled-components"

export default styledComponents.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2em;
  color: #000000;
  &::before {
    content: "Question Not Found :("
  }
`