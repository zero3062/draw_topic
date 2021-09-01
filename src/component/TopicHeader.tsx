import { useHistory } from 'react-router-dom';

export default function TopicHeader() {
  const history = useHistory();

  const handlePushPage = (num: number): void => {
    let url = '/';
    if (num === 1) url = '/list';
    else if (num === 2) url = '/random';

    history.push(url);
  };

  return (
    <div className="article">
      <div className="header_article">
        <div className="header_main">Topic List</div>
        <div className="header_li">
          <li
            onKeyPress={() => handlePushPage(1)}
            onClick={() => handlePushPage(1)}
          >
            Topic List
          </li>
          <li
            onKeyPress={() => handlePushPage(2)}
            onClick={() => handlePushPage(2)}
          >
            Topic Random
          </li>
        </div>
      </div>
    </div>
  );
}
