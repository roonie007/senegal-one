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
import "pure-react-carousel/dist/react-carousel.es.css";

const Home: React.FC = () => {
  const size = useWindowSize();
  const history = useHistory();

  const [list, setList] = useState<Array<CometripData>>([]);
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState("stays");

  const [isMasonry, setIsMasonry] = useState(true);
  const [currentSliderIndex, setCurrentSliderIndex] = useState<number>();

  const [isFetching, setIsFetching] = useState(false);

  const onTabChange = async (key: string) => {
    setIsMasonry(true);
    setSelected(key);
    setPage(1);
    setList([]);
  };

  useEffect(() => {
    if (list.length === 0) {
      loadMoreData(selected);
    }
  }, [list]);

  const loadMoreData = async (key: string) => {
    setIsFetching(true);

    // const {
    //   data: { events },
    // } = await $api.post<{ events: CEvent[] }>("/search/events", { page });
    // const {
    //   data: { cars },
    // } = await $api.post<{ cars: CCar[] }>("/search/cars", { page });
    // const {
    //   data: { properties: stays },
    // } = await $api.post<{ properties: CStay[] }>("/search", { page });

    // const data: CometripData[] = shuffle([
    //   ...events.map((x) => ({ ...x, type: "event" })),
    //   ...cars.map((x) => ({ ...x, type: "car" })),
    //   ...stays.map((x) => ({ ...x, type: "stay" })),
    // ]);
    // setList([...list, ...data]);

    // console.log(data);
    // setPage(page + 1);

    let data: CometripData[] = [];

    if (key === "events") {
      const {
        data: { events },
      } = await $api.post<{ events: CEvent[] }>("/search/events", {
        page,
        items: 40,
      });

      data = events.map((x) => ({ ...x, type: "event" }));
    } else if (key === "cars") {
      const {
        data: { cars },
      } = await $api.post<{ cars: CCar[] }>("/search/cars", {
        page,
        items: 40,
      });

      data = cars.map((x) => ({ ...x, type: "car" }));
    } else if (key === "stays") {
      const {
        data: { properties: stays },
      } = await $api.post<{ properties: CStay[] }>("/search", {
        page,
        items: 40,
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

  const CometripCard = (data: CometripData, index: number) => {
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

  const CometripCardSlider = (data: CometripData) => {
    const images = getImages(data);

    return (
      <div
        id={`items-${data._id}`}
        key={data._id}
        className="h-full flex flex-col"
      >
        <CarouselProvider
          naturalSlideWidth={size.width as number}
          naturalSlideHeight={(size.height as number) * 0.9}
          totalSlides={images.length}
          orientation="horizontal"
          lockOnWindowScroll
        >
          <Slider>
            {images.map((image, index) => {
              return (
                <Slide index={index}>
                  <div
                    className="bg-cover bg-center size-full"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </Slide>
              );
            })}
          </Slider>
        </CarouselProvider>
        <div className="flex flex-grow bg-red-400">a</div>
      </div>
    );
  };

  const CometripCardList = () => {
    if (list.length === 0) {
      return (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        <Masonry
          gutter={isMasonry ? "4px" : "0px"}
          columnsCount={isMasonry ? 3 : 1}
        >
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

  const CometripCardListSlider = () => {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-black">
        <CarouselProvider
          naturalSlideWidth={size.width as number}
          naturalSlideHeight={size.height as number}
          totalSlides={list.length}
          orientation="vertical"
          lockOnWindowScroll
          currentSlide={currentSliderIndex}
        >
          <Slider>
            {list.map((x, index) => {
              return <Slide index={index}>{CometripCardSlider(x)}</Slide>;
            })}
          </Slider>
        </CarouselProvider>
        <Button
          isIconOnly
          radius="full"
          size="lg"
          onClick={() => setIsMasonry(true)}
          className="absolute top-2 right-2 text-white"
          variant="light"
        >
          <Icon icon="solar:close-circle-bold" fontSize={30} />
        </Button>
      </div>
    );
  };

  const TabIcon = (title: string) => {
    let CurrentIcon = <Icon icon="solar:home-2-linear" fontSize={24} />;

    if (title === "Événements") {
      CurrentIcon = <Icon icon="solar:rocket-linear" fontSize={24} />;
    } else if (title === "Voitures") {
      CurrentIcon = <Icon icon="solar:wheel-linear" fontSize={24} />;
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

  return (
    <IonPage>
      {/* <IonHeader className="shadow">
        <div className="flex flex-col w-full items-center">
          <div className="flex items-center w-full gap-x-4 p-4 !pb-0">
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
              history.push("/stays");
            }}
          >
            Logements
          </Button>
        </div>
      </IonHeader> */}
      <IonContent fullscreen>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={(key) => onTabChange(key.toString())}
          classNames={{
            base: "w-full",
            tabList: "w-full",
            tab: "h-auto",
            cursor: "shadow-none",
            panel: "px-0",
          }}
        >
          <Tab key="stays" title={TabIcon("Logements")}>
            <CometripCardList />
            {isMasonry === false && <CometripCardListSlider />}
          </Tab>
          <Tab key="events" title={TabIcon("Événements")}>
            <CometripCardList />
            {isMasonry === false && <CometripCardListSlider />}
          </Tab>
          <Tab key="cars" title={TabIcon("Voitures")}>
            <CometripCardList />
            {isMasonry === false && <CometripCardListSlider />}
          </Tab>
        </Tabs>
      </IonContent>
    </IonPage>
  );
};

export default Home;
