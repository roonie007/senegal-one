import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="shadow">
        <div className="flex flex-col w-full items-center p-4 ">
          <div className="flex items-center w-full gap-x-4">
            <Input label="Destination" variant="flat" />

            <Button isIconOnly variant="bordered" radius="full" size="lg">
              <Icon icon="solar:tuning-4-outline" fontSize={24} />
            </Button>
          </div>

          <Button
            color="primary"
            variant="light"
            className="my-2"
            onClick={(e) => {
              e.preventDefault();
              history.push("/discover");
            }}
          >
            Discover Sénégal
          </Button>
        </div>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Home;
