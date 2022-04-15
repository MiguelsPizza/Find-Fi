
import React from "react";
import styled, { keyframes } from "styled-components";
const breatheAnimation = keyframes`
0% { height: 0px; width: 0px; }

100% { height: 30px; width: 30px; opacity: 0.0; }
`;
const Circle = styled.div`
  height: 10px;
  width: 10px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  border-color: red;
  animation-name: ${breatheAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;


function MapAnimation() {

    //  // 30% { height: 100px; width: 100px; opacity: 1 }
  // 40% { height: 200px; width: 200px; opacity: 0.3; }

  // const CircleContainer = styled.div`
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   flex-direction: column;
  //   height: 450px;
  // `;

  return (
    <>
    {/* <CircleContainer> */}
    <Circle/>
  {/* </CircleContainer> */}
  </>
  )
}

export default React.memo(MapAnimation);

