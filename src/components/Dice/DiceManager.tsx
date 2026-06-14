import { useState, useCallback, useRef } from "react";
import { Dice, type DiceValue } from "./Dice";

export default function DiceManager({ count = 2 }: { count?: number }) {
  const startTouch = useRef(0);
  const [values, setValues] = useState<DiceValue[]>(
    Array(count).fill(1) as DiceValue[]
  );
  const [rolling, setRolling] = useState(false);
  // const [autoRoll, setAutoRoll] = useState(false);
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

  // useEffect(() => {
  //   let interval: any;
  //   if (autoRoll) {
  //     interval = setInterval(roll, 2000);
  //   }
  //   return () => clearInterval(interval);
  // }, [autoRoll, roll]);

  const handleTouchStart = (e) => {
    startTouch.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    const touchMove = e.touches[0].clientX;
    if (Math.abs(touchMove - startTouch.current) > 50) {
      roll()
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
      {/* <button
          className={`btn auto ${autoRoll ? "active" : ""}`}
          onClick={() => setAutoRoll(!autoRoll)}
        >
          {autoRoll ? "توقف خودکار" : "شروع خودکار"}
        </button> */}
      {/* <div className="total-score">
        total: {values.reduce((a, b) => a + b, 0)}
      </div> */}
    </div>
  );
}
