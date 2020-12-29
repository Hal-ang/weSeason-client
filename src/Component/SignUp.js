import axios from "axios";
import { useState } from "react";
import "./SignUp.css";
import { API_URL } from "../const";
import MessageModal from "./MessageModal";
import { useHistory } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  const onClick = () => {
    setClicked(true);
    setTimeout(async () => {
      let message;
      if (!email || !password || !passwordCheck || !name || !nickname) {
        message = "모든 정보를 입력해주세요";
      } else if (passwordCheck !== password) {
        message = "입력하신 비밀번호가 달라요";
      } else {
        try {
          await axios.post(`${API_URL}/users`, {
            name,
            nickname,
            password,
            email,
          });
          message = "회원가입완료!";
        } catch (error) {
          message = "존재하는 이메일입니다.";
        }
      }
      setMessage(message);
    }, 250);
  };
  const closeModal = () => {
    if (message === "회원가입완료!") {
      history.push("/");
    } else {
      setTimeout(() => {
        setClicked(false);
        setMessage("");
      }, 500);
    }
  };
  return (
    <div className="sign-up">
      {clicked && <MessageModal closeModal={closeModal} message={message} />}
      <h1>SignUp</h1>
      <div className="sign-up__form">
        <h2>userinfo</h2>
        <div className="sign-up__row">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="sign-up__row">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </div>
        <div className="sign-up__row">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="sign-up__row">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="sign-up__row">
          <label htmlFor="password-check">비밀헌호 확인</label>
          <input
            type="password"
            id="password-check"
            onChange={(e) => setPasswordCheck(e.target.value)}
            value={passwordCheck}
          />
        </div>
      </div>
      <button className="sign-up__btn" onClick={onClick}>
        SignUp
      </button>
    </div>
  );
}
