import React, { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { COUNTRYEMOJI } from "../../assets/data";

const Confetti = ({ hasWon, guessedCountries, supportsFlagEmoji }) => {
  let flags = "";
  if (supportsFlagEmoji) {
    flags = guessedCountries.map((code) => COUNTRYEMOJI[code] || "");
  }

  //prettier-ignore
  const particles = { autoplay: false, fullScreen: { zIndex: 1, }, emitters: [ { life: { count: 1, duration: 1, }, position: { x: 0, y: 30, }, rate: { quantity: 3, delay: 0.1, }, particles: { move: { direction: "top-right", outModes: { top: "none", left: "none", default: "destroy", }, }, }, }, { life: { count: 1, duration: 1, }, position: { x: 100, y: 30, }, rate: { quantity: 3, delay: 0.1, }, particles: { move: { direction: "top-left", outModes: { top: "none", right: "none", default: "destroy", }, }, }, }, ], particles: { color: { value: ["#DD317C", "#C03388", "#A43594", "#8837A1", "#503BBA"], }, move: { decay: 0.03, direction: "top", enable: true, gravity: { enable: true, acceleration: 25, }, outModes: { top: "none", default: "destroy", }, speed: { min: 20, max: 50, }, }, rotate: { value: { min: 0, max: 360, }, direction: "random", animation: { enable: true, speed: 25, }, }, size: { value: { min: 4, max: 8, }, }, wobble: { distance: 10, enable: true, speed: { min: -10, max: 10, }, }, shape: { type: ["circle", "square", "emoji", "emoji"], options: { emoji: { particles: { size: { value: 40, }, }, value: flags, }, }, }, }, };

  useEffect(() => {
    if (hasWon) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });
    }
  }, [hasWon]);

  return <>{hasWon && <Particles options={particles} />}</>;
};

export default Confetti;
