const jwt = require('jsonwebtoken');

exports.socialLoginCallback = (req, res) => {
    const user = req.user;

    // Create token similar to standard login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    // In a real app, you might redirect to client with token in query param or cookie
    // For this API structure, we'll just return the token as JSON for simplicity 
    // BUT since this is a redirect callback from Google/FB, we usually redirect to the frontend.
    // Assuming Frontend runs on localhost:3000

    res.redirect(`http://localhost:3000/login?token=${token}`);
};
