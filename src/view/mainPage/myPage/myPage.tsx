import axiosInstance from '@/api/api';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Table from 'antd/es/table';
import Tooltip from 'antd/es/tooltip';
import Pagination from 'antd/es/pagination';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import React from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { StarFilled, StarOutlined } from '@ant-design/icons';
interface DecodedToken {
  category: string;
  exp: number;
  iat: number;
  role: string;
  userNo: number;
  username: string;
}
interface UserInfo {
  age: number;
  authCode: null;
  birthDate: string;
  companyName: string;
  delDate: null;
  email: string;
  gender: string;
  createdDate: string;
  mode: number;
  occupationName: string;
  password: null;
  resumeEditCount: number;
  role: string;
  status: number;
  unum: number;
  username: string;
  wishCompanyName: string;
}
interface EditRecord {
  mode: number;
  resumeEditNo: number;
  resumeNo: number;
  companyName: string;
  occupationName: string;
  createdDate: string;
}
interface Bookmark {
  bookmarkNo: number;
  resumeBoardNo: number;
  title: string;
  createdDate: string;
}
interface GuideRecord {
  resumeGuideNo: number;
  companyName: number;
  occupationName: string;
}
interface RingProps {
  mode: number;
}
const Ring: React.FC<RingProps> = ({ mode }) => {
  const text = mode === 2 ? 'Pro' : 'Lite';
  const textSize = 30;
  const circleDiameter = textSize + 6; // Add a bit more to accommodate text
  const ringStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: circleDiameter,
    height: circleDiameter,
    borderRadius: '50%',
    border: `5px solid #0DC291`,
    color: 'black', // Text color
    fontSize: '15px', // Font size
  };
  return <div style={ringStyle}>{text}</div>;
};

const labelStyle = {
  fontFamily: 'Pretendard-Medium',
  fontSize: '20px',
  color: '#0FC291',
};

