import React from "react";

function Mypage({ isLogin, token, userInfo, handleMypage }) {
  return (
    <div className="container" id="mypage">
      <center>
        <h1>Mypage</h1>
        <div id="mypageUsername">이름 : {userInfo.username}</div>
        <div id="mypageEmail">Email : {userInfo.email}</div>
        <button onClick={handleMypage}>메인으로</button>
      </center>
    </div>
  );
}
export default Mypage;
