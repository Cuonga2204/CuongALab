import { StarFilled } from "@ant-design/icons";
import { testimonialsMockData } from "src/mock/testimonialsMockData";
import { IMAGES } from "src/assets/images";
export default function TestimonialSection() {
  return (
    <section className="bg-primary-background py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Cảm nhận của học viên
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {testimonialsMockData.map((item) => (
            <div
              key={item.id}
              className="bg-[#def5fd] rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-primary">
                  <img src={IMAGES.user} alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.course}</p>
                </div>
              </div>

              <p className="text-gray-700 text-sm ">“{item.content}”</p>

              <div className="flex gap-1 mt-3 text-yellow-400">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <StarFilled key={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
