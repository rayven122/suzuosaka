export const Map = () => {
  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-10">
      <h2 className="mb-6 text-center text-2xl font-bold text-black">
        館内マップ / Indoor Map
      </h2>

      <div className="mb-8">
        <div className="relative mb-4 overflow-hidden rounded-2xl border-4 border-black">
          <div className="relative aspect-[4/3] bg-white">
            {/* フロアマップSVG */}
            <svg viewBox="0 0 800 600" className="h-full w-full">
              {/* 建物の輪郭 */}
              <rect
                x="100"
                y="100"
                width="600"
                height="400"
                fill="#f0f0f0"
                stroke="#000"
                strokeWidth="4"
              />

              {/* レストランエリア */}
              <rect
                x="100"
                y="100"
                width="300"
                height="200"
                fill="#FFE0B2"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="250"
                y="200"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
              >
                レストラン
              </text>
              <text x="250" y="230" textAnchor="middle" fontSize="18">
                Restaurant
              </text>

              {/* 釣りエリア */}
              <rect
                x="400"
                y="100"
                width="300"
                height="200"
                fill="#B2DFDB"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="550"
                y="200"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
              >
                釣り体験
              </text>
              <text x="550" y="230" textAnchor="middle" fontSize="18">
                Fishing Area
              </text>

              {/* ショップエリア */}
              <rect
                x="100"
                y="300"
                width="200"
                height="200"
                fill="#BBDEFB"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="200"
                y="400"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
              >
                ショップ
              </text>
              <text x="200" y="430" textAnchor="middle" fontSize="18">
                Shop
              </text>

              {/* 展示エリア */}
              <rect
                x="300"
                y="300"
                width="200"
                height="200"
                fill="#D1C4E9"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="400"
                y="400"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
              >
                展示
              </text>
              <text x="400" y="430" textAnchor="middle" fontSize="18">
                Exhibition
              </text>

              {/* 養殖見学 */}
              <rect
                x="500"
                y="300"
                width="200"
                height="200"
                fill="#C8E6C9"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="600"
                y="400"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
              >
                養殖見学
              </text>
              <text x="600" y="430" textAnchor="middle" fontSize="18">
                Aquaculture Tour
              </text>

              {/* 入口 */}
              <rect
                x="350"
                y="500"
                width="100"
                height="20"
                fill="#00e3cb"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="400"
                y="515"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
              >
                入口 / Entrance
              </text>

              {/* トイレ */}
              <circle
                cx="150"
                y="270"
                r="20"
                fill="#FFCDD2"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="150"
                y="275"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                WC
              </text>

              <circle
                cx="650"
                y="270"
                r="20"
                fill="#FFCDD2"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x="650"
                y="275"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                WC
              </text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-bold">
              1F フロア案内 / First Floor Guide
            </h3>
            <ul className="space-y-2 text-black/80">
              <li className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-[#FFE0B2]"></div>
                <span>レストラン / Restaurant</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-[#B2DFDB]"></div>
                <span>釣り体験エリア / Fishing Area</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-[#BBDEFB]"></div>
                <span>ショップ / Shop</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-[#D1C4E9]"></div>
                <span>展示スペース / Exhibition Space</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-[#C8E6C9]"></div>
                <span>養殖見学エリア / Aquaculture Tour Area</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">
              施設情報 / Facility Information
            </h3>
            <ul className="space-y-2 text-black/80">
              <li>• 車椅子対応トイレあり / Wheelchair accessible restrooms</li>
              <li>• ベビーカー貸出あり / Stroller rental available</li>
              <li>• 授乳室は1階ショップ横 / Nursing room next to the shop</li>
              <li>• 喫煙所は屋外のみ / Smoking area outside only</li>
              <li>
                • 写真撮影OK（一部制限あり） / Photography allowed (some
                restrictions)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
