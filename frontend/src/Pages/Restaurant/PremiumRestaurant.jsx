import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Checkbox,
  RadioGroup,
  Stack,
  Radio,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getPremiumRestaurant } from "../../Redux/Restaurants/Action";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PremiumRestaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchparams, setSearchParams] = useSearchParams();
  const initialState = searchparams.getAll("place");
  const initialOrder = searchparams.get("order");
  const [place, setPlace] = useState(initialState || []);
  const [order, setOrder] = useState(initialOrder || "");
  const page_info =
    "NEARBUY > DEALS IN NEW DELHI > PREMIUM MERCHANTS - FNB IN NEW DELHI";
  let Aerocity = 0;
  let connaught = 0;
  let Mahipalpur = 0;
  let Restaurants = 0;

  let dynamicFilter={}
  let filterArray=[];

  let obj = {
    params: {
      place: searchparams.getAll("place"),
      sort: searchparams.get("order") && "originalprice",
      order: searchparams.get("order"),
    },
  };
  console.log(obj);

  const handleChange = (e) => {
    let newPlace = [...place];
    let value = e.target.value;

    if (newPlace.includes(value)) {
      newPlace.splice(newPlace.indexOf(value), 1);
    } else {
      newPlace.push(value);
    }
    setPlace(newPlace);
  };

  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(getPremiumRestaurant(obj));
  }, [location.search]);

  useEffect(() => {
    let params = {
      place,
    };

    order && (params.order = order);

    setSearchParams(params);
  }, [place, order]);

  const premium_restaurant = useSelector(
    (store) => store.restaurantReducer.premium_restaurant
  );

  for (let i = 0; i < premium_restaurant.length; i++) {
    if (premium_restaurant[i].place == "Aerocity") {
      Aerocity++;
    } else if (premium_restaurant[i].place == "Connaught Place") {
      connaught++;
    } else if (premium_restaurant[i].place == "Mahipalpur") {
      Mahipalpur++;
    }
    Restaurants++;
  }

  for (let i = 0; i < premium_restaurant.length; i++) {
    if (dynamicFilter[premium_restaurant[i].place] == undefined) {
       dynamicFilter[premium_restaurant[i].place]=1;
       filterArray.push(premium_restaurant[i].place);
    }else{
      dynamicFilter[premium_restaurant[i].place]++
    }
  }

