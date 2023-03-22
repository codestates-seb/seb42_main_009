const MyPage = () => {
  const menu = ['회원정보 수정', '내 의약품 정보', '내 리뷰'];

  return (
    <div className="profile-content mt-60 flex flex-row">
      <div className="flex flex-col">
        {menu.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </div>
      <img
        alt="..."
        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
        // className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
      />
      <div className="userinfo-field">
        <div>이름</div>
        <div>나이</div>
        <div>성별</div>
        <div>자기소개</div>
      </div>
    </div>
  );
};

export default MyPage;
