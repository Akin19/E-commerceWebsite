// import jwt from "jsonwebtoken";

// const adminAuth = async (req, resizeBy, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default adminAuth;

import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const adminCredentials =
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    if (token_decode !== adminCredentials) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
