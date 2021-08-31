import React, { useState } from 'react';
import * as toastr from 'toastr';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
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
  const [topic, setTopic] = useState<Array<topicType>>([]);
  const [header, setHeader] = useState<[string, number]>(['', -1]); // 첫번째 인자는 바뀐 값/두번째 인자는 topic Index
  const [listFocus, setListFocus] = useState(-1);

  const handleAddHeader = (): void => {
    const text = header[0];

    if (text !== '' && topic.findIndex((obj) => obj.header === text) === -1) {
      setTopic(topic.concat({ id: topic.length + 1, header: text, list: [] }));
    } else if (topic.findIndex((obj) => obj.header === text) !== -1) {
      toastr.error('같은 이름의 주제가 있습니다.');
    } else if (text === '') {
      toastr.error('주제를 입력해주세요.');
    }

    setHeader(['', -1]);
  };

  const handleEditHeader = (): void => {
    const [text, headerIndex] = header;

    if (text !== '' && topic.findIndex((obj) => obj.header === text) === -1) {
      setTopic(
        topic.map((item, index) =>
          index === headerIndex ? { ...item, header: text } : item,
        ),
      );
    } else if (topic.findIndex((obj) => obj.header === text) !== -1) {
      toastr.error('같은 이름의 주제가 있습니다.');
    } else if (text === '') {
      toastr.error('주제를 입력해주세요.');
    }

    setHeader(['', -1]);
  };

  const handleDeleteHeader = (topicIndex: number): void => {
    const topicSample = topic
      .filter((item, index) => index !== topicIndex)
      .map((item, index) =>
        item.id - 1 !== index ? { ...item, id: index + 1 } : item,
      );

    setTopic(topicSample);
  };

  return (
    <div className="article">
      <div className="topic_main">Topic</div>
      <div className="topic_article">
        <div
          className="topic"
          onFocus={() => setListFocus(-1)}
          onMouseOver={() => setListFocus(-1)}
        >
          {topic.map((topicList, topicIndex) => (
            <div
              key={`topic${String(topicIndex)}`}
              className="topic_list"
              onFocus={() => setListFocus(topicIndex)}
              onMouseOver={(e) => {
                e.stopPropagation();
                setListFocus(topicIndex);
              }}
            >
              {listFocus === topicIndex && (
                <AiOutlineClose
                  className="topic_header_delete"
                  onClick={() => handleDeleteHeader(topicIndex)}
                />
              )}
              {topicIndex !== header[1] ? (
                <div className="topic_header pad_true">
                  <div className="topic_header_text">{topicList.header}</div>
                  <AiOutlineEdit
                    className="topic_header_edit"
                    onClick={() => setHeader(['', topicIndex])}
                  />
                </div>
              ) : (
                <div className="topic_header">
                  <input
                    type="text"
                    className="topic_header_input"
                    placeholder={topicList.header}
                    onChange={(e) => setHeader([e.target.value, topicIndex])}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleEditHeader();
                    }}
                    ref={(e) => e?.focus?.()}
                    value={header[0]}
                  />
                  <AiOutlineCheck
                    className="topic_header_check"
                    onClick={() => handleEditHeader()}
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

          <div className="topic_list add_list">
            {header[1] !== -2 ? (
              <div className="topic_header pad_true">
                <div className="topic_header_text">Add The Topic</div>
                <AiOutlineEdit
                  className="topic_header_edit"
                  onClick={() => setHeader(['', -2])}
                />
              </div>
            ) : (
              <div className="topic_header">
                <input
                  type="text"
                  className="topic_header_input"
                  placeholder="Add The Topic"
                  onChange={(e) => setHeader([e.target.value, -2])}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddHeader();
                  }}
                  value={header[0]}
                  ref={(e) => e?.focus?.()}
                />
                <AiOutlineCheck
                  className="topic_header_check"
                  onClick={() => handleAddHeader()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default mainPage;
