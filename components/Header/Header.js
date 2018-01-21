import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Head from "next/head";

import distanceInWords from "date-fns/distance_in_words";

import Spinner from "../Spinner/Spinner";
import { primaryColor } from "../../utils/variables";

class Header extends React.Component {
  state = { timeSinceBuild: null };

  componentDidMount() {
    this.updateTimeSinceBuild();
    this.intervalID = setInterval(this.updateTimeSinceBuild, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  buildTime = Number(process.env.BUILD_TIME);

  updateTimeSinceBuild = () => {
    this.setState({
      timeSinceBuild: distanceInWords(Date.now(), this.buildTime)
    });
  };

  render() {
    const { className, title, isFetching } = this.props;
    const { timeSinceBuild } = this.state;
    return (
      <header className={classNames(className, "Header")}>
        <Head>
          <meta charSet="utf-8" key="charset" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta name="theme-color" content={primaryColor} key="themeColor" />
          <link rel="manifest" href="/static/manifest.json" />

          <meta name="metaDescription" content="Deluge mobile client" key="description" />
          <link rel="shortcut icon" href="/static/icons/deluge.png" type="image/png" key="shortcutIcon" />
          <link rel="icon" href="/static/icons/deluge.png" type="image/png" key="icon" />
          <link
            rel="apple-touch-icon-precomposed"
            media="screen and (resolution: 163dpi)"
            href="/static/icons/apple-pre-57.png"
            key="appleIconSmall"
          />
          <link
            rel="apple-touch-icon-precomposed"
            media="screen and (resolution: 132dpi)"
            href="/static/icons/apple-pre-72.png"
            key="appleIconMedium"
          />
          <link
            rel="apple-touch-icon-precomposed"
            media="screen and (resolution: 326dpi)"
            href="/static/icons/apple-pre-114.png"
            key="appleIconLarge"
          />
          <title>{title}</title>
        </Head>
        <h1>{title}</h1>
        {isFetching && <Spinner />}
        <p>
          <small>{timeSinceBuild}</small>
        </p>
        <style jsx>{`
          header {
            background: ${primaryColor};
            color: ghostwhite;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5em 1em;
          }

          h1 {
            margin: 0;
          }

          p {
            font-size: 0.75em;
            font-weight: 100;
            margin: 0;
          }
        `}</style>
      </header>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Header;
