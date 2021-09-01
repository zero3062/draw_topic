import {
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
} from 'react-icons/ai';
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

type ListProps = {
  topic: Array<topicType>;
  header: [string, number];
  listFocus: number;
  subItem: [string, number, number];
  setListFocus: (num: number) => void;
  setHeader: (arr: [string, number]) => void;
  setSubItem: (arr: [string, number, number]) => void;
  handleAddHeader: () => void;
  handleEditHeader: () => void;
  handleDeleteHeader: (num: number) => void;
  handleAddItem: () => void;
  handleEditItem: () => void;
  handleDeleteItem: (num1: number, num2: number) => void;
};

export default function TopicList({
  topic,
  header,
  listFocus,
  subItem,
  setHeader,
  setListFocus,
  setSubItem,
  handleAddHeader,
  handleEditHeader,
  handleDeleteHeader,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
}: ListProps) {
  return (
    <div className="article">
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
                <div className="topic_header_delete_div">
                  <AiOutlineClose
                    className="topic_header_delete"
                    onClick={() => handleDeleteHeader(topicIndex)}
                  />
                </div>
              )}
              {topicIndex !== header[1] ? (
                <div className="topic_header pad_true">
                  <div className="topic_header_text">{topicList.header}</div>
                  <AiOutlineEdit
                    size="20"
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
                {topicList.list.map((list, listIndex) => (
                  <li
                    key={list.text}
                    className={list.checked ? 'topic_item on' : 'topic_item'}
                  >
                    <div className="topic_item_delete_div">
                      <AiOutlineClose
                        className="topic_item_delete"
                        onClick={() => handleDeleteItem(topicIndex, listIndex)}
                      />
                    </div>
                    {subItem[1] === topicIndex && subItem[2] === listIndex ? (
                      <div className="topic_item_main">
                        <input
                          type="text"
                          className="topic_item_input"
                          placeholder={list.text}
                          onChange={(e) =>
                            setSubItem([e.target.value, topicIndex, listIndex])
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleEditItem();
                          }}
                          value={subItem[0]}
                          ref={(e) => e?.focus?.()}
                        />
                        <AiOutlineCheck
                          className="topic_item_edit"
                          onClick={() => handleEditItem()}
                        />
                      </div>
                    ) : (
                      <div className="topic_item_main">
                        <div className="topic_item_text">{list.text}</div>
                        <AiOutlineEdit
                          className="topic_item_edit"
                          onClick={() =>
                            setSubItem(['', topicIndex, listIndex])
                          }
                        />
                      </div>
                    )}
                  </li>
                ))}
                <div
                  className="topic_item add_item"
                  role="button"
                  tabIndex={-1}
                >
                  {subItem[1] === topicIndex && subItem[2] === -2 ? (
                    <div className="topic_item_main">
                      <input
                        type="text"
                        className="topic_item_input"
                        placeholder="Add The Topic"
                        onChange={(e) =>
                          setSubItem([e.target.value, topicIndex, -2])
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleAddItem();
                        }}
                        value={subItem[0]}
                        ref={(e) => e?.focus?.()}
                      />
                      <AiOutlineCheck
                        className="topic_item_edit"
                        onClick={() => handleAddItem()}
                      />
                    </div>
                  ) : (
                    <div className="topic_item_main">
                      <div className="topic_item_text">Add The Topic</div>
                      <AiOutlinePlus
                        className="topic_item_edit"
                        onClick={() => setSubItem(['', topicIndex, -2])}
                      />
                    </div>
                  )}
                </div>
              </li>
            </div>
          ))}

          <div className="topic_list add_list">
            {header[1] !== -2 ? (
              <div
                className="topic_header pad_true"
                role="button"
                tabIndex={-1}
                onClick={() => setHeader(['', -2])}
                onKeyDown={() => setHeader(['', -2])}
              >
                <div className="topic_header_text">Add The Topic</div>
                <AiOutlinePlus
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
