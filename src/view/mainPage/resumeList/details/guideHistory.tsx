import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/api";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/globalTypes";
import React from "react";

interface Guide {
  resumeGuideNo: number;
  occupationName: string; 
  companyName: string;
  content: string;
}

const GuideHistoryDetail = () => {
  const [Guide, setGuide] = useState<Partial<Guide>>({});
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = localStorage.getItem("access") ?? "";
  let DecodedToken: DecodedToken = jwtDecode(accessToken);
  const userInfo = DecodedToken.username;
  const param = useParams();
  const fetchGuide = () => {
    let res = axiosInstance.get(`/user/guide-list/${param.id}`).then((res) => {
      setGuide(res.data);
    });
  };
  useEffect(() => {
    let res = Promise.all([fetchGuide()]);
  }, []);
  return (
    <div className="Wrapper" style={{ padding: "5% 5%", display: "flex" ,justifyContent: "center"}}>
      <div
        className="userInnerWrapper"
        style={{
          border: "1px solid rgb(220,220,220)",
          boxShadow: "0 0 10px 0 rgb(220, 220, 220)",
          borderRadius: "5px",
          height: "100%",
          width: "50%",
          padding: "5%",
        }}
      >
        <div>
          
          <div
            style={{
              fontSize: "1.2rem",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {Guide.companyName} {Guide.occupationName}
          </div>
          <div>{Guide.content}</div>
          <div style={{ marginTop: "15px" }}>
            글자수: {Guide.content?.length}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GuideHistoryDetail;
