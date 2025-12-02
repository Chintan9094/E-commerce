export const getMyProfile = (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
};

export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = req.user;

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};