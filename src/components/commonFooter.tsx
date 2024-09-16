import React from 'react';

export const CommonFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: '#F9FAFB',
        height: '50vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          marginTop: '7.5vh',
          padding: '0 10.938vw',
          fontFamily: 'Pretendard-Semibold',
          color: '#888C8E',
          fontSize: '1.563vw',
          width: '100%',
        }}
      >
        <span>COMPANY</span>
        <span style={{ marginLeft: '3.385vw' }}>CONTACT</span>
        <span style={{ marginLeft: '55.521vw' }}></span>
        <span style={{ marginLeft: '0.941vw' }}></span>
      </div>
      <div
        style={{
          marginTop: '13.6vh',
          position: 'absolute',
          marginLeft: '10.938vw',
          display: 'flex',
          height: '9.4vh',
          fontSize: '1.042vw',
          flexDirection: 'column',
          color: '#888C8E',
          fontFamily: 'Pretendard-Regular',
          justifyContent: 'space-between',
        }}
      >
        <span>회사 소개</span>
        <span>채용안내</span>
        <span>공고</span>
      </div>
      <div
        style={{
          marginTop: '13.6vh',
          position: 'absolute',
          marginLeft: '22.031vw',
          display: 'flex',
          height: '5.9vh',
          fontSize: '1.042vw',
          flexDirection: 'column',
          color: '#888C8E',
          fontFamily: 'Pretendard-Regular',
          justifyContent: 'space-between',
        }}
      >
        <span>1:1문의: info@reditor.me</span>
        <span>제휴문의: info@reditor.me</span>
      </div>
      <div
        style={{
          position: 'absolute',
          marginTop: '36.6vh',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '6.9vh',
          fontFamily: 'Pretendard-Regular',
          fontSize: '2vh',
          color: '#888C8E',
          marginLeft: '10.938vw',
        }}
      >
        <span>대표 : 김상휘 | 주소 : - | 대표번호 : - </span>
        <span>사업자등록번호 : - | 통신판매업신고 : -호</span>
      </div>
      <div
        style={{
          position: 'absolute',
          marginTop: '36.6vh',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '6.9vh',
          fontFamily: 'Pretendard-Regular',
          fontSize: '2vh',
          color: '#888C8E',
          marginLeft: '68.958vw',
          textAlign: 'right',
        }}
      >
        <span>개인정보 처리방침 | 이용약관 | 사업자정보확인 </span>
        <span>ⒸREDITOR</span>
      </div>
    </footer>
  );
};
