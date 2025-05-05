import { Loader } from "lucide-react";

export const Spinner = (props: any) => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};
export const FetchError = ({ message }: { message: string }) => {
  return (
    <div>
      Fetching Error:
      {message}
    </div>
  );
};
