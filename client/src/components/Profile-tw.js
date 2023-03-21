const Profile = () => {
  console.log('프로필 컴포넌트');
  return (
    <div className="max-w-3xl w-full mx-auto z-10">
      <div className="flex flex-col">
        <div className="bg-white border border-gray-900 shadow-lg  rounded-3xl p-4 m-4 text-white">
          <div className="flex-none sm:flex">
            <div className="relative h-32 w-32   sm:mb-0 mb-3">
              <img
                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                alt="aji"
                className=" w-32 h-32 object-cover rounded-2xl"
              />
            </div>
            <div className="flex-auto sm:ml-5 justify-evenly">
              <div className="flex items-center justify-between sm:mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="w-full flex-none text-lg text-gray-900 font-bold">
                      이름
                    </div>
                    <div className="flex flex-row text-gray-600 my-1">
                      <span className="mr-3">성별 : 남자</span>
                      <span className="mr-3 border-r-8 border-white  max-h-0" />
                      <span className="mr-3">나이 : 2x</span>
                    </div>
                    <div className="flex pt-2  text-sm text-gray-600 justify-between w-[34rem] h-16">
                      <div className="flex-1 inline-flex">자기소개</div>
                      <button className="flex-4 mt-5 bg-blue-500 hover:bg-blue-700 flex-no-shrink px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300 ">
                        프로필 수정
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
