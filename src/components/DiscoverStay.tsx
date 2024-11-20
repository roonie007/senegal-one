import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";
import { Button, Divider, Input, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { $api } from "../utils";
import { CCar, CEvent, CometripData, CStay } from "../types/cometrip";
import { shuffle } from "fast-shuffle";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import wait from "wait";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { useWindowSize } from "@uidotdev/usehooks";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Pagination, Parallax } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/parallax";

const DiscoverStay = ({ placeid }: { placeid?: string } = {}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>();

  const size = useWindowSize();
  const history = useHistory();

  const [list, setList] = useState<Array<CometripData>>([]);
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState("stays");

  const [isMasonry, setIsMasonry] = useState(true);
  const [currentSliderIndex, setCurrentSliderIndex] = useState<number>(0);

  const [isFetching, setIsFetching] = useState(false);

  const onTabChange = async (key: string) => {
    setIsMasonry(true);
    setSelected(key);
    setPage(1);
    setList([]);
  };

  useEffect(() => {
    if (list.length === 0 && isFetching === false && page === 1) {
      loadMoreData(selected);
    }
  }, [list]);

  const loadMoreData = async (key: string) => {
    setIsFetching(true);

    let data: CometripData[] = [];

    if (
      key === "events" ||
      key === "Culture" ||
      key === "Bien être" ||
      key === "Nouveautés" ||
      key === "Parc" ||
      key === "Bateau"
    ) {
      const {
        data: { events },
      } = await $api.post<{ events: CEvent[] }>("/search/events", {
        page,
        items: 12,
      });

      data = events.map((x) => ({ ...x, type: "event" }));
    } else if (key === "cars") {
      const {
        data: { cars },
      } = await $api.post<{ cars: CCar[] }>("/search/cars", {
        page,
        items: 12,
      });

      data = cars.map((x) => ({ ...x, type: "car" }));
    } else if (key === "stays") {
      const {
        data: { properties: stays },
      } = await $api.post<{ properties: CStay[] }>("/search", {
        page,
        items: 12,
        placeid,
      });

      data = stays.map((x) => ({ ...x, type: "stay" }));
    }

    setList([...list, ...data]);
    setPage(page + 1);
    setIsFetching(false);
  };

  const getImages = (data: CometripData) => {
    if (data.type === "event") return data.pictures;
    if (data.type === "car") return [data.picture];
    if (data.type === "stay") return data.media.pictures;

    return [];
  };

  const CometripCardStay = (data: CStay, index: number) => (
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

  const CometripCard = (data: CometripData, index: number) => {
    if (data.type === "stay") {
      return CometripCardStay(data as CStay, index);
    }

    return (
      <div
        id={`items-${data._id}`}
        key={data._id}
        onClick={() => {
          setIsMasonry(false);
          setCurrentSliderIndex(index);
        }}
      >
        <img src={getImages(data)[0]} alt={data.name} />
      </div>
    );
  };

  // const Caption = ({ data }: { data: CometripData }) => {
  //   if (data.type === "stay") {
  //     return (
  //       <p className="line-clamp-1 text-xs text-gray-500">{data.adress}</p>
  //     );
  //   } else if (data.type === "car" && data?.brand?.name) {
  //     return (
  //       <p className="line-clamp-1 text-xs text-gray-500">
  //         {data?.brand?.name}
  //       </p>
  //     );
  //   }

  //   return <span> </span>;
  // };

  // const CometripCardSlider = (data: CometripData) => {
  //   const images = getImages(data);

  //   return (
  //     <div
  //       id={`items-${data._id}`}
  //       key={data._id}
  //       className="flex flex-col h-svh "
  //     >
  //       <Swiper
  //         modules={[Pagination, Parallax]}
  //         pagination={{
  //           bulletActiveClass: "bg-white opacity-100 !scale-110",
  //         }}
  //         autoplay={false}
  //         className="h-4/6 w-full"
  //         slidesPerView={1}
  //       >
  //         {images.map((image, index) => {
  //           return (
  //             <SwiperSlide>
  //               <div
  //                 className="bg-cover bg-center size-full"
  //                 style={{ backgroundImage: `url(${image})` }}
  //               ></div>
  //             </SwiperSlide>
  //           );
  //         })}
  //       </Swiper>
  //       <div className="relative flex flex-col flex-grow text-white justify-center items-center px-2 py-4">
  //         <div className="relative -top-6 flex flex-col justify-center items-center">
  //           <div className="text-white text-center text-ellipsis overflow-hidden text-large">
  //             {data.name}
  //           </div>
  //           <Caption data={data} />
  //           <p className="line-clamp-2 text-sm mt-4 text-center">
  //             {data.description}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const CometripCardList = () => {
    if (list.length === 0) {
      if (isFetching) {
        return (
          <div className="size-full flex items-center justify-center">
            <Spinner />
          </div>
        );
      } else {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Icon icon="solar:sad-circle-linear" fontSize={48} />
            <span>Pas de logement disponible pour le moment</span>
          </div>
        );
      }
    }

    return (
      <div>
        <Masonry gutter={isMasonry ? "4px" : "0px"} columnsCount={1}>
          {list.map((x, index) => CometripCard(x, index))}
        </Masonry>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            loadMoreData(selected);
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <div className="infinite-scroll-content size-full flex items-center justify-center my-8 min-h-3">
            {isFetching && <Spinner />}
          </div>
        </IonInfiniteScroll>
      </div>
    );
  };

  // const CometripCardListSlider = () => {
  //   return (
  //     <div className="fixed top-0 left-0 h-svh w-screen bg-black">
  //       <Swiper
  //         autoplay={false}
  //         onInit={(swiper) => (swiper.activeIndex = currentSliderIndex)}
  //         slidesPerView={1}
  //         direction="vertical"
  //         height={size.height}
  //       >
  //         {list.map((x, index) => {
  //           return <SwiperSlide>{CometripCardSlider(x)}</SwiperSlide>;
  //         })}
  //       </Swiper>
  //       <div className="absolute top-2 right-2  bg-black z-10 size-fit flex h-6 w-6 items-center justify-center rounded-full">
  //         <Button
  //           isIconOnly
  //           radius="full"
  //           size="lg"
  //           onClick={() => setIsMasonry(true)}
  //           className=" text-white "
  //           variant="light"
  //         >
  //           <Icon icon="solar:close-circle-bold" fontSize={30} />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  const TabIcon = (title: string) => {
    let CurrentIcon = <Icon icon="solar:home-2-linear" fontSize={24} />;

    if (title === "Événements") {
      CurrentIcon = <Icon icon="solar:rocket-linear" fontSize={24} />;
    } else if (title === "Voitures") {
      CurrentIcon = <Icon icon="solar:wheel-linear" fontSize={24} />;
    } else if (title === "Culture") {
      CurrentIcon = <Icon icon="solar:book-2-linear" fontSize={24} />;
    } else if (title === "Bien être") {
      CurrentIcon = <Icon icon="solar:accessibility-linear" fontSize={24} />;
    } else if (title === "Nouveautés") {
      CurrentIcon = <Icon icon="solar:star-linear" fontSize={24} />;
    } else if (title === "Parc") {
      CurrentIcon = <Icon icon="solar:leaf-linear" fontSize={24} />;
    } else if (title === "Bateau") {
      CurrentIcon = <Icon icon="solar:water-linear" fontSize={24} />;
    }

    return (
      <div className="flex items-center justify-center !h-8 gap-x-2">
        {CurrentIcon}
        <span className="text-sm">{title}</span>
      </div>
    );
  };

  useEffect(() => {
    loadMoreData(selected);
  }, []);

  useEffect(() => {
    setIsMasonry(true);
    setPage(1);
    setList([]);
  }, [placeid]);

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={(key) => onTabChange(key.toString())}
      classNames={{
        base: "w-full py-2 ",
        tabList: "w-full bg-transparent",
        tab: "h-auto",
        cursor: "shadow bg-slate-50",
        panel: "px-0 pt-0 flex flex-col flex-grow flex-shrink-0",
      }}
    >
      <Tab key="stays" title={TabIcon("Logements")}>
        <CometripCardList />
        {/* {isMasonry === false && <CometripCardListSlider />} */}
      </Tab>
      <Tab key="events" title={TabIcon("Événements")}>
        <CometripCardList />
        {/* {isMasonry === false && <CometripCardListSlider />} */}
      </Tab>
      <Tab key="cars" title={TabIcon("Voitures")}>
        <CometripCardList />
        {/* {isMasonry === false && <CometripCardListSlider />} */}
      </Tab>
      <Tab key="Culture" title={TabIcon("Culture")}>
        <CometripCardList />
      </Tab>
      <Tab key="Bien être" title={TabIcon("Bien être")}>
        <CometripCardList />
      </Tab>
      <Tab key="Nouveautés" title={TabIcon("Nouveautés")}>
        <CometripCardList />
      </Tab>
      <Tab key="Parc" title={TabIcon("Parc")}>
        <CometripCardList />
      </Tab>
      <Tab key="Bateau" title={TabIcon("Bateau")}>
        <CometripCardList />
      </Tab>
    </Tabs>
  );
};

export default DiscoverStay;
