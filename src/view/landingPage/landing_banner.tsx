import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
const LandingBanner = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default LandingBanner;
