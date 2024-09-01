import React from "react";

const LandingBusiness = () => {
  return (
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
          수많은 취업 준비생들과 이직 준비생들이 Reditor로 자기소개서를 첨삭하고
          있어요
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
  );
};

export default LandingBusiness;
