"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface PurchaseData {
  name: string
  phone: string
  message: string
  time: string
  avatar: string
}

const purchaseData: PurchaseData[] = [
  { name: "Ngân Nguyễn", phone: "0385915xxx", message: "gửi thêm cho chị 5 cái", time: "2 giây trước", avatar: "N" },
  { name: "Minh Tuấn", phone: "0912345xxx", message: "đặt thêm 3 cái ạ", time: "5 giây trước", avatar: "M" },
  {
    name: "Thu Hương",
    phone: "0987654xxx",
    message: "mua 2 cái nha shop",
    time: "10 giây trước",
    avatar: "T",
  },
  { name: "Quang Đạt", phone: "0909876xxx", message: "đặt 4 cái giao Hà Nội", time: "15 giây trước", avatar: "Q" },
  { name: "Lan Anh", phone: "0976543xxx", message: "cho em đặt thêm 6 cái", time: "20 giây trước", avatar: "L" },
  { name: "Hoàng Nam", phone: "0945678xxx", message: "mua 2 cái ship HCM", time: "25 giây trước", avatar: "H" },
  { name: "Minh Huy", phone: "0912345xxx", message: "đặt thêm 5 cái ạ", time: "30 giây trước", avatar: "M" },  
]

export function PurchaseToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPurchase, setCurrentPurchase] = useState<PurchaseData>(purchaseData[0])

  useEffect(() => {
    const showToast = () => {
      const randomPurchase = purchaseData[Math.floor(Math.random() * purchaseData.length)]
      setCurrentPurchase(randomPurchase)
      setIsVisible(true)

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 4000)
    }

    // First toast after 5 seconds
    const initialTimer = setTimeout(showToast, 5000)

    // Repeat every 5 seconds
    const intervalTimer = setInterval(showToast, 5000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed left-3 top-4 z-[60] animate-in slide-in-from-left duration-300">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-2.5 max-w-[240px] relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full p-0.5 hover:bg-gray-600"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
            {currentPurchase.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-xs text-gray-900">
              {currentPurchase.name} {currentPurchase.phone}
            </div>
            <div className="text-xs text-gray-600 mt-0.5 line-clamp-2">{currentPurchase.message}</div>
            <div className="text-[10px] text-gray-400 mt-1">{currentPurchase.time}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
