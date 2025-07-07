import Loader from "@/components/Loader";

export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center text-xl">
      <Loader />
      Loading...
    </div>
  );
}
