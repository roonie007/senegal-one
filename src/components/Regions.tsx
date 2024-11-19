import { IonContent } from "@ionic/react";
import { Divider } from "@nextui-org/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Regions = ({ onSelected }: { onSelected: (placeid: string) => void }) => {
  const data = [
    {
      size: 64,
      name: "Dakar",
      placeid: "ChIJcbvFs_VywQ4RH7JdLdkXfLE",
      image:
        "https://image.noelshack.com/fichiers/2024/47/2/1732011610-dakar.jpg",
    },
    {
      size: 60,
      name: "Casamance",
      placeid: "ChIJF9zL0NuT5w4R35l-4bIPuSU",
      image:
        "https://image.noelshack.com/fichiers/2024/47/2/1732013799-casamance.jpg",
    },
    {
      name: "Kédougou",
      size: 72,
      placeid: "ChIJiQd_j5Ys-g4R0Lrjcf8HoBE",
      image: "https://i.imghippo.com/files/ohS2830Yo.png",
    },
    {
      name: "Saint Louis",
      size: 72,
      placeid: "ChIJBegeFFVWlQ4RZH5q8xIdHek",
      image: "https://i.imghippo.com/files/yAS1175jCw.jpg",
    },
    {
      name: "Diourbel",
      size: 80,
      placeid: "ChIJOzHhdEMX6g4RMPMehxOKE-I",
      image: "https://i.ibb.co/BGcTXWb/diourbel.jpg",
    },
    {
      name: "Fatick",
      size: 72,
      placeid: "ChIJX45VZO776Q4R1S2b4a77l5E",
      image: "https://i.imghippo.com/files/rnC4878Gm.jpg",
    },
    {
      name: "Thiès",
      size: 56,
      placeid: "ChIJv7Q3ypq_wQ4RawWjc0xvCFs",
      image: "https://i.ibb.co/ZTYh3dy/Thies.jpg",
    },
    {
      name: "Ziguinchor",
      size: 80,
      placeid: "ChIJF9zL0NuT5w4R35l-4bIPuSU",
      image: "https://i.imghippo.com/files/jvFZ7744yP.jpg",
    },
    {
      name: "Podor",
      size: 72,
      placeid: "ChIJLQs7U5l-kw4RIcZRIQ24vOY",
      image: "https://i.ibb.co/YLYL5Lq/podor.jpg",
    },
    {
      name: "Tambacounda",
      size: 80,
      placeid: "ChIJazc0lgjR7w4RdgnUvdrhAgc",
      image: "https://i.imghippo.com/files/zHJu6389yTw.jpg",
    },
    {
      name: "Matam",
      size: 80,
      placeid: "ChIJu3v1lwCU8g4R3U2x_FeyMlo",
      image: "https://i.imghippo.com/files/MJr3297RI.jpg",
    },
  ];

  const randomNumberFromArray = (
    array: number[] = [52, 56, 60, 64, 72, 80]
  ) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  return (
    <Masonry columnsCount={2} gutter="4px">
      {data.map((x, index) => (
        <div
          key={x.name}
          style={{ backgroundImage: `url(${x.image})` }}
          className={`w-full min-h-${x.size} bg-center bg-cover`}
          onClick={() => onSelected(x.placeid)}
        >
          <div className="size-full bg-black bg-opacity-40 text-white flex justify-center items-center">
            <h1 className="text-xl font-bold">{x.name}</h1>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default Regions;
