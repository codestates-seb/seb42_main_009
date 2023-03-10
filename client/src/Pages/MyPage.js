const MyPage = () => {
  const str = 'mypage';
  return (
    <div className="profile-content mt-60">
      <div>{str}</div>
      <div className="flex flex-col">
        <div>회원정보 수정</div>
        <div>내 의약품 정보</div>
        <div>내 리뷰</div>
      </div>
      <img
        alt="..."
        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
      />
    </div>
  );
};

export default MyPage;
