import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ReviewData from "./reviewData";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ boxSizing: "border-box" }}>
      <div
        className="landing-page-navbar"
        style={{
          height: "7vh",
          backgroundColor: "#0DC291",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          padding: "0 12vw",
        }}
      >
        <div
          style={{
            fontSize: "1.8vw",
            color: "white",
            fontFamily: "Pretendard-Medium",
          }}
        >
          REDITOR
        </div>
        <div
          style={{
            fontSize: "1vw",
            display: "flex",
            columnGap: "3vw",
            fontFamily: "Pretendard-bold",
            color: "white",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            회원가입
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            로그인
          </div>
        </div>
      </div>
      <div
        className="landing-page-banner"
        style={{
          height: "93vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/img/reditor_banner.jpg"
          alt="이미지를 표시할 수 없습니다"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30vh",
            left: "15vw",
            color: "white",
            fontFamily: "Pretendard-Medium",
          }}
        >
          <div style={{ fontSize: "2.5vw" }}>당신의 경험이 빛날 수 있도록</div>
          <div style={{ fontSize: "1.5vw", marginTop: "2vh" }}>
            막막한 자기소개서 작성, 이젠 AI 자소서 컨설턴트 REDITOR가
            함께하겠습니다.
          </div>
        </div>
        <div style={{ position: "absolute", top: "50vh", left: "15vw" }}>
          <Button
            onClick={() => {
              navigate("/auth/login");
            }}
            style={{
              backgroundColor: "#0DC291",
              color: "white",
              border: "transparent",
            }}
          >
            REDITOR 로그인
          </Button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#0DC291",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "10.938vw",
            top: "10vh",
            fontFamily: "Pretendard-Semibold",
            color: "#005840",
            fontSize: "1.042vw",
          }}
        >
          OUR BUSINESS
        </div>
        <div
          style={{
            position: "absolute",
            left: "10.938vw",
            top: "27.5vh",
            color: "white",
          }}
        >
          <div style={{ fontSize: "3.125vw", fontFamily: "Pretendard-Medium" }}>
            당신만을 위한 AI 자소서 컨설턴트
          </div>
          <div
            style={{
              fontSize: "1.823vw",
              marginTop: "2.5vh",
              fontFamily: "Pretendard-Regular",
            }}
          >
            수많은 취업 준비생들과 이직 준비생들이 Reditor로 자기소개서를
            첨삭하고 있어요
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "53.952vh",
            width: "100%",
            padding: "0 20.697vw",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.823vw",
            fontFamily: "Pretendard-Semibold",
            textAlign: "center",
          }}
        >
          <div>
            <img src="/img/xo.png" alt="" />
            <div>첨삭횟수</div>
            <div>319회</div>
          </div>
          <div>
            <img src="/img/human.png" alt="" />
            <div>가입한 유저</div>
            <div>70명</div>
          </div>
          <div>
            <img
              src="/img/memo.png"
              style={{ width: "96px", height: "96px" }}
              alt=""
            />
            <div>저장된 자소서</div>
            <div>93개</div>
          </div>
          <div>
            <img
              src="/img/graph.png"
              style={{ width: "96px", height: "96px" }}
              alt=""
            />
            <div>총 방문자</div>
            <div>1127명</div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#161B1E",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            marginTop: "12vh",
            marginLeft: "10.938vw",
            color: "#0FC291",
            fontFamily: "Pretendard-Semibold",
            fontSize: "1.042vw",
          }}
        >
          REVIEW
        </div>
        <div
          style={{
            marginLeft: "10.938vw",
            position: "absolute",
            marginTop: "27.4vh",
            fontSize: "3.125vw",
            color: "white",
            fontFamily: "Pretendard-Medium",
          }}
        >
          실제 사용자들의 생생한 후기!
        </div>
        <div
          style={{
            position: "absolute",
            fontFamily: "Pretendard-Regular",
            color: "white",
            fontSize: "1.823vw",
            marginLeft: "10.938vw",
            marginTop: "37vh",
          }}
        >
          20,000개의 합격 자기소개서 데이터와 AI의 결합으로 취준생들이 반한
          자기소개서 첨삭 전문 서비스!
        </div>
        <div style={{ marginTop: "58vh", position: "absolute", width: "100%" }}>
          <Marquee>
            {ReviewData.map((data, index) => {
              return (
                <div
                  key={`Marquee${index}`}
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "white",
                    height: "24vh",
                    width: "19.792vw",
                    marginRight: "3.125vw",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "4.5vh",
                      marginLeft: "1.51vw",
                      fontSize: "1.563vw",
                      color: "#0FC291",
                      fontFamily: "Pretendard-Semibold",
                    }}
                  >
                    {data.username}
                  </div>
                  <div
                    style={{
                      marginTop: "3.9vh",
                      padding: "0 1.51vw",
                      fontSize: "1.302vw",
                      fontFamily: "Pretendard-Semibold",
                    }}
                  >
                    {data.comment}
                  </div>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#F9FAFB",
          height: "50vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            marginTop: "7.5vh",
            padding: "0 10.938vw",
            fontFamily: "Pretendard-Semibold",
            color: "#888C8E",
            fontSize: "1.563vw",
            width: "100%",
          }}
        >
          <span>COMPANY</span>
          <span style={{ marginLeft: "3.385vw" }}>CONTACT</span>
          <span style={{ marginLeft: "55.521vw" }}></span>
          <span style={{ marginLeft: "0.941vw" }}></span>
        </div>
        <div
          style={{
            marginTop: "13.6vh",
            position: "absolute",
            marginLeft: "10.938vw",
            display: "flex",
            height: "9.4vh",
            fontSize: "1.042vw",
            flexDirection: "column",
            color: "#888C8E",
            fontFamily: "Pretendard-Regular",
            justifyContent: "space-between",
          }}
        >
          <span>회사 소개</span>
          <span>채용안내</span>
          <span>공고</span>
        </div>
        <div
          style={{
            marginTop: "13.6vh",
            position: "absolute",
            marginLeft: "22.031vw",
            display: "flex",
            height: "5.9vh",
            fontSize: "1.042vw",
            flexDirection: "column",
            color: "#888C8E",
            fontFamily: "Pretendard-Regular",
            justifyContent: "space-between",
          }}
        >
          <span>1:1문의: info@reditor.me</span>
          <span>제휴문의: info@reditor.me</span>
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "36.6vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "6.9vh",
            fontFamily: "Pretendard-Regular",
            fontSize: "2vh",
            color: "#888C8E",
            marginLeft: "10.938vw",
          }}
        >
          <span>대표 : 김상휘 | 주소 : 서울시 | 대표번호 : 1234- 5678</span>
          <span>
            사업자등록번호 : 123 - 456 - 12345 | 통신판매업신고 :
            제2024-서울-은평-1234호
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: "36.6vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "6.9vh",
            fontFamily: "Pretendard-Regular",
            fontSize: "2vh",
            color: "#888C8E",
            marginLeft: "68.958vw",
            textAlign: "right",
          }}
        >
          <span>개인정보 처리방침 | 이용약관 | 사업자정보확인 </span>
          <span>ⒸREDITOR</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
