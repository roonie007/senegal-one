import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonPage,
} from "@ionic/react";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { CEvent, CStay } from "../types/cometrip";
import { $api } from "../utils";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Parallax, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/navigation";
import { useDebounce } from "use-debounce";
import DiscoverStay from "./DiscoverStay";

const Stays: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [list, setList] = useState<CStay[]>([]);

  const [text, setText] = useState("");
  const [regionIndex, setRegionIndex] = useState(-1);
  const [value] = useDebounce(text, 300);

  const [regions] = useState([
    {
      name: "Dakar",
      placeid: "ChIJcbvFs_VywQ4RH7JdLdkXfLE",
    },
    {
      name: "Diourbel",
      placeid: "ChIJOzHhdEMX6g4RMPMehxOKE-I",
    },
    {
      name: "Fatick",
      placeid: "ChIJX45VZO776Q4R1S2b4a77l5E",
    },
    {
      name: "Saint Louis",
      placeid: "ChIJBegeFFVWlQ4RZH5q8xIdHek",
    },
    {
      name: "Thiès",
      placeid: "ChIJv7Q3ypq_wQ4RawWjc0xvCFs",
    },
    {
      name: "Ziguinchor",
      placeid: "ChIJF9zL0NuT5w4R35l-4bIPuSU",
    },
    {
      name: "Podor",
      placeid: "ChIJLQs7U5l-kw4RIcZRIQ24vOY",
    },
    {
      name: "Kédougou",
      placeid: "ChIJiQd_j5Ys-g4R0Lrjcf8HoBE",
    },
    {
      name: "Tambacounda",
      placeid: "ChIJazc0lgjR7w4RdgnUvdrhAgc",
    },
    {
      name: "Matam",
      placeid: "ChIJu3v1lwCU8g4R3U2x_FeyMlo",
    },
  ]);

  const loadMoreData = async () => {
    setIsFetching(true);

    const {
      data: { properties: stays },
    } = await $api.post<{ properties: CStay[] }>("/search", {
      page,
      items: 12,
      name: value,
      placeid: regionIndex === -1 ? undefined : regions[regionIndex].placeid,
    });

    setList([...list, ...stays]);
    setPage(page + 1);
    setIsFetching(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (list.length === 0 && page === 1) {
      loadMoreData();
    }
  }, [list]);

  useEffect(() => {
    setRegionIndex(-1);
    setList([]);
    setPage(1);
  }, [value]);

  useEffect(() => {
    setList([]);
    setPage(1);
  }, [regionIndex]);

  return (
    <IonContent fullscreen>
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-y-4 w-full items-center">
          <div className="flex items-center w-full gap-x-4  p-4 pb-0">
            <Input label="Destination" variant="flat" onValueChange={setText} />

            <Button
              isIconOnly
              variant="bordered"
              radius="full"
              size="lg"
              color="primary"
            >
              <Icon icon="solar:user-bold" fontSize={24} />
            </Button>
          </div>

          {/* <Button
            color="primary"
            variant="light"
            className="my-2"
            onClick={(e) => {
              e.preventDefault();
              history.push("/discover");
            }}
          >
            Discover Sénégal
          </Button> */}
          <div className="w-full flex overflow-x-scroll gap-x-2 px-4 no-scrollbar">
            {regions.map((region, index) => (
              <Button
                color={regionIndex === index ? "primary" : "default"}
                onClick={() =>
                  setRegionIndex(regionIndex === index ? -1 : index)
                }
                key={region.placeid}
                className="min-w-fit"
              >
                {region.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col  flex-1 flex-shrink-0 ">
          <DiscoverStay placeid={regions[regionIndex]?.placeid} />
        </div>
      </div>
    </IonContent>
  );
};

export default Stays;
