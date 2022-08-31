import styled, { css } from "styled-components";

const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlindFeatures = styled.div`
  position: relative;
  transform: translateX(15px);
`;
export const BlindEyes = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f6f6f6;
  cursor: pointer;
  opacity: 0.5;

  img {
    width: 20px;
    visibility: visible;
  }
`;
export const BlindContent = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(${props => props.position === "left" ? "-100%" : "-50%"});
  padding: 24px;
  border-radius: 16px;
  background-color: white;
  transition: all 0.2s;
  visibility: ${props => props.show ? "visible" : "hidden"};
  opacity: ${props => props.show ? "1" : "0"};
  box-shadow: 0 4px 40px rgba(0,0,0,.15);

  @media (max-width: 768px) {
    padding: 16px;
    left: 0;
  }
`;

export const BlindVision = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 10px;
`;


export const BlindVisionItem = styled.div`
  height: 50px;
  width: 50px;
  font-size: 27px;
  line-height: 50px;
  color: white;
  border: 2px solid #353535;
  cursor: pointer;
  user-select: none;
  pointer-events: ${props => props.isVisible ? "pointer" : "none"};

  img {
    visibility: visible;
  }

  &:nth-of-type(1) {
    background: #00a2e0;
    border-color: #034e6b;
    margin-right: 12px;
  }

  &:nth-of-type(2) {
    background: #828282;
    border-color: #353535;
    margin-right: 12px;
  }

  &:nth-of-type(3) {
    background: #3e3e3e;
    border-color: #777;
    margin-right: 12px;
  }

  &:nth-of-type(4) {
    border-color: #00a2e0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 18px;
      left: 34px;
      height: 32px;
      width: 2px;
      background-color: rgba(0, 0, 0, 1);
      display: block;
      transform: rotate(-45deg) translate(-50%, -50%);
    }

    &.has__image::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 20px;
    line-height: 36px;
  }

  ${center}
`;

export const BlindSize = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const BlindSizeItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  height: 32px;
  width: 32px;
  cursor: pointer;
  font-weight: bold;

  background-color: ${props => props.selected ? "#3e3e3e" : "#fff"};
  color: ${props => props.selected ? "#fff" : "#000"};

  &:nth-of-type(1) {
    font-size: 10px;
    margin-right: 12px;
  }

  &:nth-of-type(2) {
    font-size: 16px;
    margin-right: 12px;
  }

  &:nth-of-type(3) {
    font-size: 25px;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }

  ${center}
`;

export const BlindSpeaker = styled.div`
  margin-top: 18px;

  input {
    margin-top: 10px;
  }
`;

export const BlindFeatureClear = styled.button`
  outline: none;
  border: none;
  text-decoration: underline;
  font-size: 15px;
  position: absolute;
  top: 12px;
  right: 20px;
  background-color: transparent;
  cursor: pointer;
`;