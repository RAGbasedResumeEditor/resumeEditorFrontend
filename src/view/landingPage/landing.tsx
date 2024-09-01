import React from "react";
import { CommonNavbar } from "@/components/commonNavbar";
import { CommonFooter } from "@/components/commonFooter";
import LandingBusiness from "./landing_business";
import LandingBanner from "./landing_banner";
import LandingReview from "./landing_review";
import LandingTrial from "./landing_trial";
import ResumeEdit from "../mainPage/resumeEdit/resumeEdit";
const LandingPage = () => {
  return (
    <div style={{ boxSizing: "border-box" }}>
      <CommonNavbar />
      <LandingBanner />
      <LandingBusiness />
      <LandingTrial />
      <LandingReview />
      <CommonFooter />
    </div>
  );
};

export default LandingPage;