console.log(filterArray)
  
  // slider

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <Box position="absolute" marginTop="160px" marginLeft="40px" zIndex={1}>
      <ChevronLeftIcon
        boxSize={10}
        background="gray.50"
        borderRadius="50%"
        color="gray.500"
        _hover={{ color: "pink.400", background: "gray.50" }}
        {...props}
      />
    </Box>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <Box position="absolute" marginTop="-160px" marginLeft="1310px">
      <ChevronRightIcon
        boxSize={10}
        background="gray.50"
        borderRadius="50%"
        color="gray.500"
        _hover={{ color: "pink.400", background: "gray.50" }}
        {...props}
      />
    </Box>
  );

  // var settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   prevArrow: <SlickArrowLeft />,
  //   nextArrow: <SlickArrowRight />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: false,
  //         arrows:false
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //         dots: false,
  //         arrows:false
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: false,
  //         arrows:false
  //       },
  //     },
  //   ],
  // };

  const coupons = [
    {
      id: 1,
      discount: "Win Rs 500 instant off code",
      title: "Valid on all prepaid deals | No minimum purchase",
      code: "NBLUCKY",
      validity: "Valid till 04 Apr 2023",
    },
    {
      id: 2,
      discount: "30% OFF",
      title: "30% Discount Code (Upto ₹200) | No minimum purchase",
      code: "MARCH30",
      validity: "Valid till 31 Mar 2023",
    },
    {
      id: 3,
      discount: "25% OFF",
      title: "Get discount code of 25% value | All Spa Deals",
      code: "RELAX",
      validity: "Valid till 31 Dec 2023",
    },
    {
      id: 4,
      discount: "25% OFF",
      title: "Get discount code of 25% value | All Salon Deals",
      code: "STYLE",
      validity: "Valid till 31 Dec 2023",
    },
    {
      id: 5,
      discount: "25% OFF",
      title: "Get discount code of 25% value | All Restaurant Deals",
      code: "FOODY",
      validity: "Valid till 31 Dec 2023",
    },
    {
      id: 6,
      discount: "25% OFF",
      title: "Get discount code of 25% value | All Activities Deals",
      code: "FUN25",
      validity: "Valid till 31 Dec 2023",
    },
    {
      id: 7,
      discount: "5% OFF",
      title: "5% Instant discount upto ₹100 | Valid for new users only.",
      code: "WELCOME",
      validity: "Valid till 31 Dec 2023",
    },
    {
      id: 8,
      discount: "5% OFF",
      title: "Get discount code of 5% value | All Gift Cards",
      code: "PRIZE",
      validity: "Valid till 31 Dec 2023",
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#e1e9ec", height: "auto" }}
      className={"container"}
    >
      <Box
        className={"content-box"}
        width={["93%", "95%", "82%"]}
        margin="auto"
        border="1px solid red"
        height="auto"
      >
        <Box className={"page-info"} paddingTop="10px" paddingBottom="10px">
          <Text fontSize={"xs"} color="#9c9ca0" fontWeight="semibold">
            {page_info}
          </Text>
        </Box>
        <Box className="hr-line" border="1px solid #e0e0e0"></Box>
        <Box
          className={"page-data"}
          border="1px solid"
          height="auto"
          display={"flex"}
          flexDirection={["column", "column", "initial"]}
        >
          <Box
            className={"sidebar"}
            width={["100%", "100%", "24%"]}
            border="1px solid red"
          >
            <Box
              className={"sidebar-info"}
              paddingTop="10px"
              paddingBottom="10px"
              border="1px solid"
            >
              <Text fontSize={"sm"} color="#623351" fontWeight="semibold">
                Promos & Filters
              </Text>
            </Box>
            <Box
              className={"coupon&filter"}
              display={["block", "flex", "block"]}
            >
              <Box
                className={"coupon"}
                height="200px"
                border="1px solid brown"
                backgroundColor="#ffffff"
                width={["auto", "50%", "auto"]}
              >
                {/* <Slider {...settings}>
                  {sliderData1.map((el, index) => {
                    return (
                      <div key={index}>
                        <Box padding="10px">
                          <Image borderRadius="8px" src={el.image} />
                        </Box>
                      </div>
                    );
                  })}
                </Slider> */}
                dhfghfdhfgf
              </Box>
              <Box
                className={"filter"}
                height={["200px", "200px", "400px"]}
                border="1px solid"
                marginTop={["0px", "0px", "20px"]}
                backgroundColor="#ffffff"
                width={["auto", "50%", "auto"]}
                overflow={["scroll", "scroll", "hidden"]}
              >
                <Text
                  fontWeight={"thin"}
                  fontSize="17px"
                  marginTop={"10px"}
                  marginLeft={"10px"}
                >
                  Location
                </Text>
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Text
                      fontWeight={"semibold"}
                      fontSize="12px"
                      marginTop={"10px"}
                      marginBottom="5px"
                    >
                      Restaurants
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>({Restaurants})</Text>
                  </Box>
                </Box>
                <Text
                  fontWeight={"semibold"}
                  fontSize="12px"
                  marginTop={"10px"}
                  marginLeft={"10px"}
                  marginBottom="5px"
                >
                  New Delhi
                </Text>
                {/* //1 */}
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Checkbox
                      colorScheme={"red"}
                      size={"sm"}
                      value="Aerocity"
                      onChange={handleChange}
                      checked={place.includes("Aerocity")}
                    >
                      AeroCity
                    </Checkbox>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>({Aerocity})</Text>
                  </Box>
                </Box>
                {/* //2 */}
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Checkbox
                      value="Connaught Place"
                      onChange={handleChange}
                      checked={place.includes("Connaught Place")}
                      colorScheme={"red"}
                      size={"sm"}
                    >
                      Connaught Place
                    </Checkbox>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>({connaught})</Text>
                  </Box>
                </Box>
                {/* //3 */}
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Checkbox
                      value="Sacket"
                      onChange={handleChange}
                      checked={place.includes("Sacket")}
                      colorScheme={"red"}
                      size={"sm"}
                    >
                      Sacket
                    </Checkbox>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>(1)</Text>
                  </Box>
                </Box>
                {/* //4 */}
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Checkbox
                      value="Surajmal Vihar"
                      onChange={handleChange}
                      checked={place.includes("Surajmal Vihar")}
                      colorScheme={"red"}
                      size={"sm"}
                    >
                      Surajmal Vihar
                    </Checkbox>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>(4)</Text>
                  </Box>
                </Box>
                {/* //5 */}
                <Box
                  className={"places"}
                  width={"93%"}
                  margin="auto"
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box alignItems={"center"}>
                    <Checkbox
                      value="Mahipalpur"
                      onChange={handleChange}
                      checked={place.includes("Mahipalpur")}
                      colorScheme={"red"}
                      size={"sm"}
                    >
                      Mahipalpur
                    </Checkbox>
                  </Box>
                  <Box>
                    <Text fontSize={"12px"}>({Mahipalpur})</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={"service-section"}
            width={["100%", "100%", "76%"]}
            border="1px solid blue"
            paddingLeft={["0px", "0px", "20px"]}
          >
            <Box
              className={"service-info"}
              paddingTop="10px"
              paddingBottom="10px"
              border="1px solid"
              display={"flex"}
              flexDirection={["column", "column", "initial"]}
              justifyContent="space-between"
            >
              <Text
                fontSize={"sm"}
                color="#623351"
                fontWeight="semibold"
                marginBottom={["10px", "10px", "0px"]}
              >
                Premium Merchants - FNB in New Delhi
              </Text>
              <div onChange={handleSort}>
                <RadioGroup marginRight="20px">
                  <Stack direction={["column", "row", "row"]}>
                    <Box
                      backgroundColor={"#ffffff"}
                      padding="0px 9px"
                      borderRadius="3px"
                    >
                      <Radio
                        name="order"
                        size="sm"
                        colorScheme="red"
                        value=""
                        defaultChecked
                      >
                        Popular
                      </Radio>
                    </Box>
                    <Box
                      backgroundColor={"#ffffff"}
                      padding="0px 9px"
                      borderRadius="3px"
                    >
                      <Radio
                        name="order"
                        value="desc"
                        size="sm"
                        colorScheme="red"
                        defaultChecked={order == "asc"}
                      >
                        Price(High to Low)
                      </Radio>
                    </Box>
                    <Box
                      backgroundColor={"#ffffff"}
                      padding="0px 9px"
                      borderRadius="3px"
                    >
                      <Radio
                        name="order"
                        value="asc"
                        size="sm"
                        colorScheme="red"
                        defaultChecked={order == "desc"}
                      >
                        Price(Low to High)
                      </Radio>
                    </Box>
                  </Stack>
                </RadioGroup>
              </div>
            </Box>
            <Box
              className={"service-cards"}
              display="grid"
              gap="20px"
              gridTemplateColumns={[
                "repeat(1,1fr)",
                "repeat(2,1fr)",
                "repeat(3,1fr)",
              ]}
            >
              {premium_restaurant.map((el) => {
                return (
                  <Box
                    backgroundColor="#ffffff"
                    borderRadius="5px"
                    boxShadow="md"
                  >
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="md"
                      overflow="hidden"
                      padding="16px"
                      height="300px"
                    >
                      <Image src={el.Image} alt={el.Title} />
                      {el.rating && (
                        <Box
                          className="star-icons"
                          display={"flex"}
                          height="auto"
                          border="1px solid #e0e0e0"
                          padding="1px"
                          width={"107px"}
                          borderRadius="3px"
                          position={"absolute"}
                          marginTop="-24px"
                          marginLeft="5px"
                          backgroundColor="#ffffff"
                          paddingLeft="7px"
                          alignItems={"center"}
                        >
                          <Image
                            height="10px"
                            marginRight="5px"
                            src={"https://www.nearbuy.com/static/images/nb.png"}
                          ></Image>
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                boxSize={"10px"}
                                color={
                                  i < (+el.rating).toFixed()
                                    ? "#ffc100"
                                    : "gray.300"
                                }
                              />
                            ))}
                          <Text
                            fontSize="11px"
                            fontWeight="bold"
                            marginLeft="5px"
                          >
                            {el.rating}
                          </Text>
                        </Box>
                      )}
                      <Box>
                        <Box mt="10px" lineHeight="tight">
                          <Text fontWeight={"bold"} fontSize="15px">
                            {" "}
                            {el.Title}
                          </Text>
                        </Box>
                        <Box mt="5px" lineHeight="tight">
                          <Text fontSize="12px" color="#bebebc">
                            {" "}
                            {el.place}
                          </Text>
                        </Box>
                        <Box display="flex" alignItems="center" mt="10px">
                          <Badge
                            px="7px"
                            color="#ffffff"
                            marginRight="8px"
                            backgroundColor={"#f47b58"}
                            fontSize="10px"
                            fontWeight={"thin"}
                          >
                            {el.Tag}
                          </Badge>
                          <Box>
                            <Text fontSize="12px" fontWeight={"normal"}>
                              {" "}
                              {el.price}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      backgroundColor="#f6f6f6"
                      padding="10px 10px 10px 16px"
                      borderRadius="0px 0px 5px 5px"
                    >
                      <Text
                        fontSize="12px"
                        fontWeight="500"
                        color="RGBA(0, 0, 0, 0.64)"
                      >
                        {el.bought}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PremiumRestaurant;
