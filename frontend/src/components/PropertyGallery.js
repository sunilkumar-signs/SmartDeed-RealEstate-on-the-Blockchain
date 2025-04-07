export default function PropertyGallery() {
    const dummyData = [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        price: "$379,900",
        info: "3 bd | 2 ba | 965 sqft",
        address: "518 T Ave S, Saskatoon"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
        price: "$429,000",
        info: "4 bd | 3 ba | 1120 sqft",
        address: "123 Lakeview Rd, Saskatoon"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1600607689450-90e34c23fba8",
        price: "$310,500",
        info: "2 bd | 1 ba | 800 sqft",
        address: "789 River St, Saskatoon"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
        price: "$389,000",
        info: "3 bd | 2 ba | 1020 sqft",
        address: "234 Oakwood Blvd, Saskatoon"
      }
    ];
  
    return (
      <section className="py-12 px-4 md:px-10">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Newest homes for sale in <span className="text-blue-600">Saskatoon</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {dummyData.map((home) => (
            <div
              key={home.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img src={home.image} alt="Property" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{home.price}</h3>
                <p className="text-sm text-gray-600">{home.info}</p>
                <p className="text-sm text-gray-500">{home.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  