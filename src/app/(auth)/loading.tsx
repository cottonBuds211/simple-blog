import Loader from "@/components/Loader";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center text-xl">
      <Loader />
      Loading...
    </div>
  );
}
