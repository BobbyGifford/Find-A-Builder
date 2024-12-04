import { useEffect } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  useEffect(() => {
    let ignore = false;
    fetch("http://localhost:3000/builder_posts")
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          console.log(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Button variant='secondary'>Cancel</Button>
      <Button>Nice</Button>
    </>
  );
}

export default App;
