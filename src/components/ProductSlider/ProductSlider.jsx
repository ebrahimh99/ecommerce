import React from "react";
import Slider from "react-slick";
import car from "./../../assets/car.jpg"
import car2 from "./../../assets/car2.jpg"

export default function ProductSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false ,
        autoplaySpeed: 2000,
    };
    return (


        <section className="pb-5 px-5 mb-4">
            <div className="flex flex-wrap justify-center items-center ">
                <div className="w-2/3 ">
                    <Slider {...settings}>
                        <div>
                            <img src={car} className="w-full h-[400px]" alt="" />
                        </div>
                        <div>
                            <img src={car} className="w-full h-[400px]" alt="" />
                        </div>
                        <div>
                            <img src={car} className="w-full h-[400px]" alt="" />
                        </div>
                    </Slider>
                </div>
                <div className="w-1/3 ">
                    <div>
                        <img src={car2} className="w-[100%] h-[200px] " alt="" />
                    </div>
                    <div>
                        <img src={car2} className="w-[100%] h-[200px] " alt="" />
                    </div>
                </div>
            </div>

        </section>
    );
}
