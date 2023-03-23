/* eslint-disable */
import React, { useState } from 'react';
import { useIsModalOpen, useUpdateModalOpen } from '../Stores/pharmModalStore';
import { FaPen } from 'react-icons/fa';
import {
  MyPillItem,
  MyPill,
  MyPillImg,
  MyPillEdit,
  MyPillTag,
  MyPillName,
} from '../styles/s-mypage';
import { useMyPharmDoseId } from '../Stores/myPharmStore';

const MyPills = ({ medicineName, doseId }) => {
  const { setModalOpen } = useIsModalOpen(state => state);
  const { setUpdateModalOpen } = useUpdateModalOpen(state => state);
  const { setMyPharmDoseId } = useMyPharmDoseId(state => state);
  const modalHandler = () => {
    setModalOpen(true);
    setUpdateModalOpen(true);
    setMyPharmDoseId(doseId);
    console.log('모달 핸들러 클릭!');
  };
  return (
    <MyPillItem>
      <MyPill>
        <MyPillImg src="/pill.png" alt="mypill" />
        <MyPillEdit onClick={() => modalHandler()}>
          <button className="edit-btn" aria-label="button">
            <FaPen />
          </button>
        </MyPillEdit>
      </MyPill>
      <MyPillTag>감기약</MyPillTag>
      <MyPillName>
        <h3>{medicineName}</h3>
        <p>{medicineName}</p>
      </MyPillName>
    </MyPillItem>
  );
};

export default MyPills;
