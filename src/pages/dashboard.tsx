import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { hash } = useParams<{ hash: string }>();
  const { contents, refresh } = useContent(hash);
  async function handleDelete(contentId: string) {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: {
        contentId
      },
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    refresh();
  }
  useEffect(() => {
    if (!hash) {
      refresh();
    }
  }, [modalOpen, hash])
  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          <div className="flex justify-end gap-4">
            <Button onClick={() => { setModalOpen(true) }} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
            {!hash &&(<Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, { headers: { "Authorization": localStorage.getItem("token") } })
              const shareUrl = `localhost:5173/brain/${response.data.hash}`;
              alert(shareUrl);

            }} variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />)}
          </div>
          {hash && (
            <div className="text-sm text-gray-700 mb-4">Viewing shared brain content</div>
          )}
          <div className="flex gap-4 flex-wrap pt-4">
            {contents.map(({ _id ,type, title, link }) => <Card key={_id} title={title} link={link} type={type} onDelete={!hash ? () => handleDelete(_id): undefined} />)}
          </div>
        </div>
      </div>
    </>
  );
}
