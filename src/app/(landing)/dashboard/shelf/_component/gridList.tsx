import Image from "next/image";
export default function BookList(
  
) {
  const releases = [
    {
      "id": 1,
      "title": "Don’t Make Me think",
      "year": 2000,

      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/dontMakeMe.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 2,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 3,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 4,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 5,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 6,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    },
    {
      "id": 7,
      "title": "The Design of Every..",
      "year": 2000,
      "rating": "4.5",
      "ratingTotal": "5",
      "catagory": "spritual",
      "autor": "Steve Krug",
      "bookUrl": "/assets/image/home/designOfEvr.png",
      "borrowedDate": "11 Mar 2023 09:00AM",
      "submissionDate": "14 Mar 2023"

    }

  ]
  return (
    <section className="grid grid-cols-1 mx-auto md:grid-cols-2  lg:grid-cols-3 gap-5 my-10 justify-items-center">
      {releases.map((release, i) => {
        return (
          <div key={i} className="h-[250px] rounded-lg bg-white grid grid-cols-2 gap-3 p-3">
            <div>
              <Image
                className="object-contain "
                src={release.bookUrl}
                alt="Picture of the author"
                width={100}
                height={120}
              />
              <p className="text-sm">{release.title}</p>
              <p>{release.autor},{release.year}</p>
              <p className="text-gray-100">{release.rating} /{release.ratingTotal}</p>
            </div>
            <div >
              <p>Borrowed on</p>
              <p className="text-gray-100 text-3xs">{release.borrowedDate}</p>
              <p>Submission Date</p>
              <p className="text-gray-100 text-3xs">{release.submissionDate}</p>
              <div className="flex flex-col gap-3">
                <button className="border-none bg-gray-100 text-white h-8 w-30 rounded-md">Borrowed</button>
                <button className="border-solid border-tomato bg-white text-tomato h-8 w-30 rounded-md">Return</button>
              </div>

            </div>
          </div>
        );
      })}
    </section>
  );
}
