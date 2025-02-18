import React from "react";

import { t } from "i18next";
import { Helmet } from "react-helmet";

const WithTitle = (Component, title) => {
  const PageTitle = props => {
    const pageTitle = title ? t("pageTitle", { title }) : t("title");

    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  PageTitle.displayName = `WithTitle(${
    Component.displayName || Component.name || "Component"
  })`;

  return PageTitle;
};

export default WithTitle;