const CustomFormItem = ({
  name,
  disabled = true,
}: {
  name: string;
  disabled: boolean;
}) => {
  return (
    <Form.Item
      name={name}
      style={{
        justifyContent: 'right',
        width: '90%',
        marginBottom: '0',
        marginLeft: '20px',
      }}
    >
      <Input size="large" disabled={disabled} />
    </Form.Item>
  );
};
const MyPage = () => {
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [userForm] = useForm();
  const [activeTab, setActiveTab] = useState<string>('editHistory');
  const [editRecords, setEditRecords] = useState<EditRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [guideRecords, setGuideRecords] = useState<GuideRecord[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookmarkClicked, setBookmarkClicked] = useState<boolean>(false);
  const [editRecordClicked, setEditRecordClicked] = useState<boolean>(true);
  const [guideRecordClicked, setGuideRecordClicked] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openRateModal, setOpenRateModal] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    let num = parseFloat(value);
    setRating(num);
  };

  const handleMouseOver = (value) => {
    setHover(value);
  };

  const handleMouseOut = () => {
    setHover(0);
  };
  const fetchUserInfo = () => {
    let res = axiosInstance
      .post('/user/search')
      .then((res) => {
        console.log(res);
        setUserInfo(res.data.response);
        userForm.setFieldsValue({
          username: res.data.response.username,
          age: res.data.response.age,
          email: res.data.response.email,
          gender: res.data.response.gender,
          createdDate: res.data.response.createdDate.slice(0, 10),
          mode: res.data.response.mode,
          birthDate: res.data.response.birthDate,
          wishCompanyName: res.data.response.wishCompanyName,
          resumeEditCount: res.data.response.resumeEditCount,
          companyName: res.data.response.companyName,
          occupationName: res.data.response.occupationName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchEditRecords = (page: number) => {
    let pageNo = page;
    axiosInstance
      .get(`/user/edit-list?pageNo=${pageNo - 1}`)
      .then((res) => {
        if (res.data.response === '결과가 존재하지 않습니다') {
          setEditRecords([]);
        } else {
          let newData = res.data.response.map((data: EditRecord) => {
            return {
              ...data,
              w_date: data.createdDate.slice(0, 10),
              title: data.companyName + ' ' + data.occupationName,
            };
          });
          setEditRecords(newData);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((err) => {
        console.log(err);
        setEditRecords([]);
      });
  };
  const fetchGuideRecords = (page: number) => {
    let pageNo = page;
    axiosInstance
      .get(`/user/guide-list?pageNo=${pageNo - 1}`)
      .then((res) => {
        if (res.data.response === '결과가 존재하지 않습니다') {
          setGuideRecords([]);
        } else {
          let newData = res.data.response.map((data: GuideRecord) => {
            return {
              ...data,
              title: data.companyName + ' ' + data.occupationName,
            };
          });
          setGuideRecords(newData);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((err) => {
        console.log(err);
        setEditRecords([]);
      });
  };

  const onEdit = ({ email, age, birthDate, wish, company, occupation }) => {
    let res = axiosInstance
      .patch('/user', {
        email: email,
        age: age,
        birthDate: birthDate,
        company: company,
        occupation: occupation,
        wish: wish,
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          text: '회원정보가 수정되었습니다.',
        });
        fetchUserInfo();
      });
  };
  const fetchBookmarks = (page: number) => {
    let pageNo = page;
    axiosInstance
      .get(`/user/bookmark?pageNo=${pageNo - 1}`)
      .then((res) => {
        if (res.data.response === '결과가 존재하지 않습니다') {
          setBookmarks([]);
        } else {
          let newData = res.data.response.map((data: Bookmark) => {
            return {
              ...data,
              createdDate: data.createdDate.slice(0, 10),
            };
          });
          setBookmarks(newData);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((err) => {
        console.log(err);
        setBookmarks([]);
      });
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  useEffect(() => {
    if (activeTab === 'editHistory') {
      fetchEditRecords(currentPage);
    } else if (activeTab === 'bookmark') {
      fetchBookmarks(currentPage);
    } else {
      fetchGuideRecords(currentPage);
    }
  }, [activeTab, currentPage]);
  const renderMode = (mode: number) => {
    const modeText = mode === 1 ? 'lite' : 'pro';
    return (
      <div
        style={{
          display: 'inline-block',
          padding: '5px 10px',
          borderRadius: '20px',
          color: 'black',
        }}
      >
        {modeText}
      </div>
    );
  };
  const renderTable = () => {
    if (activeTab === 'editHistory') {
      const columns = [
        {
          title: <div style={{ fontFamily: 'Pretendard-bold' }}>Mode</div>,
          dataIndex: 'mode',
          key: 'mode',
          render: (text: number) => (
            <div style={{ fontFamily: 'Pretendard-regular' }}>
              {renderMode(text)}
            </div>
          ),
        },
        {
          title: (
            <div style={{ fontFamily: 'Pretendard-bold', textAlign: 'center' }}>
              Title
            </div>
          ),
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: EditRecord) => (
            <div
              style={{
                fontFamily: 'Pretendard-regular',
                textAlign: 'center',
                width: '100%',
                textDecoration: 'none',
              }}
            >
              <a
                style={{ color: 'black' }}
                href={`/main/mypage/${record.resumeEditNo}`}
              >
                {text}
              </a>
            </div>
          ),
        },
        {
          title: (
            <div style={{ fontFamily: 'Pretendard-bold', textAlign: 'center' }}>
              Date
            </div>
          ),
          dataIndex: 'w_date',
          key: 'w_date',
          render: (text: string) => (
            <div
              style={{ fontFamily: 'Pretendard-regular', textAlign: 'center' }}
            >
              {text}
            </div>
          ),
        },
      ];
      return (
        <Table
          dataSource={editRecords.length > 0 ? editRecords : []}
          columns={columns}
          pagination={false}
          rowKey="r_num"
          locale={{ emptyText: '게시글이 없습니다.' }}
        />
      );
    } else if (activeTab === 'bookmark') {
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: Bookmark) => (
            <a
              href={`./resumelist/${record.resumeBoardNo}`}
              style={{ color: 'black' }}
            >
              {text}
            </a>
          ),
        },
        { title: 'Date', dataIndex: 'createdDate', key: 'createdDate' },
      ];
      return (
        <Table
          dataSource={bookmarks.length > 0 ? bookmarks : []}
          columns={columns}
          pagination={false}
          rowKey="r_num"
          locale={{ emptyText: '게시글이 없습니다.' }}
        />
      );
    } else {
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: GuideRecord) => (
            <a
              href={`/main/mypage/guide/${record.resumeGuideNo}`}
              style={{ color: 'black' }}
            >
              {text}
            </a>
          ),
        },
      ];
      return (
        <Table
          dataSource={guideRecords.length > 0 ? guideRecords : []}
          columns={columns}
          pagination={false}
          rowKey="r_num"
          locale={{ emptyText: '게시글이 없습니다.' }}
        />
      );
    }
  };
  return (
    <div
      className="mypageWrapper"
      style={{ padding: '3% 10%', display: 'flex', width: '100%' }}
    >
      <div className="mypageLeft" style={{ width: '50%', paddingRight: '2%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {userInfo.mode && <Ring mode={userInfo.mode} />}
          <div
            style={{
              flex: 1,
              marginLeft: '8px',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              position: 'relative',
            }}
          >
            <div>{userInfo.username}님</div>
            <div>
              <a
                style={{
                  color: editRecordClicked ? 'black' : 'gray',
                  fontWeight: editRecordClicked ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveTab('editHistory');
                  setEditRecordClicked(true);
                  setGuideRecordClicked(false);
                  setBookmarkClicked(false);
                }}
              >
                첨삭 기록
              </a>{' '}
              ·{' '}
              <a
                style={{
                  color: bookmarkClicked ? 'black' : 'gray',
                  fontWeight: bookmarkClicked ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveTab('bookmark');
                  setBookmarkClicked(true);
                  setGuideRecordClicked(false);
                  setEditRecordClicked(false);
                }}
              >
                내 즐겨찾기
              </a>{' '}
              ·{' '}
              <a
                style={{
                  color: guideRecordClicked ? 'black' : 'gray',
                  fontWeight: guideRecordClicked ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveTab('guideHistory');
                  setBookmarkClicked(false);
                  setGuideRecordClicked(true);
                  setEditRecordClicked(false);
                }}
              >
                가이드 기록
              </a>
            </div>
          </div>
          <div>
            <Button
              size="large"
              type="primary"
              onClick={() => setOpenRateModal(true)}
              style={{
                marginTop: '10px',
                backgroundColor: '#0DC291',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              후기 남기기
            </Button>
          </div>
        </div>
        <div
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <Tooltip
            title={
              <div style={{ whiteSpace: 'pre-line', maxWidth: '500px' }}>
                회사명으로 검색 : {'\n'}가고자 하는 회사명을 검색해보세요.
                {'\n'}
                직무명으로 검색 : {'\n'}같은 직군의 자소서를 검색해보세요.
                {'\n'}
                키워드로 검색 : {'\n'}작성하고자 하는 키워드를 참고할
                자기소개서를 검색하세요.
              </div>
            }
          >
            <div style={{ color: 'black' }}>
              나에게 맞는 자소서를 검색하는 방법을 알아보세요.
            </div>
          </Tooltip>
        </div>
        {renderTable()}
        <Pagination
          showSizeChanger={false}
          current={currentPage}
          total={totalPages * 10}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: 'center', marginTop: '20px' }}
        />
      </div>
      <div
        className="mypageRight"
        style={{
          width: '50%',
          padding: '5%',
          borderRadius: '20px',
          backgroundColor: '#F9FAFB',
        }}
      >
        <div className="myPageContentWrapper">
          <Form onFinish={onEdit} form={userForm}>
            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <Form.Item
                name="username"
                label={<div style={labelStyle}>유저ID</div>}
                style={{ width: '100%' }}
              >
                <CustomFormItem name="username" disabled />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <Form.Item
                name="email"
                label={<div style={labelStyle}>이메일</div>}
                style={{ width: '100%' }}
              >
                <CustomFormItem name="email" disabled />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <Form.Item
                name="wishCompanyName"
                label={<div style={labelStyle}>목표직무</div>}
                style={{ width: '100%' }}
              >
                <CustomFormItem name="wishCompanyName" disabled={false} />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <Form.Item
                name="createdDate"
                label={<div style={labelStyle}>가입일</div>}
                style={{ width: '100%' }}
              >
                <CustomFormItem name="createdDate" disabled={true} />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <Form.Item
                name="resumeEditCount"
                label={<div style={labelStyle}>첨삭횟수</div>}
                style={{ width: '100%' }}
              >
                <CustomFormItem name="resumeEditCount" disabled={true} />
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <div
                className="buttonWrapper"
                style={{
                  marginTop: '5%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Button
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: '#0DC291',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  수정하기
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  회원 탈퇴
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        centered
        open={openDeleteModal}
        closable={false}
        footer={[
          <Button
            style={{
              backgroundColor: '#001529',
              color: 'white',
            }}
            key={'ok'}
            onClick={() => {
              let accessToken = localStorage.getItem('access') ?? '';
              let Decoded: DecodedToken = jwtDecode(accessToken);
              console.log(accessToken);
              let userNo = Decoded.userNo;
              axios.delete(`/user`).then((res) => {
                Swal.fire({
                  icon: 'success',
                  title: '회원 탈퇴 완료',
                  text: '그동안 이용해주셔서 감사합니다.',
                }).then(() => {
                  localStorage.clear();
                  window.location.href = '/';
                });
              });
            }}
          >
            예
          </Button>,
          <Button
            key={'no'}
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            아니오
          </Button>,
        ]}
      >
        <span style={{ fontSize: '1.2rem' }}>
          <b>정말 탈퇴하시겠습니까?</b>
        </span>
      </Modal>
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            해당 글에 대한 후기를 남겨주세요!
          </div>
        }
        centered
        open={openRateModal}
        onCancel={() => {
          setOpenRateModal(false);
        }}
        footer={[
          <div
            key={'onOk'}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              style={{ backgroundColor: '#0DC291', color: 'white' }}
              size="large"
              onClick={() => {
                let accessToken = localStorage.getItem('access') ?? '';
                let DecodedToken: DecodedToken = jwtDecode(accessToken);
                let res = axiosInstance

                  .post('/board/rating', {
                    rating: rating,
                    unum: DecodedToken.userNo,
                  })
                  .then((res) => {
                    setOpenRateModal(false);

                    Swal.fire({
                      icon: 'success',
                      title: '후기가 등록되었습니다!',
                      text: '감사합니다 :)',
                    });
                  });
              }}
            >
              평가하기!
            </Button>
          </div>,
        ]}
      >
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const value = (index + 1) * 2;
            const halfValue = value - 1;
            return (
              <span
                key={`star${index}`}
                className="star"
                onClick={() => {
                  handleClick(value / 2);
                }}
                onMouseOver={() => handleMouseOver(value)}
                onMouseOut={handleMouseOut}
              >
                {hover >= value || rating >= value / 2 ? (
                  <StarFilled
                    style={{ color: hover >= value ? '#ffc107' : '#ffa500' }}
                  />
                ) : hover >= halfValue || rating >= halfValue / 2 ? (
                  <StarFilled
                    style={{
                      color: hover >= halfValue ? '#ffc107' : '#ffa500',
                    }}
                    className="half"
                  />
                ) : (
                  <StarOutlined style={{ color: '#ddd' }} />
                )}
              </span>
            );
          })}
        </div>
        <div>
          <TextArea
            style={{ fontSize: '20px' }}
            rows={5}
            placeholder="후기를 남겨주세요"
          ></TextArea>
        </div>
      </Modal>
    </div>
  );
};
export default MyPage;
