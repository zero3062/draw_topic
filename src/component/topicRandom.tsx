import { useState } from 'react';
import '../style/topicList.scss';

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

export default function topicRandom() {
  const [topic, setTopic] = useState<Array<topicType>>([]);

  return (
    <div className="article">
      <div className="topic_main">Topic Random</div>
      <div className="topic_article">
        <div className="topic">
          {topic.map((topicList, topicIndex) => (
            <div key={`topic${String(topicIndex)}`} className="topic_list">
              <div className="topic_header pad_true">
                <div className="topic_header_text">{topicList.header}</div>
              </div>
              <li key={topicList.header} className="topic_li">
                {topicList.list.map((list, listIndex) => (
                  <li
                    key={list.text}
                    className={list.checked ? 'topic_item on' : 'topic_item'}
                  >
                    <div className="topic_item_main">
                      <div className="topic_item_text">{list.text}</div>
                    </div>
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
