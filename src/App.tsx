import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Quizz from "./Quizz.png";

interface Quizzobj {
  category: string;
  correct_answer: string;
  difficulty: string;
  type: string;
  incorrect_answers: [];
  question: string;
}

const App: React.FC = () => {
  let [store, setStore] = useState<Quizzobj[]>([]);
  let [userans, setUserans] = useState<string>("");
  let [correctans, setCorrectans] = useState<string>();

  async function getData() {
    let storedata = await axios.get("https://opentdb.com/api.php?amount=1");
    setStore(storedata.data.results);
    setCorrectans("");
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(store);
  function handleresult() {
    if (userans === "") {
      alert("Answer can't be empty");
      return;
    }
    let correct = store[0].correct_answer;

    if (userans === correct) {
      setCorrectans("correct");
    } else {
      setCorrectans("incorrect");
    }
    setUserans("");
  }

  return (
    <div className="App">
      {store.map((element, index) => (
        <div key={index + index}>
          <>
            <div className="header-style">
              <div style={{ margin: "auto 1rem" }}>
                <img src={Quizz} alt="logo" style={{ marginTop: "8px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "12%",
                  margin: "auto 1rem",
                }}
              >
                <div className="main-btn">
                  <h4>Log in</h4>
                </div>
                <div className="main-btn">
                  <h4>Sign up</h4>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <span>
                <h5>category: {element.category}</h5>
              </span>
              <span>
                <h5>difficulty: {element.difficulty}</h5>
              </span>
              <span>
                <h5>type: {element.type}</h5>
              </span>
            </div>
            <>
              <h3>Question: {element.question}</h3>
              <div>
                <input
                  type="text"
                  placeholder="please write your answer"
                  style={{
                    width: "500px",
                    height: "70px",
                    textAlign: "center",
                    borderRadius: "15px",
                  }}
                  onChange={(e) => setUserans(e.target.value)}
                  value={userans}
                />
              </div>
              <div style={{ marginTop: "60px" }}>
                <div className="btn1" onClick={handleresult}>
                  Submit Answer
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Your answer is :</span>
                  <span>
                    <h4
                      style={{
                        backgroundColor:
                          correctans === "correct"
                            ? "green"
                            : correctans === "incorrect"
                            ? "red"
                            : "white",
                        marginTop: "15px",
                        color: "white",
                        padding: "0.5rem",
                      }}
                    >
                      {correctans}
                    </h4>
                  </span>
                </div>
                <div className="btn2" onClick={() => getData()}>
                  Next Question
                </div>
              </div>
            </>
          </>
        </div>
      ))}
    </div>
  );
};

export default App;
