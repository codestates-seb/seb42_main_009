import styled from 'styled-components';

export const SignUpWrap = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--palebl);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const SignUpBox = styled.div`
  width: 400px;
  padding: 20px 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: var(--shadow);
  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`;
export const Logo = styled.h2`
  width: 300px;
  margin-right: 30px;
  > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 250px;
    margin: 0 auto 30px;
  }
`;
export const InputList = styled.ul`
  margin-top: 20px;
`;
export const InputItem = styled.li`
  margin-bottom: 15px;
  > label {
    display: block;
    margin-bottom: 10px;
    font-size: var(--fz-base);
    font-weight: 500;
  }
  > input {
    width: 100%;
    border-bottom: 1px solid var(--bl-1);
    font-size: var(--fz-base);
    padding: 3px 0;
    &:focus {
      border-color: var(--mainbl);
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    > label {
      width: 90px;
      margin-bottom: 0;
    }
    > input {
      width: calc(100% - 100px);
    }
  }
`;
export const InputItemProfile = styled.li`
  > label {
    display: block;
    margin-bottom: 10px;
    font-size: var(--fz-base);
    font-weight: 500;
  }
  > input {
    width: 100%;
    border-bottom: 1px solid var(--bl-1);
    font-size: var(--fz-base);
    padding: 3px 0;
    &:focus {
      border-color: var(--mainbl);
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0;
    > label {
      width: 90px;
      margin-bottom: 0;
    }
    > input {
      width: calc(100% - 100px);
    }
  }
`;
export const RadioBox = styled.div`
  display: inline-block;
  margin-right: 30px;
  label {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    font-size: var(--fz-base);
    &:after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--bl-1);
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  input:checked + label:after {
    background: var(--mainbl);
  }
`;
export const LinktoLogin = styled.p`
  text-align: right;
  font-size: var(--fz-base);
  a {
    color: var(--mainbl);
  }
`;
export const SignUpBtn = styled.button`
  display: block;
  margin-top: 20px;
  width: 100%;
  height: 34px;
  border-radius: 6px;
  background: var(--mainbl);
  color: #fff;
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;
