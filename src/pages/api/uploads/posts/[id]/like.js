    import dbConnect from "@/lib/dbConnect";
    import UserPostUpload from "@/models/UserPostUpload";
    import UserUploadPost from "@/models/UserUploadPost";
    import UserVideoUpload from "@/models/UserVideoUpload";

    export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
        return res.status(400).json({ success: false, message: "Missing userId or postId" });
        }

        // ✅ Try to find the post in all 3 collections
        let post =
        (await UserPostUpload.findById({ _id: postId })) ||
        (await UserUploadPost.findById({ _id: postId })) ||
        (await UserVideoUpload.findById({ _id: postId }));

        if (!post) {
        return res.status(404).json({ success: false, message: "Post not found in any collection" });
        }

        // Ensure arrays exist
        if (!post.likedBy) post.likedBy = [];
        if (!post.totalLikes) post.totalLikes = 0;

        const alreadyLiked = post.likedBy.includes(userId);

        if (alreadyLiked) {
        post.likedBy.pull(userId);
        post.totalLikes = Math.max(post.totalLikes - 1, 0);
        } else {
        post.likedBy.push(userId);
        post.totalLikes += 1;
        }

        await post.save();

        return res.status(200).json({
        success: true,
        liked: !alreadyLiked,
        totalLikes: post.totalLikes,
        postId: post._id,
        });
    } catch (err) {
        console.error("Error in like handler:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
    }
