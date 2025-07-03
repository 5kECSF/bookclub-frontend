import { GrInbox } from "react-icons/gr";

const Empty = ({ description }: { description: string }) => {
  return (
    <div className="flex h-[500px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <GrInbox className="text-gray-100 text-[50px] " />
        <h2 className=" text-gray-200  text-xl">{description}</h2>
      </div>
    </div>
  );
};

export default Empty;
