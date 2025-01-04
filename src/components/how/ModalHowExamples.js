import React, { useState } from "react";
import CategoryGroup from "../display/CategoryGroup/CategoryGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import { Typewriter } from "react-simple-typewriter";

const ModalHowExamples = () => {
  const [preCount, setPreCount] = useState(0);
  const [count, setCount] = useState(0);
  const [searchEmpty, setSearchEmpty] = useState(0);

  //prettier-ignore
  const values = [
    ["0",{target: 20,high: 0,highValues: ["", "", ""],low: 0,lowValues: ["", "", ""],activeRow: -1,},],
    ["0",{target: 20,high: 10,highValues: ["AT", "Austria", "Austria"],low: 0,lowValues: ["", "", ""],activeRow: 1,},],
    ["0",{target: 20,high: 10,highValues: ["AT", "Austria", "Austria"],low: 30,lowValues: ["KH", "Cambodia", "Cambodia"],activeRow: 2,},],
    ["0",{target: 20,high: 10,highValues: ["AT", "Austria", "Austria"],low: 30,lowValues: ["KH", "Cambodia", "Cambodia"],activeRow: 3,line: 40,lineValues: ["DK", "Denmark", "Denmark"],},],
    ["0",{target: 20,high: 20,highValues: ["BT", "Bhutan", "Bhutan"],low: 20,lowValues: ["BT", "Bhutan", "Bhutan"],activeRow: -2,},],];

  const active = [
    [0, 0],
    [1, 0],
    [0, 1],
    [0, 2],
    [1, 1],
  ];
  const words = ["Austria", "Cambodia", "Denmark", "Bhutan"];

  const handleDone = () => {
    setCount(preCount + 1);
    setSearchEmpty(1);
  };

  const typewriter = () => {
    return (
      <Typewriter
        words={[words[preCount], ""]}
        loop={1}
        typeSpeed={100}
        deleteSpeed={10}
        delaySpeed={10}
        onDelete={handleDone}
        key={preCount}
      />
    );
  };

  return (
    <>
      <div className="example">
        <div className="category__container">
          <CategoryGroup
            values={values[count]}
            active={active[count]}
            guessCount={count}
            index={0}
          />
        </div>
        <div
          className={`example__search
            ${searchEmpty && "example__search--empty"} 
            ${count === 4 && searchEmpty && "example__search--disabled"}`}
        >
          <span className="example__type">{typewriter()}</span>
        </div>
      </div>
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        pagination={true}
        className="modal__swiper"
        onSlideChange={(swiper) => ((
          setPreCount(swiper.realIndex), setSearchEmpty(0)
        ))}
      >
        <SwiperSlide>
          <p className="swiper__text">
            <em>Austria</em> (10th) is higher ranked <br /> than the{" "}
            <em>Secret Country</em>
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="swiper__text">
            <em>Cambodia</em> (30th) is lower ranked <br /> than the{" "}
            <em>Secret Country</em>
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="swiper__text">
            <em>Denmark</em> (40th) is lower ranked <br /> than{" "}
            <em>Cambodia</em>
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="swiper__text">
            <em>Bhutan</em> (20th) is the <em>Secret Country!</em>
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ModalHowExamples;
