
export default function buildSearchURL(currentParams: URLSearchParams, query:string) {
    const params = new URLSearchParams(currentParams.toString())
    if (query) {
            params.set("query", query);
            params.set("page", "1");
            } else {
            params.delete("query");
            params.set("page", "1");
            }
        return `?${params.toString()}`;
}
