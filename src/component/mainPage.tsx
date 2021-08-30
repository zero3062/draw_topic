import React, { useState } from 'react';
import * as toastr from 'toastr';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import '../style/mainPage.scss';

interface listType {
  id: number;
  text: string;
  checked: boolean;
}

interface topicType {
  id: number;
  header: string;
  list: Array<listType>;
}

function mainPage() {
  const [topic, setTopic] = useState<Array<topicType>>([
    {
      id: 1,
      header: 'list1',
      list: [{ id: 1, text: 'list1_1', checked: false }],
    },
    {
      id: 1,
      header: 'list1',
      list: [{ id: 1, text: 'list1_1', checked: false }],
    },
  ]);
  const [header, setHeader] = useState<[string, number]>(['', -1]); // 첫번째 인자는 바뀐 값/두번째 인자는 topic Index

  const handleHeaderEdit = (index: number) => {
    setHeader(['', index]);
  };

  const handleHeaderChange = () => {
    const [text, headerIndex] = header;

    if (text !== '') {
      setTopic(
        topic.map((item, index) =>
          index === headerIndex ? { ...item, header: text } : item,
        ),
      );

      setHeader(['', -1]);
    } else {
      toastr.error('header is defined');
    }
  };

  return (
    <div className="article">
      <div className="topic_main">Topic</div>
      <div className="topic_article">
        <div className="topic ">
          {topic.map((topicList, topicIndex) => (
            <div key={`topic${String(topicIndex)}`} className="topic_list">
              {topicIndex !== header[1] ? (
                <div className="topic_header pad_true">
                  <div className="topic_header_text">{topicList.header}</div>
                  <AiOutlineEdit
                    className="topic_header_edit"
                    onClick={() => handleHeaderEdit(topicIndex)}
                  />
                </div>
              ) : (
                <div className="topic_header">
                  <input
                    type="text"
                    className="topic_header_input"
                    placeholder={topicList.header}
                    onChange={(e) => setHeader([e.target.value, topicIndex])}
                    value={header[0]}
                  />
                  <AiOutlineCheck
                    className="topic_header_check"
                    onClick={() => handleHeaderChange()}
                  />
                </div>
              )}
              <li key={topicList.header} className="topic_li">
                {topicList.list.map((list) => (
                  <li
                    key={list.text}
                    className={list.checked ? 'topic_item on' : 'topic_item'}
                  >
                    {list.text}
                  </li>
                ))}
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default mainPage;
