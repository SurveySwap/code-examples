module.exports = {
  webpack: {
    configure: {
      externals: {
        "survey-analytics": {
          root: "SurveyAnalytics",
          commonjs2: "survey-analytics",
          commonjs: "survey-analytics",
          amd: "survey-analytics",
        },
      },
    },
    // configure: {
    //   externals: {
    //     "survey-analytics": "survey-analytics",
    //   },
    // }
  },
};
