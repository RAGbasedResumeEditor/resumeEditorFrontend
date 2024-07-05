import React, {lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import CustomFooter from "../../components/footer";
import Navbar from "@/components/navbar/navbar";
import "./mainPage.scss";
import ResumeEdit from "./resumeEdit/resumeEdit";
import ResumeGuide from "./resumeGuide/resumeGuide";
import ResumeListDetails from "./resumeList/details/details";
import Recommendation from "./recommendation/recommendation";
import FAQ from "./faq/faq";
import ResumeHistoryDetail from "./resumeList/details/resumeHistory";
import ResumeList from "./resumeList/resumeList";
import MyPage from "./myPage/myPage";
// Lazy load nested components
// const ResumeEdit = lazy(() => import("./resumeEdit/resumeEdit"));
// const ResumeGuide = lazy(() => import("./resumeGuide/resumeGuide"));
// const ResumeListDetails = lazy(() => import("./resumeList/details/details"));
// const Recommendation = lazy(() => import("./recommendation/recommendation"));
// const FAQ = lazy(() => import("./faq/faq"));
// const ResumeHistoryDetail = lazy(
//   () => import("./resumeList/details/resumeHistory")
// );
// const ResumeList = lazy(() => import("./resumeList/resumeList"));
// const MyPage = lazy(() => import("./myPage/myPage"));

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mainPageContainer">
        <Routes>
          <Route index element={<ResumeEdit />} />
          <Route path="resumeguide" element={<ResumeGuide />} />
          <Route path="resume" element={<ResumeEdit />} />
          <Route path="recommendation" element={<Recommendation />} />
          <Route path="resumelist/:id" element={<ResumeListDetails />} />
          <Route path="resumelist" element={<ResumeList />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/:id" element={<ResumeHistoryDetail />} />
          <Route path="faq" element={<FAQ />} />
        </Routes>
      </div>
      <CustomFooter />
      <Outlet />
    </div>
  );
};

export default MainPage;
