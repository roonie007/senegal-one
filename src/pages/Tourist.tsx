import {
  IonPage,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import Stays from "../components/Stays";
import Discover from "../components/Discover";
import { Icon } from "@iconify/react";

const Tourist: React.FC = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonTab tab="stays">
          <Stays />
        </IonTab>
        <IonTab tab="discover">{<Discover />}</IonTab>

        <IonTabBar slot="bottom">
          <IonTabButton tab="stays">
            <Icon icon="solar:home-2-linear" fontSize={24} />
            Logement
          </IonTabButton>
          <IonTabButton tab="discover">
            <Icon icon="solar:confetti-minimalistic-linear" fontSize={24} />
            Découvertes
          </IonTabButton>
          <IonTabButton tab="chat">
            <Icon icon="solar:chat-dots-outline" fontSize={24} />
            Messagerie
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tourist;
