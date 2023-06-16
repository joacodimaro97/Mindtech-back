const verifiedRole = (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== 1 ){
        return res.status(403).json({
            success:false,
            message: "Access denied. Only admin users are allowed"
        });
    }
    return next()
};

export default verifiedRole