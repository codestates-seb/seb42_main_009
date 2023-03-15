import React, { useState } from 'react';
import Banner from '../components/Banner';
import MyPharmModal from '../components/MyPharmModal';

const MyPharm = () => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      <Banner>
        <div>복용 약 관리</div>
      </Banner>
      <div className="bodywrap">
        <button>추가하기</button>
        {modalOpen ? <MyPharmModal setModalOpen={setModalOpen} /> : null}
      </div>
    </>
  );
};

export default MyPharm;
