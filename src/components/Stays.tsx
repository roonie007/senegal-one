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

  const CometripCard = (data: CStay, index: number) => (
    <div
      key={`stay-${data._id}-${index}`}
      className="w-full aspect-square flex flex-col p-4 "
    >
      <Swiper
        key={`swipper-${data._id}-${index}`}
        modules={[Pagination, Parallax]}
        autoplay={false}
        className="h-5/6 w-full"
        slidesPerView={1}
        pagination={{
          bulletActiveClass: "bg-white opacity-100 !scale-110",
        }}
      >
        {data.media.pictures.map((image, index2) => {
          return (
            <SwiperSlide
              key={`swipper-slide-${data._id}-${index2}`}
              className="rounded-3xl size-full"
            >
              <div
                className="bg-cover bg-center size-full "
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col flex-grow justify-center items-start">
        <div className="font-semibold text-ellipsis overflow-hidden">
          {data.name}
        </div>
        <p className="line-clamp-1 text-sm">{data.adress}</p>
        <p className="text-sm">
          <span className="font-medium">{data.price} FCFA</span> par nuit
        </p>
      </div>
    </div>
  );

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

            {/* <Button isIconOnly variant="bordered" radius="full" size="lg">
                <Icon icon="solar:tuning-4-outline" fontSize={24} />
              </Button> */}
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
          {list.map((x, index) => CometripCard(x, index))}
          {list.length === 0 && !isFetching && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Icon icon="solar:sad-circle-linear" fontSize={48} />
              <span>Pas de logement disponible pour le moment</span>
            </div>
          )}

          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              if (isFetching || (list.length === 0 && page === 1)) {
                return;
              }
              loadMoreData();
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            <div className="infinite-scroll-content size-full flex items-center justify-center min-h-3">
              {isFetching && <Spinner />}
            </div>
          </IonInfiniteScroll>
        </div>
      </div>
    </IonContent>
  );
};

export default Stays;
