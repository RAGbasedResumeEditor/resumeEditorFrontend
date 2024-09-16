import React, { CSSProperties, useState } from 'react';
import ResumeEdit from '../mainPage/resumeEdit/resumeEdit';
import { Button, Form, Input, Radio, Select, Switch, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PuffLoader from 'react-spinners/PuffLoader';
import BounceLoader from 'react-spinners/BounceLoader';
import FadeLoader from 'react-spinners/FadeLoader';
import { useForm } from 'antd/es/form/Form';

const LandingTrial = () => {
  const [userInputForm] = useForm();
  const [userAnswer, setUserAnser] =
    useState(`IT 분야에서 가장 핫한 LLM 기능을 제공하고 있는 Reditor는 취준생의 자기소개서 작성에 대한 막막함을 해소해 줄 수 있는 서비스입니다.

 자소서 작성을 '대신 해주는 것'이 아닌 '가이드를 주고,' '보강해준다는' 부분에서 이 서비스의 철학이 장기적인 사용자의 사고력과 능력 향상에 주안점을 둔다는 것을 느끼게 되었습니다.

 이에 Reditor에서 발생하는 데이터들을 분석하고 어떻게 하면 더 많은 사용자에게 효과적인 서비스를 제공할 수 있을지 분석할 수 있는 데이터 분석가 직무에 지원하게 되었습니다.`);
  const [switchSelected, setSwtichSelected] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState('normal');
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [diffResult, setDiffResult] = useState([]);
  const [showDiff, setShowDiff] = useState(false);

  const techniqueDescriptions = {
    normal:
      '기본 모드입니다. Pro를 사용하시는 분들께는 더 다양한 기법이 제공됩니다.',
    STAR: '**상황(Situation), 과제(Task), 행동(Action), 결과(Result)**를 중심으로 이야기하는 방식입니다. 이 기법은 특히 경험을 구체적으로 설명할 때 유용합니다.',
    SWOT: '**강점(Strengths), 약점(Weaknesses), 기회(Opportunities), 위협(Threats)**을 분석하여 자신을 소개하는 방식입니다.',
    AIDA: '**주의(Attention), 흥미(Interest), 욕구(Desire), 행동(Action)**의 단계를 통해 독자의 관심을 끄는 방식입니다.',
    '5W1H':
      '**누가(Who), 무엇을(What), 언제(When), 어디서(Where), 왜(Why), 어떻게(How)**의 질문에 답하는 방식입니다.',
    에피소드:
      '구체적인 에피소드를 통해 자신을 소개하는 방식입니다. 독자의 관심을 끌고 기억에 남기기 좋습니다.',
  };

  const randomSpinner = () => {
    const descriptionStyle: CSSProperties = {
      textAlign: 'center',
      marginTop: '3%',
    };

    const tipStyle: CSSProperties = {
      fontSize: '0.8rem',
      marginTop: '5%',
    };
    let spinner = [
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PacmanLoader color="#36d7b7" />
        </div>
        <div style={descriptionStyle}>
          PRO모드는 LITE모드 보다 정교한 첨삭이 이루어지는
          <br /> 대신 게시판에 업로드가 됩니다
        </div>
        <div style={tipStyle}>
          Tip. 자기소개서에는 특별한 경험을 녹여낼 수록 좋아요.{' '}
        </div>
      </div>,
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PuffLoader color="#36d7b7" />
        </div>
        <div style={descriptionStyle}>
          Reditor는 Resume Editor의 줄임말입니다!
        </div>
        <div style={tipStyle}>
          Tip. 지나치게 전문적인 용어만 가득한 자기소개서는 읽기 힘들어요.
        </div>
      </div>,
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BounceLoader color="#36d7b7" />
        </div>
        <div style={descriptionStyle}>
          수 만개의 정교한 자기소개서를 기반으로 지원자님의 자기소개서를
          <br /> 더욱 빛나게 해드리는 중입니다!
        </div>
        <div style={tipStyle}>
          Tip. 추상적인 표현보다는 명료한 표현이 좋아요!
        </div>
      </div>,
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FadeLoader color="#36d7b7" />
        </div>
        <div style={descriptionStyle}>
          Reditor에 등록된 높은 평점의 자기소개서는
          <br /> 다시 자기소개서 첨삭AI에 활용돼요.
        </div>
        <div style={tipStyle}>
          Tip. 데이터와 결과를 강조해보세요! 구체적인 숫자가 있을수록 신빙성이
          올라갑니다.
        </div>
      </div>,
    ];

    let randomIndex = Math.floor(Math.random() * spinner.length);

    return spinner[randomIndex];
  };
  //resume resume_detail resume_all_1536
  const onFinish = () => {
    setGenerated(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setResult(
      `
      Reditor는 IT 분야에서 가장 주목받고 있는 LLM 기능을 제공하여 취업 준비생들의 자기소개서 작성에 대한 막막함을 해소해주는 서비스입니다. 

      '자소서를 대신 작성해주는 것'이 아닌 '가이드를 제공하고 보강해준다'는 철학을 통해 사용자의 사고력과 능력 향상에 중점을 두고 있다는 점이 인상 깊었습니다. 

      이와 같은 Reditor의 철학을 뒷받침하고 발전시키기 위해, 저는 Reditor에서 발생하는 데이터를 분석하여 더 많은 사용자에게 효과적인 서비스를 제공할 수 있는 방법을 모색하고자 데이터 분석가 직무에 지원하게 되었습니다.
      `
    );
    setDiffResult([
      [1, 'Reditor는 '],
      [0, 'IT 분야에서 가장 '],
      [-1, '핫한'],
      [1, '주목받고 있는'],
      [0, ' LLM 기능을 제공하'],
      [-1, '고 있는 Reditor는 취준생'],
      [1, '여 취업 준비생들'],
      [0, '의 자기소개서 작성에 대한 막막함을 해소해'],
      [-1, ' 줄 수 있'],
      [1, '주'],
      [0, '는 서비스입니다.'],
      [1, ' '],
      [0, '\n\n '],
      [-1, "자소서 작성을 '"],
      [1, " '자소서를 "],
      [0, '대신 '],
      [1, '작성'],
      [0, "해주는 것'이 아닌 '가이드를 "],
      [-1, "주고,' '보강해준다는' 부분에서 이 서비스의 철학이 장기적인"],
      [1, "제공하고 보강해준다'는 철학을 통해"],
      [0, ' 사용자의 사고력과 능력 향상에 '],
      [-1, '주안'],
      [1, '중'],
      [0, '점을 '],
      [-1, '둔다는 것을 느끼게 되었습니다. 이에'],
      [
        1,
        '두고 있다는 점이 인상 깊었습니다.\n\n  이와 같은 Reditor의 철학을 뒷받침하고 발전시키기 위해, 저는',
      ],
      [0, ' Reditor에서 발생하는 데이터'],
      [-1, '들을'],
      [1, '를'],
      [0, ' 분석하'],
      [-1, '고 어떻게 하면'],
      [1, '여'],
      [0, ' 더 많은 사용자에게 효과적인 서비스를 제공할 수 있'],
      [-1, '을지 분석할 수 있는'],
      [1, '는 방법을 모색하고자'],
      [0, ' 데이터 분석가 직무에 지원하게 되었습니다.'],
    ]);
  };

  const renderDiffResult = () => {
    return diffResult.map((item, index) => {
      if (item[0] === 0) {
        return (
          <span key={index} style={{ color: 'black', lineHeight: 2.5 }}>
            {item[1]}
          </span>
        );
      } else if (item[0] === -1) {
        return (
          <span
            key={index}
            style={{
              lineHeight: 2.5,
              color: 'black',
              backgroundColor: '#FFD6D6',
              textDecoration: 'line-through',
            }}
          >
            {item[1]}
          </span>
        );
      } else if (item[0] === 1) {
        return (
          <span
            key={index}
            style={{
              lineHeight: 2.5,
              color: 'black',
              backgroundColor: '#D4F7DC',
            }}
          >
            {item[1]}
          </span>
        );
      }
      return null;
    });
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '140vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '5.2vw',
          top: '5vh',
          fontFamily: 'Pretendard-Semibold',
          color: '#005840',
          fontSize: '1.8vw',
        }}
      >
        자소서 첨삭을 직접 경험해 보세요!
      </div>
      <div
        style={{
          width: '100%',
          paddingTop: '5vh',
        }}
      >
        <div className="Wrapper" style={{ padding: '5% 5%', display: 'flex' }}>
          <div
            className="userInnerWrapper"
            style={{
              border: '1px solid rgb(220,220,220)',
              boxShadow: '0 0 10px 0 rgb(220, 220, 220)',
              borderRadius: '5px',
              height: '100%',
              width: '50%',
            }}
          >
            <div className="userInputWrapper" style={{ padding: '5% 5%' }}>
              <Form
                layout={'vertical'}
                form={userInputForm}
                onFinish={onFinish}
              >
                <Form.Item>
                  <Form.Item
                    name="status"
                    label={<b>신입/경력</b>}
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                    }}
                  >
                    <Radio.Group defaultValue={'신입'}>
                      <Radio value="신입"> 신입 </Radio>
                      <Radio value="경력" disabled>
                        {' '}
                        경력{' '}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form.Item>
                {switchSelected && (
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Form.Item
                      name="technique"
                      label={
                        <b>
                          기법 선택{' '}
                          <Tooltip
                            placement="top"
                            title={techniqueDescriptions[selectedTechnique]}
                          >
                            <InfoCircleOutlined style={{ marginLeft: '8px' }} />
                          </Tooltip>
                        </b>
                      }
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                      }}
                    ></Form.Item>
                  </Form.Item>
                )}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="company"
                    label={<b>지원 회사</b>}
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                    }}
                  >
                    <Input
                      readOnly
                      defaultValue={'Reditor'}
                      placeholder="회사 이름"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    label={<b>지원 직무</b>}
                    name="occupation"
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      margin: '0 8px',
                    }}
                  >
                    <Input
                      readOnly
                      defaultValue={'데이터 분석가'}
                      placeholder="직무 이름"
                      size="large"
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <b>자소서 문항</b>
                    </div>
                  }
                  name="question"
                >
                  <Input
                    readOnly
                    defaultValue={'지원 동기를 알려주세요'}
                    placeholder="자소서 문항을 입력해 주세요"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: '0' }}
                  name="answer"
                  label={<b>첨삭할 자소서 내용</b>}
                >
                  <TextArea
                    readOnly
                    defaultValue={`IT 분야에서 가장 핫한 LLM 기능을 제공하고 있는 Reditor는 취준생의 자기소개서 작성에 대한 막막함을 해소해 줄 수 있는 서비스입니다.

 자소서 작성을 '대신 해주는 것'이 아닌 '가이드를 주고,' '보강해준다는' 부분에서 이 서비스의 철학이 장기적인 사용자의 사고력과 능력 향상에 주안점을 둔다는 것을 느끼게 되었습니다.

 이에 Reditor에서 발생하는 데이터들을 분석하고 어떻게 하면 더 많은 사용자에게 효과적인 서비스를 제공할 수 있을지 분석할 수 있는 데이터 분석가 직무에 지원하게 되었습니다.`}
                    rows={15}
                    maxLength={2000}
                    onChange={(e) => {
                      setUserAnser(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {userAnswer.length} / 2000
                  </div>
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                    }}
                    style={{
                      backgroundColor: '#0DC291',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    size="large"
                    htmlType="submit"
                  >
                    자소서 첨삭하기
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div
            className="gptInnerWrapper"
            style={{
              border: '1px solid rgb(220,220,220)',
              boxShadow: '0 0 10px 0 rgb(220, 220, 220)',
              borderRadius: '5px',
              height: 'auto',
              width: '50%',
              marginLeft: '4%',
            }}
          >
            <div
              className="gptResultWrapper"
              style={{ padding: '5% 5%', height: '100%' }}
            >
              <div className="gptResult" style={{ height: '100%' }}>
                {generated ? (
                  isLoading ? (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          textAlign: 'center',
                        }}
                      >
                        {randomSpinner()}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {!showDiff ? (
                        <div>
                          <p
                            style={{
                              lineHeight: '2.5',
                              whiteSpace: 'pre-wrap',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            {result}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            글자수:{result.length}
                          </div>
                          <Button
                            type="primary"
                            onClick={() => setShowDiff(true)}
                            style={{
                              backgroundColor: '#0DC291',
                              color: 'white',
                              fontWeight: 'bold',
                              marginTop: '10px',
                            }}
                          >
                            Diff 결과 보기
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              whiteSpace: 'pre-wrap',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            {renderDiffResult()}
                          </div>
                          <Button
                            type="primary"
                            onClick={() => setShowDiff(false)}
                            style={{
                              backgroundColor: '#0DC291',
                              color: 'white',
                              fontWeight: 'bold',
                              marginTop: '10px',
                            }}
                          >
                            원본 결과 보기
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.3rem',
                    }}
                  >
                    Reditor가 답변을 기다리고 있어요!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingTrial;
