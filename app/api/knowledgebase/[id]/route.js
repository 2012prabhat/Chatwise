import { authCheck } from "@/lib/authCheck";
import connectDB from "@/lib/db";
import KnowledgeBase from "@/models/KnowledgeBase";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const decoded = authCheck(req);

    // await params
    const { id } = await params;
    console.log("this is id", id);

    const faq = await KnowledgeBase.findOneAndDelete({
      _id: id,
    });

    console.log("This is faq", faq);

    if (!faq) {
      return new Response(
        JSON.stringify({ error: "FAQ not found or unauthorized" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "FAQ deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
