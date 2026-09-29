import { Composition } from "remotion";
import { SurveyLoop } from "./SurveyLoop";
import { ProjectRoutes } from "./ProjectRoutes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="SurveyLoop" component={SurveyLoop} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="ProjectRoutes" component={ProjectRoutes} durationInFrames={360} fps={30} width={1920} height={1080} />
    </>
  );
};
