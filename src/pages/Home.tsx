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

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-dvh flex flex-col items-center justify-center">
          <span className="mb-10">Je suis un </span>

          <Button
            color="primary"
            variant="light"
            onClick={(e) => {
              e.preventDefault();
              history.push("/stays");
            }}
          >
            Touriste
          </Button>
          <Button color="danger" variant="light">
            Acteur du secteur
          </Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
