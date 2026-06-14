import ReloadPrompt from "@/components/ReloadPrompt";
import MainLayout from "./components/mainLayout";
import DiceManager from "./components/Dice/DiceManager";

const App: React.FC = () => {
  return <>
    <MainLayout>
      <DiceManager />
    </MainLayout>
    <ReloadPrompt />
  </>;
}

export default App;
