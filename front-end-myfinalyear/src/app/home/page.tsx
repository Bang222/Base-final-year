import { fetchApi, logout } from "@/util/getdataTouristview";
import Views from "@/components/views";
import { TouristInfo } from "@/types";

interface PageProps extends TouristInfo{
}
const Page: ({}:PageProps) => Promise<JSX.Element> = async ({}) =>{
  const data = await fetchApi();
  return (
    <section>
      {/* eslint-disable-next-line react/no-children-prop */}
      <a href="http://localhost:8080/api/auth/logout"> Log out</a>
    {data?.map((item:any) => {return <Views key={item.id} name={item.name} description={item.description} createdTime={item.createdTime}/>})}
  </section>
  );
};
export default Page;