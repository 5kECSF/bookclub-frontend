import Image from "next/image";

const Avatar = ({ src = "", size = 64 }) => {
  return (
    <div
      className={`bg-gray-200 flex items-center justify-center overflow-hidden rounded-full`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          width={size}
          height={size}
          className="object-cover"
        />
      ) : (
        <span className="text-gray-500 text-xl">👤</span>
      )}
    </div>
  );
};

export default Avatar;
