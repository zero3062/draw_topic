import React, { useState } from 'react';
import '../style/mainPage.scss';

function mainPage() {
  const [topic, setTopic] = useState([
    {
      id: 1,
      selectType: 'genre',
      header: '장르',
      list: ['액션', '호러', '고어', '판타지'],
    },
    {
      id: 2,
      selectType: 'gender',
      header: '성별',
      list: ['상관 없음', '남자', '여자', '없음'],
    },
    {
      id: 3,
      selectType: 'tribe',
      header: '종족',
      list: ['인간', '듀라한', '악마'],
    },
    {
      id: 4,
      selectType: 'option',
      header: '설정',
      list: ['수녀'],
    },
  ]);
  const [select, setSelect] = useState([
    {
      id: 1,
      genre: [],
    },
    {
      id: 2,
      gender: [],
    },
    {
      id: 3,
      tribe: [],
    },
    {
      id: 4,
      option: [],
    },
  ]);
  const handleTopicSelect = (topciIndex: number, index: number) => {
    console.log(index);
  };
  return (
    <div>
      <h1>Main</h1>
      <h2>Topic</h2>
      <div className="topic">
        {topic.map((topicList, topicIndex) => (
          <li key={topicList.header} className="topic_li">
            <h3>{topicList.header}</h3>
            {topicList.list.map((list, index) => (
              <li key={String(index)}>{list}</li>
            ))}
          </li>
        ))}
      </div>
    </div>
  );
}

export default mainPage;
