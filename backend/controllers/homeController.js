import HomePage from '../models/HomePage.js';

// @desc    Get homepage data
// @route   GET /api/homepage
// @access  Public
export const getHomePage = async (req, res) => {
  try {
    const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
    res.json(homePage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update homepage data
// @route   PUT /api/homepage
// @access  Private/Admin
export const updateHomePage = async (req, res) => {
  try {
    const { mainImage, featureImages, headline, subheadline } = req.body;

    const homePage = await HomePage.findOne();

    if (homePage) {
      homePage.mainImage = mainImage;
      homePage.featureImages = featureImages;
      homePage.headline = headline;
      homePage.subheadline = subheadline;
      homePage.updatedAt = Date.now();

      const updatedHomePage = await homePage.save();
      res.json(updatedHomePage);
    } else {
      const newHomePage = await HomePage.create({
        mainImage,
        featureImages,
        headline,
        subheadline
      });
      res.status(201).json(newHomePage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};