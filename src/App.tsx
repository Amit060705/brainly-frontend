import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
function App() {
  return (
    <>
      <Button startIcon={<PlusIcon/>} size="sm" variant="primary" text="share"/>
      <Button size="md" variant="secondary" text="Add Content"/>
      <Button size="lg" variant="secondary" text="Add Content"/>
    </>
  );
}

export default App;