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

import { Pagination, Parallax } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { useDebounce } from "use-debounce";

const Home: React.FC = () => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [list, setList] = useState<CStay[]>([]);

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 300);

  const loadMoreData = async () => {
    setIsFetching(true);

    const {
      data: { properties: stays },
    } = await $api.post<{ properties: CStay[] }>("/search", {
      page,
      items: 12,
      name: value,
    });

    setList([...list, ...stays]);
    setPage(page + 1);
    setIsFetching(false);
  };

  const CometripCard = (data: CStay) => (
    <div key={data._id} className="w-full aspect-square flex flex-col p-4 ">
      <Swiper
        modules={[Pagination, Parallax]}
        autoplay={false}
        className="h-5/6 w-full"
        slidesPerView={1}
        pagination={{
          bulletActiveClass: "bg-white opacity-100 !scale-110",
        }}
      >
        {data.media.pictures.map((image, index) => {
          return (
            <SwiperSlide className="rounded-3xl">
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
    if (list.length === 0) {
      loadMoreData();
    }
  }, [list]);

  useEffect(() => {
    setList([]);
    setPage(1);
  }, [value]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col w-full items-center p-4 pb-0 ">
          <div className="flex items-center w-full gap-x-4">
            <Input label="Destination" variant="flat" onValueChange={setText} />

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

        <div>
          {list.map((x) => CometripCard(x))}

          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              loadMoreData();
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            <div className="infinite-scroll-content size-full flex items-center justify-center my-8 min-h-3">
              {isFetching && <Spinner />}
            </div>
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
