import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useIsModalOpen, useUpdateModalOpen } from '../Stores/pharmModalStore';
import {
  MyPillItem,
  MyPill,
  MyPillImg,
  MyPillEdit,
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
      <MyPillName>
        <h3>{medicineName}</h3>
        <p>{medicineName}</p>
      </MyPillName>
    </MyPillItem>
  );
};

export default MyPills;
