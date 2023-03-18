import { FaPen } from 'react-icons/fa';
import {
  MyPillItem,
  MyPill,
  MyPillImg,
  MyPillEdit,
  MyPillTag,
  MyPillName,
} from '../styles/s-mypage';

const MyPills = () => (
  <MyPillItem>
    <MyPill>
      <MyPillImg src="/pill.png" alt="mypill" />
      <MyPillEdit>
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
);

export default MyPills;
