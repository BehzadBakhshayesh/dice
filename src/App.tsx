import DiceManager from "@/components/dice/DiceManager";
import ReloadPrompt from "@/components/ReloadPrompt";

const App: React.FC = () => {
  return <div className="app">
    <DiceManager />
    <ReloadPrompt />
  </div>;
}

export default App;
