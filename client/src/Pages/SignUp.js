import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState('');
  const [username, setUsername] = useState('');
  const [birth, setbirth] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  if (
    !!userId &&
    !!password &&
    !!passwordChecked &&
    !!username &&
    !!birth &&
    gender
  ) {
    console.log(`
    ${userId}
    ${password}
    ${passwordChecked}
    ${username}
    ${birth}
    ${gender}
    `);
  }

  const register = () => {
    const date = new Date();
    const createdAt = date;
    console.log(createdAt);
    console.log({
      member_email: userId,
      member_pwd: password,
      member_name: username,
      member_age: birth,
      member_gender: gender,
      created_at: createdAt,
    });

    axios
      .post(
        `http://ec2-3-38-166-142.ap-northeast-2.compute.amazonaws.com:8080/pp/members`,
        {
          memberEmail: userId,
          memberName: username,
          memberPwd: password,
          memberBirthday: birth,
          memberGender: gender,
          // created_at: createdAt,
        },
      )
      .then(res => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', res.data);
        setErrorMessage('');
        navigate('/login');
      })
      .catch(err => {
        // Handle error.
        console.log('An error occurred:', err.response);
        if (err.response.status === 406) {
          setErrorMessage(err.response.data.message);
          console.log(errorMessage);
        } else {
          navigate('/404');
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                아이디
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  id="id"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={e => setUserId(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                비밀번호
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  id="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_check"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                비밀번호 확인
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  id="password_check"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={e => setPasswordChecked(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                이름
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  id="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="birth"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                생년월일
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="date"
                  id="birth"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={e => setbirth(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                성별
              </label>
              <div className="flex flex-row items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male-link"
                    value="male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={e => setGender(e.target.value)}
                  />
                  <label
                    htmlFor="male-link"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    남자
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female-link"
                    value="female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={e => setGender(e.target.value)}
                  />
                  <label
                    htmlFor="female-link"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    여자
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-end mt-4">
            <Link
              className="text-sm text-gray-600 underline hover:text-gray-900"
              to="/"
            >
              Already registered?
            </Link>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              onClick={() => {
                console.log('register');
                register();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
