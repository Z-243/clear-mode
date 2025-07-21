import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Grid from "./components/Grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <main>
        <Hero />
        <Grid />
      </main>
    </Layout>
  );
}

export default App;
