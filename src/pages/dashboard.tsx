import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents,refresh}=useContent();
  useEffect(()=>{
    refresh();
  },[modalOpen])
  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          <div className="flex justify-end gap-4">
            <Button onClick={() => { setModalOpen(true) }} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
            <Button onClick={async()=>{
              const response=await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{share:true},{headers:{ "Authorization": localStorage.getItem("token") }})
              const shareUrl=`localhost:5173/brain/${response.data.hash}`;
              alert(shareUrl);

            }} variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
          </div>
          <div className="flex gap-4 flex-wrap pt-4">
            {contents.map(({type,title,link})=><Card title={title} link={link} type={type} />)}
            </div>
        </div>
      </div>
    </>
  );
}
