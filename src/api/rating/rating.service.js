import prisma from "../../config/prisma.instance.js";

const createRating = async (req, res) => {
  try {
    const rating = await prisma.rating.create({
      data: req.body,
    });

    return res.status(200).json(rating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const countRatingsAndComments = (ratings) => {
  let ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  let totalRatings = 0;
  let commentsCount = 0;

  for (const rating of ratings) {
    const stars = Math.round(rating.rating);
    if (stars >= 1 && stars <= 5) {
      ratingCounts[stars]++;
      totalRatings++;
    }
    if (rating.review_text) {
      commentsCount++;
    }
  }

  return { ratingCounts, totalRatings, commentsCount };
};

const getRatingByBook = async (bookId) => {
  try {
    let ratings = await prisma.rating.findMany({
      where: {
        book_id: bookId,
        delete_flag: false,
      },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            profile_picture_url: true,
            create_at: true,
            update_at: true,
          },
        },
      },
    });

    return ratings;
  } catch (error) {
    console.log(error);
  }
};

const deleteRating = async (userId, bookId) => {
  try {
    return await prisma.rating.update({
      where: {
        user_id_book_id: {
          user_id: userId,
          book_id: bookId,
        },
      },
      data: {
        delete_flag: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRating = async (req, userId, bookId) => {
  try {
    const rating = await prisma.rating.update({
      where: {
        user_id_book_id: {
          user_id: userId,
          book_id: bookId,
        },
      },
      data: req.body,
    });
    return rating;
  } catch (error) {
    console.log(error);
  }
};

export const Service = {
  createRating,
  countRatingsAndComments,
  getRatingByBook,
  deleteRating,
  updateRating,
};
