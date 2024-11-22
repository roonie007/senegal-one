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

import acteur from "../assets/acteur-3.jpg";
import touriste from "../assets/touriste-2.jpg";

import Logo from "../assets/logo.png";

const Home: React.FC = () => {
  const history = useHistory();

  const goToTourist = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push("/tourist");
  };

  const goToActor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push("/actor");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-dvh flex flex-col items-center justify-center">
          <div
            className="c-pic c-pic-right-2 absolute  h-full w-full"
            style={{ backgroundImage: `url(${acteur})` }}
            onClick={goToActor}
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
            onClick={goToTourist}
          >
            <div className="size-full bg-black bg-opacity-60 flex relative justify-center active:bg-opacity-0 transition-all">
              <span className="absolute bottom-40 mx-auto text-5xl text-white">
                Touriste
              </span>
            </div>
          </div>
          <div className="absolute">
            <img src={Logo} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
