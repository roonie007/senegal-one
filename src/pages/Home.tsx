import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Button } from "@nextui-org/react";
import { useHistory } from "react-router-dom";

import acteur from "../assets/acteur-2.jpg";
import touriste from "../assets/touriste-2.jpg";

const Home: React.FC = () => {
  const history = useHistory();

  const goToStays = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push("/stays");
  };

  const goToDiscover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push("/discover");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-dvh flex flex-col items-center justify-center">
          <div
            className="c-pic c-pic-right absolute  h-full w-full"
            style={{ backgroundImage: `url(${acteur})` }}
            onClick={goToDiscover}
          >
            <div className="size-full bg-black bg-opacity-60 flex relative justify-center active:bg-opacity-0 transition-all">
              <span className="absolute top-40 mx-auto text-5xl text-white">
                Acteur
              </span>
            </div>
          </div>
          <div
            className="c-pic c-pic-left absolute h-full w-full"
            style={{ backgroundImage: `url(${touriste})` }}
            onClick={goToStays}
          >
            <div className="size-full bg-black bg-opacity-60 flex relative justify-center active:bg-opacity-0 transition-all">
              <span className="absolute bottom-40 mx-auto text-5xl text-white">
                Touriste
              </span>
            </div>
          </div>
          <div className="absolute flex justify-center items-center bg-white h-3 w-[800px] rotate-[24deg] blur-[4px]">
            {/* <div className="bg-white rounded-full h-12 w-12 flex justify-center items-center">
              OU
            </div> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
