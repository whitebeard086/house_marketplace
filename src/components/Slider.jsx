import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { db } from "../firebase.config";
import { Spinner } from "../components";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    listings && (
      <>
        <p className="exploreHeading">Latest Properties For Sale Or Rent</p>

        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}>
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ₦{formatPrice(data.discountedPrice ?? data.regularPrice)}
                  {data.type === "rent" && " / month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};
export default Slider;
