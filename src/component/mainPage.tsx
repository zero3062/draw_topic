import React, { useState } from 'react';
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
  ]);

  // 선택하면 topic item의 checked 변경
  const handleClickList = (topicIndex: number, listIndex: number): void => {
    const selectList = topic[topicIndex].list;
    const selectedList = [...selectList];

    selectedList.splice(listIndex, 1, {
      ...selectedList[listIndex],
      checked: !selectedList[listIndex].checked,
    });

    setTopic(
      topic.map((item, index) =>
        index === topicIndex
          ? { ...item, list: [...new Set(selectedList)] }
          : item,
      ),
    );
  };

  return (
    <div className="article">
      <div className="main_title">Main</div>
      <div className="topic_article">
        <div className="topic_main">Topic</div>
        <div className="topic ">
          {topic.map((topicList, topicIndex) => (
            <div key={`topic${String(topicIndex)}`} className="topic_list">
              <div className="topic_header">{topicList.header}</div>
              <li key={topicList.header} className="topic_li">
                {topicList.list.map((list, listIndex) => (
                  <li
                    key={list.text}
                    className="topic_item"
                    onKeyPress={() => handleClickList(topicIndex, listIndex)}
                    onClick={() => handleClickList(topicIndex, listIndex)}
                  >
                    <input
                      type="checkbox"
                      className="blind"
                      id={`topic${topicIndex}_select${listIndex}`}
                      onClick={() => handleClickList(topicIndex, listIndex)}
                      checked={list.checked}
                    />
                    <label
                      htmlFor={`topic${topicIndex}_select${listIndex}`}
                      className={
                        list.checked ? 'topic_label on' : 'topic_label'
                      }
                    >
                      {list.text}
                    </label>
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
