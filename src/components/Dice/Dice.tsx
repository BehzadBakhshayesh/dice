import { motion, type Transition } from "framer-motion";
import "./style.css";

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

interface DiceProps {
  value: DiceValue;
  rolling: boolean;
  delay?: number;
}

const faceRotation: Record<DiceValue, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 90, y: 0 },
  4: { x: -90, y: 0 },
  5: { x: 0, y: 90 },
  6: { x: 180, y: 0 },
};

const Dots: React.FC<{ value: DiceValue }> = ({ value }) => {
  const dotMap: Record<DiceValue, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="dot-cell">
          {dotMap[value].includes(i) && <div className="dot" />}
        </div>
      ))}
    </>
  );
}

const Dice: React.FC<DiceProps> = ({ value, rolling, delay = 0 }) => {
  const springTransition: Transition<any>
    = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: delay,
  };

  return (
    <div className="dice-scene">
      <motion.div
        className="dice-shadow"
        animate={{
          scale: rolling ? [1, 1.2, 1] : 1,
          opacity: rolling ? [0.2, 0.1, 0.2] : 0.3,
        }}
        transition={{ duration: 0.6, repeat: rolling ? Infinity : 0 }}
      />

      <motion.div
        className="dice-container"
        animate={
          rolling
            ? {
              y: [0, -100, 0],
              rotateX: [0, 720, 1080],
              rotateY: [0, 360, 720],
            }
            : {
              y: 0,
              rotateX: faceRotation[value].x,
              rotateY: faceRotation[value].y,
            }
        }
        transition={
          rolling ? { duration: 0.6, ease: "easeInOut" } : springTransition
        }
      >
        <div className="cube">
          {[1, 2, 3, 4, 5, 6].map((face) => (
            <div key={face} className={`face face-${face}`}>
              <div className="dot-grid">
                <Dots value={face as DiceValue} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dice