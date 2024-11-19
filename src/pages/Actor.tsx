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

import Logo from "../assets/logo.png";

const Home: React.FC = () => {
  const data = [
    "Mettre en avant mes offres",
    "Me formaliser",
    "Déclare mes ventes",
    "Cherche du financement",
    "M'inscrire au prochaine formation",
    "Intégrer un salon",
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-dvh flex flex-col">
          <div
            style={{ backgroundImage: `url(${Logo})` }}
            className="flex w-full h-1/4 bg-no-repeat bg-cover bg-center"
          />
          <div className="flex flex-grow ">
            <div className="grid grid-cols-2">
              {data.map((item, index) => (
                <div className="!flex items-center justify-center text-center text-sm m-2 bg-primary text-white rounded p-6">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
