"use client";

import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Shield,
  Truck,
  Check,
  Flame,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PurchaseToast } from "@/components/purchase-toast";
import { OrderForm } from "@/components/order-form";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 56,
  });

  const [hideCart, setHideCart] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
    "/images/8.png",
    "/images/9.png",
    "/images/10.png",
  ];

  useEffect(() => {
    const formElement = document.getElementById("order-form");
    if (!formElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideCart(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(formElement);

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("order-form");
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-4">
      <PurchaseToast />

      <div className="bg-gradient-to-r from-red-600 via-red-700 to-black text-white text-center py-2 px-4 text-xs font-bold animate-pulse">
        🔥 FLASH SALE HÔM NAY - CHỈ CÒN {timeLeft.hours}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")} - GIẢM ĐẾN 50% 🔥
      </div>

      <header className="sticky top-0 z-50 bg-black text-white px-4 py-3 shadow-lg border-b-2 border-red-600">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-white rounded px-2 py-1">
            <span className="text-black font-bold text-xs">
              MÓC TREO HÚT CHÂN KHÔNG
            </span>
          </div>
          <Badge className="bg-red-600 text-white border-0 text-xs animate-pulse">
            -50%
          </Badge>
        </div>
      </header>

      <div className="relative">
        <div className="relative overflow-hidden">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Móc treo tường hút chân không"
            width={400}
            height={400}
            className="w-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-4 right-4 space-y-2">
          <Badge className="bg-red-600 text-white border-0 font-bold text-xs px-3 py-1 shadow-lg block animate-bounce">
            🔥 HOT NHẤT
          </Badge>
          <Badge className="bg-black text-white border-0 font-bold text-xs px-3 py-1 shadow-lg block">
            ⚡ BÁN CHẠY #1
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="font-bold">2,847 người đã mua hôm nay</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-600 via-red-700 to-black text-white p-5 shadow-xl">
        <div className="text-center mb-3">
          <Badge className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 mb-2">
            ⚡ ĐANG GIẢM MẠNH
          </Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-black">89K</span>
            <div className="text-left">
              <div className="text-xl line-through opacity-80">189K</div>
              <Badge className="bg-yellow-400 text-red-600 border-0 font-bold text-xs">
                -50% + MIỄN SHIP
              </Badge>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">🎁 Tiết kiệm ngay 100.000đ</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <p className="text-center text-xs mb-2 font-bold">
              ⏰ ƯU ĐÃI KẾT THÚC SAU:
            </p>
            <div className="flex justify-center gap-2">
              <div className="text-center">
                <div className="bg-white text-red-600 px-3 py-2 rounded font-black text-xl min-w-[48px]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="text-xs mt-1 block">Giờ</span>
              </div>
              <div className="flex items-center text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="bg-white text-red-600 px-3 py-2 rounded font-black text-xl min-w-[48px]">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="text-xs mt-1 block">Phút</span>
              </div>
              <div className="flex items-center text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="bg-white text-red-600 px-3 py-2 rounded font-black text-xl min-w-[48px]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <span className="text-xs mt-1 block">Giây</span>
              </div>
            </div>
          </div>
          <Button
            onClick={scrollToForm}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-600 font-black py-6 text-lg shadow-xl animate-pulse"
          >
            <Flame className="w-5 h-5 mr-2" />
            ĐẶT HÀNG NGAY - GIÁ SỐC
          </Button>
          <p className="text-center text-xs">
            ⚠️ Chỉ còn{" "}
            <span className="font-bold text-yellow-400">23 sản phẩm</span> với
            giá này!
          </p>
        </div>
      </div>

      <div className="bg-black text-white p-4 border-y-4 border-red-600">
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-black text-yellow-400">2,847</div>
            <div className="text-xs">Đã bán</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div>
            <div className="text-2xl font-black text-yellow-400">4.9/5</div>
            <div className="text-xs flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              (1,234 đánh giá)
            </div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div>
            <div className="text-2xl font-black text-yellow-400">98%</div>
            <div className="text-xs">Hài lòng</div>
          </div>
        </div>
      </div>

      {/* Product Details Images */}
      <div className="p-4 space-y-4">
        <div className="text-center py-4 border-y-4 border-black bg-red-50">
          <h2 className="text-xl font-black text-black">
            MÓC TREO TƯỜNG HÚT CHÂN KHÔNG
          </h2>
          <p className="text-xs text-gray-700 mt-1">
            Tiện lợi - Bền đẹp - Tiết kiệm không gian
          </p>
        </div>

        <video
          autoPlay
          muted
          playsInline
          controls
          className="w-full rounded-lg shadow-md"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="grid grid-cols-2 gap-2">
          <Image
            src="/images/10.png"
            alt="Gấp quần áo gọn gàng 1."
            width={150}
            height={150}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/2.png"
            alt="Sắp xếp khoa học"
            width={150}
            height={150}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <Image
          src="/images/3.png"
          alt="Tiện dụng"
          width={400}
          height={300}
          className="w-full rounded-lg shadow-md"
        />

        <div className="grid grid-cols-2 gap-2">
          <Image
            src="/images/4.png"
            alt="Xếp chồng dễ dàng"
            width={200}
            height={200}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/5.png"
            alt="Màu trắng tinh tế"
            width={200}
            height={200}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <Image
          src="/images/9.png"
          alt="Đựng đồ đa dạng"
          width={400}
          height={300}
          className="w-full rounded-lg shadow-md"
        />

        <div className="grid grid-cols-2 gap-2">
          <Image
            src="/images/7.png"
            alt="Màu pastel"
            width={150}
            height={150}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/8.png"
            alt="Nhiều màu sắc"
            width={150}
            height={150}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* <div className="bg-red-50 border-2 border-red-600 rounded-lg p-3 text-center">
          <p className="text-red-600 font-bold text-sm">HÌNH THẬT SHOP CHỤP</p>
          <p className="text-xs text-gray-700 mt-1">
            100% sản phẩm như hình - Cam kết hoàn tiền nếu không giống
          </p>
        </div> */}
{/* 
        <Image
          src="/images/image.png"
          alt="Trong suốt tiện lợi"
          width={400}
          height={300}
          className="w-full rounded-lg shadow-md"
        /> */}

        {/* <div className="grid grid-cols-4 gap-2">
          <Image
            src="/images/1.png"
            alt="Màu be"
            width={100}
            height={100}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/6.png"
            alt="Màu xám"
            width={100}
            height={100}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/11.png"
            alt="Màu hồng"
            width={100}
            height={100}
            className="w-full rounded-lg shadow-md"
          />
          <Image
            src="/images/12.png"
            alt="Màu xanh"
            width={100}
            height={100}
            className="w-full rounded-lg shadow-md"
          />
        </div> */}
      </div>

      {/* Product Specs */}
      <div className="bg-gray-50 p-4 m-4 rounded-lg border-2 border-black">
        <h3 className="font-bold text-black mb-3 text-center">
          THÔNG SỐ SẢN PHẨM
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">TÊN SẢN PHẨM:</span>
            <span className="font-bold text-black">
              MÓC TREO HÚT CHÂN KHÔNG
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">CHẤT LIỆU:</span>
            <span className="font-bold text-black">
              PET CAO CẤP, BỀN ĐẸP, CHỐNG XƯỚC
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">MÀU SẮC:</span>
            <span className="font-bold text-black">TRẮNG TRONG SUỐT</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-700">KÍCH THƯỚC:</span>
            <span className="font-bold text-black">40CM X 6 CM</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-700">CÔNG DỤNG:</span>
            <span className="font-bold text-black">TREO QUẦN ÁO, MÓC KHOÁ</span>
          </div>
        </div>
        {/* <Button
          onClick={scrollToForm}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
        >
          MUA NGAY
        </Button> */}
      </div>

      {/* <div className="bg-gradient-to-br from-red-600 via-red-700 to-black text-white p-5 m-4 rounded-xl shadow-2xl border-4 border-yellow-400">
        <div className="text-center mb-4">
          <Flame className="w-12 h-12 mx-auto mb-2 text-yellow-400" />
          <h3 className="font-black text-xl">🎁 COMBO ƯU ĐÃI CỰC SỐC</h3>
          <p className="text-xs mt-1 opacity-90">Chỉ áp dụng trong hôm nay</p>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Check className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            <span className="text-sm font-bold">Mua 1 chỉ 89K + MIỄN SHIP</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Check className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            <span className="text-sm font-bold">
              Mua 2 chỉ 159K + MIỄN SHIP (Tiết kiệm 18K)
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Check className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            <span className="text-sm font-bold">
              Bảo hành 12 tháng - Đổi mới trong 7 ngày
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Check className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            <span className="text-sm font-bold">
              Hoàn tiền 100% nếu hàng lỗi
            </span>
          </div>
        </div>
        <Button
          onClick={scrollToForm}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-600 font-black py-7 text-xl shadow-xl animate-pulse"
        >
          <ShoppingCart className="w-6 h-6 mr-2" />
          CHỐT ĐƠN NGAY - GIÁ CỰC SỐC
        </Button>
        <p className="text-center text-xs mt-3 font-bold text-yellow-400">
          ⚠️ CHỈ CÒN 23 SUẤT ƯU ĐÃI - NHANH TAY KẺO HẾT!
        </p>
      </div> */}

      {/* Why Choose Us */}
      {/* <div className="p-4 space-y-3">
        <h3 className="font-black text-center text-black text-xl">
          🏆 TẠI SAO 2,847 NGƯỜI ĐÃ CHỌN CHÚNG TÔI?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-600 text-white rounded-xl shadow-lg">
            <div className="bg-white text-red-600 rounded-full p-3 flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-base">CAM KẾT HÀNG CHÍNH HÃNG</h4>
              <p className="text-sm mt-1 opacity-90">
                100% nhựa PP cao cấp, an toàn tuyệt đối. Hoàn tiền 200% nếu hàng
                giả
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-black text-white rounded-xl shadow-lg">
            <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-base">GIAO HÀNG SIÊU TỐC</h4>
              <p className="text-sm mt-1 opacity-90">
                Giao hàng trong 24h tại HCM/HN. Toàn quốc 2-3 ngày. MIỄN SHIP
                100%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-600 text-white rounded-xl shadow-lg">
            <div className="bg-white text-red-600 rounded-full p-3 flex-shrink-0">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-base">ĐỔI TRẢ MIỄN PHÍ 7 NGÀY</h4>
              <p className="text-sm mt-1 opacity-90">
                Không hài lòng? Đổi trả miễn phí trong 7 ngày. Không cần lý do!
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Order Form */}
      <OrderForm
        id="order-form"
        // onFocus={() => {
        //   setHideCart(true);
        // }}
        // onBlur={() => setHideCart(false)}
      />

      {/* Customer Reviews */}
      <div className="p-4 bg-gradient-to-br from-gray-50 to-white m-4 rounded-xl shadow-xl border-4 border-black">
        <div className="text-center mb-4">
          <h3 className="font-black text-black text-xl">
            ⭐ KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-bold text-gray-700">
              4.9/5 (1,234 đánh giá)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              N
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-black text-sm">
                  Nguyễn Thị Mai
                </span>
                <span className="text-xs text-gray-500">2 ngày trước</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-800 mb-2">
                Sản phẩm đúng như quảng cáo xoay là hút vào tường mình rất ưng,
                hàng đóng gói cẩn thận sẽ quay lại ủng hộ shop tiếp
              </p>
              <Image
                src="/images/reviews/1.png"
                alt="Review"
                width={100}
                height={100}
                className="rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              T
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-black text-sm">
                  Trần Văn Hùng
                </span>
                <span className="text-xs text-gray-500">5 ngày trước</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-800 mb-2">
                Sản phẩm đẹp, giao hàng nhanh. Giá cũng tốt.
              </p>
              <Image
                src="/images/reviews/2.png"
                alt="Review"
                width={100}
                height={100}
                className="rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              L
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-black text-sm">Lê Thị Hoa</span>
                <span className="text-xs text-gray-500">1 tuần trước</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-800 mb-2">
                Sản phẩm tuyệt vời, đã mua lần thứ 3 và vẫn rất hài lòng.
              </p>
              <Image
                src="/images/reviews/3.png"
                alt="Review"
                width={100}
                height={100}
                className="rounded"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              H
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-black text-sm">
                  Hồ Thị Thanh
                </span>
                <span className="text-xs text-gray-500">1 tuần trước</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-800 mb-2">
                Móc rất bền đẹp, có thể tái sử dụng nhiều lần, giao hàng nhanh
              </p>
              <Image
                src="/images/reviews/4.png"
                alt="Review"
                width={100}
                height={100}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-red-600 rounded-xl p-5 mx-4 mb-24 shadow-lg">
        <h3 className="font-bold text-lg mb-4 text-center text-red-600">
          HỖ TRỢ KHÁCH HÀNG 24/7
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-red-600 p-2 rounded-full">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-bold text-black">support@giadunggiare.vn</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-red-600 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Địa chỉ</p>
              <p className="font-bold text-black">Quận Hoàng Mai, Hà Nội</p>
            </div>
          </div>
        </div>
      </div>

      {!hideCart && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-600 px-4 py-3 shadow-2xl z-50"
          id="button-cart"
        >
          <button
            onClick={scrollToForm}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            MUA NGAY - MIỄN SHIP
          </button>
        </div>
      )}
    </div>
  );
}
