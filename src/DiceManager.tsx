import { useState, useEffect, useCallback } from "react";
import { Dice, type DiceValue } from "./Dice";

export default function DiceManager({ count = 2 }: { count?: number }) {
  const [values, setValues] = useState<DiceValue[]>(
    Array(count).fill(1) as DiceValue[]
  );
  const [rolling, setRolling] = useState(false);
  const [autoRoll, setAutoRoll] = useState(false);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      setValues(
        values.map(() => (Math.floor(Math.random() * 6) + 1) as DiceValue)
      );
      setRolling(false);
    }, 600);
  }, [rolling, values]);

  useEffect(() => {
    let interval: any;
    if (autoRoll) {
      interval = setInterval(roll, 2000);
    }
    return () => clearInterval(interval);
  }, [autoRoll, roll]);

  return (
    <div className="game-container">
      <div className="dice-row">
        {values.map((v, i) => (
          <Dice key={i} value={v} rolling={rolling} delay={i * 0.1} />
        ))}
      </div>

      <div className="controls">
        <button className="btn roll" onClick={roll} disabled={rolling}>
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>

        {/* <button
          className={`btn auto ${autoRoll ? "active" : ""}`}
          onClick={() => setAutoRoll(!autoRoll)}
        >
          {autoRoll ? "توقف خودکار" : "شروع خودکار"}
        </button> */}
      </div>

      {/* <div className="total-score">
        total: {values.reduce((a, b) => a + b, 0)}
      </div> */}
    </div>
  );
}
