import styled from 'styled-components';

export const PillAddBtn = styled.button`
  display: block;
  margin-left: auto;
  margin-bottom: 30px;
  width: 120px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid var(--mainbl);
  color: var(--mainbl);
  transition: 0.4s;
  &:hover {
    background: var(--mainbl);
    color: #fff;
    transition: 0.4s;
  }
`;
export const MyPillSection = styled.section`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px dashed var(--mainbl);
`;
export const DefaultNone = styled.p`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fz-md);
  background: var(--palebl);
`;
export const MyPillList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  li {
    width: 200px;
    padding: 10px;
    border-radius: 6px;
    margin: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    > p {
      font-size: var(--fz-base);
      color: #fff;
      margin-bottom: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      background-color: var(--mainbl);
    }
    > h3 {
      font-size: var(--fz-base);
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 10px;
      color: var(--mainbl);
    }
    .dose-times {
      margin-top: 10px;
      > span {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        background: var(--nightbl);
        color: #fff;
        font-size: var(--fz-base);
        margin-right: 7px;
      }
    }
  }
`;
export const MyPharmAddDone = styled.button`
  display: block;
  margin: 40px auto;
  width: 150px;
  height: 40px;
  border-radius: 6px;
  background: var(--mainbl);
  color: #fff;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;
