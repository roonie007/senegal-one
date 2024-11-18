import { Button } from "@nextui-org/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <Button color="primary">Explore Container</Button>
    </div>
  );
};

export default ExploreContainer;
