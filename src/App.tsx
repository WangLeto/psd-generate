import { useState } from "react";
import "./App.css";
import { readFixKey, writeFixKey } from "./fix-key";
import { generatePassword } from "./generate";

function App() {
  const [fixKey, setFixKey] = useState(readFixKey());
  const [content, setContent] = useState("");
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <h1 className="title">密码生成</h1>
      <div className="card">
        <div className="card-item">
          <div>盐</div>
          <input
            type="text"
            value={fixKey}
            onChange={(e) => setFixKey(e.target.value)}
            placeholder="输入盐（推荐）"
          />
          <button onClick={() => writeFixKey(fixKey)}>持久化</button>
        </div>
        <div className="card-item">
          <div>长度</div>
          <input
            type="number"
            placeholder="输入长度"
            min={6}
            max={14}
            style={{ width: 80 }}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="card-item">
          <div>启发内容</div>
          <input
            type="text"
            placeholder="输入内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="card-item">
          <button
            onClick={() =>
              generatePassword(fixKey, length, content).then(
                (psd) => {
                  setPassword(psd);
                  setError("");
                },
                (e) => setError(e.message)
              )
            }
          >
            生成
          </button>
        </div>
        <div className="card-item">
          <div>Password:</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(password);
            }}
          >
            {password ? (
              <div className="password">
                {password}
                <span className="copy">复制</span>
              </div>
            ) : (
              "nil"
            )}
          </div>
        </div>
      </div>
      {error && <div className="error">Error: {error}</div>}
    </>
  );
}

export default App;
