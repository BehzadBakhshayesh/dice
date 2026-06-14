import { useState, useCallback, useRef } from "react";
import { useSound } from "@/hooks/useSound";
import type { DiceValue } from "./dice";
import Dice from "./dice";

export default function DiceManager({ count = 2 }: { count?: number }) {
  const play = useSound();
  const startTouch = useRef(0);
  const [values, setValues] = useState<DiceValue[]>(
    Array(count).fill(1) as DiceValue[]
  );
  const [rolling, setRolling] = useState(false);
  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      play()
      setValues(
        values.map(() => (Math.floor(Math.random() * 6) + 1) as DiceValue)
      );
      setRolling(false);
    }, 600);
  }, [rolling, values]);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const touchMove = e.touches[0].clientX;

    if (Math.abs(touchMove - startTouch.current) > 50) {
      roll();
    }
  };

  return (
    <div className="game-container">
      <div className="dice-row" onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
        {values.map((v, i) => (
          <Dice key={i} value={v} rolling={rolling} delay={i * 0.1} />
        ))}
      </div>

      <div className="controls">
        <button className="btn roll" onClick={roll} disabled={rolling}>
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}
