import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import axios from "axios";


export default function CategoriesSlider() {



    async function getCategoriesSlider() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data } = useQuery("CategoriesSlider", getCategoriesSlider)




    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
    };
    return (


        <section className="pb-5 px-5 mb-4">

            <Slider {...settings}>

                {data?.data.data.map(function (item , idx) {
                    return (
                        <div key={idx} className="text-center my-4">
                            <img src={item.image} className="w-full h-[200px]" alt="" />
                            <h2>{item.name}</h2>
                        </div>
                    )
                })}




            </Slider>


        </section>
    );
}

