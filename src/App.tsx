import DiceManager from "@/components/dice/diceManager";
import ReloadPrompt from "@/components/ReloadPrompt";
import MainLayout from "./components/mainLayout";

const App: React.FC = () => {
  return <>
    <MainLayout>
      <DiceManager />
    </MainLayout>
    <ReloadPrompt />
  </>;
}

export default App;
