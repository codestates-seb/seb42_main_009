import styled from "styled-components";

export const ContentList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 50px;
`;
export const ContentBox = styled.div`
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  width: calc((100% - 60px) / 4);
  margin-right: 20px;
  margin-bottom: 20px;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  border-radius: 6px;
  padding: 15px;
  height: 250px;
  background: var(--bl-1);
  > img {
    width: auto;
    height: 100px;
    object-fit: contain;
    margin: 0 auto;
  }
  @media (max-width: 930px) {
    width: calc((100% - 40px) / 3);
    &:nth-of-type(4n) {
      margin-right: 20px;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
    &:nth-of-type(3n) {
      margin-right: 20px;
    }
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
  &:hover {
    box-shadow: var(--shadow);
    transition: box-shadow 0.2s;
  }
`;
export const ContentTit = styled.h3`
  font-size: var(--fz-base);
  margin: 15px 0 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--mainbl);
  font-weight: 500;
`;
export const ContentText = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: var(--fz-sm);
  line-height: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
export const LikeCount = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  color: var(--mainbl);
  > p {
    font-size: 12px;
    padding-top: 3px;
  }
`;
