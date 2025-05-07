import CustomSwipper from "../../../components/Custom/CustomSwipper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../../services/DashboardService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  variants: any[];
  attributes: any[];
  images: any[];
  active: boolean;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await dashboardApi.topProducts();
        if (response.success) {
          setTopProducts(response.body);
          console.log(topProducts)
        }
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <CustomSwipper
        images={[
          {
            url: "https://lh3.googleusercontent.com/S7NE0LqhEze7KX1blpQdtXS3EAcodXzlVwMvNeTOXMe9Gkftr_7kSLsIRKGcecknk1hoQToa0Eol5GDvTpUJmGGk4UtTsgA=w1920-rw",
          },
          {
            url: "https://lh3.googleusercontent.com/gVSB0hwR3PPffHSS8AFdHY-hmyooxWgDENN1rb_waJwfKGg7omvKuAcf9kZM0z8ssRNaGQOnecJzT1b05TTa_0IrxKkLOzK2=w1920-rw",
          },
          {
            url: "https://lh3.googleusercontent.com/cuuNfxmY-_mG2LUHTZAw3SvpdsOBxqJ7cJnd8L8LdpLJC7cCZT8VCxY-GuxUdlxvI51Mp-tJpIS5rfPkDDty2-8DrRkkc98LGw=w1920-rw",
          },
          {
            url: "https://lh3.googleusercontent.com/6WlXymfP1jkLLluDyPKhHqR2rghguKzWxL1GmRGMHqZ3uXCDthdiUDDghyTgLaVraNe-PeZdny2s__vbfdL-pRd2_9PE7M6V=w1920-rw",
          },
          {
            url: "https://plus.unsplash.com/premium_photo-1663040525221-c607b4333b76?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8OSUzQTE2fGVufDB8fDB8fHww",
          },
        ]}
        height={500}
        width="w-full"
        autoPlay={true}
        interval={3000}
        showPagination={true}
        showNavigation={true}
      />
      {/* event box */}
      <div className="flex flex-col items-center justify-center w-full p-10 relative">
        <div className="flex justify-center gap-5 flex absolute">
          <img
            src="https://lh3.googleusercontent.com/uw9Ld5snWK_fdXmhM4i_e8Uonzeo25tFpyWCCHk4g9pF-BY0SAsxGZ6phCPE04pdAF5QS-GoaqTW_a78hvOAQURFqZIi7OGN=w308-rw"
            alt="event"
            className=" object-cover rounded-lg"
          />
          <img
            src="https://lh3.googleusercontent.com/-KyPHoUjMjLPF_RJN3sse0JHpDAsHuV06pUit4UwQFo7B6uyF8FVzT1vI273GjL6unD5pTARUFLpeC-4ooUTSFHWTbKmjNY=w308-rw"
            alt="event"
            className=" object-cover rounded-lg"
          />
          <img
            src="https://lh3.googleusercontent.com/s0Q6ru7op5eVKrQX6LCwz470sdzy77VnUqkkIL0OHDDieiz4U10uUXv6B8sbU0zDdHPNelNPYJUKR6c9VLTq8mkAGu9JsgQf=w308-rw"
            alt="event"
            className=" object-cover rounded-lg"
          />
          <img
            src="https://lh3.googleusercontent.com/M50KpWhdJpPB0IWs-a11u0QXOWusR_SrzZYMDZsqCpxNZF0OVFC5FU0QFpzY2-U_ZIYRlX2TNTBwW9dnizMKnrE_SBAyoo_Q=w308-rw"
            alt="event"
            className=" object-cover rounded-lg"
          />
        </div>
      </div>
      {/* items */}
      <div className="flex flex-col items-center justify-center w-full p-10 mt-10">
        <h1 className="text-2xl font-bold">Sản phẩm nổi bật</h1>
        <div className="w-full gap-5 mt-5 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
          {topProducts?.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product-detail/${product.id}`)}
            >
              <img
                src={product.images[0]?.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2qjUGVWGf2ORN5Epm6fvxNNW9MVzhTNrdSw&s"}
                alt={product.name}
                className="w-full h-11/12 h-40 object-cover rounded-lg"
              />
              <h1 className="text-xl font-bold mt-2">{product.name}</h1>
              <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-2">
                <span className="text-red-500 font-bold">{product.salePrice.toLocaleString()}đ</span>
                {product.salePrice < product.price && (
                  <span className="text-gray-500 line-through ml-2">{product.price.toLocaleString()}đ</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
