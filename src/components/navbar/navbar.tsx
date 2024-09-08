import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Button from "antd/es/button";
import { useEffect } from "react";
import { login } from "@/store/features/user/userSlice";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/store/features/token/tokenSlice";
import axiosInstance from "@/api/api";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access") ?? "";
  const decodedToken: DecodedToken = jwtDecode(accessToken);
  const username = decodedToken.username;

  useEffect(() => {
    let accessToken = localStorage.getItem("access");
    if (!accessToken) {
      Swal.fire({
        title: "로그인을 먼저 해주세요",
        icon: "warning",
        confirmButtonColor: "#1890ff",
      }).then((res) => {
        navigate("/");
      });
    } else if (accessToken) {
      dispatch(login());
    }
  }, []);
  return (
    <div>
      <nav
        className="navbar"
        style={{
          height: "8vh",
          display: "flex",
          backgroundColor: "#0DC291",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10.938vw",
          textDecoration: "none",
        }}
      >
        <div className="navbar_logo">
          {accessToken == "" ? (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-bold",
                fontSize: "1.8vw",
                cursor: "pointer",
              }}
              to="/"
            >
              REDITOR
            </Link>
          ) : (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-bold",
                fontSize: "1.8vw",
                cursor: "pointer",
              }}
              to="/main/resume"
            >
              REDITOR
            </Link>
          )}
        </div>

        <ul
          className="navbar_menu"
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-between",
            width: "34vw",
            fontFamily: "Pretendard-Medium",
            marginLeft: "7vw",
            fontSize: "1.042vw",
          }}
        >
          <li style={{ textDecoration: "none" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-Medium",
              }}
              to="/main/resumeguide"
            >
              자소서 가이드
            </Link>
          </li>
          <li>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-Medium",
              }}
              to="/main/resume"
            >
              자소서 첨삭
            </Link>
          </li>
          <li>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-Medium",
              }}
              to="/main/resumelist"
            >
              자소서 목록
            </Link>
          </li>

          <li>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Pretendard-Medium",
              }}
              to="/main/faq"
            >
              FAQ
            </Link>
          </li>
        </ul>
        {user == true ? (
          <ul
            className="navbar_links"
            style={{
              listStyle: "none",
              display: "flex",
              color: "white",
              fontWeight: "Pretendard-Medium",
              justifyContent: "space-between",
              width: "17vw",
              fontSize: "1.042vw",
            }}
          >
            <li>{username} 님</li>
            <li>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontFamily: "Pretendard-Medium",
                }}
                to="/main/mypage"
              >
                MY
              </Link>
            </li>
            <li>
              <div
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  let refreshToken = localStorage.getItem("refresh");
                  let res = axiosInstance
                    .post(
                      "/logout",
                      {},
                      {
                        headers: {
                          refresh: refreshToken,
                        },
                      }
                    )
                    .then((res) => {
                      if (res.status == 200) {
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        navigate("/");
                      }
                    });
                }}
              >
                로그아웃
              </div>
            </li>
          </ul>
        ) : (
          <ul className="navbar_links">
            <li>
              <Link to="/">로그인</Link>
            </li>
            <li>
              <Link to="/auth/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
