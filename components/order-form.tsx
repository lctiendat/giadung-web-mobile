"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function OrderForm({ onFocus, onBlur }: any) {
  const [selectedPackage, setSelectedPackage] = useState<
    "single" | "double" | "triple"
  >("double");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFocus = () => {
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const packageToAmount = {
      single: 1,
      double: 2,
      triple: 3,
    } as const;

    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      amount: packageToAmount[selectedPackage],
    };
    setLoading(true);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxA9_k8G0UKXOPV7kfIFyK98Fh-F6DaahGPP0vCXsEZi-VJiAy5RyqtQO8bvN3V0lYc6w/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      setLoading(false);
      alert("🎉 Cám ơn anh/ chị đã đặt hàng, shop sẽ liên hệ lại sớm nhất để xác nhận đơn hàng!");
      setFormData({ name: "", phone: "", address: "" });
      setSelectedPackage("double");
    } catch (err) {
      alert("❌ Gửi đơn thất bại");
    }
  };

  return (
    <div
      id="order-form"
      className="bg-white p-4 m-4 rounded-lg shadow-lg border-2 border-orange-500"
    >
      <h3 className="font-bold text-gray-800 mb-1 text-center text-lg">
        ĐẶT HÀNG NGAY
      </h3>

      <form onSubmit={handleSubmit} className="space-y-1">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-600">*</span>
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="Nhập họ và tên"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại <span className="text-red-600">*</span>
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ <span className="text-red-600">*</span>
          </label>
          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
            placeholder="Nhập địa chỉ nhận hàng"
            rows={2}
          />
        </div>

        {/* Package Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn gói sản phẩm <span className="text-red-600">*</span>
          </label>

          {/* Single Package */}
          <div
            onClick={() => setSelectedPackage("single")}
            className={`relative border-2 rounded-lg p-3 mb-3 cursor-pointer transition-all ${
              selectedPackage === "single"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPackage === "single"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPackage === "single" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                  <span className="font-bold text-gray-800 text-sm">Mua 1 cái</span>
                  </div>
                </div>
                <div className="ml-7">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-orange-600">
                      89.000đ
                    </span>
                    <span className="text-xs line-through text-gray-500">
                      189.000đ
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <Check className="w-3 h-3" />
                    <span>MIỄN SHIP toàn quốc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Double Package */}
          <div
            onClick={() => setSelectedPackage("double")}
            className={`relative border-2 rounded-lg p-3 mb-3 cursor-pointer transition-all ${
              selectedPackage === "double"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
          >
            {/* Popular Badge */}
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              PHỔ BIẾN
            </div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPackage === "double"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPackage === "double" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-bold text-gray-800 text-sm">Mua 2 cái</span>
                </div>
                <div className="ml-7">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-orange-600">
                      159.000đ
                    </span>
                    <span className="text-xs line-through text-gray-500">
                      299.000đ
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <Check className="w-3 h-3" />
                      <span>MIỄN SHIP toàn quốc</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                      <Check className="w-3 h-3" />
                      <span>Tiết kiệm 140.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Triple Package */}
          <div
            onClick={() => setSelectedPackage("triple")}
            className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
              selectedPackage === "triple"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
          >
            {/* Best Deal Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
              TIẾT KIỆM NHẤT
            </div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPackage === "triple"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPackage === "triple" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-bold text-gray-800 text-sm">Mua 3 cái</span>
                </div>
                <div className="ml-7">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-orange-600">
                      229.000đ
                    </span>
                    <span className="text-xs line-through text-gray-500">
                      459.000đ
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <Check className="w-3 h-3" />
                      <span>MIỄN SHIP toàn quốc</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                      <Check className="w-3 h-3" />
                      <span>Tiết kiệm 230.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-md shadow-lg mt-1"
          disabled={loading}
        >
          {loading ? "ĐANG ĐẶT HÀNG..." : "XÁC NHẬN ĐẶT HÀNG"}
        </Button>

        <p className="text-center text-xs text-gray-600">
          🔒 Thông tin của bạn được bảo mật tuyệt đối
        </p>
      </form>
    </div>
  );
}
