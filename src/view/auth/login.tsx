import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import notification from "antd/es/notification";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { login } from "@/store/features/user/userSlice";
import { setToken } from "@/store/features/token/tokenSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { DecodedToken } from "@/types/globalTypes";
import { CommonNavbar } from "@/components/commonNavbar";
import { CommonFooter } from "@/components/commonFooter";

const Login = () => {
  const [notify, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callNotification = () => {
    notify.error({
      message: "로그인 실패",
      description: "아이디와 비밀번호를 확인해주세요",
      placement: "topRight",
      duration: 5,
    });
  };

  const tryLogin = async ({ username, password }) => {
    try {
      let response = await axios
        .post("/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            let accessToken = res.headers["access"];
            let refreshToken = res.headers["refresh"];
            localStorage.setItem("access", accessToken);
            localStorage.setItem("refresh", refreshToken);
            let DecodedToken: DecodedToken = jwtDecode(accessToken);
            dispatch(login());
            dispatch(setToken(DecodedToken));
            if (DecodedToken.role == "ROLE_ADMIN") {
              navigate("/admin/main");
            } else {
              navigate("/main/resume");
            }
          }
        });
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        console.log(
          err.response.data.message.split(" ")[0],
          err.response.data.message.split("blacklisted").join("")
        );
        if (err.response.data.message.split(" ")[0] === "blacklisted") {
          const blackListedDate = err.response.data.message
            .split("blacklisted")
            .join("")
            .slice(0, 11);
          Swal.fire({
            icon: "error",
            title: "블랙리스트 계정안내",
            text: `해당 계정은 ${blackListedDate}까지 블랙리스트로 지정되었습니다. 관리자에게 문의해주세요.`,
          });
        } else {
          callNotification();
        }
      }
    }
  };

  return (
    <div>
      <CommonNavbar />
      {contextHolder}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          onFinish={tryLogin}
          style={{
            marginTop: "21.5vh",
          }}
        >
          <Form.Item
            style={{
              width: "41.667vw",
              height: "40vh",
              backgroundColor: "#F9FAFB",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard-bold",
                fontSize: "1.042vw",
                display: "flex",
                color: "#0FC291",
                alignItems: "center",
              }}
            >
              <div style={{ width: "4vw", whiteSpace: "nowrap" }}>
                <span style={{ width: "100%" }}>유저 ID</span>
              </div>
              <div style={{ margin: "0 1.25vw" }}>:</div>
              <Form.Item name="username" style={{ margin: "0" }}>
                <Input
                  style={{
                    border: "transparent",
                    outline: "none",
                    borderRadius: "5px",
                    width: "100%",
                    height: "5vh",
                    padding: "1.3vh 1.042vw",
                    fontFamily: "Pretendard-Medium",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                fontFamily: "Pretendard-bold",
                fontSize: "1.042vw",
                display: "flex",
                color: "#0FC291",
                alignItems: "center",
                marginTop: "3vh",
              }}
            >
              <div style={{ width: "4vw", whiteSpace: "nowrap" }}>
                <span style={{ width: "100%" }}>유저 PW</span>
              </div>
              <div style={{ margin: "0 1.25vw" }}>:</div>
              <Form.Item name="password" style={{ margin: "0" }}>
                <Input
                  type="password"
                  style={{
                    border: "transparent",
                    outline: "none",
                    borderRadius: "5px",
                    width: "100%",
                    height: "5vh",
                    padding: "1.3vh 1.042vw",
                    fontFamily: "Pretendard-Medium",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                fontFamily: "Pretendard-Regular",
                color: "#888C8E",
                marginTop: "0.781vw",
              }}
            >
              <span style={{ cursor: "pointer" }}>ID 찾기</span>
              <span style={{ margin: "0 5px" }}>|</span>
              <span style={{ cursor: "pointer" }}>PW 찾기</span>
            </div>
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "6vh",
            }}
          >
            <button
              style={{
                color: "white",
                borderRadius: "10px",
                width: "8.333vw",
                height: "7vh",
                border: "transparent",
                outline: "none",
                cursor: "pointer",
                fontFamily: "Pretendard-Medium",
                fontSize: "1.042vw",
                backgroundColor: "#0FC291",
                marginRight: "0.781vw",
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                navigate("/auth/signup");
              }}
              style={{
                color: "white",
                backgroundColor: "#B2B8C0",
                borderRadius: "10px",
                width: "8.333vw",
                height: "7vh",
                border: "transparent",
                outline: "none",
                fontFamily: "Pretendard-Medium",
                fontSize: "1.042vw",
                cursor: "pointer",
              }}
            >
              회원가입
            </button>
          </Form.Item>
        </Form>
      </div>
      <CommonFooter />
    </div>
  );
};

export default Login;
