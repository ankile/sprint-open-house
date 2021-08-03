import { useState } from "react";

function App() {
  const [inputOpen, setInputOpen] = useState(true);
  const [people, setPeople] = useState({});
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "50%",
            textAlign: "center",
            boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
            borderRadius: "20px",
          }}
        >
          <h1
            style={{
              color: "#854c9d",
              fontSize: "3.5em",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setInputOpen(!inputOpen)}
          >
            Sprint Open House
          </h1>

          {inputOpen && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPeople({
                    ...people,
                    [Object.keys(people).length]: {
                      id: Object.keys(people).length,
                      name: e.target[0].value,
                      score: 0,
                    },
                  });
                  e.target[0].value = "";
                }}
              >
                <input name="peopleInput" />
                <input type="submit" value="Legg til" />
              </form>
            </div>
          )}

          <div
            style={{
              padding: "1em 3em 2em",
            }}
          >
            {Object.keys(people).length < 1 ? (
              "Legg til spillere i boksen over"
            ) : (
              <table
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontSize: "1.5em",
                  userSelect: "none",
                }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Navn</th>
                    <th style={{ textAlign: "right" }}>Poeng</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(people)
                    .sort((p1, p2) => p2.score - p1.score)
                    .map((p, i) => (
                      <tr key={p.id}>
                        <td
                          onClick={() =>
                            setPeople({
                              ...people,
                              [p.id]: { ...p, score: p.score + 1 },
                            })
                          }
                          style={{
                            textAlign: "center",
                            fontSize: "1.5em",
                            cursor: "pointer",
                          }}
                        >
                          {i === 0
                            ? "🥇"
                            : i === 1
                            ? "🥈"
                            : i === 2
                            ? "🥉"
                            : i + 1}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setPeople({
                              ...people,
                              [p.id]: { ...p, score: p.score - 1 },
                            })
                          }
                        >
                          {p.name}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            cursor: "not-allowed",
                          }}
                          onDoubleClick={() => {
                            if (
                              window.confirm("Vil du slette denne spilleren?")
                            ) {
                              let newPeople = { ...people };
                              delete newPeople[p.id];
                              setPeople(newPeople);
                            }
                          }}
                        >
                          {p.score}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
