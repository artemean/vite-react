import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import supabase from "./utils/supabase";

interface Name {
  id: number;
  created_at: string;
  name: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    getNames();
  }, []);

  async function getNames() {
    const { data, error } = await supabase.from("test_table").select();

    if (error) {
      console.error("Error fetching instruments:", error);
      return;
    }
    setNames(data || []);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Updated page</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <section>
        <ul>
          {names?.map((instrument) => (
            <li key={instrument.name}>{instrument.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
