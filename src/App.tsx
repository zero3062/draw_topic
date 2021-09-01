import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as toastr from 'toastr';

import List from './component/TopicList';
import Random from './component/TopicRandom';
import Header from './component/TopicHeader';

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

function App() {
  const [topic, setTopic] = useState<Array<topicType>>([]);
  const [header, setHeader] = useState<[string, number]>(['', -1]); // 첫번째 인자는 바뀐 값, 두번째 인자는 topic Index
  const [listFocus, setListFocus] = useState(-1); // 몇번째 topic에 포커싱 중인지 나타내는 숫자형 변수

  // 첫번째 인자는 바뀐값, 두번째 인자는 topic Index, 세번째 인자는 topic item Index
  const [subItem, setSubItem] = useState<[string, number, number]>([
    '',
    -1,
    -1,
  ]);

  // topic 생성
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

  // topic 이름 변경
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

  // topic 삭제
  const handleDeleteHeader = (topicIndex: number): void => {
    const topicSample = topic
      .filter((item, index) => index !== topicIndex)
      .map((item, index) =>
        item.id - 1 !== index ? { ...item, id: index + 1 } : item,
      );

    setTopic(topicSample);
  };

  // topic item 생성
  const handleAddItem = (): void => {
    const [text, topicIndex] = [subItem[0], subItem[1]];

    if (
      text !== '' &&
      topic[topicIndex].list.findIndex((obj) => obj.text === text) === -1
    ) {
      const sampleTopic = topic.map((tItem, tIndex) =>
        tIndex === topicIndex
          ? {
              ...tItem,
              list: tItem.list.concat({
                id: topic[topicIndex].list.length + 1,
                text,
                checked: false,
              }),
            }
          : tItem,
      );

      setTopic(sampleTopic);
    } else if (
      topic[topicIndex].list.findIndex((obj) => obj.text === text) !== -1
    ) {
      toastr.error('같은 이름의 내용이 있습니다.');
    } else if (text === '') {
      toastr.error('내용을 입력해주세요.');
    }

    setSubItem(['', -1, -1]);
  };

  // topic item 내용 변경
  const handleEditItem = (): void => {
    const [text, topicIndex, listIndex] = subItem;

    if (
      text !== '' &&
      topic[topicIndex].list.findIndex((obj) => obj.text === text) === -1
    ) {
      setTopic(
        topic.map((tItem, tIndex) =>
          tIndex === topicIndex
            ? {
                ...tItem,
                list: tItem.list.map((item, index) =>
                  index === listIndex ? { ...item, text } : item,
                ),
              }
            : tItem,
        ),
      );
    } else if (
      topic[topicIndex].list.findIndex((obj) => obj.text === text) !== -1
    ) {
      toastr.error('같은 이름의 내용이 있습니다.');
    } else if (text === '') {
      toastr.error('내용을 입력해주세요.');
    }

    setSubItem(['', -1, -1]);
  };

  // topic item 삭제
  const handleDeleteItem = (topicIndex: number, listIndex: number): void => {
    const topicSample = topic.map((topicItem, index) =>
      index === topicIndex
        ? {
            ...topicItem,
            list: topicItem.list
              .filter(
                (listItem, listFilterIndex) => listFilterIndex !== listIndex,
              )
              .map((listItem, listMapIndex) =>
                listItem.id - 1 !== listMapIndex
                  ? { ...listItem, id: listMapIndex + 1 }
                  : listItem,
              ),
          }
        : topicItem,
    );

    setTopic(topicSample);
  };

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" />
          <Route
            path="/list"
            render={() => (
              <List
                topic={topic}
                header={header}
                listFocus={listFocus}
                subItem={subItem}
                setListFocus={(num: number): void => setListFocus(num)}
                setHeader={(arr: [string, number]): void => setHeader(arr)}
                setSubItem={(arr: [string, number, number]): void =>
                  setSubItem(arr)
                }
                handleAddHeader={(): void => handleAddHeader()}
                handleEditHeader={(): void => handleEditHeader()}
                handleDeleteHeader={(num: number): void =>
                  handleDeleteHeader(num)
                }
                handleAddItem={(): void => handleAddItem()}
                handleEditItem={(): void => handleEditItem()}
                handleDeleteItem={(num1: number, num2: number): void =>
                  handleDeleteItem(num1, num2)
                }
              />
            )}
          />
          <Route path="/random" render={() => <Random topic={topic} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
