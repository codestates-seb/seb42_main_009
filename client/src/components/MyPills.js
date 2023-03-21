/* eslint-disable */
import React,{useState} from 'react';
import { FaPen } from 'react-icons/fa';
import {
  MyPillItem,
  MyPill,
  MyPillImg,
  MyPillEdit,
  MyPillTag,
  MyPillName,
} from '../styles/s-mypage';
import { useIsModalOpen } from '../Stores/pharmModalStore';


const MyPills = () => {
  const { modalOpen, setModalOpen } = useIsModalOpen(state => state);
  const modalHandler = () => {
    setModalOpen(!modalOpen);

  };
  
  return (

      <MyPillItem>
        <MyPill>
          <MyPillImg src="/pill.png" alt="mypill" />
          <MyPillEdit onClick={modalHandler}>
            <button className="edit-btn" aria-label="button">
              <FaPen />
            </button>
          </MyPillEdit>
        </MyPill>
        <MyPillTag>감기약</MyPillTag>
        <MyPillName>
          <h3>타이asdfasdfasdasdfasdff레놀</h3>
          <p>타이asdfasdfasdasdfasdff레놀</p>
        </MyPillName>
      </MyPillItem>


  )
}

export default MyPills;
