import React from "react";
import axiosInstance from "@/api/api";
import Avatar from "antd/es/avatar";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Modal from "antd/es/modal";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/globalTypes";
import "./star.css";
import {
  StarOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Swal from "sweetalert2";
interface Resume {
  content: string;
  resumeBoardNo: number;
  rating: number;
  ratingCount: number;
  readCount: number;
  item: string;
  title: string;
  username: string;
  u_num: number;
  questions: string;
  createdDate: string;
}

interface Comment {
  content: string;
  commentNo: number;
  resumeBoardNo: number;
  userNo: number;
  username: string;
  createdDate: string;
}

const ResumeListDetails = () => {
  const [resume, setResume] = useState<Partial<Resume>>({});
  const [comment, setComment] = useState<Comment[]>([]); // Comment 타입의 배열로 초기화
  const [editId, setEditId] = useState<number | null>(null);
  const [writeComment, setWriteComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const [starClicked, setStarClicked] = useState<boolean>(false); // 즐겨찾기 클릭 여부
  const [rated, setRated] = useState<boolean>(false); // 별점 평가 여부
  const [openRateModal, setOpenRateModal] = useState<boolean>(false); // 별점 모달 여부

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
  const accessToken = localStorage.getItem("access") ?? "";
  const DecodedToken: DecodedToken = jwtDecode(accessToken);

  const userInfo = DecodedToken.username;
  const userRole = DecodedToken.role;
  const param = useParams();
  const fetchComment = (page: number) => {
    let res = axiosInstance
      .get(`/comments/${param.id}`, {
        params: {
          pageNo: page,
        },
      })
      .then((res) => {
        if (res.data.response == "결과가 존재하지 않습니다") {
          setComment([]);
        } else {
          setComment(res.data.response);
        }
      });
  };
  const fetchResume = () => {
    let res = axiosInstance.get(`/board/${param.id}`).then((res) => {
      console.log(res.data); // 콘솔에 res.data 출력

      setResume(res.data.response);
    });
  };

  const deleteComment = (commentNo: number) => {
    Modal.confirm({
      title: "댓글 삭제하기",
      content: (
        <div>
          <p>정말 해당 댓글을 삭제하시겠습니까?</p>
        </div>
      ),
      okText: "삭제",
      cancelText: "취소",
      centered: true,

      onOk() {
        let res = axiosInstance
          .delete(`/comments/${commentNo}`, {})
          .then((res) => {
            fetchComment(0);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const fetchLiked = () => {
    let res = axiosInstance
      .get(`/board/${param.id}/bookmark/exist`)
      .then((res) => {
        if (res.data.response == false) {
          setStarClicked(false);
        } else {
          setStarClicked(true);
        }
      });
  };

  const fetchRated = () => {
    let res = axiosInstance.get(`/board/${param.id}/rating`).then((res) => {
      if (res.data.response == 0) {
        setRated(false);
      } else {
        setRated(true);
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      let res = await Promise.all([
        fetchResume(),
        fetchComment(0),
        fetchLiked(),
        fetchRated(),
      ]);
    };
    fetchData();
  }, []);
  return (
    <div
      className="Wrapper"
      style={{ padding: "5% 7%", display: "flex", alignItems: "flex-start" }}
    >
      <div
        className="DetailContentWrapper"
        style={{
          width: "50vw",
          border: "1px solid rgb(220,220,220)",
          padding: "5%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {starClicked ? (
            <HeartFilled
              onClick={() => {
                let res = axiosInstance
                  .post("/board/bookmark", {
                    resumeBoardNo: resume.resumeBoardNo,
                    userNo: DecodedToken.uNum,
                  })
                  .then((res) => {
                    alert("즐겨찾기에서 삭제되었습니다.");
                    setStarClicked(false);
                  });
              }}
              style={{ fontSize: "25px", color: "#F1565C", cursor: "pointer" }}
            />
          ) : (
            <HeartOutlined
              onClick={() => {
                let res = axiosInstance
                  .post("/board/bookmark", {
                    resumeBoardNo: resume.resumeBoardNo,
                    userNo: DecodedToken.uNum,
                  })
                  .then((res) => {
                    setStarClicked(true);
                    alert("즐겨찾기에 추가되었습니다.");
                  });
              }}
              style={{ fontSize: "25px", cursor: "pointer" }}
            />
          )}
        </div>
        <div className="DetailContentHeader">
          <h1>{resume.title}</h1>
        </div>
        <div className="DetailContentDate">
          <h3>작성일자: {resume.createdDate?.slice(0, 10)}</h3>
        </div>
        <div className="DetailContentTitle">
          <h3>{resume.item}</h3>
        </div>
        <div className="DetailContentMain">
          <p style={{ whiteSpace: "pre-wrap" }}>{resume.content}</p>
        </div>
      </div>
      <div
        style={{
          marginLeft: "1%",
          border: "1px solid rgb(220,220,220)",
          width: "30vw",
          height: "auto",
          padding: "2% 3%",
        }}
      >
        <div className="commentHeader" style={{ fontSize: "1.1rem" }}>
          <div>
            <b>작성자: </b>
            {resume.username}
          </div>
          <div>
            <b>총 댓글수:</b> {comment.length}
          </div>
          <div>
            <b>총 조회수:</b> {resume.readCount}
          </div>
          <div>
            <b>작성일:</b> {resume.createdDate?.slice(0, 10)}
          </div>
          <div>
            <b>평점:</b>
            <span>{resume.rating} / 5</span>
            <span style={{ marginLeft: "3%" }}>
              (<UserOutlined /> {resume.ratingCount}명 참여)
            </span>
          </div>

          {!rated && (
            <div style={{ marginTop: "2%" }}>
              <Button
                onClick={() => {
                  setOpenRateModal(true);
                }}
              >
                <span style={{ fontWeight: "bold" }}>별점 추가하기!</span>
                <StarFilled style={{ color: "#F7A000" }} />
              </Button>
            </div>
          )}
        </div>
        <Divider />
        <div className="commentListWrapper">
          {comment.map((comment, idx) => {
            return (
              <div
                key={`comment${idx}`}
                style={{
                  width: "25vw",
                  border: "1px solid rgb(220,220,220)",
                  padding: "2% 3%",
                }}
              >
                <div style={{ marginBottom: "2%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Avatar size={23} icon={<UserOutlined />} />{" "}
                      {comment.username}
                    </div>
                    {(userInfo == comment.username ||
                      userRole == "ROLE_ADMIN") && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "5vw",
                          fontSize: "0.8rem",
                          color: "rgb(200,200,200)",
                        }}
                      >
                        <div
                          onClick={() => setEditId(comment.commentNo)}
                          style={{ cursor: "pointer" }}
                        >
                          수정
                        </div>
                        <div>|</div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteComment(comment.commentNo)}
                        >
                          삭제
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "rgb(150,150,150)" }}
                  >
                    {comment.createdDate.slice(0, 10)}
                  </div>
                </div>
                {editId == comment.commentNo ? (
                  <div>
                    <div>
                      <TextArea
                        onChange={(e) => {
                          setEditComment(e.target.value);
                        }}
                        rows={3}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "1%",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setEditId(null);
                        }}
                        style={{ fontWeight: "bold", marginRight: "1%" }}
                      >
                        취소
                      </Button>
                      <Button
                        onClick={() => {
                          let res = axiosInstance
                            .patch(`/comments/${comment.commentNo}`, {
                              commentNo: comment.commentNo,
                              content: editComment,
                            })
                            .then((res) => {
                              fetchComment(0);
                              setEditId(null);
                            });
                        }}
                        style={{
                          backgroundColor: "#0dc291",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        수정
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>{comment.content}</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="writeCommentWrapper" style={{ width: "100%" }}>
          <div style={{ marginTop: "3%", marginBottom: "2%", width: "100%" }}>
            <TextArea
              value={writeComment}
              onChange={(e) => {
                setWriteComment(e.target.value);
              }}
              rows={3}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => {
                let accessToken = localStorage.getItem("access") ?? "";
                let DecodedToken: any = jwtDecode(accessToken);
                let res = axiosInstance
                  .post(`/comments/write`, {
                    content: writeComment,
                    resumeBoardNo: resume.resumeBoardNo,
                  })
                  .then((res) => {
                    setWriteComment("");
                    fetchComment(0);
                  });
              }}
              style={{
                backgroundColor: "#0DC291",
                color: "white",
                fontWeight: "bold",
              }}
            >
              댓글 작성
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            해당 글에 대한 평점을 남겨주세요!
          </div>
        }
        centered
        open={openRateModal}
        onCancel={() => {
          setOpenRateModal(false);
        }}
        footer={[
          <div
            key={"onOk"}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              style={{ backgroundColor: "#0DC291", color: "white" }}
              size="large"
              onClick={() => {
                let res = axiosInstance

                  .post(`/board/${resume.resumeBoardNo}/rating`, {
                    rating: rating,
                    userNo: DecodedToken.uNum,
                    resumeBoardNo: resume.resumeBoardNo,
                  })
                  .then((res) => {
                    setOpenRateModal(false);
                    setRated(true);
                    fetchResume();
                    Swal.fire({
                      icon: "success",
                      title: "평가가 완료되었습니다!",
                      text: "감사합니다 :)",
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
                    style={{ color: hover >= value ? "#ffc107" : "#ffa500" }}
                  />
                ) : hover >= halfValue || rating >= halfValue / 2 ? (
                  <StarFilled
                    style={{
                      color: hover >= halfValue ? "#ffc107" : "#ffa500",
                    }}
                    className="half"
                  />
                ) : (
                  <StarOutlined style={{ color: "#ddd" }} />
                )}
              </span>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ResumeListDetails;
