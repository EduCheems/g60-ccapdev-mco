import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditPostForm from "./EditPostForm"; 

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Check if the user is logged in
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login"); 
  }

  // Fetch the existing post from the DB
  await connectDB();
  const postDoc = await Post.findById(id).populate("cafeID", "name").lean();

  if (!postDoc) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Post not found!</div>;
  }

  const formattedData = {
    ...postDoc,

    cafeName: postDoc.cafeID?.name || "", 
  };

  // Pass the data to your Client Component form
  const postData = JSON.parse(JSON.stringify(formattedData));

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-[140px] py-12 font-montserrat">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-[#855225] font-poppins font-black text-[42px] text-5xl uppercase">
          Edit Post
        </h1>
        <div className="h-[3px] flex-1 rounded-full bg-[#855225] mt-1"></div>
      </div>

      {/* Render the Client Component with the data! */}
      <EditPostForm postData={postData} />
    </div>
  );
}