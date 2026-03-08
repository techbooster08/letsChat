const KeyboardSound = [
  new Audio("sounds/keystroke.mp3"),
  new Audio("sounds/keystroke2.mp3"),
  new Audio("sounds/keystroke3.mp3"),
  new Audio("sounds/keystroke4.mp3"),
];

export default function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound =
      KeyboardSound[Math.floor(Math.random() * KeyboardSound.length)];
    randomSound.currentTime = 0; // Reset the sound to the beginning
    randomSound.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  };

  return { playRandomKeyStrokeSound };
}
