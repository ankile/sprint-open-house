import { useState } from "react";

function App() {
  const [inputOpen, setInputOpen] = useState(true);
  const [people, setPeople] = useState({});
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url(https://sprint.no/assets/footer-shape.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
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
        <h1
          style={{
            color: "#854c9d",
            fontSize: "2.5em",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => setInputOpen(!inputOpen)}
        >
          Sprint Open House Annual Dart Competition '21
        </h1>
        <div
          style={{
            backgroundColor: "white",
            width: "50%",
            textAlign: "center",
            boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
            borderRadius: "20px",
          }}
        >
          <h2>{inputOpen ? "Foreløpig poengtabell" : "Resultat"}</h2>
          {inputOpen && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e);
                  setPeople({
                    ...people,
                    [Object.keys(people).length]: {
                      id: Object.keys(people).length,
                      name: e.target.person.value,
                      score: e.target.score.value,
                    },
                  });
                  e.target.person.value = "";
                  e.target.score.value = "";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <label style={{ textAlign: "left", paddingRight: "1em" }}>
                        Deltakernavn
                        <br />
                        <input name="person" />
                      </label>
                      <label style={{ textAlign: "left" }}>
                        Poengsum
                        <br />
                        <input type="number" name="score" />
                      </label>
                    </div>
                    <input type="submit" value="Legg til resultat" />
                  </div>
                </div>
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
