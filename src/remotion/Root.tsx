import { Composition } from "remotion";
import { HelloAretus } from "./HelloAretus";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HelloAretus"
      component={HelloAretus}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
