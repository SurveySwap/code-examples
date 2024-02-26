import "./App.css";

import { useEffect } from "react";
import { Helmet } from "react-helmet";

const loadScript = function (url) {
  const script = document.createElement("script");

  script.src = url;
  script.async = false;

  document.body.appendChild(script);

  return script;
};

export default function App() {
  useEffect(() => {
    const scripts = [
      loadScript("https://unpkg.com/survey-core/survey.core.min.js"),
      loadScript("https://cdn.plot.ly/plotly-latest.min.js"),
      loadScript("https://unpkg.com/wordcloud/src/wordcloud2.js"),
      loadScript("https://unpkg.com/survey-analytics/survey.analytics.min.js"),
      loadScript("./analytics.js"),
    ];

    return () => {
      scripts.forEach((script) => document.body.removeChild(script));
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/survey-analytics/survey.analytics.min.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/survey-core/defaultV2.min.css"
          type="text/css"
          rel="stylesheet"
        />
      </Helmet>

      <div id="surveyVizPanel"></div>
    </>
  );
}
