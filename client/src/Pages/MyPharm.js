import React from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';
import MyPharmModal from '../components/MyPharmModal';
import { useIsModalOpen } from '../Stores/pharmModalStore';

const MyNewPill = styled.button`
  display: inline-block; margin: 0 auto;
  width: 120px; height: 34px; border-radius: 6px; background: var(--mainbl); color: #fff;
`;

const MyPharm = () => {
  const { modalOpen,setModalOpen } = useIsModalOpen(state=>state);
  const modalHandler=()=>{
    setModalOpen(!modalOpen)
  }
  return (
    <>
      <Banner>
        <div>복용 약 관리</div>
      </Banner>
      <div className="bodywrap">
        <MyNewPill onClick={modalHandler}>약 추가하기</MyNewPill>
        {modalOpen ? <MyPharmModal setModalOpen={setModalOpen} /> : null}
      </div>
    </>
  );
};

export default MyPharm;
