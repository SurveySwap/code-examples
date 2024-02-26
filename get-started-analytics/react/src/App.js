import "./App.css";

import { useState, useEffect, useLayoutEffect } from "react";
import "survey-analytics/survey.analytics.min.css";
import { Model } from "survey-core";
// import SurveyAnalytics from "survey-analytics";

import { Helmet } from "react-helmet";

const surveyJson = {
  elements: [
    {
      name: "satisfaction-score",
      title: "How would you describe your experience with our product?",
      type: "radiogroup",
      choices: [
        { value: 5, text: "Fully satisfying" },
        { value: 4, text: "Generally satisfying" },
        { value: 3, text: "Neutral" },
        { value: 2, text: "Rather unsatisfying" },
        { value: 1, text: "Not satisfying at all" },
      ],
      isRequired: true,
    },
    {
      name: "nps-score",
      title:
        "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
      type: "rating",
      rateMin: 0,
      rateMax: 10,
    },
  ],
  showQuestionNumbers: "off",
  completedHtml: "Thank you for your feedback!",
};

const surveyResults = [
  {
    "satisfaction-score": 5,
    "nps-score": 10,
  },
  {
    "satisfaction-score": 5,
    "nps-score": 9,
  },
  {
    "satisfaction-score": 3,
    "nps-score": 6,
  },
  {
    "satisfaction-score": 3,
    "nps-score": 6,
  },
  {
    "satisfaction-score": 2,
    "nps-score": 3,
  },
];

const vizPanelOptions = {
  allowHideQuestions: false,
};

const loadScript = function (url, onload = () => {}) {
  const script = document.createElement("script");

  script.src = url;
  script.async = false;
  document.body.appendChild(script);
  script.onload = onload
  return script;
};

export default function App() {
  const [survey, setSurvey] = useState(null);
  const [vizPanel, setVizPanel] = useState(null);
  if (!survey) {
    const survey = new Model(surveyJson);
    setSurvey(survey);
  }

   const initPanel = () => {
    console.log('asdf')
     if (!vizPanel && !!survey) {
       /* eslint-disable no-undef */
       const vizPanel = new SurveyAnalytics.VisualizationPanel(
         survey.getAllQuestions(),
         surveyResults,
         vizPanelOptions
       );
       vizPanel.showHeader = false;
       setVizPanel(vizPanel);
     }
   };

  useLayoutEffect(() => {
    const scripts = [
      loadScript("https://unpkg.com/survey-core/survey.core.min.js"),
      loadScript("https://cdn.plot.ly/plotly-latest.min.js"),
      loadScript("https://unpkg.com/wordcloud/src/wordcloud2.js"),
      loadScript(
        "https://unpkg.com/survey-analytics/survey.analytics.min.js",
        initPanel
      ),
      // loadScript("./analytics.js"),
    ];

    return () => {
      scripts.forEach((script) => document.body.removeChild(script));
    };
  }, []);


  // if (!vizPanel && !!survey) {
  //   const vizPanel = new SurveyAnalytics.VisualizationPanel(
  //     survey.getAllQuestions(),
  //     surveyResults,
  //     vizPanelOptions
  //   );
  //   vizPanel.showHeader = false;
  //   setVizPanel(vizPanel);
  // }

  useEffect(() => {
    if (vizPanel) {
      vizPanel.render(document.getElementById("surveyVizPanel"));
    }

    return () => {
      document.getElementById("surveyVizPanel").innerHTML = "";
    };
  }, [vizPanel]);

  return (
    <>
      <Helmet>
        {/* <script src="https://unpkg.com/survey-analytics/survey.analytics.min.js"></script> */}
      </Helmet>
      <div id="surveyVizPanel" />
    </>
  );
}
