import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ReviewData from "./reviewData";
import { CommonNavbar } from "@/components/commonNavbar";
import { CommonFooter } from "@/components/commonFooter";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ boxSizing: "border-box" }}>
      <CommonNavbar />
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
      <CommonFooter />
    </div>
  );
};

export default LandingPage;
