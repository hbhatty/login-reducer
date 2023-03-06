import { useReducer, useState } from "react";
import "./App.css";

const logIn = (state, action) => {
  //action object with property with type, string that acts as a label for state
  switch (action.type) {
    //our case for input fields, e.g username and password
    case "field": {
      return {
        //copy of current state
        ...state,
        //equivalent of getting the input of the field
        [action.fieldName]: action.payload,
      };
    }
    //in case of user log in, set the error msg to empty string
    case "logIn": {
      return {
        ...state,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        log: true,
        password: "",
      };
    }
    case "error": {
      return {
        ...state,
        error: "Incorrect username/password",
        log: false,
        username: "",
        password: "",
      };
    }
    case "logout": {
      return {
        ...state,
        log: false,
      };
    }
    default:
      return state;
  }
};

function App() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [log, setLog] = useState(false)
  // const [error, setError] = useState("")
  const [state, dispatch] = useReducer(logIn, {
    username: "",
    password: "",
    log: false,
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "logIn" });
    try {
      //with usereducer the state is an object, so we have to do state.username
      if (state.username === "lol" && state.password === "cool") {
        dispatch({ type: "success" });
        alert("logged in");
      } else {
        throw Error;
      }
      // setPassword("");
    } catch (error) {
      dispatch({ type: "error" });
      // setError("Incorrect username/password");
      // setUsername("");
      // setPassword("");
    }
  };
  return (
    <>
      <h1 className="text-center text-3xl font semi-bold">Login Form</h1>
      <div>
        {state.log ? (
          <>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-center text-3xl mt-4 py-2">
                Welecome {state.username}!
              </h2>
              <button
                className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3"
                onClick={() => {
                  // setLog(false);
                  dispatch({ type: "logout" });
                }}
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <form
            className="flex flex-col items-center justify-center gap-4 mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <input
              className="border rounded-lg px-2 py-1"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={state.username}
              //equivalent to setUsername(e.target.value)
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.target.value
                })
              }
            />
            <input
              className="border rounded-lg px-2 py-1"
              type="text"
              autoComplete="password"
              placeholder="Password"
              value={state.password}
              //equivalent to setPassword(e.target.value)
              onChange={(e) => dispatch({type: "field", fieldName: "password", payload: e.target.value})}
            />
            <button
              className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3"
              type="submit"
            >
              Login
            </button>
            <p className="text-red-500 text-center">{state.log ? null : state.error}</p>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
