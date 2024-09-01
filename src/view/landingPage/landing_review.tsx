import Marquee from "react-fast-marquee";
import ReviewData from "./reviewData";
import React from "react";

const LandingReview = () => {
  return (
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
  );
};

export default LandingReview;
