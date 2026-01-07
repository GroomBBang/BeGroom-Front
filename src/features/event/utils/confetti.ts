import confetti from 'canvas-confetti';

// 1. 워커를 사용하지 않는 전용 인스턴스를 생성합니다.
// undefined를 넣으면 전역 캔버스(화면 전체)를 사용한다는 뜻입니다.
const fireConfetti = confetti.create(undefined, {
  resize: true,
  useWorker: false, // 👈 여기서 설정을 박아버리면 절대 워커를 쓰지 않습니다.
});

export const triggerCoinExplosion = () => {
  const coinColors = ['#FFD700', '#FFA500', '#FFB90F', '#FFC125'];

  // 2. 이제 confetti() 대신 우리가 만든 fireConfetti()를 사용합니다.
  fireConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 },
    colors: coinColors,
    shapes: ['circle'],
    gravity: 1.2,
    startVelocity: 45,
    scalar: 1.2,
    drift: 0,
    ticks: 300,
    disableForReducedMotion: true,
  });

  // 2차 폭발
  setTimeout(() => {
    fireSideCannons(coinColors);
  }, 200);
};

const fireSideCannons = (colors: string[]) => {
  const defaults = {
    spread: 60,
    ticks: 200,
    gravity: 1.5,
    colors: colors,
    shapes: ['circle' as const],
    scalar: 1.1,
    startVelocity: 35,
  };

  // 왼쪽에서 오른쪽 위로
  confetti({
    ...defaults,
    particleCount: 50,
    angle: 60,
    origin: { x: 0, y: 0.9 },
  });

  // 오른쪽에서 왼쪽 위로
  confetti({
    ...defaults,
    particleCount: 50,
    angle: 120,
    origin: { x: 1, y: 0.9 },
  });
};
